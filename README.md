# live2d SDK for web

## [原官方说明](https://github.com/NiaBie/live2d_SDK_for_web/blob/master/info/Official.txt)

## 修改

- 模型数量控制:在`JSManager.js`中调整`minNum`和`maxNum`的大小
- 增加模型:
    1. 在`new`文件夹下创建`assets`文件夹
    2. 对每一个模型,在`assets`文件夹下创建相应的文件夹(文件名没有限制),下载其相应模型并放到`assets`文件夹内
    3. 在`LAppDefine.js`中修改`json`文件路径,模型资源自行下载
- 样式(`canvas`大小以及提示框等):
    - `live2d`canvas:修改`live2d.css`
    - 提示框:修改`tips.js`
- 模型添加按钮:`JSManager.js`中`$(document).ready(function() {`修改,如果需要自行设计添加模型的按钮,可删去相关代码

## 使用

### Demo

![](https://github.com/hexo-simple-theme/theme_demo/blob/master/live2d.png)

### normal

1. 运行`new/combine.sh`,生成`main.js`,`main.css`

2. 在目标`html`文件中添加(路径视具体情况修改)

```html
<script src="//apps.bdimg.com/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="//apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
<script async src="new/main.js"></script>
<link rel="stylesheet" type="text/css" href="new/main.css">
```

3. 打开`html`文件即可

### hexo

1. 运行`new/combine.sh`,生成`main.js`,`main.css`

> 在hexo上运行可能还需要修改部分`js`代码,如果不想改请直接使用[hexo_live2d](https://github.com/hexo-simple-theme/hexo_live2d)的那两个文件

2. 在**主题**文件夹的`source`下创建`new`文件夹,将`main.js`,`main.css`,`tips/`放到`new`目录下,再在`new/`下新建`asset`文件夹,将模型放到此文件夹内

3. 在模板(例如`layout.ejs`)中添加:

```html
<script src="/new/main.js"></script>
<link rel="stylesheet" type="text/css" href="/new/main.css">
```

完成后hexo主题文件的结构为:

```
theme/---source/---new/-+-tips/
                        |
                        +-assets/-+-module_name/---...
                        |         |
                        |         +...
                        |
                        +-main.css
                        |
                        `-main.js
```

### 其他

> TODO
