const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Campground = require('./models/campground')
const Comment = require('./models/comment')

const seedDB = require('./seeds')

app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/node_modules`))
app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({
  extended: true
}))

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true })

seedDB()

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, items) => {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/index', {
        campgrounds: items
      })
    }
  })
})

app.post('/campgrounds', (req, res) => {
  let name = req.body.name
  let image = req.body.image
  let desc = req.body.description
  let newCampground = { name: name, image: image, description: desc }

  Campground.create(newCampground, (err, item) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/campgrounds')
    }
  })
})

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new')
})

app.get('/campgrounds/:id', (req, res) => {
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

app.get('/campgrounds/:id/comments/new', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', {
        campground: campground
      })
    }
  })
})

app.post('/campgrounds/:id/comments', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err)
        } else {
          campground.comments.push(comment)
          campground.save()
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
    }
  })
})

app.listen('3000', () => {
  console.log('Server is running at localhost:3000')
})
