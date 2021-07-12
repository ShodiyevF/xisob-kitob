const host = require('./lib/getIp.js')()
const PORT = process.env.PORT || 5000

module.exports = { host, PORT }