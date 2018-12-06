# prototype & __proto__ 

#### 一 what is prototype ? 20180728

> [测试用例](https://github.com/wanwusangzhi/WebStudy/blob/master/dayTest/commonTest/prototype.html)
```
<!DOCTYPE html>
<html>
<head>
	<title>prototpye</title>
</head>
<body>
	you will know just coding step by step 
</body>
<script type="text/javascript">
	// 原型链中实例化都会在__proto__中，构造函数实例化后对在对象中
	console.log(new Array, Array)
	// console.log(new Function, Function)
	// console.log(new Object, Object)
	function teacher(name) {
		this.name = name
		this.say = function() {
			console.log(this.name)
		}
	}
	// 只有函数对象才有prototpye （原型链）
	teacher.prototype.teach = function(subject) {
		console.log(this.name + " teach: %s", subject )
	}
	var _teacher = new teacher('lili')
	// console.log(teacher)
	// _teacher 实例化即成了对象，改值为构造函数的内容， 即teacher.constructor的内容
	console.log(_teacher)
	// constructor指向构造函数
	console.log(_teacher.constructor === teacher)
	// 只有构造函数才有原型链， 所以这个值为undefined
	console.log(_teacher.prototype)
	// 原型链被实例后放在对象的__proto__里
	console.log(_teacher.__proto__)
	_teacher.say()
	_teacher.teach('english')

	function student(name) {
		// 方法一 对象冒充， 实例化后再删除对象， 直接把引用的构造函数都变成单前构造函数
		// this.student = teacher
		// this.student('student')
		// delete this.student
		// 方法二 call、apply
		// teacher.call(this, arguments)
		this.name = name
	}
	console.log(student)
	// 让student的函数对象中的原型链指向teacher中的prototype
	student.prototype = new teacher(name)
	var _student = new student('miki')
	console.log(_student)
	_student.say()
	_student.teach.call(new teacher('suny'), 'math')

</script>
</html>
```