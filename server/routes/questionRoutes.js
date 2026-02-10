const express = require("express");
const router = express.Router();

const {
  getCategories,
  getQuestionsByCategory,
} = require("../controllers/questionController");

router.get("/categories", getCategories);
router.get("/questions/:category", getQuestionsByCategory);

module.exports = router;
