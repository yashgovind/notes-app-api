const express = require("express");
const auth = require("../Middlewares/auth");
const router = express.Router();
const {
  addNotes,
  getAllNotes,
  deleteNotesById,
  deleteAllNotes,
} = require("../Controllers/Notes");

// routers for get , post , put requests here .

router.post("/", auth, addNotes); // path is "/"
router.get("/", auth, getAllNotes); // path is "/"
router.delete("/:id", auth, deleteNotesById); // path is "/"
router.delete("/", auth, deleteAllNotes);

module.exports = router;
