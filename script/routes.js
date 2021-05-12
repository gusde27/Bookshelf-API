const { 
    addBookAPI,
    getAllBooksAPI,
    getBookDetailAPI,
    editBookAPI,
} = require('./booksController');

const routes = [
//   {
//     method: 'POST',
//     path: '/notes',
//     handler: () => {},
//   },
  // add book
  {
    method: 'POST',
    path: '/books',
    handler: addBookAPI,
  },
  //get all books
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksAPI,
  },
  //get book detail
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookDetailAPI,
  },
  //get book detail
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookAPI,
  },
];

module.exports = routes;