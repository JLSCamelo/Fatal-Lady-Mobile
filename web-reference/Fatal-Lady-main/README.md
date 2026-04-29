# Fatal-Lady Web Reference

Site/backend em FastAPI usado como referencia web e API local para o app Expo.

Use esta pasta para comandos do backend/site:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile/web-reference/Fatal-Lady-main
```

## Pre-requisitos

- Python 3 com suporte a `venv`.
- `pip` instalado.
- Credenciais locais de banco/Supabase.
- Banco acessivel pela maquina local.

## Primeira execucao

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile/web-reference/Fatal-Lady-main
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp app/.env.example app/.env
```

Edite `app/.env` antes de iniciar a API. Use apenas valores locais ou de desenvolvimento e nao commite segredos.

Depois rode:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Acesse:

```text
http://127.0.0.1:8000
http://127.0.0.1:8000/api/mobile/health
```

Nas proximas vezes:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile/web-reference/Fatal-Lady-main
source .venv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Se a porta `8000` estiver ocupada:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8001
```

Ao trocar a porta da API, atualize tambem o `EXPO_PUBLIC_API_BASE_URL` no `.env` do app Expo.

## Variaveis de ambiente

O exemplo fica em `app/.env.example`. A API carrega `app/.env`.

```env
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:6543/postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=change-me
POSTGRES_HOST=aws-1-sa-east-1.pooler.supabase.com
POSTGRES_PORT=6543
POSTGRES_DB=postgres
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-service-or-anon-key
SECRET_KEY=change-me
ALGORITHM=HS256
ACCESS_TOKEN_MINUTES=30
BACKEND_CORS_ORIGINS=http://127.0.0.1:8081,http://localhost:8081,http://127.0.0.1:19006,http://localhost:19006
```

`DATABASE_URL` e o caminho mais direto. Se ela nao existir, a API monta a URL usando `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT` e `POSTGRES_DB`.

Use o formato com driver `psycopg`:

```env
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:6543/postgres
```

## Banco de dados

A conexao e configurada por `app/.env`. Este README nao assume criacao, reset ou migracao automatica do banco.

Antes de validar fluxos com dados reais, confirme:

- Host e porta do banco estao acessiveis.
- Usuario e senha sao de ambiente local/desenvolvimento.
- Tabelas e dados necessarios ja existem.
- Nenhuma credencial real foi adicionada a arquivos versionados.

## API mobile

A API mobile esta registrada com prefixo:

```text
/api/mobile
```

Endpoints confirmados no roteador mobile:

```text
GET  /api/mobile/health
GET  /api/mobile/products
GET  /api/mobile/products/{product_id}
GET  /api/mobile/categories
POST /api/mobile/auth/login
POST /api/mobile/auth/register
GET  /api/mobile/me
```

## Validacao

Com o ambiente virtual ativo:

```bash
pytest
```

Validacao manual minima:

- Abrir `http://127.0.0.1:8000`.
- Abrir `http://127.0.0.1:8000/api/mobile/health`.
- Confirmar que o app Expo aponta para a mesma URL configurada em `EXPO_PUBLIC_API_BASE_URL`.
- Testar os fluxos que dependem de banco com dados locais adequados.

## Fluxo com o app Expo

1. Rode esta API em um terminal.
2. No app Expo, configure `.env` com `EXPO_PUBLIC_API_BASE_URL`.
3. Use `http://127.0.0.1:8000` para navegador no mesmo computador.
4. Use `http://10.0.2.2:8000` para emulador Android.
5. Use o IP da maquina na rede para celular fisico.
6. Reinicie Expo e API depois de alterar `.env`.

## Problemas comuns

- `Variável de ambiente obrigatória ausente`: confira `app/.env`.
- Erro de conexao com banco: confira `DATABASE_URL` ou os campos `POSTGRES_*`.
- App Expo nao conecta: confira porta, host e `EXPO_PUBLIC_API_BASE_URL`.
- Celular fisico nao acessa a API: use IP da maquina na rede e confirme firewall/rede local.
