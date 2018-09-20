# jest ts

[npm相关链接](https://docs.npmjs.com/cli/publish)
[ts-jest](https://github.com/kulshekhar/ts-jest)
```
|-dist // 打包目录 
|-__test__ // 单元测试目录，通过testRegex配置，参考package.json
    |-first.test.ts // 单元测试文件格式 [xxx.]test.(ts|jsx)
|-src // 源代码
    |-test
        |-index.ts
        |-global.d.ts // 可申明window/require变量
```
## 安装typescript jest与配置
* 1 npm install --save-dev jest ts-jest @types/jest typescript
* 2 Modify your project's package.json, adding the follow code
```
"scripts": {
   "build": "tsc --build --force --verbose",
   "test": "jest --verbose --colors --bail",
   "testw": "jest --watch",
   "testc": "jest --coverage"
 },
"jest": {
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}
```

> testRegex：执行test时，执行的目录及文件格式
scripts：
* 打包: tsc --build --force --verbose
* 运行测试用例：jest --verbose --colors --bail

* 3 修改package.json中的name跟main
```
  "name": "@efox/websdk", 
  "version": "0.0.1",
  "main": "dist/index.js",

```
>name发布后默认生成的npm包名,区别组织（@scope/packageName）与个人（packageName不需要加@）
组织发布后，scope对应组织的包名，packageName对应包名
version: 每次发包迭代需要更新
main：打包发布指定路径，不指定默认为root/index

* 4 配置tsconfig.json、tslint.json


## test用例
```
/root/__test__
文件名： xxx.test.ts
执行： npm run test -> jest --verbose --colors --bail
```

## npm发布
```
根目标下
npm adduser 输入账号密码
更新package.json的版本
个人发布：npm publish
组织发布：npm publish --access public
```
