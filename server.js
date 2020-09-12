var express = require("express");
var path = require("path");
var fs = require("fs");

var PORT = process.env.PORT || 3000;

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// GET
app.get("/api/notes", function (req, res) {
  const noteArray = JSON.parse(fs.readFileSync("db/db.json"));
  return res.json(noteArray);
});

// POST
app.post("/api/notes", (req, res) => {
  const noteArray = JSON.parse(fs.readFileSync("db/db.json"));
  const newNote = req.body;
  newNote.id = new Date();
  console.log(newNote);
  noteArray.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(noteArray));
  return res.json(noteArray);
});

// DELETE
app.delete("/api/notes/:id", function (req, res) {
  const noteArray = JSON.parse(fs.readFileSync("db/db.json"));
  console.log(req.params.id + "<= was deleted");
  var newNoteArray = noteArray.filter((note) => note.id !== req.params.id);
  fs.writeFileSync("db/db.json", JSON.stringify(newNoteArray));
  return res.json(newNoteArray);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
