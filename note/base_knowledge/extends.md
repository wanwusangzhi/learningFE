# es5与es6中多态的理解 extends

## 五 es5与es6中多态的理解 extends 20180801
> [测试用例](https://github.com/wanwusangzhi/WebStudy/blob/master/dayTest/commonTest/extends.html)

```
<!DOCTYPE html>
<html>
<head>
	<title>多态</title>
</head>
<body>

</body>
<script type="text/javascript">
	// 简单理解
	// prototype就是实例化前的构造函数，实例化后就只有__proto__。
	// 实例化前可以通过prototype修改对应的指向
	// 实例化后可以通过__proto__找到原型链对象
	// 而且prototype跟__proto__都是指向constructor，这样理解起来就简单了

	function Animal() {}
	function Dog() {}

	// 实现new Dog 指向 Animal
	// 即dog.__proto__.__proto__ === Animal.prototype
	// 由于dog.__proto__ === Dog.prototype
	// 所以Dog.prototype.__proto === Animal.prototype
	console.log(Animal.prototype)
	console.log(Dog.prototype)

	Dog.prototype = Object.create(Animal.prototype)
	console.log(Dog.prototype) // 输出Animal
	console.log(Dog.prototype.constructor)
	var dog = new Dog()
	console.log(dog)
	console.log(dog.__proto__ === Dog.prototype) // dog.__proto__ === Dog
	console.log(dog.__proto__.__proto__ === Animal.prototype) // dog.__proto__.__proto__ === Animal

	/**
	* 继续扩展
	*/
	Object.defineProperties(Animal.prototype, {
		name: {
			value: "I'm Animal",
		}
	})
	Object.defineProperties(Dog.prototype, {
		constructor: {
			value: Dog,
			enumerable: false
		},
		name: {
			value: "I'm Dog"
		},
		say: {
			value: function() {
				
			}
		}
	})
	console.log(Animal.prototype)
	console.log(Dog.prototype)

	class Person {}
	class Student {}
	console.log(Person.prototype)
	console.log(Student.prototype)
	class Teacher extends Person{}
	console.log(Teacher.prototype)
	console.log(new Teacher())
</script>
</html>
```