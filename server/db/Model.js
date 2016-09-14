
const identity = require('identity-function')
const r = require('../r')

module.exports = class Model {

  constructor(table) {
    this.table = r.db('chatx').table(table)
  }

  create(data) {
    return this.table.insert(data).then(identity).catch(console.log)
  }
}