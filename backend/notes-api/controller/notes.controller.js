const { v4: uuidv4 } = require("uuid");
const { readNotes, writeNotes } = require("../utils/fileHelper");

/*
CREATE NOTE
*/
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const notes = await readNotes();

    const newNote = {
      id: uuidv4(),
      title,
      content: content || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    notes.push(newNote);

    await writeNotes(notes);

    res.status(201).json({
      success: true,
      data: newNote,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
GET ALL NOTES
*/
const getAllNotes = async (req, res) => {
  try {
    const notes = await readNotes();

    notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    res.json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
SEARCH NOTES
*/
const searchNotes = async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase() || "";

    const notes = await readNotes();

    const result = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
GET SINGLE NOTE
*/
const getSingleNote = async (req, res) => {
  try {
    const notes = await readNotes();

    const note = notes.find((n) => n.id === req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.json({
      success: true,
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
UPDATE NOTE
*/
const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const notes = await readNotes();

    const index = notes.findIndex((n) => n.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    notes[index] = {
      ...notes[index],
      title,
      content,
      updatedAt: new Date().toISOString(),
    };

    await writeNotes(notes);

    res.json({
      success: true,
      data: notes[index],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
DELETE NOTE
*/
const deleteNote = async (req, res) => {
  try {
    const notes = await readNotes();

    const filtered = notes.filter((n) => n.id !== req.params.id);

    if (filtered.length === notes.length) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    await writeNotes(filtered);

    res.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  searchNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};
