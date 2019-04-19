// API main
document.write("<script src=\"" + "new/src/" + "/live2d.js\"></script>");
document.write("<script src=\"" + "new/src/" + "/LAppDefine.js\"></script>");
document.write("<script src=\"" + "new/src/" + "/Live2DFramework.js\"></script>");
document.write("<script src=\"" + "new/src/" + "/MatrixStack.js\"></script>");
document.write("<script src=\"" + "new/src/" + "/ModelSettingJson.js\"></script>");
document.write("<script src=\"" + "new/src/" + "/PlatformManager.js\"></script>");
document.write("<script src=\"" + "new/src/" + "/LAppModel.js\"></script>");
document.write("<script src=\"" + "new/src/" + "/LAppLive2DManager.js\"></script>");
document.write("<script src=\"" + "new/src/" + "/SampleApp.js\"></script>");

var minNum = 0;
var maxNum = 2;
var thisMy = new Array();
var loadInterval = 300;

function sampleManager()
{
    var i = 0;
    for (i = minNum; i <= maxNum; i++)
    {
        // 主(拖拽)元素
        var tempDrag = document.createElement("div");
        tempDrag.id = "drag_" + i;
        tempDrag.className = "drag";
        
        // 主(拖拽)元素的css
        var tempCss = document.createElement("style");
        tempCss.innerHTML = 
        "#drag_" + i + " { width: " + LAppDefine[i].width + "px; " + "height: " + LAppDefine[i].height + "px; }";
        document.body.appendChild(tempCss);

        // tip元素
        var tempTip = document.createElement("div");
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
        tempChange.setAttribute("style", "width: " + (LAppDefine[i].width / 2) + "px;");
        tempButton.appendChild(tempChange);
        
        // 删除按钮
        var tempClose = document.createElement("button");
        tempClose.id = "btnClose_" + i;
        tempClose.className = "btnClose";
        tempClose.setAttribute("style", "width: " + (LAppDefine[i].width / 2) + "px;");
        tempClose.setAttribute("onclick", "deleteFather(" + i + ")");
        tempClose.textContent = "Close";
        tempButton.appendChild(tempClose);
        
        // 添加至body
        tempDrag.appendChild(tempButton);
        document.body.appendChild(tempDrag);
        document.getElementById("drag_" + i).width = LAppDefine[i].width;

        // 主体函数
        setTimeout("new sampleApp(" + i + ")", (i - minNum) * loadInterval);
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
    
    function deleteFather (num){
        var tempNode = document.getElementById("drag_" + num);
        // tempNode.parentNode.removeChild(tempNode);
    tempNode.setAttribute("style", "display: none;");
}