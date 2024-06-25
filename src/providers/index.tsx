import type { ReactNode } from "react";
import AuthProvider from "@/providers/AuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ReactReduxProvider from "@/providers/ReactReduxProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ContextProvider from "@/providers/ContextProvider";
import { AiPageContextProvider } from "@/providers/AiPageContextProvider";
import MixpanelWrapper from "@/mixpanel/MixpanelWrapper";
import { Default_Theme_Option } from "@/constants";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MixpanelWrapper>
      <ThemeProvider
        attribute="class"
        defaultTheme={Default_Theme_Option.value}
        enableSystem
        disableTransitionOnChange
      >
        <ReactQueryProvider>
          <ReactReduxProvider>
            <AuthProvider>
              <ContextProvider>
                <AiPageContextProvider>{children}</AiPageContextProvider>
              </ContextProvider>
            </AuthProvider>
          </ReactReduxProvider>
        </ReactQueryProvider>
      </ThemeProvider>
    </MixpanelWrapper>
  );
}
