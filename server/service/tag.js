const Tag = require("../models/Tag");

const findTags = (userId) => {
	return Tag.find({ user: userId });
};

const findTagByProperty = (key, value) => {
	if (key === "_id") {
		return Tag.findById(value);
	}
	return Tag.findOne({ [key]: value });
};

const tagDetail = (tagId, userId) => {
	return Tag.findOne({ _id: tagId, user: userId });
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
	tagDetail,
	createTag,
};
