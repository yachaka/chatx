
import io from 'socket.io-client'
const socket = io(window.location.origin)

const oldEmit = socket.emit
socket.emit = (event, data) => (
  new Promise((resolve, reject) => {
    oldEmit.call(socket, event, data, res => {
      if (res.data !== undefined)
        resolve(res.data)
      else if (res.error)
        reject(res.error)
      else
        throw new Error('should never get here but hey:', res)
    })
  })
)

export default socket