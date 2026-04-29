# Fatal-Lady-Mobile

App mobile/web em Expo e React Native para a Fatal Lady, com uma referencia web/API em FastAPI dentro de `web-reference/Fatal-Lady-main`.

Use sempre a pasta raiz deste repositorio para comandos do app Expo:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
```

## Pre-requisitos

- Node.js e npm instalados.
- App Expo Go no celular, se for testar em aparelho fisico.
- Android Studio e emulador configurados, se for usar `npm run android`.
- Python 3 com `venv`, se for rodar a API/site FastAPI em `web-reference/Fatal-Lady-main`.
- Credenciais locais de banco/Supabase para a API. Nao versionar valores reais de `.env`.

## Primeira execucao do app Expo

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
npm install
cp .env.example .env
npm start
```

Quando o Expo abrir no terminal:

- Aperte `w` para abrir a versao web no navegador.
- Escaneie o QR Code com Expo Go para abrir no celular.
- Aperte `a` para abrir no emulador Android, se ele ja estiver iniciado.

Nas proximas vezes:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
npm start
```

## Comandos do app

```bash
npm start        # inicia o Expo
npm run web      # inicia o Expo diretamente em modo web
npm run android  # gera/roda no Android com ambiente nativo configurado
npm run ios      # gera/roda no iOS, apenas em macOS com ambiente nativo configurado
npm run typecheck # valida TypeScript sem emitir arquivos
```

## Configuracao da API no app

O app le `EXPO_PUBLIC_API_BASE_URL` do arquivo `.env`, criado a partir de `.env.example`.

```env
EXPO_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

Escolha o valor conforme o alvo:

- Navegador no mesmo computador: `http://127.0.0.1:8000`.
- Emulador Android: `http://10.0.2.2:8000`.
- Celular fisico: IP do computador na mesma rede, por exemplo `http://192.168.1.10:8000`.

Sempre que alterar `.env`, pare o Expo com `Ctrl+C` e rode `npm start` novamente.

## Rodar web/mobile com a API local

Em um terminal, suba a API FastAPI:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile/web-reference/Fatal-Lady-main
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp app/.env.example app/.env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Antes de iniciar a API, edite `app/.env` com credenciais reais locais. O arquivo de exemplo documenta as chaves esperadas, incluindo:

```env
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:6543/postgres
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-service-or-anon-key
SECRET_KEY=change-me
BACKEND_CORS_ORIGINS=http://127.0.0.1:8081,http://localhost:8081,http://127.0.0.1:19006,http://localhost:19006
```

Tambem e possivel omitir `DATABASE_URL` e preencher `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT` e `POSTGRES_DB`; a API monta a URL com esses campos.

Em outro terminal, rode o app:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
npm start
```

Depois escolha `w`, `a` ou Expo Go conforme o alvo.

## API, site e banco

O backend/site fica em:

```text
web-reference/Fatal-Lady-main
```

Com a API rodando, acesse:

```text
http://127.0.0.1:8000
http://127.0.0.1:8000/api/mobile/health
```

Se a porta `8000` estiver em uso, use outra porta:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8001
```

Nesse caso, ajuste tambem `EXPO_PUBLIC_API_BASE_URL` no `.env` do app para a mesma porta.

O banco usado pela API vem de `app/.env`. Nao ha comando documentado aqui para criar, resetar ou migrar banco automaticamente; antes de rodar fluxos que dependem de dados, confirme que o banco configurado ja tem as tabelas e dados necessarios.

## Validacao local

Use a menor validacao que cobre a mudanca:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
npm run typecheck
```

Para validar a API/site:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile/web-reference/Fatal-Lady-main
source .venv/bin/activate
pytest
```

Validacao manual recomendada:

- Abrir o app web pelo Expo e confirmar que carrega sem erro de `.env`.
- Acessar `/api/mobile/health` na API local.
- Testar catalogo, detalhe de produto, login/cadastro e carrinho com uma base local adequada.
- Repetir o fluxo em navegador, emulador Android ou celular fisico conforme a entrega.

## Fluxo de desenvolvimento

1. Atualize `.env` do app e `web-reference/Fatal-Lady-main/app/.env` localmente, sem commitar segredos.
2. Rode a API em um terminal.
3. Rode o Expo em outro terminal.
4. Faça a mudanca no menor escopo possivel.
5. Rode `npm run typecheck` para mudancas no app e `pytest` para mudancas da API/site.
6. Documente no PR o que foi validado manualmente e qualquer dependencia de banco/dados.

## Documentacao da sprint mobile

A sprint de produtos, detalhe do produto e responsividade esta documentada em:

```text
docs/sprint-produtos-responsivo.md
```

O guia de organizacao de pastas e responsabilidades do repositorio fica em:

```text
docs/estrutura-organizacao.md
```

## Problemas comuns

- Erro pedindo `EXPO_PUBLIC_API_BASE_URL`: confira se `.env` existe e reinicie o Expo.
- Celular fisico nao conecta na API: use o IP do computador na rede em vez de `127.0.0.1`.
- Emulador Android nao conecta na API local: use `http://10.0.2.2:8000`.
- Mudou qualquer `.env`: reinicie o processo correspondente.
- API falha ao iniciar por variavel obrigatoria ausente: confira `web-reference/Fatal-Lady-main/app/.env`.
- API falha por conexao com banco: confirme host, porta, usuario, senha e permissao do banco configurado.
