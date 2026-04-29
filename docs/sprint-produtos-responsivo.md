# Sprint: produtos e responsividade mobile

## Objetivo da sprint

Melhorar a experiencia de compra no app Expo, com foco em catalogo, detalhe do produto, carrinho e responsividade em mobile, tablet e web. A sprint nao adicionou dependencias novas e manteve o uso do store atual com fallback local de produtos.

## Escopo entregue

- Catálogo mantido como tela de listagem de produtos existente.
- Catálogo refinado com cabeçalho de resultados, contagem de filtros ativos, filtros mais legíveis e grid responsivo por categoria.
- Tela de detalhe do produto revisada com imagem, informações de compra, seleção de tamanho, quantidade, benefícios, descrição e produtos relacionados.
- Header corrigido para exibir navegação completa em telas maiores e menu compacto no mobile.
- Cards de produto e carrinho ajustados para evitar overflow em telas estreitas.
- Home e carrinho passam a usar padding responsivo e largura máxima para melhorar leitura em mobile, tablet e web.

## Fora do escopo

- Criar, resetar ou migrar banco de dados.
- Alterar contratos de API sem validacao no backend.
- Adicionar novas dependencias de UI ou estado.
- Versionar credenciais reais de `.env`.

## Padrão de responsividade

As regras compartilhadas ficam em `mobile/src/theme/responsive.ts`.

- `compact`: abaixo de 420px, usado para celulares estreitos.
- `tablet`: a partir de 768px, usado para layouts com colunas.
- `desktop`: a partir de 1024px, reservado para telas largas.

Use `getPagePadding(width)` para espaçamento horizontal das páginas e `isCompactWidth(width)` ou `isTabletWidth(width)` para decisões de layout por componente.

## Ambiente necessario para validar

- App Expo instalado com `npm install`.
- `.env` do app criado a partir de `.env.example`.
- `EXPO_PUBLIC_API_BASE_URL` apontando para a API correta quando o fluxo depender do backend.
- API FastAPI em `web-reference/Fatal-Lady-main` rodando quando login, cadastro, catalogo remoto ou carrinho dependerem de dados reais.
- Banco/Supabase configurados no `app/.env` da API, sem commitar segredos.

## Fluxos que devem ser validados

1. Home: abrir app, navegar para catálogo pelo CTA principal e pelo menu.
2. Catálogo: buscar produto, aplicar categoria, cor, tamanho, alterar faixa de preço e limpar filtros.
3. Detalhe: abrir produto pelo catálogo, selecionar tamanho, alterar quantidade e tentar adicionar ao carrinho.
4. Autenticação: ao adicionar item sem login, confirmar modal de login e navegação para login/cadastro.
5. Carrinho: após login com usuário mockado, revisar item, alterar quantidade, remover item e calcular frete.
6. Responsividade: repetir navegação em largura estreita (~390px), tablet (~768px) e web larga.

## Validacao automatizada recomendada

No app Expo:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile
npm run typecheck
```

Na API/site, quando a mudanca tocar contratos, dados ou templates usados pelo app:

```bash
cd /home/carlosz/Mobile_FatalLady/Fatal-Lady-Mobile/web-reference/Fatal-Lady-main
source .venv/bin/activate
pytest
```

## Checklist de aceite

- Catalogo nao quebra em largura estreita e mantem filtros acessiveis.
- Detalhe do produto mantem imagem, preco, tamanho, quantidade e acoes visiveis sem overflow.
- Carrinho permite revisar itens sem texto cortado em telas estreitas.
- Header alterna corretamente entre navegacao completa e menu compacto.
- App web e mobile usam a mesma configuracao documentada de `EXPO_PUBLIC_API_BASE_URL`.
- Nenhum valor real de banco, Supabase ou segredo foi incluido em documentacao ou commits.

## Observações técnicas

- Nenhuma dependência nova foi adicionada.
- Os dados continuam usando o store atual e fallback local de produtos.
- A documentação de código foi concentrada em helpers compartilhados; componentes visuais simples permanecem autoexplicativos.

## Riscos e pontos de atencao

- Fluxos autenticados e carrinho dependem de API, banco e dados locais coerentes.
- Celular fisico precisa apontar para o IP da maquina na rede, nao para `127.0.0.1`.
- Emulador Android precisa usar `http://10.0.2.2:8000` quando a API roda na maquina host.
- Mudancas em `.env` exigem reiniciar o Expo ou a API para surtirem efeito.
