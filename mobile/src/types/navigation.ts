import { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  Home: undefined;
  Catalog: undefined;
  Cart: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  Login:
    | {
        redirectTo?: keyof TabParamList;
        feedback?: "registered";
        prefillEmail?: string;
      }
    | undefined;
  Register: undefined;
  Product: { productId: number };
};
