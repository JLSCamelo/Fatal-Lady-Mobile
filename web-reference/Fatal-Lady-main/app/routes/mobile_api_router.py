import re
from datetime import date, datetime
from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload

from app.auth import criar_token, gerar_hash_senha, verificar_senha, verificar_token
from app.controllers.produtos_controller import atribuir_imagem_para_produto
from app.database import get_db
from app.models.categoria_model import CategoriaDB
from app.models.enderecos_model import EnderecoDB
from app.models.produto_model import ProdutoDB
from app.models.usuario_model import UsuarioDB
from app.ultils import validar_cpf

router = APIRouter(prefix="/api/mobile", tags=["Mobile API"])


def sync_serial_sequence(db: Session, table_name: str, column_name: str) -> None:
    db.execute(
        text(
            """
            SELECT setval(
                pg_get_serial_sequence(:table_name, :column_name),
                COALESCE((SELECT MAX(%s) FROM %s), 1),
                true
            )
            """
            % (column_name, table_name)
        ),
        {"table_name": table_name, "column_name": column_name},
    )


def sanitize_digits(value: str) -> str:
    return re.sub(r"\D", "", value or "")


def normalize_sizes(raw_value) -> list[int]:
    if raw_value is None:
        return list(range(32, 43))

    if isinstance(raw_value, int):
        return [raw_value] if 30 <= raw_value <= 50 else list(range(32, 43))

    sizes = [int(match) for match in re.findall(r"\d{2}", str(raw_value))]
    return sizes or list(range(32, 43))


def image_url_for_product(image_path: Optional[str]) -> Optional[str]:
    if not image_path:
        return None
    if image_path.startswith("http://") or image_path.startswith("https://"):
        return image_path
    if image_path.startswith("/"):
        return image_path
    return f"/{image_path.lstrip('/')}"


def serialize_product(produto: ProdutoDB) -> dict:
    atribuir_imagem_para_produto(produto)

    return {
      "id_produto": produto.id_produto,
      "nome": produto.nome,
      "nome_categoria": produto.categoria.nome if produto.categoria else "Calçados",
      "categoria": {
          "id": produto.categoria.id if produto.categoria else 0,
          "nome": produto.categoria.nome if produto.categoria else "Calçados",
          "slug": (
              (produto.categoria.nome if produto.categoria else "calcados")
              .strip()
              .lower()
              .replace(" ", "-")
          ),
      },
      "preco": float(produto.preco),
      "estoque": int(produto.estoque),
      "tamanhos": str(produto.tamanhos),
      "tamanhos_disponiveis": normalize_sizes(produto.tamanhos),
      "caminhoimagem": image_url_for_product(produto.caminhoimagem),
      "cor": "Unspecified",
      "descricao": getattr(produto, "descricao", "") or "",
      "nota_media": None,
    }


def serialize_user(usuario: UsuarioDB) -> dict:
    return {
        "id_cliente": usuario.id_cliente,
        "nome": usuario.nome,
        "email": usuario.email,
        "telefone": usuario.telefone,
        "cpf": usuario.cpf,
        "genero": usuario.genero,
        "data_nascimento": (
            usuario.data_nascimento.isoformat()
            if hasattr(usuario.data_nascimento, "isoformat")
            else str(usuario.data_nascimento)
        ),
        "is_admin": bool(usuario.is_admin),
    }


def get_user_from_authorization(
    authorization: Optional[str], db: Session
) -> Optional[UsuarioDB]:
    if not authorization or not authorization.lower().startswith("bearer "):
        return None

    token = authorization.split(" ", 1)[1].strip()
    payload = verificar_token(token)
    if not payload:
        return None

    user_id = payload.get("id")
    if not user_id:
        return None

    return db.query(UsuarioDB).filter(UsuarioDB.id_cliente == user_id).first()


class MobileLoginRequest(BaseModel):
    email: str
    senha: str


class MobileRegisterRequest(BaseModel):
    nome: str
    email: str
    telefone: str
    cpf: str
    data_nascimento: date
    genero: str
    cep: str
    rua: str
    numero: str
    complemento: str = ""
    bairro: str
    cidade: str
    estado: str
    senha: str
    confirmarSenha: str


