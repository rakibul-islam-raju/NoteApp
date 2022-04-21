const error = require("../utils/error");
const tagService = require("../service/tag");

const postTag = async (req, res, next) => {
	const { name, color } = req.body;
	const user = req.user._id;

	try {
		const tag = await tagService.createTag({
			user,
			name,
			color,
		});
		return res.status(201).json(tag);
	} catch (e) {
		next(e);
	}
};

const getTag = async (req, res, next) => {
	const userId = req.user._id;

	try {
		const data = await tagService.findTags(userId);
		return res.status(200).json(data);
	} catch (e) {
		next(e);
	}
};

const getTagById = async (req, res, next) => {
	const { tagId } = req.params;
	const userId = req.user._id;

	try {
		const tag = await tagService.tagDetail(tagId, userId);
		if (!tag) throw error("Tag not found!", 404);
		return res.status(200).json(tag);
	} catch (e) {
		next(e);
	}
};

const patchTagById = async (req, res, next) => {
	const { tagId } = req.params;
	const { name, color } = req.body;

	try {
		const tag = await tagService.findTagByProperty("_id", tagId);

		if (!tag) {
			throw error("Tag not found", 404);
		}

		if (tag.user !== req.user._id) throw error("Permission denied", 400);

		tag.name = name ?? tag.name;
		tag.color = color ?? tag.color;
		await tag.save();

		return res.status(200).json(tag);
	} catch (e) {
		next(e);
	}
};

const deleteTagById = async (req, res, next) => {
	const { tagId } = req.params;

	try {
		const tag = await tagService.findTagByProperty("_id", tagId);

		if (!tag) {
			throw error("Tag not found", 404);
		}

		if (tag.user !== req.user._id) throw error("Permission denied", 400);

		await tag.remove();
		return res.status(203).send();
	} catch (e) {
		next(e);
	}
};

module.exports = {
	postTag,
	getTag,
	getTagById,
	patchTagById,
	deleteTagById,
};
