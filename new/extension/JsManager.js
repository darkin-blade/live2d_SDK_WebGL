var apiAdress = "/";

var minNum = 0;
var maxNum = 8;
var thisMy = new Array();
var JsMgr = {
  loadInterval: 0,// 如果是同时加载,请把interval调大
  myRequest: "",
  border: 3,// 边宽
  deleted: null,
}

$(document).ready(function() {
  JsMgr.deleted = new Array();
  for (var i = 0; i < minNum; i ++)
  {
    JsMgr.deleted.push(1);
  }

  // var tempBtn = document.createElement("button");
  // $(tempBtn).css("right", 0 + "px");
  // $(tempBtn).css("position", "fixed");
  // tempBtn.setAttribute("onclick", "addModel()");
  // tempBtn.innerText = "add";
  // document.body.appendChild(tempBtn);
});

function addModel()
{
  var hasDelete = 0;
  for (var i = 0; i < JsMgr.deleted.length; i ++)
  {
    if (JsMgr.deleted[i] == 0)
    {
      $("#drag_" + i).css("display", "block");// 恢复
      // 位置调整
      $("#drag_" + i).css("bottom", 50 + "px");
      $("#drag_" + i).css("left", (i * 200 + 60) + "px");
      
      JsMgr.deleted[i] = 1;
      hasDelete = 1;
      return;
    }
  }
  if (hasDelete == 0)
  {
    if (JsMgr.deleted.length == maxNum + 1)
    {
      alert("full models!");
      return;
    }
    divCreate(JsMgr.deleted.length, JsMgr.deleted.length);
  }
}

function divCreate(start, end)
{
  var i = 0;
  for (i = start; i <= end; i++)// 单个加载
  {
    // 删除元素的回收
    JsMgr.deleted.push(1);

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

    // 对齐用,临时变量
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

    // 切换canvas大小按钮
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
    document.body.appendChild(tempDrag);
    document.getElementById("drag_" + i).width = LAppDefine[i].width;

    // 拖拽元素的css
    $("#drag_" + i).css("width", LAppDefine[i].width + "px");
    $("#drag_" + i).css("height", LAppDefine[i].height + "px");

    // 位置调整
    $("#drag_" + i).css("display", "block");
    $("#drag_" + i).css("bottom", 75 + "px");
    $("#drag_" + i).css("left", (i * 200 + 60) + "px");

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

function myDelete(num)
{
  var tempNode = document.getElementById("drag_" + num);
  tempNode.setAttribute("style", "display: none;");// 如果直接删除的话,框架代码会报错
  JsMgr.deleted[num] = 0;
}

function myHide(num)
{
  var tempTip = document.getElementById("tip_" + num);
  tempTip.mystop = 1;
  tempTip.style.opacity = 0;
  var tempBtn = document.getElementById("btnHide_" + num);
  tempBtn.className = "btnShow myBtn";
  tempBtn.textContent = "show";
  tempBtn.setAttribute("onclick", "myShow(" + num + ")");
}

function myShow(num)
{
  var tempTip = document.getElementById("tip_" + num);
  tempTip.mystop = 0;
  var tempBtn = document.getElementById("btnHide_" + num);
  tempBtn.className = "btnHide myBtn";
  tempBtn.textContent = "hide";
  tempBtn.setAttribute("onclick", "myHide(" + num + ")");
}