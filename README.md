# live2d SDK for web

## [原官方说明](https://github.com/NiaBie/live2d_SDK_for_web/blob/master/info/Official.txt)

## 修改

- 数量:在`JSManager.js`中调整`minNum`和`maxNum`的大小
- 模型:在`LAppDefine.js`中修改`json`文件路径,模型资源自行下载
- 样式:
    - `live2d`canvas:修改`live2d.css`
    - 提示框:修改`tips.js`

## 加载

### hexo

#### Demo

![](https://github.com/hexo-simple-theme/theme_demo/blob/master/live2d.png)

#### 使用

1. 运行`new/combine.sh`,生成`main.js`,`main.css`

> 在hexo上运行可能还需要修改部分`js`代码,如果不想改请直接使用[hexo_live2d](https://github.com/hexo-simple-theme/hexo_live2d)的那两个文件

2. 在主题文件夹的`source`下创建`new`文件夹,将`main.js`,`main.css`,`tips/`放到`new`目录下

3. 在模板(例如`layout.ejs`)中添加:

```html
<script src="/new/main.js"></script>
<link rel="stylesheet" type="text/css" href="/new/main.css">
```

4. 在`new`文件夹下创建`assets`文件夹

5. 对每一个模型,在`assets`文件夹下创建相应的文件夹(文件名不限),下载其相应模型并放到`assets`文件夹内

> [参考模型](https://github.com/live2d-module/moc_demo)

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
