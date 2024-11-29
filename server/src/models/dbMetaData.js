const mongoose = require('mongoose');

const metaDataSchema = new mongoose.Schema({
  lastClientId: {
    type: Number,
    required: true,
    default: 0,
  },
  lastCommandId: {
    type: Number,
    required: true,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

const MetaData = mongoose.model('MetaData', metaDataSchema);

module.exports = MetaData;
