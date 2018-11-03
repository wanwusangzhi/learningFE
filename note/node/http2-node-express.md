# HTTP2 + Node + Express

#### 二  HTTP2 + Node + Express 实现 Server Push 20181103

> [代码链接](https://github.com/wanwusangzhi1992/WebStudy/tree/master/dayTest/serverpush) https://github.com/wanwusangzhi1992/WebStudy/tree/master/dayTest/serverpush 

#### http2
HTTP/2主要利用多路复用传输，头部压缩，服务端推送，可以减少网络延迟对性能带来的影响，优化首次访问速度，从而提高传输效率。

#### 步骤一 生成ssl证书
* 1 生成服务器私钥key
```
# 生成密码文件，省去输入密码
openssl genrsa -des3 -passout pass:123123 -out key/server.pass.key 2048
opensll rsa -passin pass:123123 -in key/server.pass.key -out key/server.key
```

* 2 生成证书请求文件CSR
```
openssl req -new -key key/server.key -out key/server.csr
```

* 3 生成证书
```
openssl x509 -req -days 3650 -in key/server.csr -signkey key/server.key -out key/server.crt
```

* 上述步骤生成证书，可以通过createkey.sh运行生成。

#### 步骤二 Node代码实现
* 1 新建项目，并安装spdy和express
```
npm init -y 
npm install spdy express --save 
```

* 2 根目录下新建index.js / main.js / index.html  

index.html

```
// index.html

<!DOCTYPE html>
<html>
<head>
    <title>test http2 web push</title>
</head>
<body>
	hello, server is running!
</body>
<script type="text/javascript" src="main.js"></script>
</html>
```

main.js
```
// main.js
console.log('main.js')
```

index.js
```
// index.js
const port = 3000
const spdy = require('spdy')
const express = require('express')
const path = require('path')
const fs = require('fs')

// 获取实例
const app = express()

// 创建路由
app.get('/', (req, res) => {
	// 获取首页文件，输入文件
	const tmpl = fs.readFileSync('./index.html')
	res.send(tmpl.toString())
})

// 静态资源处理
app.use(express.static(path.join(__dirname, './')))

// 获取证书
const options = {
	key: fs.readFileSync(__dirname + './key/server.key'),
	cert: fs.readFileSync(__dirname + './key/server.crt')
}

// 用证书创建服务
spdy.createServer(options, app)
	.listen(port, (error) => {
		if (error) {
			console.error('error', error)
		} else {
			console.log('server is listening on %s', port)
		}
	})
```

* 3 启动服务
```
node index.js
```

* 4 通过 https://127.0.0.1:3000 进行访问

因为我们创建的证书并没有经过CA机构认证，所以会提示页面不安全，点击继续访问即可。 查看网络请求协议可以看到网站使用了HTTP/2（h2）

#### 第一次分析
* index.html文件引用main.js, 通过network查看加载main.js资源能看到明显的请求等待时长  

#### 步骤三 实现server push
* 1 index.js中，实现访问/pushy

```
// 省略代码...
// 静态资源处理
app.use(express.static(path.join(__dirname, './')))

app.use('/pushy', (req, res) => {
	// 定义输入文件名
	var stream = res.push('main.js', {
		status: 200,
		method: 'GET',
		request: {
			accept: '*/*'
		},
		response: {
			'content-type': 'application/javascript'
		}
	})

	// 
	stream.on('error', () => {
		console.error('error', error)	
	})
	// 加载访问资源, 将资源文件作为流输出
	stream.end(fs.readFileSync('./main.js'))

	// 引入方式一 输入同名js
	// res.end("<script src='/main.js'></script>")

	// 引入方式二 index.html已引入main.js， 跟上述res.push('main.js') 同名，即可
	res.end(fs.readFileSync('./index.html'))
})

```

* 2 通过 https://127.0.0.1:3000/pushy 进行访问

通过network中initiator能够看到加载main.js为Push /pushy

#### 第二次分析
通过shift+ctrl+R多次刷新对比访问  
https://127.0.0.1:3000  
https://127.0.0.1:3000/pushy  

* 1 加载总时长分别为 25ms 14ms  

* 2 加载main.js耗时分别为 3ms 1ms 

* 3 加载main.j等待时长分别是 3ms 0.3ms (即资源绿色条部分)



















