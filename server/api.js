
const chalk = require('chalk')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const Schema = require('./schema')
const api = express()

const User = require('./db/models/User')

api
  .use(cors({
    origin: 'http://localhost:8080',
    credentials: true
  }))
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(session({ secret: 'ChatX == SpaceX', resave: false, saveUninitialized: true }))
  .use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true,
    pretty: true,
  }))

  /* Auth */
  .get('/me', (req, res) => res.send(req.session.user || null))
  .post('/login', (req, res) => {
    User.getBy({
      username: req.body.username,
      password: req.body.password,
    })
    .then(users => {
      if (users.length === 0)
        throw new Error('User not found')
      if (users.length === 1) {
        console.log(users[0])
        req.session.user = users[0]
      }
      res.status(200).send(users[0])
    })
    .catch(e => res.status(401).send())
  })
  .listen(8081, (err) => {
    if (err) {
      console.error(chalk.red('API server: Error occured :'), err)
    } else {
      console.log(`${chalk.blue('API listening on')} ${chalk.magenta('http://localhost:8081/graphql')} ${chalk.green('✓')}`)
    }
  })
