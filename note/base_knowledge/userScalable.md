# user-scalable=no 兼容问题

#### 一 user-scalable=no 兼容问题 20181112

> [测试用例](https://github.com/wanwusangzhi/WebStudy/blob/master/dayTest/userScalable/index.html)
```
<!DOCTYPE html>
<html>
<head>
  	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
	<title>user-scalable兼容</title>
</head>
<body>
	<h2>当user-scalable=no 不生效时，特别是在oppo、vivo原生浏览器，可以通过以下方式阻止放大与缩小</h2>
	<h3>一: 阻止手势放大与缩小操作</h3>
  	<div>
	window.addEventListener('touchstart', function (event) {
	    if(event.touches.length > 1) {
	      event.preventDefault()
	      return
	    }
  	}, { passive: false })
  	</div>
  	<h3>二: 阻止双击操作</h3>
  	<div>
	let lastTouchEnd = 0
	window.addEventListener(touchend', (event) => {
		const now = new Date().getTime()
		if (now - lastTouchEnc <= 300) {
			event.preventDefault()
		}
		lastTouchEnd = now;
	}, false)
	<h3>Css禁止双击效果</h3>
	<div>
	html, body {
  		touch-action: manipulation;
	}
	</div>
  	</div>
</body>
</html>
```