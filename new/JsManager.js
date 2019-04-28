// API main
// var apiAdress = "http://localhost:6060/"
var apiAdress = "";

document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + apiAdress + "new/live2d.css\">");
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + apiAdress + "new/tips.css\">");
document.write("<script async src=\"" + apiAdress + "new/tips/tips.js\"></script>");

// document.write("<script src=\"" + apiAdress + "new/src/" + "/live2d.js\"></script>");
// document.write("<script src=\"" + apiAdress + "new/src/" + "/LAppDefine.js\"></script>");
// document.write("<script src=\"" + apiAdress + "new/src/" + "/Live2DFramework.js\"></script>");
// document.write("<script src=\"" + apiAdress + "new/src/" + "/MatrixStack.js\"></script>");
// document.write("<script src=\"" + apiAdress + "new/src/" + "/ModelSettingJson.js\"></script>");
// document.write("<script src=\"" + apiAdress + "new/src/" + "/PlatformManager.js\"></script>");
// document.write("<script src=\"" + apiAdress + "new/src/" + "/LAppModel.js\"></script>");
// document.write("<script src=\"" + apiAdress + "new/src/" + "/LAppLive2DManager.js\"></script>");
// document.write("<script src=\"" + apiAdress + "new/src/" + "/SampleApp.js\"></script>");

// document.write("<script src=\"" + apiAdress + "new/" + "/main.js\"></script>");

var minNum = 0;
var maxNum = 2;
var thisMy = new Array();
var loadInterval = 300;

function sampleManager()
{
    $.ajax({
        url: apiAdress + "new/" + "main.js",
        dataType: "script",
        async: false,
        success: function () {
            ;
        }
    });
    var i = 0;
    for (i = minNum; i <= maxNum; i++)
    {
        // 拖拽元素
        var tempDrag = document.createElement("div");
        tempDrag.id = "drag_" + i;
        tempDrag.className = "drag";
        
        // 拖拽元素的css
        var tempCss = document.createElement("style");
        tempCss.innerHTML = 
        "#drag_" + i + " { width: " + LAppDefine[i].width + "px; " + "height: " + LAppDefine[i].height + "px; }";
        document.body.appendChild(tempCss);

        // tip元素
        var tempTip = document.createElement("div");
        tempTip.mystop = 0;
        tempTip.id = "tip_" + i;
        tempTip.className = "tips";
        tempTip.setAttribute("style",
        "width: " + (LAppDefine[i].width + 50) + "px;" + 
        "left: " + (-25) + "px;" + 
        "margin: 0px 0px " + (-LAppDefine[i].height / (10 * (LAppDefine[i].width / LAppDefine[i].height))) + "px 0px;"
        );// 自动计算大小
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
        var tempChange = document.createElement("button");
        tempChange.id = "btnChange_" + i;
        tempChange.className = "btnChange";
        tempChange.setAttribute("style", "width: " + (LAppDefine[i].width / 3) + "px;" + 
        "left: " + 0 + "px;");
        tempButton.appendChild(tempChange);
        
        // 删除按钮
        var tempClose = document.createElement("button");
        tempClose.id = "btnClose_" + i;
        tempClose.className = "btnClose";
        tempClose.setAttribute("style", "width: " + (LAppDefine[i].width / 3) + "px;" + 
        "left: " + (LAppDefine[i].width / 3) + "px;");
        tempClose.setAttribute("onclick", "deleteFather(" + i + ")");
        tempClose.textContent = "close";
        tempButton.appendChild(tempClose);

        // 切换canvas大小按钮
        var tempHide = document.createElement("button");
        tempHide.id = "btnHide_" + i;
        tempHide.className = "btnHide";
        tempHide.setAttribute("style", "width: " + (LAppDefine[i].width / 3) + "px;" + 
        "left: " + (LAppDefine[i].width * 2 / 3) + "px;");
        tempHide.setAttribute("onclick", "myHide(" + i + ")");
        tempHide.textContent = "hide";
        tempButton.appendChild(tempHide);
        
        // 添加至body
        tempDrag.appendChild(tempButton);
        document.body.appendChild(tempDrag);
        document.getElementById("drag_" + i).width = LAppDefine[i].width;

        // 主体函数
        thisMy[i] = new sampleApp(i);
        setTimeout("thisMy[" + i + "].mystart()", (i - minNum) * loadInterval);
    }
    setTimeout("myDrag()", (maxNum - minNum + 1) * loadInterval);
}

function myDrag()
{
    $(".drag").draggable(
    {
        containment: document.body
    });
}

function deleteFather(num)
{
    var tempNode = document.getElementById("drag_" + num);
    // tempNode.parentNode.removeChild(tempNode);
    tempNode.setAttribute("style", "display: none;");
}

function myHide(num)
{
    var tempTip = document.getElementById("tip_" + num);
    tempTip.mystop = 1;
    tempTip.style.opacity = 0;
    var tempBtn = document.getElementById("btnHide_" + num);
    tempBtn.className = "btnShow";
    tempBtn.textContent = "show";
    tempBtn.setAttribute("onclick", "myShow(" + num + ")");
}

function myShow(num)
{
    var tempTip = document.getElementById("tip_" + num);
    tempTip.mystop = 0;
    var tempBtn = document.getElementById("btnHide_" + num);
    tempBtn.className = "btnHide";
    tempBtn.textContent = "hide";
    tempBtn.setAttribute("onclick", "myHide(" + num + ")");
}