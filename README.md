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

- [demo](https://github.com/hexo-simple-theme/hexo_live2d)

运行`new/combine.sh`(合并文件),将`main.js`,`main.css`,`tips/`合并至新文件夹`new/`,并放置至hexo的主题文件夹的`source/`下,在主题模板中引用`js`和`css`即可

### 本地

需要`php`环境.运行`new/combine.sh`,在html中引用`js`和`css`

