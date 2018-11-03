一 Dart

安装SDK
MAC通过brew进行安装
https://brew.sh/index_zh-cn

1 安装完成后，执行brew help
```
wanwudeMBP:version2 wanwu$ brew help
Example usage:
  brew search [TEXT|/REGEX/]
  brew info [FORMULA...]
  brew install FORMULA...
  brew update
  brew upgrade [FORMULA...]
  brew uninstall FORMULA...
  brew list [FORMULA...]

Troubleshooting:
  brew config
  brew doctor
  brew install --verbose --debug FORMULA

Contributing:
  brew create [URL [--no-fetch]]
  brew edit [FORMULA...]

Further help:
  brew commands
  brew help [COMMAND]
  man brew
  https://docs.brew.sh
```

2 安装Dart
https://webdev.dartlang.org/tools/sdk
```
brew tap dart-lang/dart
brew install dart --devel  （非稳定版本，稳定版本安装为 brew install dart）
```
3 安装开发工具 
idea / android studio / vscode / sublime text

4 安装插件
configure->plugin->dart
安装完成重启

5 手动安装，先下载dart-sdk，再进行环境变量配置
```
sudo vi ~/.bash_profile
export PATH=${PATH}:{path1}:{path2};
```

6 最终运行dart看效果









