const expanseModel = require('./model.js')

const GET = (req, res) => {
	try {
		console.log("get bo'ldi")
		res.writeHead(200, { 'Content-Type': 'application/json', 'Set-Cookie': 'mycookie=test' })
		return res.end( expanseModel.fetchAll() )
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
			let newExpanse = expanseModel.insert( JSON.parse( buffer.toString() ) )
			res.writeHead( 201, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify({ message: 'The data created!', body: newExpanse }))
		})
	} catch(error) {
		res.statusCode = 400
		return res.end('An error occured!')
	}
}

const DELETE = (req, res) => {
	try {
		let buffer = ''
		req.on('data', (data) => buffer += data)
		req.on('end', () => {
			let deleted = expanseModel.del( JSON.parse( buffer.toString() ) )
			res.writeHead( 200, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify({ message: 'The data deleted!', body: deleted }))
		})
	} catch(error) {
		res.statusCode = 400
		return res.end(JSON.stringify({ message: error.message }))
	}
}


module.exports = { GET, POST, DELETE }
