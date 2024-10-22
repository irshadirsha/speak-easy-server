const mongoose = require('mongoose');

const PdfFileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const PdfFile = mongoose.model('PdfFile', PdfFileSchema);

module.exports = PdfFile;
