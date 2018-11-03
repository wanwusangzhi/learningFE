#!/bin/bash
# 修改读写权限 sudo chmod 755 ./filename

echo '删除key文件'
rm -rf key

echo '创建key文件'
mkdir key

echo 'create key'
# 创建pass
openssl genrsa -des3 -passout pass:123123 -out key/server.pass.key 2048

# 创建server.key
echo '生成私钥'
openssl rsa -passin pass:123123 -in key/server.pass.key -out key/server.key

# 生成证书请求文件CSR
echo '生成CSR文件'
openssl req -new -key key/server.key -out key/server.csr

# 生成证书
echo '生成证书'
openssl x509 -req -days 3650 -in key/server.csr -signkey key/server.key -out key/server.crt

echo 'done'


