
import request from 'superagent-use'

request.use(require('superagent-promise-plugin'))
request.use(require('superagent-prefix')('http://localhost:8081'))
request.use((request) => request.withCredentials())
export default request