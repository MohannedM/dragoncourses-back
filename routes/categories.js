const express = require("express");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const categoriesController = require("../controllers/categories");

router.get("/", isAuth, categoriesController.getCategories);

module.exports = router;