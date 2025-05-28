import { Slot } from "expo-router";
import { SessionProvider } from "../services/ctx";
import { ThemeProviderComponent } from "@/services/themeProvider";
import "./global.css";

export default function Root() {
  return (
    <SessionProvider>
      <ThemeProviderComponent>
        <Slot />
      </ThemeProviderComponent>
    </SessionProvider>
  );
}
