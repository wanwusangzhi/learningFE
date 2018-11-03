const port = 3000
const http2 = require('spdy')
const express = require('express')
const fs = require('fs');
const path = require('path')

const app = express()

// 设置主页 
// 首页引入main.js，加载时间比访问/pushy时push main2.js时长要长。
app.get('/', function(req, res) {
	const indexHtml = fs.readFileSync('./index.html')
	res.send(indexHtml.toString())
})

// 推送资源
app.get('/pushy', (req, res) => {
	var stream = res.push('/main.js', {
		status: 200,
		method: 'GET',
		request: {
			accept: '*/*'
		},
		response: {
			'content-type': 'application/javascript'
		}
	})
	stream.on('error', () => {
		console.error('stream error')
	})
	stream.end(fs.readFileSync('./main.js'))
	// res.end("<script src='/main.js'></script>")
	res.end(fs.readFileSync('./index.html'))
})
app.use(express.static(path.join(__dirname, './')))

const options = {
    key: fs.readFileSync(__dirname + '/key/server.key'),
    cert: fs.readFileSync(__dirname + '/key/server.crt')
}

http2
  	.createServer(options, app)
	.listen(port, function(error) {
  	if (error) {
  		console.error('error')
  		return process.exit(1)
  	} else {
  		console.log("server is listening on %s", port)
  	}
})









