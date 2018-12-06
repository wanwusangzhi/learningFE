# nginx config rules

#### 一 nginx 配置规则
<!-- > [测试用例](https://github.com/wanwusangzhi/WebStudy/blob/master/dayTest/commonTest/generator.html) -->
##### (一) 	nginx安装  
```
安装的内容可以官网
```

##### (二) 	理解配置内容
### 1	log_format	日志配置
日志是开发过程中最重要的环节，对日志的处理是第一步，在进行日志格式处理时，先了解下nginx内置变量与写法。

**内置全局变量**
```
$args ：这个变量等于请求行中的参数，同$query_string
$content_length ： 请求头中的Content-length字段。
$content_type ： 请求头中的Content-Type字段。
$document_root ： 当前请求在root指令中指定的值。
$host ： 请求主机头字段，否则为服务器名称。
$http_user_agent ： 客户端agent信息
$http_cookie ： 客户端cookie信息
$limit_rate ： 这个变量可以限制连接速率。
$request_method ： 客户端请求的动作，通常为GET或POST。
$remote_addr ： 客户端的IP地址。
$remote_port ： 客户端的端口。
$remote_user ： 已经经过Auth Basic Module验证的用户名。
$request_filename ： 当前请求的文件路径，由root或alias指令与URI请求生成。
$scheme ： HTTP方法（如http，https）。
$server_protocol ： 请求使用的协议，通常是HTTP/1.0或HTTP/1.1。
$server_addr ： 服务器地址，在完成一次系统调用后可以确定这个值。
$server_name ： 服务器名称。
$server_port ： 请求到达服务器的端口号。
$request_uri ： 包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。
$uri ： 不带请求参数的当前URI，$uri不包含主机名，如”/foo/bar.html”。
$document_uri ： 与$uri相同。
```

**配置格式**
```
use(用法):	log_format	format_name	 format_value;
ep(解析):		
		log_format		固定写法，类似类型名称，指定配置日志，该值在http模块内。
		format_name		自定义写法，类似变量名。 把log_format看成类型名，那format_name就是变量名。
		format_value	自定义写法，变量的值。该值是字符串，通过""或者''进行格式化。类似js的字符值一样。

```

```
eg(举例): 	log_format  main  '$remote_addr $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" "$uri" "$request_filename" '
                  '"$http_user_agent" "$http_x_forwarded_for"';

		log_format  req_log  "$remote_addr '$request' $request_filename"
					
```

### 2	access_log
format_log需要与access_log搭配才会发挥效果。只要在http内，即可以在需要日志输出的地方增加access_log。
即在http、server甚至是location内都可以指定增加，不同位置区别在于范围，越细化打印的点越明确。
先了解下格式
**配置格式**
```
use:	access_log	log_path	format_name;
ep:	
		access_log		固定定法
		log_path		日志记录的地址，相对地址相对当前的nginx安装目录下，例如写log_path = logs/access.log,那么会自动在logs下生成access.log文件
		format_name 	对应format_log中的日志格式名称
```
**打印日志**
access_log
```
http {
	access_log  logs/global.log  main;
	location / {
	    access_log  logs/access.log  req_log;
		index	index.html;
	}
}
```
**测试日志**
```
访问
```





