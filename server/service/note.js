const Note = require("../models/Note");

const findNotes = () => {
	return Note.find();
};

const findNoteByProperty = (key, value) => {
	if (key === "_id") {
		return Note.findById(value);
	}
	return Note.findOne({ [key]: value });
};

const createNote = async ({ user, name }) => {
	const note = new Note({
		user,
		name,
	});
	return note.save();
};

module.exports = {
	findNotes,
	findNoteByProperty,
	createNote,
};
