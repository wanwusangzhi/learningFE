# sublime

#### 一 Sublime3增加快捷键打开浏览器 20180727
1. 打开文件 preferences -> key-bindings ( key-binding-user)

2. 增加配置
>**配置说明**
>*	keys: 快捷键
>*	command: 命令
>*	args.paths: []
>*	args.application: 浏览器目录, 可以通过右键浏览器图标,查看属性获取, 记得注意下window的"\"反斜杆表示转义, 需要增加多个"\"反斜杆.
>*	args.extensions: 打开目标文件格式
```
[
	{
		"keys": ["ctrl+b"],
		"command": "side_bar_files_open_with",
		"args": {
			"paths": [],
			"application": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
			"extensions": ".*"
		}

	}
]
```

3. 安装命令包 SideBarEnhancements
>**安装说明**
>* ctrl+shift+P  
>* 输入 install package 回车 
>* 再输入SideBarEnhancements 回车安装

4. 通过快捷键打开, demo是ctrl+b
