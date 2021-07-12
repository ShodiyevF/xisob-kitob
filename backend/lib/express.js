class Express {
	constructor(req, res) {
		this.req = req
		this.res = res
	}

	get(path, callback) {
		if(this.req.url === path && this.req.method === "GET") {
			callback(this.req, this.res)
		}
	}

	post(path, callback) {
		if(this.req.url === path && this.req.method === "POST") {
			callback(this.req, this.res)
		}
	}

	delete(path, callback) {
		if(this.req.url === path && this.req.method === "DELETE") {
			callback(this.req, this.res)
		}
	}
}


module.exports = Express
