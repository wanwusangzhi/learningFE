# node-excel-export

#### 一  Node Excel 导出前端post数据 20180813
1. 前端直接导出选中的数据, 通过axios中的post方法, 把数据发送出去
2. 后端现通过node接收到前端post的data数据, 再通过插件node-excel-export导出数据
3. 前端接收到blob数据后, URL.createObjectURL创建临时链接,生成a标签后, 主动触发下载

> [代码链接](https://github.com/wanwusangzhi/WebStudy/tree/master/dayTest/excel) https://github.com/wanwusangzhi/WebStudy/tree/master/dayTest/excel 
> 知识链接   
	* https://www.npmjs.com/package/xlsx-style
	* https://www.npmjs.com/package/node-excel-export
>
一.URL.createObjectURL 
URL.createObjectURL()方法会根据传入的参数创建一个指向该参数对象的URL. 这个URL的生命仅存在于它被创建的这个文档里. 新的对象URL指向执行的File对象或者是Blob对象.   
语法: 
objectURL = URL.createObjectURL(blob || file);   
参数:
File对象或者Blob对象   
这里大概说下File对象和Blob对象:   
File对象,就是一个文件,比如我用input type="file"标签来上传文件,那么里面的每个文件都是一个File对象.   
Blob对象,就是二进制数据,比如通过new Blob()创建的对象就是Blob对象.又比如,在XMLHttpRequest里,如果指定responseType为blob,那么得到的返回值也是一个blob对象.   
注意点:   
每次调用createObjectURL的时候,一个新的URL对象就被创建了.即使你已经为同一个文件创建过一个URL. 如果你不再需要这个对象,要释放它,需要使用URL.revokeObjectURL()方法.    当页面被关闭,浏览器会自动释放它,但是为了最佳性能和内存使用,当确保不再用得到它的时候,就应该释放它.   
二.URL.revokeObjectURL   
URL.revokeObjectURL()方法会释放一个通过URL.createObjectURL()创建的对象URL. 当你要已经用过了这个对象URL,然后要让浏览器知道这个URL已经不再需要指向对应的文件的时候,就需要调用这个方法.   
具体的意思就是说,一个对象URL,使用这个url是可以访问到指定的文件的,但是我可能只需要访问一次,一旦已经访问到了,这个对象URL就不再需要了,就被释放掉,被释放掉以后,这个对象URL就不再指向指定的文件了.   
比如一张图片,我创建了一个对象URL,然后通过这个对象URL,我页面里加载了这张图.既然已经被加载,并且不需要再次加载这张图,那我就把这个对象URL释放,然后这个URL就不再指向这张图了.   
语法:   
window.URL.revokeObjectURL(objectURL);   

4. 关键代码
```
index.html

axios({ // 用axios发送post请求
  method: 'post',
  url: '/excellogic', // 请求地址
  data: {dataSet: [
			{ name: 'IBM', status_id: 1, note: 'this is text', misc: 'not', obj: {name: '123'} },
			{ name: 'IBM4', status_id: 1, note: 'this is4 text'}
		]}, // 参数
  responseType: 'blob', // 表明返回服务器返回的数据类型
  headers: {
    'Content-Type': 'application/json'
  }
}).then( res => {
		const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
		console.log('bloc', blob)
		const fileName = 'report.xlsx'
		const elink = document.createElement('a')
		elink.download = fileName
		elink.style.display = 'none'
		elink.href = URL.createObjectURL(blob)
		console.log(URL.createObjectURL(blob))
		document.body.appendChild(elink)
		elink.click()
		URL.revokeObjectURL(elink.href)
		document.body.removeChild(elink)
	})
}

server.js

// 拦截post请求 /excellogin

/**
	 * 一些细节可以参考下面两个链接, 但也靠自己领悟
	 * https://www.npmjs.com/package/xlsx-style
	 * https://www.npmjs.com/package/node-excel-export
	 *
	 * excel.buildExport([{
	 * 	heading: [{}], // 标题栏 可空
	 * 	merges: [], // 合并标题栏操作 可空
	 * 	specification: [], 数据标题 非空
	 * 	data: [], // 数据 非空
	 * 	name: 'sheetName', //表名, 即打开表下方的sheet1
	 * }])
	 * buildExport 接收的是一个数组, 就是多个sheet.
	 */
router.post('/', function(req, res, next) {
	var report = exportExcel()
	// excel.buildExport返回的是一个buffer数据
	// 方式一
	res.attachment('report.xlsx')
	res.send(report)
	// 方式二
	// res.setHeader('Content-Type', 'application/vnd.openxmlformats;chartset=utf-8')
	// res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx')
	// return res.end(report, 'binary')
})
```
