import "@/styles/globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/apollo-client";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

const client = createApolloClient();
export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
