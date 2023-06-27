import {IUser} from '@/interface';
import {defineStore} from 'pinia';
import {provideApolloClient, useMutation} from '@vue/apollo-composable';
import gql from 'graphql-tag';
import apolloClient from '@/apollo';

interface IUserState {
    user?: IUser
}

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

export const useUserStore = defineStore('user', {
    state: (): IUserState => ({user: undefined}),
    getters: {
        hasUser: (state): boolean => !!state.user?.name,
        userId: (state): string => state.user!.id,
    },
    actions: {
        setupUser(user: IUser) {
            console.log('> userStore -> setupUser: ', {user});
            this.user = user;
        },
        async insertCommentToBook(bookId: number, comment: string) {
            console.log('> userStore -> insertCommentToBook: ', {bookId, comment});
            return insertCommentToBook({book_id: bookId, user_id: this.userId, comment});
        }
    },
    persist: true
});