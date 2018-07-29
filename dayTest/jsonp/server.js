// 引用express
let express = require('express')
// 实例对象
var app = express()
// 路由
app.get('/jsonp', function(req, res) {
	console.log(req.query)
	res.send(req.query.callback+ "({'person': {'name': 'HappyStudy', 'age': 23}})")
})

// 启动服务
var server = app.listen(80, function() {
	var host = server.address().address
	var port = server.address().port
	console.log('server is running in http://%s:%s', host, port)
})