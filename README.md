# live2d SDK for web

## [原官方说明](https://github.com/NiaBie/live2d_SDK_for_web/blob/master/info/Official.txt)

## 说明

此分支用于直接加载,不能动态添加/减少模型数目

## 使用

### 静态加载

适合所有服务器/本地加载,但不便于调试

1. 在`new`下

```bash
./combine.sh
```

2. 在`webGL/{filename}.html`中添加

```html
<script src="https://apps.bdimg.com/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="https://apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
<script src="new/main.js"></script>
<link rel="stylesheet" type="text/css" href="new/main.css">
```

3. 用浏览器打开`{filename}.html`即可

### 动态加载

只适合部分服务器,便于调试
