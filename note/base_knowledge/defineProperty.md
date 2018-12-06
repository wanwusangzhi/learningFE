# definePrototype理解之Vue、Vuex实现双向数据绑定

#### 二 definePrototype理解之Vue、Vuex实现双向数据绑定 20180729
> [测试用例](https://github.com/wanwusangzhi/WebStudy/blob/master/dayTest/commonTest/defineProperty.html)

```
<!DOCTYPE html>
<html>
<head>
	<title>defineProperty</title>
</head>
<body>
	<div>
		name: <input type="text" name="input1" id="input1" v-modal='state.person.name'>
		<span id="showText" v-modal='state.person.name'></span>
	</div>
	<div>
		color: <input type="text" name="input1" id="input2" v-modal='state.like.color'>
		<span id="showText" v-modal='state.like.color'></span>
	</div>
</body>
<script type="text/javascript">
	/**
	* 数据属性（数据描述符）
	*/
	Object.defineProperty(window, 'name', {
		configurable: false, // 是否可删
		writable: false, // 是否可重写
		enumerable: false,
		value: 'kimi'
	})
	console.log(window.name)
	delete window.name
	console.log(window.name)
	console.log(Object.getOwnPropertyDescriptor(window, 'name'))
	window.name = 'petter'
	console.log(window.name)
	// 当configurable为false时， 不能被重新修改， 下面的修改会报错
	// Object.defineProperty(window, 'name', {
	// 	configurable: false,
	// 	writable: true,
	// 	enumerable: false,
	// 	value: 'abc'
	// })
	var obj = {}
	Object.defineProperty(obj, 'name', {
		configurable: true,
		writable: false,
		enumerable: false,
		value: 'can rewrite'
	})
	console.log(obj.name)
	delete obj.name
	console.log(obj.name)
	Object.defineProperty(obj, 'name', {
		configurable: true,
		writable: true,
		enumerable: false, // 此时通过Object.keys没法打印出name属性
		value: 'rewrite'
	})
	console.log(obj.name)
	obj.name = 'rewrite again'
	console.log(obj.name)
	console.log(Object.keys(obj)) // 没有name属性， 因为enumerable为false
	Object.defineProperty(obj, 'name', {
		configurable: true,
		writable: true,
		enumerable: true,
		value: 'enumerable is true'
	})
	console.log(Object.keys(obj))

	/**
	* 访问器属性（访问器描述符）
	*/
	var obj2 = {}
	var obj_a_value
	Object.defineProperty(obj, 'a', {
		configurable: true,
		enumerable: true,
		get: function() {
			console.log('coming get function', arguments)
			return obj_a_value
		},
		set: function(newVal) {
			console.log('coming set function', newVal, arguments)
			obj_a_value = newVal
		}
	})
	console.log(Object.getOwnPropertyDescriptor(obj, 'a'))
	console.log(obj.a)
	obj.a = 1
	console.log(obj.a)
	delete obj.a
	console.log(obj.a)

	/**
	* 简单例子实现双向数据绑定
	*/
	// 定义初始化数据
	var state = {
		person: {
			name: 'kimi',
			age: 10
		},
		like: {
			color: [123]
		}
	}

	/**
	* 回调页面数据， 所以增减了
	* 定义watch方法
	* 类似遍历页面所有的v-modal标签
	*/
	function watch() {
		function _render(htmlObjs, _key) {
			for (var i = htmlObjs.length - 1; i >= 0; i--) {
				let htmlObj = htmlObjs[i]
				let keys = htmlObj.attributes['v-modal'].value.split('.')
				let top = keys.shift()
				let retStr = keys.reduce((acc, val) => {return acc += `["${val}"]`}, '')
				top += retStr
				retStr = top
				// 通过eval函数赋值
				htmlObj[_key] = eval(retStr)
			}
		}
		let htmlObjs = document.getElementsByTagName('span')
		_render(htmlObjs, 'innerHTML')

		htmlObjs = document.getElementsByTagName('input')
		_render(htmlObjs, 'value')
	}
	/**
	* 重写访问器描述
	*/
	function createProperty(state) {
		// 这里是关键， 遍历所有属性， 对象数据类型则遍历，调用set时，直接改变数据value = newVal
		typeof state === 'object' && Object.keys(state).forEach(key => {
			let value = state[key] 
			// 上面这步是关键，通过对象数据获取到值，在绑定前先把值取到，在get中return该值，
			// 切不能通过对象数据拿值, 会造成重复取值
			Object.defineProperty(state, key, {
				configurable: false,
				enumerable: true,
				get: function() {
					console.log('create get --------', key, value)
					return value
				},
				set: function(newVal) {
					console.log('set --------', newVal)
					// 这里是关键，不能通过state[key] = newVal进行赋值，对象数据类型为引用传递，指向内存地址，
					// 只能通过基本数据类型修改，即值传递（String, Number, null, undefined, Boolean）
					value = newVal
					// 数据变化时， 重新绑定， 针对的是对象数据变化，基本数据不操作，通过typeof处理
					createProperty(value)
					// 刷新页面
					render()
				}
			})
			// 迭代
			createProperty(state[key])
		})
	}
	function vuex(state) {
		this.state = state
	}
	// 原型链
	vuex.prototype.use = function() {
		// 通过访问器绑定
		createProperty(this.state)
	}
	new vuex(state).use()

	/**
	* 监听数据变化， 实现双向绑定的效果
	*/
	var input1 = document.getElementById('input1')
	var input2 = document.getElementById('input2')
	input1.addEventListener('input', function() {
		state.person.name = this.value
	})

	input2.addEventListener('input', function() {
		state.like.color = this.value.split(',')
	})

	// 进入页面看到数据渲染的效果，
	function render() {
		watch()
	}
	render()
</script>
</html>


```