# live2d SDK for web

更新于2019/9/24

## [原官方说明](https://github.com/NiaBie/live2d_SDK_for_web/blob/master/info/Official.txt)

## 说明

- 模型数量控制
    - `JSManager.js`中`minNum`和`maxNum`只限定模型的编号范围
    - 模型可以使用提供的api(`addModel`或`divCreate`)来增加,其最大数量为`maxNum`-`minNum`
    - 源代码中默认生成一个添加模型的按钮(在`JSManager.js`的`$(document).ready(function() {`中,可自行更改
    - 原代码对每个模型,提供关闭该模型的按钮

- 增加模型:
    1. (此步只是建议,没有强制要求)将模型文件夹(名称无限制)放在`assets`文件夹中
    2. 在`LAppDefine.js`中修改`json`文件路径(默认所有编号对应的模型相同),模型资源自行下载

- 样式(`canvas`大小以及提示框等):
    - `live2d`canvas:修改`live2d.css`
    - 提示框:修改`tips.js`

## 使用

### Demo

![](https://github.com/hexo-simple-theme/theme_demo/blob/master/live2d.png)

### normal


### 其他

> TODO
