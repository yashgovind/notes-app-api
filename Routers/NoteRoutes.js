const express = require('express');
const router = express.Router();
const { addNotes,getAllNotes, deleteNotesById, deleteAllNotes} = require("../Controllers/Notes");

// routers for get , post , put requests here .

router.post("/", addNotes); // path is "/"
router.get("/", getAllNotes); // path is "/"
router.delete("/:id", deleteNotesById); // path is "/"
router.delete("/", deleteAllNotes);

module.exports = router;