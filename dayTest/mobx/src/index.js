document.write(123)
window.onload = () => {
	document.getElementsByTagName('body')[0].innerHTML = 'hello world'
}

// 了解装饰器属性 decorator修饰器语法

function log(target) {
	// 获取所有属性, 访问器或数据描述属性
	const desc = Object.getOwnPropertyDescriptors(target.prototype)
	// 遍历所有属性
	for (const key of Object.keys(desc)) {
		// 判断为constructor则不处理
		if (key === 'constructor') {
			continue 
		}
		const func = desc[key].value
		if ('function' === typeof func) {
			Object.defineProperty(target.prototype, key, {
				value: function(...args) {
					console.log('this', this)
					console.log('before %s', key)
					const ret = func.apply(this, args)
					console.log('after %s', key)
					return ret
				}
			})
		}
	}
}
// 这里需要安装修饰器依赖 babel-plugin-transform-decorators-legacy
// 同时还要的webpack.config.js中配置 modules->rules->js->plugins->'transform-decorators-legacy'
@log
class Numberic {
	PI = 3.1415926
	add(...nums) {
		return nums.reduce((p, n) => ( p + n), 0)
	}
}

console.log(new Numberic().add(1, 2))