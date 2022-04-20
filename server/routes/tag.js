const router = require("express").Router();
const {
	postTag,
	getTag,
	getTagById,
	patchTagById,
	deleteTagById,
} = require("../controller/category");

router.get("/", getTag);
router.post("/", postTag);
router.get("/:tagId", getTagById);
router.patch("/:tagId", patchTagById);
router.delete("/:tagId", deleteTagById);

module.exports = router;
