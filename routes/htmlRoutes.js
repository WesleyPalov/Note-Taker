const path = require('path');
const router = require("express").Router()



// We can send a body parameter to the client using the res.send() method. This body parameter can be a string, buffer, or even an array.
 //GET Route for homepage
 
 // GET Route for note taker page
 router.get('/notes', (req, res) =>
 res.sendFile(path.join(__dirname, '../public/notes.html'))
 );
 
 router.get('*', (req, res) =>
 res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = router;