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

var minTips = 2;
var maxTips = 7;
var thisMy = new Array();

function sampleManager()
{
    var i = 0;
    for (i = minTips; i <= maxTips; i++)
    {
        var tempDrag = document.createElement("div");
        tempDrag.id = "drag_" + i;
        tempDrag.className = "drag";
        var tempTip = document.createElement("div");
        tempTip.id = "tip_" + i;
        tempTip.className = "tips";
        tempDrag.appendChild(tempTip);
        var tempCanvas = document.createElement("canvas");
        tempCanvas.id = "glcanvas_" + i;
        tempCanvas.className = "glcanvas";
        tempCanvas.width = 200;
        tempCanvas.height = 300;
        tempDrag.appendChild(tempCanvas);
        var tempButton = document.createElement("button");
        tempButton.id = "btnChange_" + i;
        tempButton.className = "active btnChange";
        tempDrag.appendChild(tempButton);
        document.body.appendChild(tempDrag);
        setTimeout("new sampleApp(" + i + ")", (i - 2) * 300);
    }
    setTimeout("myDrag()", maxTips * 300);
}

function myDrag()
{
    $(".drag").draggable(
    {
        containment: document.body
    });
}