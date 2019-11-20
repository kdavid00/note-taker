var fs = require("fs");
const util = require("util");
const uuid = require('uuid/v4');


const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


module.exports = function(app) {

  app.get("/api/notes", async function(req, res) {

    const notes = await readFile("./db/db.json", "utf8");
    res.json(JSON.parse(notes));
   
  });
  
  app.post("/api/notes",async function(req, res) {
    let allNotes;
    //destructuring req.body
    const {title, text} = req.body;
    //generate random id with uuid npm package
    const id = uuid();
    //build our new note object
    const newNote = {title, text, id} 
    //reading db.json file
    const currentNotes = await readFile("./db/db.json", "utf8");
    //concatonate the arry from file we read to the allNotes array
    allNotes = [].concat(JSON.parse(currentNotes));
    //push our new note to the all Notes array
    allNotes.push(newNote);
    //write our new file with the allNotes array
    const notes  = await writeFile("./db/db.json", JSON.stringify(allNotes));
    
    //send all of our notes to the front end
    res.json(allNotes);
  });

  app.delete("/api/notes/:id", async function (req, res) {
    let currentNotes;
    const id = req.params.id;
    console.log(id);

    //reading db.json file
    const fileNotes = await readFile("./db/db.json", "utf8");
    //concatonate the arry from file we read to the allNotes array
    currentNotes = [].concat(JSON.parse(fileNotes));

    

  
  })
 
};

// get note info from req.body
// add a random id to the note
// read db.json - fs.readFile
// parse the string that we get from db.json - JSON.parse
// push new note into array we just parsed - array .push() method
// stringify array - JSON.stringify
// overwrite db.json with new array. - fs.writefile
// sendback response - res.send()