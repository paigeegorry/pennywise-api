const mongoose = require('mongoose');

const flexibleType = mongoose.Schema.Types.Mixed;

const characterSchema = new mongoose.Schema({
  name: String,
  age: [String],
  status: String,
  born: [String],
  died: [String],
  gender: String,
  alsoKnownAs: [String],
  occupation: flexibleType,
  home: flexibleType,
  loyalty: flexibleType,
  portrayedBy: [String],
  photos: [String]
});

// Bill Denborough is off // portrayedBy is not a proper array and values/keys are mismatched

module.exports = mongoose.model(characterSchema, 'Character');
