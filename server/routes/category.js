const router = require("express").Router();
const {
	postCategory,
	getCategory,
	getCategoryById,
	patchCategoryById,
	deleteCategoryById,
} = require("../controller/category");

router.get("/", getCategory);
router.post("/", postCategory);
router.get("/:categoryId", getCategoryById);
router.patch("/:categoryId", patchCategoryById);
router.delete("/:categoryId", deleteCategoryById);

module.exports = router;
