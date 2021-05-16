const books = require("./books");
const { nanoid } = require('nanoid');

// ====================== SAVE BOOK ===========================
//this method for save the book
const addBookAPI = (request, h) => {
  
  const { 
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
} = request.payload;

  const id = nanoid(16); //for id
  const insertedAt = new Date().toISOString(); //for date
  const updatedAt = insertedAt; //for date
  
  //this condition for boolean of page
  let finished = Boolean;
  if (pageCount === readPage) {
    finished = true;
  } else {
    finished = false;
  }

  const newBook = {
    name,
    year, 
    author, 
    summary, 
    publisher, 
    pageCount, 
    readPage, 
    reading, 
    id, // for id used nanoid
    finished, 
    insertedAt, 
    updatedAt,
  };

  //this condition for rule of page
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // this condition for check name = undefined
  if (newBook.name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  books.push(newBook); //add book

  const isSuccess = books.filter((book) => book.id === id).length > 0; //make var with id
  
  //check isSuccess
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  //return error on general
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  
  response.code(500);
  return response;
};
// ===================== END SAVE BOOK ======================

// ===================== GET ALL BOOK ======================
const getAllBooksAPI = (request, h) => {
  
  const { name, finished, reading } = request.query;

  if (name !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        books: books
          .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    });
    return response;
  }

  if (reading === '1') {
    const response = h.response({
      status: 'success',
      data: {
        books: books
          .filter((book) => book.reading === true)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    });
    return response;
  } 

  if (reading === '0') {
    const response = h.response({
      status: 'success',
      data: {
        books: books
          .filter((book) => book.reading === false)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    });
    return response;
  }

  if (finished === '1') {
    const response = h.response({
      status: 'success',
      data: {
        books: books
          .filter((book) => book.finished === true)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    });
    return response;
  } 
  
  if (finished === '0') {
    const response = h.response({
      status: 'success',
      data: {
        books: books
          .filter((book) => book.finished === false)
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    });
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
    },
  });
  return response;
};
// ===================== END GET ALL BOOK ======================

// ===================== GET DETAIL OF BOOK BY ID ======================
const getBookDetailAPI = (request, h) => {
  const { id } = request.params;
  
  const book = books.filter((n) => n.id === id)[0];
  
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  // id book not found
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
// ===================== END GET DETAIL OF BOOK BY ID ======================

// ===================== EDIT BOOK BY ID ======================
const editBookAPI = (request, h) => {
  const { id } = request.params;
  
  const { 
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);
  
  //for check readPage not bigger than pageCount
  if (readPage > pageCount) {
      const response = h.response({
      status: 'fail',
      message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  //for check id book (book available)
  if (index === -1) {
      const response = h.response({
      status: 'fail',
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  //for check name = undefined
  if (name === undefined) {
      const response = h.response({
      status: 'fail',
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
 
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  
  const response = h.response({
    status: 'error',
    message: 'Gagal memperbarui Buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
// ===================== END EDIT BOOK BY ID ======================

// ===================== DELETE BOOK BY ID ======================
const deleteBookAPI = (request, h) => {
  const { id } = request.params;
  
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
   status: 'fail',
   message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
// ===================== END DELETE BOOK BY ID ======================
 
module.exports = {
  addBookAPI,
  getAllBooksAPI,
  getBookDetailAPI,
  editBookAPI,
  deleteBookAPI,
};