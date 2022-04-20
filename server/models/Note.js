const { model, Schema } = require("mongoose");

const noteSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
	},
	rag: {
		type: Schema.Types.ObjectId,
		ref: "Rag",
	},
	title: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 50,
	},
	body: {
		type: String,
		required: true,
		minlength: 50,
	},
});

const Note = model("Note", noteSchema);
module.exports = Note;
