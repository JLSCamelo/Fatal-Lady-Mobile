from app.database import Base, engine
import app.models  # noqa: F401 - registra todos os modelos no Base.metadata

print("Criando tabelas no banco de dados...")
Base.metadata.create_all(bind=engine)
print("Tabelas criadas com sucesso!")
