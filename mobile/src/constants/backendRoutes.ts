export const backendRoutes = {
  home: "/",
  login: "/login",
  register: "/cadastrar/",
  products: "/produtos",
  category: "/categoria",
  productDetail: "/produto-get/{id_produto}",
  cart: "/carrinho/",
  cartAdd: "/carrinho/adicionar/{produto_id}",
  cartEdit: "/carrinho/editar/{produto_id}",
  cartRemove: "/carrinho/remover/{produto_id}",
  shipping: "/frete/calcular/?cep_destino={cep}",
};
