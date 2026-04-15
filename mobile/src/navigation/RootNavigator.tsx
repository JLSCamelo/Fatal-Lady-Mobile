import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/Home";
import { CatalogScreen } from "../screens/Catalog";
import { CartScreen } from "../screens/Cart";
import { LoginScreen } from "../screens/Login";
import { RegisterScreen } from "../screens/Register";
import { ProductScreen } from "../screens/Product";
import { RootStackParamList, TabParamList } from "../types/navigation";
import { iconAssets } from "../services/assets";
import { colors, radius, shadows, spacing, typography } from "../theme";
import { useAppStore } from "../hooks/useAppStore";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function tabIconForRoute(routeName: keyof TabParamList) {
  switch (routeName) {
    case "Home":
      return iconAssets.shop;
    case "Catalog":
      return iconAssets.bookmark;
    case "Cart":
      return iconAssets.cart;
    default:
      return iconAssets.shop;
  }
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { cartCount } = useAppStore();

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const label =
          descriptors[route.key].options.tabBarLabel?.toString() ?? route.name;
        const icon = tabIconForRoute(route.name as keyof TabParamList);

        return (
          <Pressable
            key={route.key}
            style={styles.tabItem}
            onPress={() => navigation.navigate(route.name)}
          >
            <View>
              <Image
                source={icon}
                style={[styles.tabIcon, focused && styles.tabIconFocused]}
                resizeMode="contain"
              />
              {route.name === "Cart" ? (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{cartCount}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: "Início" }} />
      <Tab.Screen name="Catalog" component={CatalogScreen} options={{ tabBarLabel: "Catálogo" }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarLabel: "Carrinho" }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    ...shadows.floating,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  tabIcon: {
    width: 22,
    height: 22,
    tintColor: colors.textSoft,
  },
  tabIconFocused: {
    tintColor: colors.primary,
  },
  tabLabel: {
    color: colors.textSoft,
    fontFamily: typography.body,
    fontSize: 12,
  },
  tabLabelFocused: {
    color: colors.primary,
  },
  tabBadge: {
    position: "absolute",
    top: -6,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  tabBadgeText: {
    color: colors.surface,
    fontFamily: typography.body,
    fontSize: 10,
  },
});
