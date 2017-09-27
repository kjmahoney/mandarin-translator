const mongoose = require('./connection');

const wordSchema = new mongoose.Schema({
  English: String,
  Chinese: String,
  Pinyin: String
});

module.exports = {
  Word: mongoose.model('Word', wordSchema)
}
