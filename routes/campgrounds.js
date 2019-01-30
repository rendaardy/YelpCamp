const express = require('express')
const Campground = require('../models/campground')
const middleware = require('../middleware')

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

router.post('/', middleware.isLoggedIn, (req, res) => {
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

router.get('/new', middleware.isLoggedIn, (req, res) => {
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

router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      res.redirect('/campgrounds')
    } else {
      res.render('campgrounds/edit', { campground: foundCampground })
    }
  })
})

router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.updateOne({ _id: req.params.id }, req.body.campground, (err, updatedCampground) => {
    if (err) {
      res.redirect('/campgrounds')
    } else {
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})

router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.redirect('/campgrounds')
    } else {
      res.redirect('/campgrounds')
    }
  })
})

module.exports = router
