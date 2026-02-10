const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: Number,
  category: String,
  question: String,
  image: String,
  options: [
    {
      label: String
    }
  ],
  correct_answer: String,
  explanation: String
});

module.exports = mongoose.model('Question', questionSchema);
