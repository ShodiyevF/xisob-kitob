const fs = require('fs')
const path = require('path')


const insert = (user) => {
	try {
		const { username, password, email } = user
		let data = fs.readFileSync(path.join(process.cwd(), 'database', 'users.json'), 'UTF-8')
		let newUser
		if(!data) {
			data = []
			newUser = { id: 1, username, password, email }
		} else {
			data = JSON.parse(data)
			let found = data.find( user => user.username == username)
			if(!found) {
				let id = data.length ? data[data.length - 1].id + 1 : 1
				newUser = { id: id, username, password, email }
			} else return
		}
		data.push(newUser)
		fs.writeFileSync(path.join(process.cwd(), 'database', 'users.json'), JSON.stringify(data, null, 4))
		return newUser
	} catch(error) {
		throw error
	}
}

const login = (user) => {
	try {
		const { username, password } = user
		let data = fs.readFileSync(path.join(process.cwd(), 'database', 'users.json'), 'UTF-8')
		if(!data) return
		else {
			data = JSON.parse(data)
			let found = data.find( user => user.username == username && user.password == password)
			if(found) {
				return found
			} else return
		}
	} catch(error) {
		throw error
	}
}


module.exports = {
	insert,
	login
}
