const router = require("express").Router();
const authRoutes = require("./auth");
const categoryRoutes = require("./category");
const tagRoutes = require("./tag");
const noteRoutes = require("./note");

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/categories", categoryRoutes);
router.use("/api/v1/tags", tagRoutes);
router.use("/api/v1/notes", noteRoutes);

module.exports = router;
