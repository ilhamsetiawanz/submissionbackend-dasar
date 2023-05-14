const express = require('express');
const routes = require('./router');

const app = express();

const port = 5000;

app.use(express.json()); // mengaktifkan parsing body request dengan format JSON

app.use(routes); // menambahkan routes sebagai middleware pada aplikasi Express

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
