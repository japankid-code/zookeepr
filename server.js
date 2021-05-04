const express = require('express');
const { animals } = require('./data/animals')
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// these routes read the index.js file by default

const PORT = process.env.PORT || 3001;

const app = express();

// MIDDLEWARE parse incoming string or array database
app.use(express.urlencoded({ extended: true }));
// MIDDLEWARE parse incoming JSON datas sent thru POST request
app.use(express.json());
// MIDDLEWARE serves up all files in public
app.use(express.static('public'));
// MIDDLEWARE for informing the app about routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
})
