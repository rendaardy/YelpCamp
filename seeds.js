const Campground = require('./models/campground')
const Comment = require('./models/comment')

const data = [
  {
    name: 'Cloud\'s Rest',
    image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg',
    description: 'Great camp site'
  },
  {
    name: 'Desert Mesa',
    image: 'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg',
    description: 'Great camp site'
  },
  {
    name: 'Canyon Floor',
    image: 'https://farm3.staticflickr.com/2562/3753652224_7ab88a28df.jpg',
    description: 'Great camp site'
  }
]

const commentData = [
  {
    text: 'This place is great but I wish there was internet',
    author: 'Homer'
  }
]

module.exports = function () {
  // Remove all campgrounds
  Campground.deleteMany({}, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('remove campgrounds')
      // Add a few campground
      data.forEach((seed) => {
        Campground.create(seed, (err, campground) => {
          if (err) {
            console.log(err)
          } else {
            console.log('added a campground')

            // Remove all comments
            Comment.deleteMany({}, (err) => {
              if (err) {
                console.log(err)
              } else {
                console.log('remove comments')
                // Add a few comment
                commentData.forEach((comment) => {
                  Comment.create(comment, (err, comment) => {
                    if (err) {
                      console.log(err)
                    } else {
                      campground.comments.push(comment)
                      campground.save()
                      console.log('Created a new comment')
                    }
                  })
                })
              }
            })
          }
        })
      })
    }
  })
}
