const mongoose = require('mongoose')
const reviewSchema = require('./review')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String
  },
  releaseYear: {
    type: Number
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviews: [reviewSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Movie', movieSchema)
