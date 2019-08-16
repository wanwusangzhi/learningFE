# flatten实现

## flatten实现 20190816
> [测试用例](https://github.com/wanwusangzhi/WebStudy/blob/master/dayTest/commonTest/flatten.html)

```
<!DOCTYPE html>
<html>
<head>
	<title>Flatten</title>
</head>
<body>

</body>
<script type="text/javascript">
	var flatten = (arr) => {

		var res = [];
		for(var i = 0; i< arr.length; i++) {
			if (Object.prototype.toString.call(arr[i]).slice(8,-1) === "Array") {
				res = res.concat(flatten(arr[i]));
	    	} else {
				res.push(arr[i]);
			}
		
		}
		return res;
	}
	var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
	console.log('flatten', flatten(arr))
	console.log(new Set(flatten(arr)))
	// window.onbeforeunload = function() {
	// 	debugger
	// 	console.error('1')
	// }
</script>
</html>
```