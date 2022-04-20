const Tag = require("../models/Tag");

const findTags = () => {
	return Tag.find();
};

const findTagByProperty = (key, value) => {
	if (key === "_id") {
		return Tag.findById(value);
	}
	return Tag.findOne({ [key]: value });
};

const createTag = async ({ user, name, color }) => {
	const tag = new Tag({
		user,
		name,
		color,
	});
	return tag.save();
};

module.exports = {
	findTags,
	findTagByProperty,
	createTag,
};
