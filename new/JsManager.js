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
var maxTips = 4;
var thisMy = new Array();

function sampleManager()
{
    var i = 0;
    for (i = minTips; i <= maxTips; i++)
    {
        setTimeout("new sampleApp(" + i + ")", (i - 2) * 300);
    }
}