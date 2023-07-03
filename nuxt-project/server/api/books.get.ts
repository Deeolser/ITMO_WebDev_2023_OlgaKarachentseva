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

export default defineEventHandler(async () => {
    const {data} = await useAsyncQuery(query, {limit: 10, offset: 0});
    if (data.value?.books) {
        // log response
        console.log(data.value?.books);
        return data.value?.books;
    }
    return [];
});