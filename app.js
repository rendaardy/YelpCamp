const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')

const campgrounds = [
  {
    name: 'Salmon Creek',
    image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'
  },
  {
    name: 'Granite Hill',
    image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'
  },
  {
    name: 'Mountain Goat\'s Rest',
    image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg'
  },
  {
    name: 'Salmon Creek',
    image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'
  },
  {
    name: 'Granite Hill',
    image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'
  },
  {
    name: 'Mountain Goat\'s Rest',
    image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg'
  },
  {
    name: 'Salmon Creek',
    image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'
  },
  {
    name: 'Granite Hill',
    image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'
  },
  {
    name: 'Mountain Goat\'s Rest',
    image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg'
  }
]

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', {
    campgrounds: campgrounds
  })
})

app.post('/campgrounds', (req, res) => {
  let name = req.body.name
  let image = req.body.image
  let newCampground = { name: name, image: image }

  campgrounds.push(newCampground)
  res.redirect('/campgrounds')
})

app.get('/campgrounds/new', (req, res) => {
  res.render('new')
})

app.listen('3000', () => {
  console.log('Server is listening at localhost:3000')
})
