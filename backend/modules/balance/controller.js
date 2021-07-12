const balanceModel = require('./model.js')

const GET = (req, res) => {
	try {
		res.writeHead(200, { 'Content-Type': 'application/json' })
		return res.end( JSON.stringify( balanceModel.balance() ) )
	} catch(error) {
		res.statusCode = 400
		return res.end('An error occured!')
	}
}


module.exports = { GET }
