# Sprint: produtos e responsividade mobile

## Escopo entregue

- Catálogo mantido como tela de listagem de produtos existente.
- Catálogo refinado com cabeçalho de resultados, contagem de filtros ativos, filtros mais legíveis e grid responsivo por categoria.
- Tela de detalhe do produto revisada com imagem, informações de compra, seleção de tamanho, quantidade, benefícios, descrição e produtos relacionados.
- Header corrigido para exibir navegação completa em telas maiores e menu compacto no mobile.
- Cards de produto e carrinho ajustados para evitar overflow em telas estreitas.
- Home e carrinho passam a usar padding responsivo e largura máxima para melhorar leitura em mobile, tablet e web.

## Padrão de responsividade

As regras compartilhadas ficam em `mobile/src/theme/responsive.ts`.

- `compact`: abaixo de 420px, usado para celulares estreitos.
- `tablet`: a partir de 768px, usado para layouts com colunas.
- `desktop`: a partir de 1024px, reservado para telas largas.

Use `getPagePadding(width)` para espaçamento horizontal das páginas e `isCompactWidth(width)` ou `isTabletWidth(width)` para decisões de layout por componente.

## Fluxos que devem ser validados

1. Home: abrir app, navegar para catálogo pelo CTA principal e pelo menu.
2. Catálogo: buscar produto, aplicar categoria, cor, tamanho, alterar faixa de preço e limpar filtros.
3. Detalhe: abrir produto pelo catálogo, selecionar tamanho, alterar quantidade e tentar adicionar ao carrinho.
4. Autenticação: ao adicionar item sem login, confirmar modal de login e navegação para login/cadastro.
5. Carrinho: após login com usuário mockado, revisar item, alterar quantidade, remover item e calcular frete.
6. Responsividade: repetir navegação em largura estreita (~390px), tablet (~768px) e web larga.

## Observações técnicas

- Nenhuma dependência nova foi adicionada.
- Os dados continuam usando o store atual e fallback local de produtos.
- A documentação de código foi concentrada em helpers compartilhados; componentes visuais simples permanecem autoexplicativos.
