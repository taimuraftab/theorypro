const Question = require('../models/Question');

exports.getCategories = async (req, res) => {
  try {
    const all = await Question.find();
    const categoryMap = {};

    all.forEach(q => {
      const category = q.category.trim();
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    const categories = Object.entries(categoryMap).map(([category, count]) => ({ category, count }));
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load categories' });
  }
};

exports.getQuestionsByCategory = async (req, res) => {
  try {
    const categoryParam = decodeURIComponent(req.params.category).toLowerCase();
    const all = await Question.find();

    let filtered;
    if (categoryParam === 'random') {
      filtered = all.sort(() => Math.random() - 0.5).slice(0, 50);
    } else {
      filtered = all
        .filter(q => q.category.trim().toLowerCase() === categoryParam)
        .sort(() => Math.random() - 0.5);
    }

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load questions for category' });
  }
};
