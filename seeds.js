const Campground = require('./models/campground')
const Comment = require('./models/comment')

const data = [
  {
    name: 'Cloud\'s Rest',
    image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, explicabo fugit tempora animi libero officiis sunt minus facere, cupiditate, saepe eligendi deleniti. Pariatur commodi ullam maxime dignissimos laboriosam aliquam cupiditate sequi? Porro, ipsa. Ad, quas error adipisci neque labore aut ullam laudantium! Dolore dignissimos, nisi quidem obcaecati placeat, eaque laborum saepe velit, animi praesentium optio id esse hic! Quia maiores molestias mollitia, magnam aliquid itaque quas totam vitae non eligendi facere repellendus! Reiciendis totam tempora veniam, animi fuga praesentium officiis soluta ex ratione unde facere excepturi quis non corporis enim voluptatem mollitia eligendi dicta suscipit quasi nemo rerum voluptatibus adipisci? Dicta temporibus iusto sunt? Nihil voluptate voluptates accusamus doloremque, laborum dolorem voluptatum adipisci, aliquam necessitatibus dolorum placeat velit cupiditate quod. Facilis ducimus voluptatem laborum illum doloribus unde at aperiam, aliquam possimus dignissimos reprehenderit incidunt corrupti, quibusdam nobis minus consequatur harum hic, qui aut numquam? Similique possimus facilis quidem sapiente exercitationem?'
  },
  {
    name: 'Desert Mesa',
    image: 'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, explicabo fugit tempora animi libero officiis sunt minus facere, cupiditate, saepe eligendi deleniti. Pariatur commodi ullam maxime dignissimos laboriosam aliquam cupiditate sequi? Porro, ipsa. Ad, quas error adipisci neque labore aut ullam laudantium! Dolore dignissimos, nisi quidem obcaecati placeat, eaque laborum saepe velit, animi praesentium optio id esse hic! Quia maiores molestias mollitia, magnam aliquid itaque quas totam vitae non eligendi facere repellendus! Reiciendis totam tempora veniam, animi fuga praesentium officiis soluta ex ratione unde facere excepturi quis non corporis enim voluptatem mollitia eligendi dicta suscipit quasi nemo rerum voluptatibus adipisci? Dicta temporibus iusto sunt? Nihil voluptate voluptates accusamus doloremque, laborum dolorem voluptatum adipisci, aliquam necessitatibus dolorum placeat velit cupiditate quod. Facilis ducimus voluptatem laborum illum doloribus unde at aperiam, aliquam possimus dignissimos reprehenderit incidunt corrupti, quibusdam nobis minus consequatur harum hic, qui aut numquam? Similique possimus facilis quidem sapiente exercitationem?'
  },
  {
    name: 'Canyon Floor',
    image: 'https://farm3.staticflickr.com/2562/3753652224_7ab88a28df.jpg',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, explicabo fugit tempora animi libero officiis sunt minus facere, cupiditate, saepe eligendi deleniti. Pariatur commodi ullam maxime dignissimos laboriosam aliquam cupiditate sequi? Porro, ipsa. Ad, quas error adipisci neque labore aut ullam laudantium! Dolore dignissimos, nisi quidem obcaecati placeat, eaque laborum saepe velit, animi praesentium optio id esse hic! Quia maiores molestias mollitia, magnam aliquid itaque quas totam vitae non eligendi facere repellendus! Reiciendis totam tempora veniam, animi fuga praesentium officiis soluta ex ratione unde facere excepturi quis non corporis enim voluptatem mollitia eligendi dicta suscipit quasi nemo rerum voluptatibus adipisci? Dicta temporibus iusto sunt? Nihil voluptate voluptates accusamus doloremque, laborum dolorem voluptatum adipisci, aliquam necessitatibus dolorum placeat velit cupiditate quod. Facilis ducimus voluptatem laborum illum doloribus unde at aperiam, aliquam possimus dignissimos reprehenderit incidunt corrupti, quibusdam nobis minus consequatur harum hic, qui aut numquam? Similique possimus facilis quidem sapiente exercitationem?'
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
