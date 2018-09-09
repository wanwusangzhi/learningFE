# generator理解与运用

#### 一 generator理解与运用 20180801
> [测试用例](https://github.com/wanwusangzhi1992/WebStudy/blob/master/dayTest/commonTest/generator.html)

```
<!DOCTYPE html>
<html>
<head>
	<title>generator</title>
</head>
<body>

</body>
<script type="text/javascript">
	// 斐波那契数列
	// 0, 1, 1, 2, 3, 5, 8, 13...
	function fib(max) {
		var a = 0,
			b = 1,
			arr = [0, 1]
		for ( ;arr.length < max; ) {
			[a, b] = [b, a+b]
			arr.push(b)
		}
		console.log(arr)
	}
	fib(10)
	fib(12)

	function* fibByGenerator(max) {
		var a = 0,
			b = 1
		// 方法一
		// var i = 0
		// for (; i < max;) {
		// 	console.log(a)
		// 	yield a; // 注意要加上逗号
		// 	[a, b] = [b, a+b]
		// 	i++
		// 	// var t = b;
		// 	// b = a + b
		// 	// a = t;
		// }
		// 方法二
		var n = 0
		while (n < max) {
			yield a; // 注意要加逗号
			[a, b] = [b, a+b]
			n++
		}
		return 
	}
	var fg = fibByGenerator(10);
	console.log(fg)
	console.log(fg.next())
	console.log(fg.next())
	console.log(fg.next())
	console.log(fg.next())
	console.log(fg.next())
	console.log(fg.next())
	var fg2 = fibByGenerator(10);
	for (var item of fg2) {
		console.log(item)
	}

	// 实现迭代
	var k = [1, [2, 3], [[4, 5], [6, 7], 8], 9]
	var flat = function(item) {
		for (var i = 0; i < item.length; i++) {
			if (typeof item[i] !== 'number') {
				flat(item[i])
			} else {
				console.log(item[i])
			}
		}
	}
	flat(k)
	// 通过generator
	var flatGenerator = function* (item){
		var i = 0;
		while(i < item.length) {
			if (typeof item[i] !== 'number') {
				yield* flatGenerator(item[i])
			} else {
				yield item[i]
			}
			i++
		}
	}
	var fgK = flatGenerator(k)
	for (var k of fgK) {
		console.log(k)
	}

	// yield* 理解， 即generator嵌套generator
	function* foo() {
		yield 2;
		yield 3;
	}
	function* bar() {
		yield 1;
		yield* foo();
		yield 4;
	}
	var barObj = bar()
	console.log(barObj.next())
	for( var item of barObj) {
		console.log('item', item)
	}

	// 实现next
	function gen(array) {
		var nextIndex = 0;
		return {
			next: function() {
				return nextIndex < array.length ? {value: array[nextIndex++], done: false} : {value:undefined, done: true}
			}
		}
	}
	var generator = gen([1,2,3,4])
	console.log(generator.next())
	console.log(generator.next())
	console.log(generator.next())


	var itObj = {
	    0:"00",
	    1:"11",
	    2:"22",
	    3:"33",
	    length : 4,
	    [Symbol.iterator]() {
	        const _this = this;
	        let index = 0;
	        return {
	            next() {
	                if(index< _this.length) {
	                    return {
	                        value : _this[index++],
	                        done : false
	                    }
	                }else{
	                    return {
	                        value : undefined,
	                        done : true
	                    }
	                }
	            }
	        }
	    }
	};
	console.log([...itObj]);

	function* foo(x) {
		debugger
	    var y = 2 * (yield (x + 1));
		debugger
	    var z = yield (y / 3);
		debugger
	    return (x + y + z);
	}

	// var a = foo(5);
	// a.next() // Object{value:6, done:false}
	// a.next() // Object{value:NaN, done:false}
	// a.next() // Object{value:NaN, done:true}

	var b = foo(5);
	console.log(b.next()) // { value:6, done:false }
	// b.next(12) // { value:8, done:false }
	// b.next(13) // { value:42, done:true }

</script>
</html>
```