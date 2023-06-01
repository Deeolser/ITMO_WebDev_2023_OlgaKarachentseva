const ROUTES = {
  INDEX: '/',
  TODOS: '/todos',
  TODOS_ID: '/todos/:id',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  BOOKS: '/books',

};

const PUBLIC_PAGES = [ROUTES.INDEX, ROUTES.SIGNIN, ROUTES.SIGNUP];
export { PUBLIC_PAGES };
export default ROUTES;