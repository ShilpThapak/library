import { Html, Head, Main, NextScript } from "next/document";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ margin: 0 }}>
        <ResponsiveAppBar />
        <Main />
        <NextScript />

      </body>
    </Html>
  );
}
