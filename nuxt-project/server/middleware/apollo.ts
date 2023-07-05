import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: process.env.VITE_GRAPHQL_END_POINT,
    headers: {
      "x-hasura-admin-secret": process.env.VITE_GRAPHQL_ADMIN_SECRET ?? "",
    },
  }),
  cache: new InMemoryCache(),
});

export default defineEventHandler((event) => {
  // console.log(event.context);
  event.context.apolloClient = apolloClient;
});
