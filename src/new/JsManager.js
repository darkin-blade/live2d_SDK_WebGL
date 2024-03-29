var apiAddress = "/";// 核心文件的根目录位置
var tipAddress = apiAddress + "src/tips/";// 提示框内容文件夹位置
var modelAddress = apiAddress + "assets/";// 模型文件的根目录

var minNum = 0;// 模型的最小编号
var maxNum = 100;// 模型的最大编号
var totalNum = 0;// 总模型数

window.tips = new Array();// 用于clearInterval(取消无限鸡汤)
var thisMy = new Array();
var JsMgr = {
  loadInterval: 0,// 如果是同时加载,请把interval调大
  border: 3,// 按键的边宽,防止按钮重叠
}

// 对于tips以及button的控制
var need_tips = 1;
var need_button = 1;

$(document).ready(function() {
  // 在本地测试时添加模型的按钮
  var tempBtn = document.createElement("button");
  $(tempBtn).css("right", 0 + "px");
  $(tempBtn).css("position", "fixed");
  tempBtn.setAttribute("onclick", "addModel()");
  tempBtn.innerText = "add";
  document.body.appendChild(tempBtn);
});

function addModel()// 单个添加模型的api,如果网站需要一次性生成多模型,不建议使用此函数
{
  if (totalNum > 0) {// live2d.js的初始化函数,在一开始只会初始化第一个模型
    live2Dmain(totalNum + minNum);// 之后的模型需要重新初始化
  }

  for (var i = 0; i < totalNum; i ++) {// 检查哪些序号的模型被删除
    if (thisMy[i] == null) {// 被删除了
      divCreate(i + minNum, i + minNum + 1);// 恢复被删除的模型
      return;      
    }
  }

  if (totalNum < maxNum) {
    divCreate(totalNum + minNum, totalNum + minNum + 1);
    totalNum ++;
  }
}

function divCreate(start, end)// TODO 用于集体加载模型的api,但是对于时间间隙的控制有待优化
{// 创建从start到end编号的模型
  var i = 0;
  for (i = start; i < end; i++)// 单个加载
  {
    // 拖拽元素
    var tempDrag = document.createElement("div");
    tempDrag.id = "drag_" + i;
    tempDrag.className = "drag";

    if (need_tips) { // tip元素(如果不需要可不使用,并将后面的对tip.js调用删除)
      var tempTip = document.createElement("div");
      tempTip.mystop = 0;
      tempTip.id = "tip_" + i;
      tempTip.className = "tips";
      tempTip.setAttribute("style",
        "width: " + (LAppDefine[i].width + 50) + "px;" +
        "left: " + (-25) + "px;" +
        "margin: 0px 0px " + (-LAppDefine[i].height / (10 * (LAppDefine[i].width / LAppDefine[i].height))) + "px 0px;"
      ); // 自动计算大小
      tempDrag.prepend(tempTip);
    }
    
    // live2d画布
    var tempCanvas = document.createElement("canvas");
    tempCanvas.id = "glcanvas_" + i;
    tempCanvas.className = "glcanvas";
    tempCanvas.width = LAppDefine[i].width;
    tempCanvas.height = LAppDefine[i].height;
    tempDrag.appendChild(tempCanvas);

    if (need_button) { // 对齐用,临时变量
      var tempButton = document.createElement("div");
      
      // 切换按钮
      var tempChange = document.createElement("div");
      tempChange.id = "btnChange_" + i;
      tempChange.className = "btnChange myBtn";
      tempChange.setAttribute("style", "width: " + (LAppDefine[i].width / 3 - 2 * JsMgr.border) + "px;" +
        "left: " + 0 + "px;");
      tempButton.appendChild(tempChange);

      // 删除按钮
      var tempClose = document.createElement("div");
      tempClose.id = "btnClose_" + i;
      tempClose.className = "btnClose myBtn";
      tempClose.setAttribute("style", "width: " + (LAppDefine[i].width / 3 - 2 * JsMgr.border) + "px;" +
        "left: " + (LAppDefine[i].width / 3) + "px;");
      tempClose.setAttribute("onclick", "myDelete(" + i + ")");
      tempClose.textContent = "close";
      tempButton.appendChild(tempClose);

      // 开关tips
      var tempHide = document.createElement("div");
      tempHide.id = "btnHide_" + i;
      tempHide.className = "btnHide myBtn";
      tempHide.setAttribute("style", "width: " + (LAppDefine[i].width / 3 - 2 * JsMgr.border) + "px;" +
        "left: " + (LAppDefine[i].width * 2 / 3) + "px;");
      tempHide.setAttribute("onclick", "myHide(" + i + ")");
      tempHide.textContent = "hide";
      tempButton.appendChild(tempHide);
       
      // 添加至body
      tempDrag.appendChild(tempButton);
    }

    // 添加至body
    document.body.appendChild(tempDrag);
    document.getElementById("drag_" + i).width = LAppDefine[i].width;

    // 拖拽元素的css
    $("#drag_" + i).css("width", LAppDefine[i].width + "px");
    $("#drag_" + i).css("height", LAppDefine[i].height + "px");

    // 位置调整
    $("#drag_" + i).css("display", "block");
    $("#drag_" + i).css("bottom", 75 + "px");
    $("#drag_" + i).css("left", 200 + "px");
    // $("#drag_" + i).css("left", (i * 200 + 60) + "px");

    // 启动live2d javascript
    thisMy[i] = new sampleApp(i);
    setTimeout("thisMy[" + i + "].mystart()", (i - start) * JsMgr.loadInterval);

    if (need_tips) { // 绑定tips javascript
      thisMy[i].tips = new Tips(i);
      thisMy[i].tips.stop = 0;
      thisMy[i].tips.init();// 启动tips
    }
  }
  setTimeout("myDrag()", (maxNum - start + 1) * JsMgr.loadInterval);
}

function myDrag()
{// 使模型能够拖拽
  $(".drag").draggable(
  {
    containment: document.body
  });
}

function myDelete(num)
{// TODO 解除模型的所有监听
  if (need_tips) {// 如果开启了tips
    thisMy[num].tips.delete();// 取消Interval tips
  }

  thisMy[num].delete();
  for (var key in thisMy[num]) {
    // console.log(key);
    delete thisMy[num][key];
  }
  thisMy[num] = null;// TODO
  
  var tempDrag = document.getElementById("drag_" + num);
  tempDrag.remove(tempDrag);
}

function myHide(num)
{// 隐藏提示框
  // TODO 不能直接删除提示框,否则影响排版
  var tempTip = document.getElementById("tip_" + num);
  tempTip.style.opacity = 0;// 清除本次tip
  thisMy[num].tips.stop = 1;

  var tempBtn = document.getElementById("btnHide_" + num);
  tempBtn.className = "btnShow myBtn";
  tempBtn.textContent = "show";
  tempBtn.setAttribute("onclick", "myShow(" + num + ")");
}

function myShow(num)
{// 显示提示框
  var tempTip = document.getElementById("tip_" + num);
  thisMy[num].tips.stop = 0;

  var tempBtn = document.getElementById("btnHide_" + num);
  tempBtn.className = "btnHide myBtn";
  tempBtn.textContent = "hide";
  tempBtn.setAttribute("onclick", "myHide(" + num + ")");
}