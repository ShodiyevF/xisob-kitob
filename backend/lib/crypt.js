class Crypt {
	constructor({ random }) {
		this.randomNumber = random
	}

	getCharCode (array) {
		return array.split('').map( char =>  char.charCodeAt() )
	}

	convertBinary (array) {
		return array.map( num => num.toString(2).padStart(8, 0) )
	}

	convertDecimal (array) {
		return array.map( num => parseInt(num, 2) )
	}

	convertChar (array) {
		return array.map( num => String.fromCharCode(num) )
	}

	finalCrypt (letters) {
		let result = ''
		for(let l of letters) {
			result += this.randomLetter(this.randomNumber) + l
		}
		return result
	}

	removeRandomLetters (token) {
		let letters = ''
		for(let i = this.randomNumber; i < token.length; i+= this.randomNumber + 1) {
			letters += token[i]
		}
		return letters
	}

	randomLetter (num) {
		let str = ''
		for(let i = 1; i <= num; i++) {
			let random = Math.random() * (122 - 65) + 65 | 0
			let letter = this.convertChar([random])
			str += letter[0]
		}
		return str
	}

	changeLast () {
		return this.binaries.map( num => {
			let changed = num[num.length - 1] === '0' ? 1 : 0
			return num.slice(0, num.length - 1) + changed
		})
	}

	crypt(word) {
		this.word = word
		this.charCodes = this.getCharCode(this.word)
		this.binaries = this.convertBinary(this.charCodes)
		this.changedBinaries = this.changeLast(this.binaries)
		this.decimals = this.convertDecimal(this.changedBinaries)
		this.letters = this.convertChar(this.decimals)
		return this.finalCrypt(this.letters)
	}

	decrypt(token) {
		this.word = token
		this.parsedLetters = this.removeRandomLetters(this.word)
		this.charCodes = this.getCharCode(this.parsedLetters)
		this.binaries = this.convertBinary(this.charCodes)
		this.changedBinaries = this.changeLast(this.binaries)
		this.decimals = this.convertDecimal(this.changedBinaries)
		return this.convertChar(this.decimals).join('')
	}
}

let instance = new Crypt({ random: 5 })

module.exports = { instance }

