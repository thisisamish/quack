import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
// import { Theme } from "@radix-ui/themes";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
// import "@radix-ui/themes/styles.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    // <Theme accentColor="crimson" radius="large">
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Quack</title>
        <meta
          name="description"
          content="Quack is a social media platform for quackers."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </ClerkProvider>
    // </Theme>
  );
};

export default api.withTRPC(MyApp);
