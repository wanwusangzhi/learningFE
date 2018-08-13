var express = require('express')
var excel = require('node-excel-export')
var path = require('path')
var fs = require('fs')
var router = express.Router()
var app = express()

var exportExcel = function() {
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
	
	/**
	 * 统一设置样式, 方便管理与调用,不是关键
	 * 通过excel.buildExport进行配置
	 * @type {Object}
	 */
	const styles = {
		headerDark: {
			fill: {
				fgColor: {
					rgb: 'FFFFFFFF'
				}
			},
			font: {
				color: {
					rgb: 'FF000000'
				},
				size: 14,
				bold: true,
				underline: true
			}
		},
		cellPink: {
			fill: {
				fgColor: {
					rgb: 'FF00FF00'
				}
			}
		},
		cellGreen: {
			fill: {
				fgColor: {
					rgb: 'FF00FF00'
				}
			}
		}
	}

	/**
	 * 表格头部设置, 独立于数据与标题
	 * 这里可以增加一些提示或者自己定义一些头部说明
	 * 如果只是导出标题栏跟数据, 这里可以不用设置.
	 * 通过excel.buildExport进行配置
	 * @type {Array}, 可以配置buildExport中的merges属性使用, 有合并的操作
	 * value: 标题栏名称
	 * style: 列的样式, 对象属性
	 */
	const heading = [
		[{ value: 'cusName', style: styles.headerDark }, { value: 'status_id', style: styles.headerDark }, { value: 'note', style: styles.headerDark }, { value: 'value', style: styles.headerDark }, { value: 'misc', style: styles.headerDark }]
	]

	/**
	 * 主要是合并列与行操作
	 * 配合头部的header使用,也可以不使用
	 * @type {Array}
	 * start: { row, column }: 哪一行哪一列开始,
	 * end: { row, column }: 哪一行哪一列结束
	 */
	const merges = [
		{ start: { row: 1, column: 1}, end: { row: 1, column: 2 } },
		{ start: { row: 1, column: 3}, end: { row: 1, column: 4 } },
		{ start: { row: 1, column: 5}, end: { row: 1, column: 7 } },
		{ start: { row: 1, column: 8}, end: { row: 1, column: 10 } }
	]
	/**
	 * 要导出的数据, 可以是接收post, 也可以从数据库查到的
	 * @type {Array}
	 */
	const dataSet = [
		{ name: 'IBM', status_id: 1, note: 'this is text', misc: 'not', obj: {name: '123'} },
		{ name: 'IBM2', status_id: 0, note: 'this is2 text', misc: 'not' },
		{ name: 'IBM3', status_id: 0, note: 'this is3 text', misc: 'not' },
		{ name: 'IBM4', status_id: 1, note: 'this is4 text'}
	]
	/**
	 * 重点就是specification
	 * @type {Object}
	 * key: { // key 对应数据的key, 类似dataSet数据中的name, status_id, note. 但也未必需要对应
	 * 	displayName: '列标题', 必填, 不然标题为空
	 *  headerStyle: '列中显示的标题样式',
	 *  cellStyle: '列中格子样式, 而且能定义数据格式还有样式'
	 * }
	 * 强调下key, 不接收对象操作, 类似下方的obj.name, 只接收最外层的obj
	 * 那场景中总会存在一些计算后需要导出的数据,
	 * 这个key可以是其它字符, 但需要在cellStyle中return 就行.具体看注释
	 */
	const specification = {
		name: {
			displayName: 'cusName',
			headerStyle: styles.headerDark,
			cellStyle: function(value, row) {
				return row.status_id == 1 ? styles.cellGreen : {fill: {fgColor: {rgb: '#00000'}}}
			}
		},
		status_id: {
			displayName: 'status_idss',
			headerStyle: styles.headerDark,
			width: 120,
			cellStyle: function(value, row) {
				// console.log('status_id', row, '-', value, '-')
				return {numFmt: '0.00%'}
			}
		},
		note: {
			displayName: 'status_idss',
			headerStyle: styles.headerDark,
			cellStyle: styles.cellPink
		},
		misc: {
			displayName: 'MISC',
			headerStyle: styles.headerDark,
			cellStyle: styles.cellPink,
			/**
			 * [cellFormat 列数据格式化]
			 * @param  {[type]} value [返回数据中对应到key的数据, 如果没有对应就是undefined, 如果是对象的key, 则返回对象内的obj]
			 * @param  {[type]} row   [返回当前列中的数据]
			 * @return {[type]}       [description]
			 */
			cellFormat: function(value, row) {
				if (!value) {
					return '没有值时返回数据'
				} else {
					return '有值时, 就是return value,但我这里也可以改写数据. 即可以做操作运算咯'
				}
			}
		}, 
		obj: {
			displayName: 'NOTe!!', 
			headerStyle: styles.headerDark,
			cellStyle: styles.cellPink,
			cellFormat: function(value, row) {
				// console.log('obj', row, '-', value, '-')
				return row.note + row.status_id
			}
		}, 
		'obj.age': {
			displayName: 'asas!!age', 
			headerStyle: styles.headerDark,
			cellStyle: styles.cellPink,
			cellFormat: function(value, row) {
				// console.log('obj.age', row, '-', value, '-')
				return row.note + row.status_id
			}
		}, 
		'obj.name': {
			displayName: 'asas!!name', 
			headerStyle: styles.headerDark,
			cellStyle: styles.cellPink,
			cellFormat: function(value, row) {
				return row.note + row.status_id
			}
		}
	}

	const report = excel.buildExport(
		[{
			name: 'Report',
			// heading: heading,
			specification: specification,
			// merges: merges,
			data: dataSet
		}]
	)
	return report
}

// 拦截post请求 /excellogin
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

// 增加prefix到路由中
app.use('/excellogic', router)

// 后端输入页面
app.get('/', function(req, res, next) {
	fs.readFile(path.join(__dirname, './index.html'), function(err, data) {
		res.setHeader('Content-Type', 'text/html')
		res.send(data)
	})
})

var server = app.listen(3001, function() {
	console.log('http://%s:%s', server.address().address, server.address().port)
})
