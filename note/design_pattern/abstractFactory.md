## abstractFactory

### 模式的定义与特点

### js实现
```
<!DOCTYPE html>
<html>
<head>
	<title>AbstractFactory</title>
</head>
<body>

</body>
<script type="text/javascript">
	// 定义一个实例化函数，传入【抽象函数】与【待实现抽象函数的函数】。 
	function realizeImpl (abstractFn, implFn) {
		// 实例化需要实现的函数对象
		var implFn = new implFn()
		// 实例化抽象函数
		var abstractObj = new abstractFn()
		var unRealizeKey = []
		Object.keys(abstractObj).forEach(item => {
			if (!implFn.hasOwnProperty(item)) {
				unRealizeKey.push(item)
			}
		})
		var retFn = function () {}
		if (unRealizeKey.length) {
			// throw new Error('unRealizeKey: ' + unRealizeKey)
			console.warn(['unRealizeKey: '].concat(unRealizeKey).join(' '))
			retFn.prototype = abstractObj
			retFn = new retFn()
		} else {
			retFn.prototype = implFn
			retFn = new retFn()
		}
		return retFn
	}

	/**
	* 定义抽象类
	*/
	function interfaceColor() {
		// 抽象方法在这里定义，不能在prototype中实现
		// prototype可以被增加或覆盖。同时没法通过hasOwnProperty控制抽象方法
		this.color = function() {
			console.log('interface method of color need to realize')
		}
	}
	// 这个只是测试用
	interfaceColor.prototype.getColor = function() {}

	function blue() {
		this.color = function() {
			console.log('blue')
		}
	}
	// 开始实例 
	var blueImpl = realizeImpl(interfaceColor, blue)
	console.log('blueImpl', blueImpl)
	blueImpl.color() // blue

	// 同实现一个接口，跟颜色类似实现 
	function interfaceShape () {
		this.shape = function() {
			console.log('interface method of shape need to realize')
		}
	}
	// 定义一个实例化函数对象
	function rectangle() {
		// 重写抽象类函数
		this.shape = function () {
			console.log('rectangle')
		}
	}
	var rectangleImpl = realizeImpl(interfaceShape, rectangle)
	console.log('rectangleImpl', rectangleImpl)
	rectangleImpl.shape() // rectangle


	// 定义一个实例化函数对象
	function triangle() {
		// 重写抽象类函数, 没有重写的话，会提示未重写的抽象函数，同时函数调用到抽象方法
		this.shape1 = function () {
			console.log('rectangle')
		}
	}
	var triangleImpl = realizeImpl(interfaceShape, triangle)
	console.log('triangleImpl', triangleImpl)
	triangleImpl.shape() // interface method of shape need to realize

	// 实现抽象工厂
	function abstractFactory() {
		this.getColor = function() {}
		this.getShape = function() {}
	}
	// 抽象中间层
	var colorFactory = function () {
		this.getColor = function (color) {
			switch(color) {
				case 'blue': return realizeImpl(interfaceColor, blue)
			}
		}
		this.getShape = function() {}
	}
	// 抽象中间层
	var shapeFactory = function () {
		this.getColor = function () {}
		this.getShape = function(shape) {
			switch(shape) {
				case 'rectangle': return realizeImpl(interfaceShape, rectangle); 
				case 'triangle': return realizeImpl(interfaceShape, triangle); 
			}
		}
	}
	var FactoryProducer = function(type) {
		switch (type) {
			case 'shape': 
				return new shapeFactory();
			case 'color': 
				return new colorFactory();
		}
	}

	var abstractShapeFactory = FactoryProducer('shape')
	var shape = abstractShapeFactory.getShape('rectangle')
	shape.shape()

	var abstractColorFactory = FactoryProducer('color')
	var color = abstractColorFactory.getColor('blue')
	color.color()


</script>
</html>
```