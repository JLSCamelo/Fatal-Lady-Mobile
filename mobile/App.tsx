import "react-native-gesture-handler";

import React from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { AppStoreProvider } from "./src/context/AppStore";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { useAppFonts } from "./src/hooks/useAppFonts";
import { colors } from "./src/theme";

export default function MobileApp() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <AppStoreProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </AppStoreProvider>
    </SafeAreaProvider>
  );
}
