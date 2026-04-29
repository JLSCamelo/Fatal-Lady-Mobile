# Fatal-Lady-Mobile
Projeto de criação e desenvolvimento de software mobile para uma empresa de moda feminina.

## Como rodar o projeto

Este projeto e um app mobile feito com Expo e React Native. Para rodar, use sempre a pasta `Fatal-Lady-Mobile`, que e onde fica o `package.json`.

### Pre-requisitos

- Node.js instalado.
- npm instalado.
- App Expo Go no celular, caso queira testar no aparelho fisico.
- Android Studio/emulador configurado, caso queira usar `npm run android`.

### Rodar pela primeira vez

Abra o terminal e rode:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
npm install
cp .env.example .env
npm start
```

Quando o Expo abrir no terminal:

- Para abrir no navegador, aperte `w`.
- Para abrir no celular, abra o Expo Go e escaneie o QR Code.
- Para abrir no emulador Android, deixe o emulador aberto e aperte `a`.

### Rodar nas proximas vezes

Depois que as dependencias ja estiverem instaladas, basta:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
npm start
```

### Rodar direto no navegador

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
npm run web
```

### Rodar o web-reference com uvicorn

O `web-reference` e o backend/site em FastAPI que fica dentro de `web-reference/Fatal-Lady-main`.

Na primeira vez, rode:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile/web-reference/Fatal-Lady-main
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp app/.env.example app/.env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Antes de iniciar, edite `app/.env` com os dados reais do banco/Supabase. Esse backend exige variaveis como `DATABASE_URL`, `SUPABASE_URL` e `SUPABASE_KEY`.

A `DATABASE_URL` deve usar o driver `psycopg`, assim:

```env
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:6543/postgres
```

Nas proximas vezes, rode:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile/web-reference/Fatal-Lady-main
source .venv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Depois acesse:

```text
http://127.0.0.1:8000
```

Se aparecer erro dizendo que a porta `8000` ja esta em uso, rode em outra porta:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8001
```

E acesse:

```text
http://127.0.0.1:8001
```

### Rodar direto no Android

Use este comando somente se o Android Studio/emulador ja estiver configurado:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
npm run android
```

### Configuracao do backend

O app precisa saber onde esta a API do backend. Essa configuracao fica no arquivo `.env`.

Se o arquivo ainda nao existir, crie com:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
cp .env.example .env
```

Dentro do `.env`, existe esta variavel:

```env
EXPO_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

Escolha o valor certo:

- Se rodar no navegador do mesmo computador, use `http://127.0.0.1:8000`.
- Se rodar no emulador Android, use `http://10.0.2.2:8000`.
- Se rodar no celular fisico, use o IP do computador na rede, por exemplo `http://192.168.0.10:8000`.

Sempre que mudar o `.env`, pare o Expo com `Ctrl+C` e rode `npm start` de novo.

### Resumo rapido

Na maioria das vezes, o comando que voce vai usar e este:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
npm start
```

Depois aperte `w` para web ou escaneie o QR Code com o Expo Go.

### Comandos disponiveis

```bash
npm start        # inicia o Expo
npm run web      # abre a versao web
npm run android  # gera/roda no Android com ambiente nativo configurado
npm run ios      # gera/roda no iOS, apenas em macOS com ambiente nativo configurado
```

### Documentacao da sprint mobile

A sprint de produtos, detalhe do produto e responsividade esta documentada em:

```text
docs/sprint-produtos-responsivo.md
```

### Problemas comuns

- Se o app mostrar erro pedindo `EXPO_PUBLIC_API_BASE_URL`, confira se o arquivo `.env` existe e reinicie o Expo.
- Se estiver no celular e o app nao conectar no backend, troque `127.0.0.1` pelo IP do computador.
- Se mudar o `.env`, pare o Expo e rode `npm start` novamente.
