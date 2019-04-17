# live2d SDK for web

## [原官方说明](https://github.com/NiaBie/live2d_SDK_for_web/blob/master/info/Official.txt)

## Demo

![](info/demo1.gif)

## 使用(只介绍`new/`下面的使用方式)

你需要加载的canvas个数=`JSManager.js`中`MaxTips - MinTips + 1`,每一个模块的格式:

```html
    <div id="drag_2" class="drag">
        <div class="tips" id="tip_2"></div>
        <canvas id="glcanvas_2" class="glcanvas" width=200 height=300 style="border:dashed 1px #CCC" draggable="true">
        </canvas>
        <button id="btnChange_2" class="active btnChange">加载模型...</button>
    </div>
```

`MinTips`(含)到`MaxTips`(含)对应`drag_{num}`,`tip_{num}`,`glcanvas_{num}`,`btnChange_{num}`的`{num}`,可以任意添加canvas,同时记得修改css样式

其余使用,见[官方SDK分析](https://niabie.github.io/2019/04/06/l2dwebGL%E7%AC%94%E8%AE%B0/),[SDK功能扩展](https://niabie.github.io/2019/04/15/l2dwebGL%E6%89%A9%E5%B1%95/)
