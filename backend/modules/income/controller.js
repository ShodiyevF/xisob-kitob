const incomeModel = require('./model.js')

const GET = (req, res) => {
	try {
		res.writeHead(200, { 'Content-Type': 'application/json' })
		return res.end( incomeModel.fetchAll() )
	} catch(error) {
		res.statusCode = 400
		return res.end('An error occured!')
	}
}

const POST = (req, res) => {
	try {
		let buffer = ''
		req.on('data', (data) => buffer += data)
		req.on('end', () => {
			let newIncome = incomeModel.insert( JSON.parse( buffer.toString() ) )
			res.writeHead(201, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify({ message: 'The data created!', body: newIncome }))
		})
	} catch (error) {
		res.statusCode = 400
		return res.end('An error occured!')
	}
}

const DELETE = (req, res) => {
	try {
		let buffer = ''
		req.on('data', (data) => buffer += data)
		req.on('end', () => {
			let deleted = incomeModel.del( JSON.parse( buffer.toString() ) )
			res.writeHead( 200, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify({ message: 'The data deleted!', body: deleted }))
		})
	} catch(error) {
		res.statusCode = 400
		return res.end(JSON.stringify({ message: error.message }))
	}
}



module.exports = { GET, POST, DELETE }
