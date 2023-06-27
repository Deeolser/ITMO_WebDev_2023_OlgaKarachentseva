import {defineStore} from 'pinia';
import {provideApolloClient, useLazyQuery, useMutation} from '@vue/apollo-composable';
import gql from 'graphql-tag';
import apolloClient from '@/apollo';

const {mutate: insertCommentToBook} = provideApolloClient(apolloClient)(() => useMutation(gql`
    mutation InsertComments($book_id: Int, $comment: String, $user_id: uuid!) {
        insert_comments(objects: {book_id: $book_id, comment: $comment, user_id: $user_id}) {
            affected_rows
            returning {
                book_id
                id
                comment
                created_at
                updated_at
                user_id
            }
        }
    }
`));

const queryBookDetailsWithCommentsById = provideApolloClient(apolloClient)(() => useLazyQuery(gql`
    query GetBooks($id: Int!) {
        books_by_pk(id: $id) {
            id
            pages
            year
            author
            country
            imageLink
            language
            link
            title
            created_at
            updated_at
            comments {
                comment
                id
                user {
                    name
                }
            }
        }
    }
`));

export const useBooksStore = defineStore('books', {
    state: (): any => ({selectedBook: undefined, isSelectedBookLoading: true}),
    actions: {
        async loadBookDetailsWithCommentsById(id: string) {
            return new Promise((resolve) => {
                queryBookDetailsWithCommentsById.onResult((result) => {
                    if (!result.loading) {
                        this.selectedBook = result.data.books_by_pk;
                        this.isSelectedBookLoading = false;
                        resolve(result.data.books_by_pk);
                    }
                });
                queryBookDetailsWithCommentsById.load(null, {id});
            });
        },
        async insertCommentToBookFromUser(book_id: number, user_id: string, comment: string) {
            console.log('> userStore -> insertCommentToBook: ', {book_id, comment});
            return insertCommentToBook({book_id, user_id, comment});
        }
    },
    persist: false
});