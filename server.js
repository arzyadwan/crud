const Hapi = require('@hapi/hapi');

const server = Hapi.server({
  port: 3000, // Choose the desired port number
  host: 'localhost', // Set the host address
});

// Define routes and implement CRUD operations here
let books = []; // Sample data store

// Create a new book
server.route({
  method: 'POST',
  path: '/books',
  handler: (request, h) => {
    const { title, author } = request.payload;
    const newBook = { title, author };
    books.push(newBook);
    return h.response(newBook).code(201);
  },
});

// Read all books
server.route({
  method: 'GET',
  path: '/books',
  handler: (request, h) => {
    return h.response(books);
  },
});

// Read a specific book
server.route({
  method: 'GET',
  path: '/books/{id}',
  handler: (request, h) => {
    const { id } = request.params;
    const book = books[id];
    if (book) {
      return h.response(book);
    } else {
      return h.response().code(404);
    }
  },
});

// Update a book
server.route({
  method: 'PUT',
  path: '/books/{id}',
  handler: (request, h) => {
    const { id } = request.params;
    const { title, author } = request.payload;
    const book = books[id];
    if (book) {
      book.title = title;
      book.author = author;
      return h.response(book);
    } else {
      return h.response().code(404);
    }
  },
});

// Delete a book
server.route({
  method: 'DELETE',
  path: '/books/{id}',
  handler: (request, h) => {
    const { id } = request.params;
    const book = books[id];
    if (book) {
      books.splice(id, 1);
      return h.response().code(204);
    } else {
      return h.response().code(404);
    }
  },
});


async function startServer() {
  try {
    await server.start();
    console.log('Server running on', server.info.uri);
  } catch (err) {
    console.error('Error starting server:', err);
  }
}

startServer();
