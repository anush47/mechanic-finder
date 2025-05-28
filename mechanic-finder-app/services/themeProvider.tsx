import React, { useMemo } from "react";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import merge from "deepmerge";
import { Colors } from "@/consts/colours";
import { useSession } from "./ctx";

const customThemes = {
  dark: { ...MD3DarkTheme, colors: Colors.dark.colors },
  light: { ...MD3LightTheme, colors: Colors.light.colors },
};

const { LightTheme: NavigationLight, DarkTheme: NavigationDark } =
  adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

function getCombinedTheme(
  themeMode: "light" | "dark" | "system",
  isDark: boolean
) {
  const paperTheme = isDark ? customThemes.dark : customThemes.light;
  const navigationTheme = isDark ? NavigationDark : NavigationLight;
  return merge(navigationTheme, paperTheme);
}

export function ThemeProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { themeMode, setThemeMode } = useSession();
  const colorScheme = useColorScheme();
  const isDark =
    themeMode === "system" ? colorScheme === "dark" : themeMode === "dark";
  const combinedTheme = useMemo(
    () => getCombinedTheme(themeMode, isDark),
    [themeMode, isDark]
  );

  return (
    <PaperProvider theme={combinedTheme}>
      <NavigationThemeProvider value={combinedTheme}>
        {children}
      </NavigationThemeProvider>
    </PaperProvider>
  );
}
