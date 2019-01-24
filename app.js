const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const User = require('./models/user')

const seedDB = require('./seeds')

const indexRoute = require('./routes/index')
const campgroundRoute = require('./routes/campgrounds')
const commentRoute = require('./routes/comments')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/node_modules`))
app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(session({
  secret: 'yelpcamp',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

// @ts-ignore
passport.use(new LocalStrategy(User.authenticate()))
// @ts-ignore
passport.serializeUser(User.serializeUser())
// @ts-ignore
passport.deserializeUser(User.deserializeUser())

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true })

seedDB()

app.use('/', indexRoute)
app.use('/campgrounds', campgroundRoute)
app.use('/campgrounds/:id/comments', commentRoute)

app.listen('3000', () => {
  console.log('Server is running at localhost:3000')
})
