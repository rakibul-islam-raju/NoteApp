const Category = require("../models/Category");

const findCategories = () => {
	return Category.find();
};

const findCategoryByProperty = (key, value) => {
	if (key === "_id") {
		return Category.findById(value);
	}
	return Category.findOne({ [key]: value });
};

const createCategory = async ({ user, name }) => {
	const category = new Category({
		user,
		name,
	});
	return category.save();
};

module.exports = {
	findCategories,
	findCategoryByProperty,
	createCategory,
};