@router.get("/health")
def healthcheck():
    return {"ok": True, "timestamp": datetime.utcnow().isoformat()}


@router.get("/products")
def list_mobile_products(db: Session = Depends(get_db)):
    produtos = (
        db.query(ProdutoDB)
        .options(joinedload(ProdutoDB.categoria))
        .order_by(ProdutoDB.id_produto)
        .all()
    )
    return {"items": [serialize_product(produto) for produto in produtos]}


@router.get("/products/{product_id}")
def get_mobile_product(product_id: int, db: Session = Depends(get_db)):
    produto = (
        db.query(ProdutoDB)
        .options(joinedload(ProdutoDB.categoria))
        .filter(ProdutoDB.id_produto == product_id)
        .first()
    )

    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado.")

    return serialize_product(produto)


@router.get("/categories")
def list_mobile_categories(db: Session = Depends(get_db)):
    categorias = db.query(CategoriaDB).order_by(CategoriaDB.id).all()
    return {
        "items": [
            {"id": categoria.id, "nome": categoria.nome, "descricao": categoria.descricao}
            for categoria in categorias
        ]
    }


@router.post("/auth/login")
def mobile_login(payload: MobileLoginRequest, db: Session = Depends(get_db)):
    usuario = (
        db.query(UsuarioDB)
        .filter(UsuarioDB.email == payload.email.strip().lower())
        .first()
    )

    if not usuario or not verificar_senha(payload.senha, usuario.senha):
        raise HTTPException(status_code=401, detail="Usuário ou senha incorretos.")

    usuario.ultima_atividade = datetime.utcnow()
    db.commit()

    token = criar_token(
        {
            "sub": usuario.email,
            "id": usuario.id_cliente,
            "is_admin": usuario.is_admin,
        }
    )

    return {
        "token": token,
        "user": serialize_user(usuario),
    }


@router.post("/auth/register")
def mobile_register(payload: MobileRegisterRequest, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    cpf = sanitize_digits(payload.cpf)

    if db.query(UsuarioDB).filter(UsuarioDB.email == email).first():
        raise HTTPException(status_code=409, detail="E-mail já cadastrado.")

    if not validar_cpf(cpf):
        raise HTTPException(status_code=400, detail="CPF inválido.")

    if db.query(UsuarioDB).filter(UsuarioDB.cpf == cpf).first():
        raise HTTPException(status_code=409, detail="CPF já cadastrado.")

    if payload.senha != payload.confirmarSenha:
        raise HTTPException(status_code=400, detail="As senhas não coincidem.")

    try:
        sync_serial_sequence(db, "usuarios", "id_cliente")

        novo_usuario = UsuarioDB(
            nome=payload.nome.strip(),
            email=email,
            senha=gerar_hash_senha(payload.senha),
            telefone=payload.telefone.strip(),
            cpf=cpf,
            genero=payload.genero,
            data_nascimento=payload.data_nascimento,
        )
        db.add(novo_usuario)
        db.commit()
        db.refresh(novo_usuario)

        sync_serial_sequence(db, "enderecos", "id")

        novo_endereco = EnderecoDB(
            usuario_id=novo_usuario.id_cliente,
            cep=payload.cep,
            rua=payload.rua.strip(),
            bairro=payload.bairro.strip(),
            cidade=payload.cidade.strip(),
            estado=payload.estado.strip(),
            complemento=payload.complemento.strip(),
            numero=payload.numero.strip(),
            apelido="Principal",
            destinatario=payload.nome.strip(),
            principal=True,
        )
        db.add(novo_endereco)
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Não foi possível concluir o cadastro por conflito de dados.") from exc

    return {
        "ok": True,
        "email": email,
        "user": serialize_user(novo_usuario),
    }


@router.get("/me")
def mobile_me(
    authorization: Optional[str] = Header(default=None),
    db: Session = Depends(get_db),
):
    usuario = get_user_from_authorization(authorization, db)
    if not usuario:
        raise HTTPException(status_code=401, detail="Não autenticado.")
    return {"user": serialize_user(usuario)}
