import { useFonts } from "expo-font";
import {
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import { Questrial_400Regular } from "@expo-google-fonts/questrial";

export function useAppFonts() {
  const [loaded] = useFonts({
    PlayfairDisplay_700Bold,
    Questrial_400Regular,
  });

  return loaded;
}
