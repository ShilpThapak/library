import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    // uri: "https://countries.trevorblades.com",
    uri: "/api/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;