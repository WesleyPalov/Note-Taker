const router = require("express").Router()
const database = require("../db/db.json")
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('../uuid');


const util = require('util');
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
//http://localhost:3001/api/notes
router.get('/', (req, res) => {
    console.info(`${req.method} request received`);
  //  console.log(database)
readFromFile(JSON.stringify(database), "utf8").then((data)=>console.log(data)    )



 //readFromFile(database).then((data) => res.json(JSON.parse(data)));
  });
  
  // POST Route for a new note
  router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
       title,
       text,
       id: uuid(),
      };
  
      readAndAppend(newNote, database);
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });
  
  // DELETE Route for a specific note
  router.delete('/id/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile(database)
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((text) => text.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile(database, result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });
  
  module.exports = router;