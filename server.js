const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');


const PORT = 3001;
const app = express();
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('Public'));
// We can send a body parameter to the client using the res.send() method. This body parameter can be a string, buffer, or even an array.
 //GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/Public/index.html'))
);

// GET Route for note taker page
app.get('/krylov', (req, res) =>
  res.sendFile(path.join(__dirname, '/Public/pages/notes.html'))
);

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */


// GET Route for retrieving all the notes
app.get('/api/db', (req, res) => {
  console.info(`${req.method} request received`);
  readFromFile('./develop/db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
app.post('/api/db', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { username, topic, tip } = req.body;

  if (req.body) {
    const newNote = {
      username,
      tip,
      topic,
      tip_id: uuid(),
    };

    readAndAppend(newNote, './develop/db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});







app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
