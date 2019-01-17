const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true })

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
})
const Campground = mongoose.model('Campground', campgroundSchema)

// Campground.create(
//   {
//     name: 'Mountain Goat\'s Rest',
//     image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg'
//   }, (err, item) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(item)
//     }
//   }
// )

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, items) => {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds', {
        campgrounds: items
      })
    }
  })
})

app.post('/campgrounds', (req, res) => {
  let name = req.body.name
  let image = req.body.image
  let newCampground = { name: name, image: image }

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

app.listen('3000', () => {
  console.log('Server is listening at localhost:3000')
})
