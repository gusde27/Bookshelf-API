const books = require("./books");
const { nanoid } = require('nanoid');

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
} = JSON.parse(request.payload);

  const id = nanoid(16); //for id
  const insertedAt = new Date().toISOString(); //for date
  const updatedAt = insertedAt; //for date
  
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

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

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

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  
  response.code(500);
  return response;
};

//Get all books
const getAllBooksAPI = () => ({
    status: 'success',
    data: {
      books,
    },
  });


//Get Book Detail By Id
const getBookDetailAPI = (request, h) => {
  const { id } = request.params;
  
  const book = books.filter((n) => n.id === id)[0];
  
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
};

//edit book by id
const editBookAPI = (request, h) => {
  const { id } = request.params;
 
  const { 
    name, 
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = JSON.parse(request.payload);
  
  const updatedAt = new Date().toISOString();
 
  const index = books.findIndex((book) => book.id === id);

  //console.log(index.readPage);
  // if (readPage > pageCount) {
    
  //   const response = h.response({
  //     status: 'fail',
  //     message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
  //   });
  //   response.code(400);
  //   return response;
  // }
 
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
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

//delete book
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
 
module.exports = {
  addBookAPI,
  getAllBooksAPI,
  getBookDetailAPI,
  editBookAPI,
  deleteBookAPI,
};