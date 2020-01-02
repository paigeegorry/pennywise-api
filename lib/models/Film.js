const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
  directedBy: String,
  producedBy: [String], // it chapter two is a string
  screenplayBy: [String], // fix it chapter two to match
  basedOn: String,
  musicBy: String,
  releaseDates: String,
  runningTime: String,
  distributedBy: String,
  country: String,
  title: String,
  medium: String,
  cast: Object,
  photos: [String]
});

module.exports = mongoose.model(filmSchema, 'Film');
