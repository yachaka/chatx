
const r  = require('rethinkdbdash')()

r.dbDrop('chatx').run().then(go, go)

function go () {
  r.dbCreate('chatx').run()
    .then(() => {
      Promise.all([
        r.db('chatx').tableCreate('users'),
        r.db('chatx').tableCreate('rooms'),
        r.db('chatx').tableCreate('messages'),
      ])
      .then(() => {
        const Room = require('./Room')
        const User = require('./User')
        const Message = require('./Message')

        Promise.all([
          Room.create('Space X Room'),
          User.create(
            'http://www.jpost.com/HttpHandlers/ShowImage.ashx?ID=277701',
            'SpaceX',
            '123456'
          ),
          User.create(
            'http://blogs.timesofindia.indiatimes.com/wp-content/uploads/2015/12/mark-zuckerberg.jpg',
            'Mark Zuckerberg',
            '123456'
          ),
          User.create(
            'http://cdn.newsapi.com.au/image/v1/2dc0993f97ae68487b81afdfdb87d9ab',
            'Selena Gomez',
            '123456'
          )
        ]).then(() => process.exit(0))
      })
    })
}