const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 30,
	},
});

const Category = model("Category", categorySchema);
module.exports = Category;
