// app/providers.tsx
"use client";

import store from "@/redux/store";
import theme from "@/themes";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );
}
