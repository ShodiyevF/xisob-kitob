let elXarajat = document.querySelector(".xarajat")
let elDaromat = document.querySelector(".daromat")
let elJami = document.querySelector(".jami")
let elTable = document.querySelector(".info-wrapper")

let elForm = document.querySelector(".inputs")
let elmaqsad = document.querySelector(".maqsad")
let elsumma = document.querySelector(".summa")

function createElement(...array) {
	let storage = []
	for(let el of array) {
		let htmlElement = document.createElement(el)
		storage.push(htmlElement)
	}
	return storage
}

async function request (endpoint, method, data) {
	let response = await fetch('http://localhost:5000' + endpoint, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: data ? JSON.stringify(data) : null
	})
	return await response.json()
}


async function balance() {
    const balance = await request("/balance")

    console.log(balance);

    elXarajat.textContent = balance.totalExpanse
    elDaromat.textContent = balance.totalIncome
    elJami.textContent = balance.totalMoney
}




balance()