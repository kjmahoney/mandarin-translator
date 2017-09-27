const mongoose = require('./connection');

const wordSchema = new mongoose.Schema({
  english: String,
  chinese: String,
  pinyin: String
});

module.exports = {
  Word: mongoose.model('Word', wordSchema)
}
