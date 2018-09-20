/// <reference path="./global.d.ts" />
export const sayHello = (name: string) => {
	console.log('hello:', name)
	console.log('window', window.open)
}
export const sayHelloRet = (name: string) => {
	console.log('hello:', name)
	return name
}

export default {
	sayHello, sayHelloRet
}