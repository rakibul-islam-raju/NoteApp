const Note = require("../models/Note");

const findNotes = (userId) => {
	return Note.find({ user: userId });
};

const findNoteByProperty = (key, value) => {
	if (key === "_id") {
		return Note.findById(value);
	}
	return Note.findOne({ [key]: value });
};

const noteDetail = (noteId, userId) => {
	return Note.findOne({ _id: noteId, user: userId });
};

const createNote = async ({ user, category, tag, title, body }) => {
	const note = new Note({
		user,
		category,
		tag,
		title,
		body,
	});
	return note.save();
};

module.exports = {
	findNotes,
	findNoteByProperty,
	noteDetail,
	createNote,
};
