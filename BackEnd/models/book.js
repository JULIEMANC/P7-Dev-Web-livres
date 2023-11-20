const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  // imageUrl: {
  //   type: String,
  // },
  // year: {
  //   type: Number,
  // },
  // genre: {
  //   type: String,
  // },
  // ratings: [
  //   {
  //     userId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true,
  //     },
  //     grade: {
  //       type: Number,
  //       required: true,
  //     },
  //   }
  // ],
  // averageRating: {
  //   type: Number,
  // },
});

module.exports = mongoose.model('Book', bookSchema);