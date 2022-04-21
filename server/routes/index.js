const router = require("express").Router();
const authRoutes = require("./auth");
const categoryRoutes = require("./category");
const tagRoutes = require("./tag");
const noteRoutes = require("./note");

const authenticate = require("../middleware/authenticate");

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/categories", authenticate, categoryRoutes);
router.use("/api/v1/tags", authenticate, tagRoutes);
router.use("/api/v1/notes", authenticate, noteRoutes);

module.exports = router;
