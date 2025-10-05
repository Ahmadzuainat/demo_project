import Notes from "../models/Notes.js";

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Notes.create({ user: req.user._id, title, content });
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user._id });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Notes.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.title = title;
    note.content = content;
    await note.save();

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });

    await Notes.deleteOne({ _id: req.params.id, user: req.user._id });

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export { createNote, getNotes, updateNote, deleteNote };
