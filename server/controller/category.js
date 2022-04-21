const error = require("../utils/error");
const categoryService = require("../service/category");

const postCategory = async (req, res, next) => {
	const { name } = req.body;
	const user = req.user._id;

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
	const userId = req.user._id;

	try {
		const data = await categoryService.findCategories(userId);
		return res.status(200).json(data);
	} catch (e) {
		next(e);
	}
};

const getCategoryById = async (req, res, next) => {
	const { categoryId } = req.params;
	const userId = req.user._id;

	try {
		const category = await categoryService.categoryDetail(
			categoryId,
			userId
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

		if (category.user.toString() !== req.user._id.toString())
			throw error("Permission denied", 400);

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

		if (category.user.toString() !== req.user._id.toString()) {
			throw error("Permission denied", 400);
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
