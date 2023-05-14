const { bookPush } = require('./handler');
const { bookGet } = require('./handler');
const { bookGetById } = require('./handler');
const { booksRemove } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/book',
    handler: bookPush,
  },
  {
    method: 'GET',
    path: '/book',
    handler: bookGet,
  },
  {
    method: 'GET',
    path: '/book/{id}',
    handler: bookGetById,
  },
  {
    method: 'DELETE',
    path: '/book/{id}',
    handler: booksRemove,
  },
];

module.exports = routes;