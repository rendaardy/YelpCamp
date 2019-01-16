const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  const campgrounds = [{
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
  }]

  res.render('campgrounds', {
    campgrounds: campgrounds
  })
})

app.listen('3000', () => {
  console.log('Server is listening at localhost:3000')
})
