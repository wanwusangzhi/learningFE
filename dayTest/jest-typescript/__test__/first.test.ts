import {sayHello, sayHelloRet} from '../src'
test('first test', () => {
	expect(sayHello('Tiger'))
})
test('first test', () => {
	expect(sayHelloRet('Tiger')).toBe('Tiger')
})
