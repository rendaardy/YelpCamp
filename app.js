const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const Campground = require('./models/campground')
const Comment = require('./models/comment')
const User = require('./models/user')

const seedDB = require('./seeds')

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

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
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

app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
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

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
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

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  // @ts-ignore
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      return res.render('register')
    }

    let localAuth = passport.authenticate('local')
    localAuth(req, res, () => {
      res.redirect('/campgrounds')
    })
  })
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), (req, res) => {

})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/campgrounds')
})

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

app.listen('3000', () => {
  console.log('Server is running at localhost:3000')
})
