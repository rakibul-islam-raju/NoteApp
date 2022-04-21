const Category = require("../models/Category");

const findCategories = (userId) => {
	return Category.find({ user: userId });
};

const findCategoryByProperty = (key, value) => {
	if (key === "_id") {
		return Category.findById(value);
	}
	return Category.findOne({ [key]: value });
};

const categoryDetail = (categoryId, userId) => {
	return Category.findOne({ _id: categoryId, user: userId });
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
	categoryDetail,
	createCategory,
};
