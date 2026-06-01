const express = require("express");
const router = express.Router();

const {
  createNote,
  getAllNotes,
  searchNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../controller/notes.controller");

router.post("/", createNote);
router.get("/", getAllNotes);
router.get("/search", searchNotes);
router.get("/:id", getSingleNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;