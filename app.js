const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Campground = require('./models/campground')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true })

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, items) => {
    if (err) {
      console.log(err)
    } else {
      res.render('index', {
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
  res.render('new')
})

app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id, (err, item) => {
    if (err) {
      console.log(err)
    } else {
      res.render('show', {
        campground: item
      })
    }
  })
})

app.listen('3000', () => {
  console.log('Server is running at localhost:3000')
})
