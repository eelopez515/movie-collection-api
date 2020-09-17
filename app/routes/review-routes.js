const express = require('express')
const router = express.Router()

const Movie = require('../models/movies')
const handle404 = require('../../lib/custom_errors')

router.post('/reviews', (req, res, next) => {
  const reviewData = req.body.review

  const movieId = reviewData.movieId

  Movie.findById(movieId)

    .then(handle404)
    .then(movie => {
      movie.reviews.push(reviewData)

      return movie.save()
    })
    .then(movie => res.status(201).json({ movie }))
})
router.delete('/reviews/:id', (req, res, next) => {
  const reviewId = req.params.id
  console.log(reviewId)

  Movie.findOne({ 'reviews._id': reviewId })

    .then(handle404)
    .then(movie => {
      movie.reviews.id(reviewId).remove()

      return movie.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.patch('/reviews/:id', (req, res, next) => {
  const reviewId = req.params.id
  const reviewData = req.body.review

  Movie.findOne({ 'reviews._id': reviewId })
    .then(handle404)
    .then(movie => {
      const review = movie.reviews.id(reviewId)

      review.set(reviewData)

      return movie.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
