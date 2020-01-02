const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  author: String,
  coverArtist: [String],
  publisher: String,
  releaseDate: String,
  pages: String,
  title: String,
  medium: String,
  characters: [String],
  photos: [String]
});

module.exports = mongoose.model(bookSchema, 'Book');
