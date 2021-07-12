const http = require('http')
const fs = require('fs')
const { host, PORT } = require('./config.js')
const Express = require('./lib/express.js')

// load modules
const expanseController = require('./modules/expanse/controller.js')
const incomeController = require('./modules/income/controller.js')
const balanceController = require('./modules/balance/controller.js')
const authController = require('./modules/auth/controller.js')

const server = http.createServer( (req, res) => {
	// CORS cross-origin-acsess-control
	res.setHeader("Access-Control-Allow-Origin", "*")
  	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  	res.setHeader("Access-Control-Allow-Methods", "*")
	if(req.method === 'OPTIONS') return res.end('200')

	const app = new Express(req, res)
	app.get('/balance', balanceController.GET)

	app.post('/register', authController.REGISTER)
	app.post('/login', authController.LOGIN)

	app.get('/expanse', expanseController.GET)
	app.post('/expanse', expanseController.POST)
	app.delete('/expanse', expanseController.DELETE)

	app.get('/income', incomeController.GET)
	app.post('/income', incomeController.POST)
	app.delete('/income', incomeController.DELETE)
})

server.listen(PORT, () => console.log("Server is running on http://" + host + ":" + PORT))
