## Singleton

### 单例模式的定义与特点  
单例（Singleton）模式的定义  
+ 指一个类只有一个实例，且该类能自行创建这个实例的一种模式。例如，Windows 中只能打开一个任务管理器，这样可以避免因打开多个任务管理器窗口而造成内存资源的浪费，或出现各个窗口显示内容的不一致等错误。

在计算机系统中，还有 Windows 的回收站、操作系统中的文件系统、多线程中的线程池、显卡的驱动程序对象、打印机的后台处理服务、应用程序的日志对象、数据库的连接池、网站的计数器、Web 应用的配置对象、应用程序中的对话框、系统中的缓存等常常被设计成单例。

单例模式有 3 个特点 
+ 单例类只有一个实例对象；
+ 该单例对象必须由单例类自行创建；
+ 单例类对外提供一个访问该单例的全局访问点；

### JS实现
[Singleton](https://github.com/wanwusangzhi/WebStudy/blob/master/dayTest/design_pattern/singleton.html)

```
<script type="text/javascript">
	// 懒汉模式，在调用时才创建实例 es5
	var lazySingletonES5 = (function() {
		var instance = null
		function Single(name) {
			this.name = name
		}
		return function() {
			if (!instance) {
				instance = new Single(arguments[0])
				console.warn("创建实例")
				return instance
			}
			console.warn("存在实例")
			return instance
		}
	})()

	var lazySingletonObj1 = lazySingletonES5('实例1')
	var lazySingletonObj2 = lazySingletonES5('实例1')
	console.log('lazySingletonObj1: ',lazySingletonObj1)
	console.log('lazySingletonObj2: ',lazySingletonObj2)


	// 懒汉模式，在调用时才创建实例 es5
	var hungrySingletonES5 = (function() {
		function Single(name) {
			this.name = name
		}
		var instance = new Single('饿汉模式')
		return function() {
			console.warn("存在实例")
			return instance
		}
	})()

	var hungrySingletonObj1 = hungrySingletonES5()
	var hungrySingletonObj2 = hungrySingletonES5()
	console.log('hungrySingletonObj1: ',hungrySingletonObj1)
	console.log('hungrySingletonObj2: ',hungrySingletonObj2)



	// 懒汉模式，在调用时才创建实例 es6
	class LazySingleton {
		constructor(name) {
			this.name = name;
		}
		static getInstance = (() => {
			let instance = null
			return (...args) => {
				if (instance === null) {
					console.warn('创建实例')
					instance = new LazySingleton(...args)
					return instance
				}
				console.warn('存在实例')
				return instance
			}
		})()
	}
	const lazyInst1 = LazySingleton.getInstance('懒汉模式')
	const lazyInst2 = LazySingleton.getInstance('懒汉模式')
	console.log('lazyInst1', lazyInst1)
	console.log('lazyInst2', lazyInst2)
	console.log('lazyInst1 === lazyInst2', lazyInst1 === lazyInst2)

	// 饿汉模式，先创建实例后给予调用 es6
	class HungrySingleton {
		constructor (name) {
			this.name = name;
		}
		static getInstance = (() => {
			const instance = new HungrySingleton('饿汉模式')
			return () => {
				return instance
			}
		})()
	}
	const hungryInst1 = HungrySingleton.getInstance('懒汉模式')
	const hungryInst2 = HungrySingleton.getInstance('懒汉模式')
	console.log('hungryInst1', hungryInst1)
	console.log('hungryInst2', hungryInst2)
	console.log('hungryInst1 === hungryInst2', hungryInst1 === hungryInst2)

</script>
```