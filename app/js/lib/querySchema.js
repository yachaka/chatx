
import EntitySchema from 'normalizr/lib/EntitySchema'
import IterableSchema from 'normalizr/lib/IterableSchema'

function forPublic(object, fn) {
  for (let k in object) {
    if (k.substr(0, 1) !== '_')
      fn(k)
  }
}

export default function querySchema(start, entities, schema) {
  let toReturn = null

  if (!start)
    return null
  if (typeof start === 'string') {

  } if (schema instanceof EntitySchema) {

    if (typeof start === 'object') {
      toReturn = {...start}

      forPublic(schema, (k) => {
        toReturn[k] = querySchema(start[k], entities, schema[k])
      })
    } else if (typeof start === 'string') {
      if (entities[schema._key])
        toReturn = querySchema(entities[schema._key][start], entities, schema)
    }
    
  } else if (schema instanceof IterableSchema) {
    toReturn = []
    let linkedEntities = entities[schema._itemSchema._key]

    start = start.filter((value, index, self) => self.indexOf(value) === index)
    start.forEach((id) => {
      linkedEntities && toReturn.push(querySchema(linkedEntities[id], entities, schema._itemSchema))
    })
  } else if (Array.isArray(schema)) {
    toReturn = []

    start.forEach(obj => {
      toReturn.push(querySchema(obj, entities, schema[0]))
    })
  }

  return toReturn
}