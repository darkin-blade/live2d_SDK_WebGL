# live2d SDK for web

更新于2019/9/24

## [原官方说明](https://github.com/NiaBie/live2d_SDK_for_web/blob/master/info/Official.txt)

## 说明

- 模型数量控制
    - `JsManager.js`中`minNum`和`maxNum`只限定模型的编号范围
    - 模型可以使用提供的api(`addModel`或`divCreate`)来增加,其最大数量为`maxNum`-`minNum`
    - 源代码中默认生成一个添加模型的按钮(在`JsManager.js`的`$(document).ready(function() {`中,可自行更改

- 增加模型:
    1. (此步只是建议,没有强制要求)将模型文件夹(名称无限制)放在`assets`文件夹中
    2. 在`LAppDefine.js`中修改`json`文件路径(默认所有编号对应的模型相同),模型资源自行下载

- 样式修改的位置:
    - `live2d`canvas:`live2d.css`(`LAppDefine.js`,`JsManager.js`)
    - 提示框:`tips.css`(`JsManager.js`)
    - 按钮:`live2d.css`(`JsManager.js`)
    - 按钮以及提示框的开启:`JsManager.js`的`need_button`和`need_tips`

## 使用

### Demo

![](https://github.com/hexo-simple-theme/theme_demo/blob/master/live2d.png)

### 分开加载

1. 在`webGL/{filename}.html`中添加

```html
<script src="https://apps.bdimg.com/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="https://apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>

<script src="src/new/JsManager.js"></script>
<script src="src/new/tips.js"></script>

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
<link rel="stylesheet" type="text/css" href="src/new/tips.css">
```

    - 其中`JsManager.js`,`live2d.js`,`Live2DFramework.js`必须排在1,2,3的位置
    - 如果不想使用tips功能,可不加载`tips.js`,`tips.css`

2. 使用`host`加载`webGL`目录,用浏览器打开对应ip地址

### 其他

#### TODO

- 多模型无缝加载:现在如果模型加载过快,会导致部分模型加载不出来
