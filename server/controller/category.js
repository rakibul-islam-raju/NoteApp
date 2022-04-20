const error = require("../utils/error");
const categoryService = require("../service/category");

const postCategory = async (req, res, next) => {
	const { user, name } = req.body;

	try {
		const category = await categoryService.createCategory({
			user,
			name,
		});
		return res.status(201).json(category);
	} catch (e) {
		next(e);
	}
};

const getCategory = async (req, res, next) => {
	try {
		const data = await categoryService.findCategories();
		return res.status(200).json(data);
	} catch (e) {
		next(e);
	}
};

const getCategoryById = async (req, res, next) => {
	console.log("cat get");
	const { categoryId } = req.params;

	try {
		const category = await categoryService.findCategoryByProperty(
			"_id",
			categoryId
		);
		if (!category) throw error("Category not found!", 404);
		return res.status(200).json(category);
	} catch (e) {
		next(e);
	}
};

const patchCategoryById = async (req, res, next) => {
	const { categoryId } = req.params;
	const { name } = req.body;

	try {
		const category = await categoryService.findCategoryByProperty(
			"_id",
			categoryId
		);

		if (!category) {
			throw error("Category not found", 404);
		}

		category.name = name ?? category.name;
		await category.save();

		return res.status(200).json(category);
	} catch (e) {
		next(e);
	}
};

const deleteCategoryById = async (req, res, next) => {
	const { categoryId } = req.params;

	try {
		const category = await categoryService.findCategoryByProperty(
			"_id",
			categoryId
		);

		if (!category) {
			throw error("Category not found", 404);
		}

		await category.remove();
		return res.status(203).send();
	} catch (e) {
		next(e);
	}
};

module.exports = {
	postCategory,
	getCategory,
	getCategoryById,
	patchCategoryById,
	deleteCategoryById,
};
