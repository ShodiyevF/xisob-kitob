const fs = require('fs')
const path = require('path')

const balance = () => {
	try {
		let income = fs.readFileSync(path.join(process.cwd(), 'database', 'income.json'), 'UTF-8')
		let expanse = fs.readFileSync(path.join(process.cwd(), 'database', 'expanse.json'), 'UTF-8')
		income = income ? JSON.parse(income) : []
		expanse = expanse ? JSON.parse(expanse) : []

		let totalExpanse = expanse.reduce( (acc, ex) => acc + +ex.cost, 0)
		let totalIncome = income.reduce( (acc, ex) => acc + +ex.cost, 0)
		let totalMoney = totalIncome - totalExpanse
		return { totalIncome, totalExpanse, totalMoney }
	} catch(error) {
		throw error
	}
}

module.exports = {
	balance
}
