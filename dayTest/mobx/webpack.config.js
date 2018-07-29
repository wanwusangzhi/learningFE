const path = require('path')

const config = {
	mode: "development",
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js?' + new Date().getTime()
	}
}

module.exports = config
