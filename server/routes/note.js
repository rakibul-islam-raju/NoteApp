const router = require("express").Router();
const {
	postNote,
	getNotes,
	getNoteById,
	patchNoteById,
	deleteNoteById,
} = require("../controller/note");

router.get("/", getNotes);
router.post("/", postNote);
router.get("/:noteId", getNoteById);
router.patch("/:noteId", patchNoteById);
router.delete("/:noteId", deleteNoteById);

module.exports = router;
