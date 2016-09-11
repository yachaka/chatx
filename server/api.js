
const chalk = require('chalk')
const express = require('express')
const graphqlHTTP = require('express-graphql')

const Schema = require('./schema')
const api = express()

api
  .use('/graphql', graphqlHTTP({ schema: Schema, graphiql: true, pretty: true }))
  .listen(8081, (err) => {
    if (err) {
      console.error(chalk.red('API server: Error occured :'), err)
    } else {
      console.log(`${chalk.blue('API listening on')} ${chalk.magenta('http://localhost:8081/graphql')} ${chalk.green('✓')}`)
    }
  })
