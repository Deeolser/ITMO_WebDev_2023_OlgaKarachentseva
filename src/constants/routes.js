const ROUTES = {
  INDEX: '/',
  BOOKS: '/books',
  SELECTED_BOOK: '/books/:id',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
};

const PUBLIC_PAGES = [ROUTES.INDEX, ROUTES.SIGNIN, ROUTES.SIGNUP];
export { PUBLIC_PAGES };
export default ROUTES;
