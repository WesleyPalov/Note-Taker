const { text } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');

// Helper method for generating unique ids
const uuid = require('./Develop/uuid');


const PORT = 3001;
const app = express();
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('Public'));
// We can send a body parameter to the client using the res.send() method. This body parameter can be a string, buffer, or even an array.
 //GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);

// GET Route for note taker page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/notes.html'))
);

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */ 
const writeToFile = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
  err ? console.error(err) : console.info(`\nData written to ${destination}`)
);


/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */


const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
  
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};







// GET Route for retrieving all the notes
app.get('/api/db', (req, res) => {
  console.info(`${req.method} request received`);
  readFromFile('./develop/db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
app.post('/api/db', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
     title,
     text,
     id: uuid(),
    };

    readAndAppend(newNote, './Develop/db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

// DELETE Route for a specific note
app.delete('/api/db/id/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./develop/db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((text) => text.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./develop/db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
