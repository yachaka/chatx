
const isUrl = require('is-url')
const chalk = require('chalk')
const history = require('connect-history-api-fallback')
const webpack = require('webpack')
const webpackConfig = require('../internals/webpack/webpack.dev.config.js')

/* Servers */
const _r = require('rethinkdbdash')()
const r = _r.db('chatx')
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server, { serveClient: false })

/* Middlewares */
const session = require('express-session')
const sharedsession = require('express-socket.io-session')

const cookieParser = require('cookie-parser')()
const sessionMiddleware = session({
  secret: 'ChatX === SpaceX',
  resave: true,
  saveUninitialized: true,
})

/* DB */
const models = require('./db')

/* Startup */
server.listen(3000, (err) => {
  if (err) {
    console.error(chalk.red('App server: Error occured :'), err)
  } else {
    console.log(`${chalk.blue('App served at')} ${chalk.magenta('http://localhost:3000/')} ${chalk.green('✓')}`)
  }
})

/*******
 * Webpack 
 * Serve index.html and bundle
 */
const compiler = webpack(webpackConfig)

app
  .use(cookieParser)
  .use(sessionMiddleware)
  .use(history())
  // Webpack dev server + hot reloading
  .use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true,
    },
  }))
  .use(require('webpack-hot-middleware')(compiler))

/*******
 * Socket.io
 */
const sessions = {}

io.use(sharedsession(sessionMiddleware, cookieParser, {
    autoSave:true
}))

io.on('connection', (socket) => {
  /* We push the socket as a client socket, identified by shared session ID */
  if (!sessions[socket.handshake.sessionID]) {
    sessions[socket.handshake.sessionID] = {
      rooms: {}
    }
  }

  let user = socket.handshake.session.user

  /* If user is stored in session, we hydrate client */
  if (user) {
    socket.emit('updateViewer', socket.handshake.session.user)
  }

  socket.on('login', ({ username, password }, cb) => {
    r.table('users').filter({ username, password }).run()
      .then(users => {
        if (!users[0])
          return cb(error('Invalid credentials'))
        socket.handshake.session.user = user = users[0]
        socket.handshake.session.save()
        cb(success(users[0]))
      })
  })
  socket.on('register', ({ avatar, username, password }, cb) => {
    if (!isUrl(avatar))
      return cb(error('Avatar must be an URL'))
    if (username === '' || password === '')
      return cb(error('All fields are required'))

    models.User.create(avatar, username, password)
      .then(res => cb(success(res)))
  })
  socket.on('logout', (_, cb) => {
    if (user) {
      if (socket.room)
        models.Room.leaveRoom(socket.room, user.id)

      socket.handshake.session.user = user = null
      socket.handshake.session.save()
      cb(success(null))
    }
  })

  
  socket.on('reply', ({ body, roomId }) => {
    if (user) {
      models.Message.create(body, user.id)
        .then(res => models.Room.addMessagesToRoom(roomId, res.generated_keys))
    }
  })

  let typingTimeout

  socket.on('typing', typing => {
    if (user) {
      if (typingTimeout)
        clearTimeout(typingTimeout)
      models.User.setTyping(typing, user.id)
      if (typing)
        typingTimeout = setTimeout(() => {
          models.User.setTyping(false, user.id)
        }, 1000)
    }
  })

  socket.on('createRoom', (roomName) => {
    if (user) {
      models.Room.create(
        roomName,
        user.id
      )
    }
  })

  socket.on('join', (roomId) => {
    if (user) {
      if (socket.room) {
        models.Room.leaveRoom(socket.room, user.id)
      }
      socket.room = roomId
      models.Room.joinRoom(socket.room, user.id)
    }
  })

  socket.on('leave', (roomId) => {
    if (user) {
      socket.room = null
      models.Room.leaveRoom(roomId, user.id)
    }
  })

  /*
   * Live queries
   */
  const handleCursor = (event) => (err, cursor) => {
    if (err)
      throw err
    cursor.each((err, data) => {
      socket.emit(event, data)
    })
  }
  const liveEmitFor = (table, eventName) => r.table(table).changes({ includeInitial: true, includeStates: true }).run(handleCursor(eventName))

  let cursors = []
  cursors.push(liveEmitFor('rooms', 'updateRoom'))
  cursors.push(liveEmitFor('users', 'updateUser'))
  cursors.push(liveEmitFor('messages', 'updateMessage'))

  socket.on('disconnect', () => {
    if (socket.room && user)
      models.Room.leaveRoom(socket.room, user.id)
    cursors.forEach(cursor => cursor.close && cursor.close())
  })
})

/* Utils */
function success(data) {
  return { data }
}

function error(error) {
  return { error }
}