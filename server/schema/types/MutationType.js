
const graphql = require('graphql')

const User = require('../../db/models/User')
const Message = require('../../db/models/Message')
const Room = require('../../db/models/Room')

module.exports = new graphql.GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',

  fields: () => ({

    register: {
      type: require('./UserType'),
      args: {
        username: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
      },
      resolve: (_, args) => User.create(args)
    },

    createRoom: {
      type: require('./RoomType'),
      args: {
        name: { type: graphql.GraphQLString },
      },
      resolve: (_, args) => Room.create({
        name: args.name,
        messages: [],
        users: []
      })
    },

    sendMessage: {
      type: require('./RoomType'),
      args: {
        roomID: { type: graphql.GraphQLID },
        body: { type: graphql.GraphQLString },
      },
      resolve: (_, args, req) => {
        if (!req.session.user)
          return new Error('Not authentified')
        return Message.create({
          body: args.body,
          userId: req.session.user.id
        })
          .then(msg => {
            return Room.update(args.roomID, room => {
              room.messages = room.messages.concat([msg.id])
            })
          })
      }
    }
  })
})