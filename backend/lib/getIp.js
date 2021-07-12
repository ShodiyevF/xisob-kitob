const getIPAddress = () => {
	const { networkInterfaces } = require('os')
	const nets = networkInterfaces()
	for (const name of Object.keys(nets)) {
	    for (const net of nets[name]) {
	        if (net.family === 'IPv4' && !net.internal) {
	            return net.address
	        }
	        else if (net.family === 'IPv4' && net.internal) {
	        	return net.address
	        }
	    }
	}
}

module.exports = getIPAddress
