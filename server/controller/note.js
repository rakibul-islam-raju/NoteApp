const error = require("../utils/error");
const noteService = require("../service/note");

const postNote = async (req, res, next) => {
	const { category, tag, title, body } = req.body;
	const user = req.user._id;

	try {
		const note = await noteService.createNote({
			user,
			category,
			tag,
			title,
			body,
		});
		return res.status(201).json(note);
	} catch (e) {
		next(e);
	}
};

const getNotes = async (req, res, next) => {
	const userId = req.user._id;

	try {
		const data = await noteService.findNotes(userId);
		return res.status(200).json(data);
	} catch (e) {
		next(e);
	}
};

const getNoteById = async (req, res, next) => {
	const { noteId } = req.params;
	const userId = req.user._id;

	try {
		const note = await noteService.noteDetail(noteId, userId);
		if (!note) throw error("Note not found!", 404);
		return res.status(200).json(note);
	} catch (e) {
		next(e);
	}
};

const patchNoteById = async (req, res, next) => {
	const { noteId } = req.params;
	const { category, tag, title, body } = req.body;

	try {
		const note = await noteService.findNoteByProperty("_id", noteId);

		if (!note) {
			throw error("Note not found", 404);
		}

		if (note.user.toString() !== req.user._id.toString())
			throw error("Permission denied", 400);

		note.category = category ?? note.category;
		note.tag = tag ?? note.tag;
		note.title = title ?? note.title;
		note.body = body ?? note.body;
		await note.save();

		return res.status(200).json(note);
	} catch (e) {
		next(e);
	}
};

const deleteNoteById = async (req, res, next) => {
	const { noteId } = req.params;

	try {
		const note = await noteService.findNoteByProperty("_id", noteId);

		if (!note) {
			throw error("Note not found", 404);
		}

		if (note.user.toString() !== req.user._id.toString())
			throw error("Permission denied", 400);

		await note.remove();
		return res.status(203).send();
	} catch (e) {
		next(e);
	}
};

module.exports = {
	postNote,
	getNotes,
	getNoteById,
	patchNoteById,
	deleteNoteById,
};
