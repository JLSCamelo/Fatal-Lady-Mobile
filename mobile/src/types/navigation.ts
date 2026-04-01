export type TabParamList = {
  Home: undefined;
  Catalog: undefined;
  Cart: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Login: { redirectTo?: keyof TabParamList } | undefined;
  Register: undefined;
  Product: { productId: number };
};
