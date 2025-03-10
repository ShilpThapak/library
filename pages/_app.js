import "@/styles/globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/apollo-client";

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';


const client = createApolloClient();
export default function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} style={{ padding: "25px" }} />
            </ThemeProvider>
        </ApolloProvider>
    );
}
