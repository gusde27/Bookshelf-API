const { 
    addBookAPI,
    getAllBooksAPI,
    getBookDetailAPI,
    editBookAPI,
    deleteBookAPI,
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
  //edit book
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookAPI,
  },
  //delete Book
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookAPI,
  },
];

module.exports = routes;