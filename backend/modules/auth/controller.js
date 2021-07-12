const authModel = require('./model.js')
const { instance } = require('../../lib/crypt.js')

const REGISTER = (req, res) => {
	try {
		let buffer = ''
		req.on('data', (data) => buffer += data)
		req.on('end', () => {

			let newUser = authModel.insert( JSON.parse( buffer.toString() ) )
			if(newUser) {
				res.writeHead(201, { 'Content-Type': 'application/json' })
				return res.end(JSON.stringify({ 
					message: 'The data created!', 
					username: newUser.username, 
					userId: newUser.id, 
					token: instance.crypt(JSON.stringify({ userId: newUser.id })) 
				}))
			} else {
				res.writeHead(400, { 'Content-Type': 'application/json' })
				return res.end(JSON.stringify({ 
					message: 'The user already exists!', 
					username: null, 
					userId: null, 
					token: null
				}))
			}
		})
	} catch (error) {
		res.statusCode = 400
		return res.end('An error occured!')
	}
}

const LOGIN = (req, res) => {
	try {
		let buffer = ''
		req.on('data', (data) => buffer += data)
		req.on('end', () => {

			let user = authModel.login( JSON.parse( buffer.toString() ) )
			if(user) {
				res.writeHead(201, { 'Content-Type': 'application/json' })
				return res.end(JSON.stringify({ 
					message: 'The user logged in!', 
					username: user.username, 
					userId: user.id, 
					token: instance.crypt(JSON.stringify({ userId: user.id })) 
				}))
			} else {
				res.writeHead(400, { 'Content-Type': 'application/json' })
				return res.end(JSON.stringify({ 
					message: 'Wrong Username or Password!', 
					username: null, 
					userId: null, 
					token: null
				}))
			}
		})
	} catch (error) {
		res.statusCode = 400
		return res.end('An error occured!')
	}
}


module.exports = { REGISTER, LOGIN }
