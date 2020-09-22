const express = require('express')
const router = express.Router()
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

const Movie = require('../models/movies')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')

router.get('/movies', requireToken, removeBlanks, (req, res, next) => {
  const userId = req.user._id
  Movie.find({ owner: userId })
    .populate('owner')
    .populate('reviews.owner')
    .then(movies => {
      return movies.map(movie => movie.toObject())
    })
    .then(movies => res.status(200).json({ movies }))
    .catch(next)
})

router.get('/movies/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Movie.findById(id)
    .populate('owner')
    .populate('reviews.owner')
    .then(movie => handle404(movie))
    .then(movie => res.json({ movie: movie.toObject() }))
    .catch(next)
})

router.post('/movies', requireToken, (req, res, next) => {
  req.body.movie.owner = req.user._id
  const movieData = req.body.movie
  Movie.create(movieData)
    .then(movie => res.status(201).json({ movie: movie.toObject() }))
    .catch(next)
})

router.patch('/movies/:id', requireToken, removeBlanks, (req, res, next) => {
  console.log(req.body)
  const id = req.params.id
  const movieData = req.body

  Movie.findById(id)
    .then(handle404)
    .then(movie => {
      requireOwnership(req, movie)
      return movie.updateOne(movieData)
    })
    .then(movie => res.status(200).json({ movie }))
    .catch(handle404)
})

router.delete('/movies/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Movie.findById(id)
    .then(movie => movie.deleteOne())
    .then(movie => res.sendStatus(204))
    .catch(next)
})

module.exports = router
