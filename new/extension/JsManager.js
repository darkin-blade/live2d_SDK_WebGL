var apiAddress = "/";// 模型加载路径

var minNum = 0;
var maxNum = 2;
var thisMy = new Array();
var JsMgr = {
  loadInterval: 500,// 模型加载间隙:如果是同时加载,请把interval调大
}

$(document).ready(function() {
  divCreate(minNum, maxNum);
});

function divCreate(start, end)
{
  var i = 0;
  for (i = start; i < end; i++)// 单个加载
  {
    // 拖拽元素
    var tempDrag = document.createElement("div");
    tempDrag.id = "drag_" + i;
    tempDrag.className = "drag";

    // tip元素
    var tempTip = document.createElement("div");
    tempTip.mystop = 0;
    tempTip.id = "tip_" + i;
    tempTip.className = "tips";
    tempTip.setAttribute("style",
      "width: " + (LAppDefine[i].width + 50) + "px;" +
      "left: " + (-25) + "px;" +
      "margin: 0px 0px " + (-LAppDefine[i].height / (10 * (LAppDefine[i].width / LAppDefine[i].height))) + "px 0px;"
    ); // 自动计算大小
    tempDrag.appendChild(tempTip);

    // live2d画布
    var tempCanvas = document.createElement("canvas");
    tempCanvas.id = "glcanvas_" + i;
    tempCanvas.className = "glcanvas";
    tempCanvas.width = LAppDefine[i].width;
    tempCanvas.height = LAppDefine[i].height;
    tempDrag.appendChild(tempCanvas);

    document.body.appendChild(tempDrag);
    document.getElementById("drag_" + i).width = LAppDefine[i].width;

    // 拖拽元素的css
    $("#drag_" + i).css("width", LAppDefine[i].width + "px");
    $("#drag_" + i).css("height", LAppDefine[i].height + "px");

    // 位置调整
    $("#drag_" + i).css("display", "block");
    $("#drag_" + i).css("bottom", LAppDefine[i].bottom + "px");
    $("#drag_" + i).css("left", LAppDefine[i].left + "px");

    // 主体函数
    thisMy[i] = new sampleApp(i);
    setTimeout("thisMy[" + i + "].mystart()", (i - start) * JsMgr.loadInterval);
  }
  setTimeout("myDrag()", (maxNum - start + 1) * JsMgr.loadInterval);
}

function myDrag()
{
  $(".drag").draggable(
  {
    containment: document.body
  });
}