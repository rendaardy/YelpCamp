const Campground = require('../models/campground')
const Comment = require('../models/comment')

module.exports = {
  checkCampgroundOwnership: function (req, res, next) {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.id, (err, foundCamp) => {
        if (err) {
          res.redirect('back')
        } else {
          if (foundCamp.author.id.equals(req.user._id)) {
            return next()
          } else {
            res.redirect('back')
          }
        }
      })
    } else {
      res.redirect('back')
    }
  },

  checkCommentOwnership: function (req, res, next) {
    if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
          res.redirect('back')
        } else {
          if (foundComment.author.id.equals(req.user._id)) {
            next()
          } else {
            res.redirect('back')
          }
        }
      })
    } else {
      res.redirect('back')
    }
  },

  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }

    res.redirect('/login')
  }
}
