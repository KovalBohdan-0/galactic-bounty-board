import type { AppProps } from "next/app";
import "../src/app/globals.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
