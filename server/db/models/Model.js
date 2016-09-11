
class Model {
  constructor() {
    this.nextId = 1
    this.data = []
  }

  getAll() {
    return Promise.resolve(this.data)
  }

  getByIds(ids) {
    return Promise.resolve(ids.map(id => this.data.find(data => data.id == id)))
  }

  getBy(by) {
    return Promise.resolve(
      this.data.filter(user => {
        for (let key in by) {
          if (user[key] !== by[key])
            return false
        }
        return true
      })
    )
  }

  create(data) {
    console.log('Data being created: ', data)
    return new Promise((r, j) => {
      data.id = this.nextId++
      this.data.push(data)
      r(data)
    })
  }

  update(id, fn) {
    let item = this.data.find(room => room.id == id)
    fn(item)
    return Promise.resolve(item)
  }
}

module.exports = Model
