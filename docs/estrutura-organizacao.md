# Estrutura e organizacao

Este repositorio junta o app Expo/React Native e uma referencia web/API em FastAPI. Para evitar confusao, trate cada area como tendo uma responsabilidade propria.

## Raiz do repositorio

- `App.js` e `index.js`: pontos de entrada do Expo. Devem continuar pequenos e apenas delegar para o app em `mobile/`.
- `app.json`: configuracao do Expo.
- `package.json`: comandos e dependencias do app Expo.
- `assets/`: icones e imagens usados pelo Expo para icon, splash e favicon. Nao misturar com assets de telas do app.
- `scripts/`: wrappers locais para iniciar o Expo.
- `docs/`: documentacao de manutencao e entregas.

## App mobile

- `mobile/App.tsx`: bootstrap do app mobile.
- `mobile/src/assets/`: imagens consumidas pelas telas e componentes.
- `mobile/src/components/`: componentes reutilizaveis, separados por dominio visual (`auth`, `cart`, `common`, `layout`, `product`).
- `mobile/src/screens/`: telas de rota. O padrao atual por tela e `index.tsx`, `styles.ts` e, quando necessario, `types.ts`.
- `mobile/src/navigation/`: navegacao e declaracao de rotas.
- `mobile/src/services/`: integracoes, dados mockados e adaptadores de API/assets.
- `mobile/src/context/` e `mobile/src/hooks/`: estado compartilhado e hooks.
- `mobile/src/theme/`: tokens e helpers de layout/responsividade.
- `mobile/src/types/` e `mobile/src/utils/`: tipos compartilhados e funcoes puras.

## Referencia web/API

- `web-reference/Fatal-Lady-main/`: backend/site FastAPI usado como referencia e API local.
- Evite misturar codigo do app Expo dentro de `web-reference` ou codigo FastAPI dentro de `mobile/src`.
- Mudancas em rotas, banco, auth ou schemas da API devem ser tratadas como escopo de backend, com validacao propria.

## Convencoes para novas mudancas

- Antes de criar uma pasta nova, verifique se ela pertence a `components`, `screens`, `services`, `theme`, `types` ou `utils`.
- Evite mover arquivos apenas por limpeza. Renomes e movimentos devem vir com ajuste de imports, validacao TypeScript e revisao de rotas.
- Use `mobile/src/assets` para imagens de UI/produtos e `assets` da raiz apenas para metadados do Expo.
- Mantenha telas no formato ja usado: `index.tsx` para a tela, `styles.ts` para estilos e `types.ts` quando os tipos forem especificos da tela.
- Prefira mudancas pequenas e localizadas. Refactors transversais devem ser planejados antes para nao quebrar imports.

## Pontos que exigem migracao planejada

- Padronizar imports para o alias `@mobile/*`, hoje configurado no `tsconfig.json`, exigiria alterar imports relativos em varios arquivos e validar Metro/TypeScript.
- Separar `web-reference` em outro repositorio ou workspace reduziria confusao, mas mudaria fluxo de execucao, documentacao e possivelmente CI.
- Renomear telas, assets ou services para padroes mais consistentes deve ser feito junto com atualizacao de todos os imports e teste de navegacao.
