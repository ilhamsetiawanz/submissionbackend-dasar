const { nanoid } = require('nanoid');
const books = require('./book');

const bookPush = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku.',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount.',
    });
    response.code(400);
    return response;
  }

  if (!author || !publisher) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama pengarang dan penerbit.',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(20);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    name, year, author, summary, publisher, pageCount, readPage, insertedAt, updatedAt, id,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan.',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku.',
  });
  response.code(500);
  return response;
};

const bookGet = () => ({
  status: 'success',
  data: {
    books,
  },
});

const bookGetById = (request, h) => {
  const { id } = request.params.id;

  const book = books.filter((bookz) => bookz.id === id)[0];

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
    message: 'Buku tidak ditemukan.',
  });
  response.code(404);
  return response;
};

const booksRemove = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(204);
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
  bookPush,
  bookGet,
  bookGetById,
  booksRemove,
};