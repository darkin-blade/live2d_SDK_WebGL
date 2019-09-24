# live2d SDK for web

## [原官方说明](https://github.com/NiaBie/live2d_SDK_for_web/blob/master/info/Official.txt)

## 说明

此分支用于直接加载,不能动态添加/减少模型数目

## 使用

### ~~合并加载~~

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

### 分开加载

1. 在`webGL/{filename}.html`中添加

```html
<script src="src/new/JsManager.js"></script>
<script src="src/origin/live2d.js"></script>
<script src="src/origin/Live2DFramework.js"></script>

<script src="src/origin/LAppDefine.js"></script>
<script src="src/origin/LAppLive2DManager.js"></script>
<script src="src/origin/MatrixStack.js"></script>
<script src="src/origin/LAppModel.js"></script>
<script src="src/origin/ModelSettingJson.js"></script>
<script src="src/origin/PlatformManager.js"></script>
<script src="src/origin/SampleApp.js"></script>

<link rel="stylesheet" type="text/css" href="src/new/live2d.css">
```

其中`JsManager.js`,`live2d.js`,`Live2DFramework.js`必须排在1,2,3的位置

2. 使用`host`加载`webGL`目录,用浏览器打开对应ip地址
