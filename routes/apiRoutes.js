var fs = require("fs");
module.exports = function(app) {


  function readFile () {
    fs.readFile("./db/db.json", "utf8", function(error, data) {
      let currentNotes;

      if (error) {
        return console.log(error);
      }
      console.log(data);
      currentNotes = [].concat(JSON.parse(data));
    
      return currentNotes;
    
    });

  }
  app.get("/api/notes", function(req, res) {

   readfile();

  
   
  });
  
  app.post("/api/notes", function(req, res) {
    const newNote = req.body; 
    newNote.id = notes.length + 1; 
    notes.push(newNote);
    const notes_JSON = JSON.stringify(notes);
    fs.writeFile("./db/db.json"
    , notes_JSON
    , function(err){
      if(err) throw (err);       
      })
    res.json(notes);
  });
 
};

// get note info from req.body
// add a random id to the note
// read db.json - fs.readFile
// parse the string that we get from db.json - JSON.parse
// push new note into array we just parsed - array .push() method
// stringify array - JSON.stringify
// overwrite db.json with new array. - fs.writefile
// sendback response - res.send()