const express = require('express')
const Campground = require('../models/campground')

const router = express.Router()

router.get('/', (req, res) => {
  Campground.find({}, (err, items) => {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/index', {
        campgrounds: items,
        currentUser: req.user
      })
    }
  })
})

router.post('/', isLoggedIn, (req, res) => {
  let name = req.body.name
  let image = req.body.image
  let desc = req.body.description
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newCampground = { name: name, image: image, description: desc, author: author }

  Campground.create(newCampground, (err, item) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/campgrounds')
    }
  })
})

router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new')
})

router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampgrounds) => {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/show', {
        campground: foundCampgrounds
      })
    }
  })
})

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

module.exports = router
