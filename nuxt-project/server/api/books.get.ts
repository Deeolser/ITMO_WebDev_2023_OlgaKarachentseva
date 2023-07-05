import gql from "graphql-tag";

const query = gql`
  query GetBooks($limit: Int!, $offset: Int!) {
    books(limit: $limit, offset: $offset) {
      id
      title
      imageLink
    }
    books_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export default defineEventHandler(async (event) => {
  try {
    const { data } = await event.context.apolloClient.query({
      query,
      variables: { limit: 10, offset: 0 },
    });
    if (data?.books) {
      console.log(data?.books);
      return data.books;
    }
  } catch (e) {
    console.log(`> books > get: error = ${e}`);
  }
  return [];
});
