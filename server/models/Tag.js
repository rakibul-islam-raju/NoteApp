const { model, Schema } = require("mongoose");

const tagSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 30,
	},
	color: {
		type: String,
		minlength: 6,
		maxlength: 6,
	},
});

const Tag = model("Tag", tagSchema);
module.exports = Tag;
