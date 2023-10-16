import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
// import { Theme } from "@radix-ui/themes";

import { api } from "~/utils/api";

import "~/styles/globals.css";
// import "@radix-ui/themes/styles.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    // <Theme accentColor="crimson" radius="large">
    <ClerkProvider {...pageProps}>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </ClerkProvider>
    // </Theme>
  );
};

export default api.withTRPC(MyApp);
