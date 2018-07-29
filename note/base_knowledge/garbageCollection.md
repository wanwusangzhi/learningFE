# garbageCollection

#### 四 garbageCollection 20180729
> [测试用例](https://github.com/wanwusangzhi1992/WebStudy/blob/master/dayTest/commonTest/testGarbageCollection.html)

```
<!DOCTYPE html>
<html>
<head>
	<title>test Garbage Collection</title>
</head>
<body>
	<button id="btn">create an event on click when window onload</button>
	<div id="_div">this value will be changed when you click the button</div>
</body>
<script type="text/javascript">
	var _btn = document.getElementById('btn')
	_btn.onclick = function() {
		console.log("button", _btn)
		_btn = null
		document.getElementById('_div').innerHTML = 'processing...'
	}
</script>
</html>
```