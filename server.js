
const express = require('express');


const api = require('./routes/index');
const htmlRoutes = require('./routes/htmlRoutes')



const PORT = process.env.PORT || 3001;
const app = express();
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/api', api);
app.use('/', htmlRoutes)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
