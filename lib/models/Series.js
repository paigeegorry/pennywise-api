const mongoose = require('mongoose');

const seriesSchema = mongoose.Schema({
  title: String,
  medium: String,
  directedBy: String,
  producedBy: [String],
  writtenBy: [String],
  starring: [String],
  musicBy: String,
  distributedBy: String,
  releaseDate: String,
  runningTime: String,
  budget: String,
  case: Object,
  photos: [String]
});

module.exports = mongoose.model(seriesSchema, 'Series');
