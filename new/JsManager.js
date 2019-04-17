// API main
document.write("<script src=\"" + "new" + "/live2d.js\"></script>");
document.write("<script src=\"" + "new" + "/LAppDefine.js\"></script>");
document.write("<script src=\"" + "new" + "/Live2DFramework.js\"></script>");
document.write("<script src=\"" + "new" + "/MatrixStack.js\"></script>");
document.write("<script src=\"" + "new" + "/ModelSettingJson.js\"></script>");
document.write("<script src=\"" + "new" + "/PlatformManager.js\"></script>");
document.write("<script src=\"" + "new" + "/LAppModel.js\"></script>");
document.write("<script src=\"" + "new" + "/LAppLive2DManager.js\"></script>");
document.write("<script src=\"" + "new" + "/SampleApp.js\"></script>");

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