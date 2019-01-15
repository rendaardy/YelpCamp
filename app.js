const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  const campgrounds = [
    { name: 'Salmon Creek', image: '' },
    { name: 'Granite Hill', image: '' },
    { name: 'Mountain Goat\'s Rest', image: '' }
  ]

  res.render('campgrounds', {
    campgrounds: campgrounds
  })
})

app.listen('3000', () => {
  console.log('Server is listening at localhost:3000')
})
