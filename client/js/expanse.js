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

async function expanse() {
    const expanse = await request("/expanse")

	console.log(expanse);
    
    console.log(expanse);
    
    expanse.forEach(element => {
        let [ tr, th, thh, thhh, thhhh, thhhhh, btn] = createElement('tr', 'th', 'th', 'th', 'th', 'th', 'button')        
        let test = 0
        th.textContent = element.id
        thh.textContent = element.purpose
        thhh.textContent = element.cost
        thhhh.textContent = element.date
        
        thhhhh.classList.add('test')
        thhhhh.appendChild(btn)
        btn.textContent = "O'chirish"
        btn.classList.add('btn', 'x-btn')
        btn.setAttribute('id', element.id)

		btn.onclick = async () => {
			request('/expanse', 'DELETE', {
				id: element.id
			})
		}
        
        tr.appendChild(th)
        tr.appendChild(thh)
        tr.appendChild(thhh)
        tr.appendChild(thhhh)
        tr.appendChild(thhhhh)
        
        elTable.appendChild(tr)

        
    });
}

elForm.addEventListener('submit', async function (evt) {
    evt.preventDefault()
    
    if (elsumma.value === '' && elmaqsad.value === '') {
        
    } else{
        
        
        let incomeData = {
            purpose: elmaqsad.value,
            cost: elsumma.value,
        }
        
        let response = await request('/expanse', 'POST', incomeData)
        
        if (response.status === 200) {
            income()
        }
        
        elsumma.value = ''
        elmaqsad.value = ''
    } 
})

expanse()