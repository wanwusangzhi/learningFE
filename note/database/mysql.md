# Mysql

#### 一 安装

1 配置环境， 在环境变量个人环境path增加bin目录的全路径

2 增加my.ini文件
```
[client]
port=3306
default-character-set=utf8
[mysql]
default-character-set=utf8
[mysqld]
port=3306
basedir=D:/Program Files/mysql-8.0.11-winx64
datadir=D:/Program Files/mysql-8.0.11-winx64/data
character-set-server=utf8
default-storage-engine=INNODB
sort_buffer_size=256K
```

3 将MYSQL卸载、重装、初始化，最后开启MYSQL服务，初始化数据，在bin目录下执行 mysqld --initialze
> 1 D:/Program Files/mysql-8.0.11-winx64/bin>mysqld --romve  //删除mysql服务
> 2 D:/Program Files/mysql-8.0.11-winx64/bin>mysqld --install //安装mysql服务 
> 3 D:/Program Files/mysql-8.0.11-winx64/bin>mysqld --initialize //一定要初始化 
> 4 D:/Program Files/mysql-8.0.11-winx64/bin>net start mysql
> 5 D:/Program Files/mysql-8.0.11-winx64/bin>net stop mysql // 关闭服务

4 执行文件下bin目录的mysqld.exe， 检查配置
  或者通过 mysqld -install执行
 服务启动失败需要通过mysqld -remove
 切记不要执行多次，需要remove后再Install

5 完成后在bin目录下启动服务 cmd-> net start mysql

6 链接数据库 mysql -u root -p

7 执行 ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';

8 使用navicat时，需要ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
