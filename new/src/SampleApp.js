function sampleApp(num)
{
    this.num = num;
    thisMy[this.num] = this;
    this.mystart();
}

window.onerror = function(msg, url, line, col, error)
{
    var errmsg = "file:" + url + "<br>line:" + line + " " + msg;
    thisMy[this.num].l2dError(errmsg);
}

sampleApp.prototype.mystart = function ()
{
  // console.log("---> sampleApp")
  thisMy[this.num].platform = window.navigator.platform.toLowerCase();
  
  thisMy[this.num].live2DMgr = new LAppLive2DManager(this.num);

  thisMy[this.num].isDrawStart = false;
  
  thisMy[this.num].gl = null;
  thisMy[this.num].canvas = null;
  
  thisMy[this.num].dragMgr = null; /*new L2DTargetPoint();*/ 
  thisMy[this.num].viewMatrix = null; /*new L2DViewMatrix();*/
  thisMy[this.num].projMatrix = null; /*new L2DMatrix44()*/
  thisMy[this.num].deviceToScreen = null; /*new L2DMatrix44();*/
  
  thisMy[this.num].drag = false; 
  thisMy[this.num].oldLen = 0;    
  
  thisMy[this.num].lastMouseX = 0;
  thisMy[this.num].lastMouseY = 0;
  
  thisMy[this.num].isModelShown = false;
  
  thisMy[this.num].initL2dCanvas();
  
  
  thisMy[this.num].init();
}


sampleApp.prototype.initL2dCanvas = function ()
{
  
  thisMy[this.num].canvas = document.getElementById("glcanvas_" + this.num);
  var tempNum = this.num;
  var tempMy = thisMy[tempNum];
  
  if (thisMy[this.num].canvas.addEventListener) 
  {
      thisMy[this.num].canvas.addEventListener("mousewheel", function () { tempMy.mouseEvent() }, false);
      thisMy[this.num].canvas.addEventListener("click", function () { tempMy.mouseEvent() }, false);
      
      thisMy[this.num].canvas.addEventListener("mousedown", function () { tempMy.mouseEvent() }, false);
      document.body.addEventListener("mousemove", function () { tempMy.mouseEvent() }, false);
      
      thisMy[this.num].canvas.addEventListener("mouseup", function () { tempMy.mouseEvent() }, false);
      thisMy[this.num].canvas.addEventListener("mouseout", function () { tempMy.mouseEvent() }, false);
      thisMy[this.num].canvas.addEventListener("contextmenu", function () { tempMy.mouseEvent() }, false);
      
      
      thisMy[this.num].canvas.addEventListener("touchstart", function () { tempMy.touchEvent() }, false);
      thisMy[this.num].canvas.addEventListener("touchend", function () { tempMy.touchEvent() }, false);
      thisMy[this.num].canvas.addEventListener("touchmove", function () { tempMy.touchEvent() }, false);
  }
  
  var btnChangeModel = document.getElementById("btnChange_" + this.num);
  var tempMy = thisMy[this.num];
  btnChangeModel.addEventListener("click", function(e) {
      tempMy.changeModel();
  });
}


sampleApp.prototype.init = function()
{    
  console.log("sampleApp.init_" + this.num + "()")
  
  var width = thisMy[this.num].canvas.width;
  var height = thisMy[this.num].canvas.height;
  thisMy[this.num].lastw = 0;
  thisMy[this.num].lasth = 0;
  thisMy[this.num].lastr = 1;
  
  thisMy[this.num].dragMgr = new L2DTargetPoint(this.num);
  
  
  var ratio = height / width;
  var left = LAppDefine[this.num].VIEW_LOGICAL_LEFT;
  var right = LAppDefine[this.num].VIEW_LOGICAL_RIGHT;
  var bottom = -ratio;
  var top = ratio;
  
  thisMy[this.num].viewMatrix = new L2DViewMatrix(this.num);
  
  
  thisMy[this.num].viewMatrix.setScreenRect(left, right, bottom, top);
  
  
  thisMy[this.num].viewMatrix.setMaxScreenRect(LAppDefine[this.num].VIEW_LOGICAL_MAX_LEFT,
      LAppDefine[this.num].VIEW_LOGICAL_MAX_RIGHT,
                                   LAppDefine[this.num].VIEW_LOGICAL_MAX_BOTTOM,
                                   LAppDefine[this.num].VIEW_LOGICAL_MAX_TOP); 
                                   
                                   thisMy[this.num].viewMatrix.setMaxScale(LAppDefine[this.num].VIEW_MAX_SCALE);
  thisMy[this.num].viewMatrix.setMinScale(LAppDefine[this.num].VIEW_MIN_SCALE);
  
  thisMy[this.num].projMatrix = new L2DMatrix44();
  thisMy[this.num].projMatrix.scale(1, (width / height));
  
  
  thisMy[this.num].deviceToScreen = new L2DMatrix44();
  thisMy[this.num].deviceToScreen.multTranslate(-width / 2.0, -height / 2.0);
  thisMy[this.num].deviceToScreen.multScale(2 / width, -2 / width);
  
  
  
  thisMy[this.num].gl = thisMy[this.num].getWebGLContext(this.num); // 不是属性,需要增加num
  if (!thisMy[this.num].gl) {
      thisMy[this.num].l2dError("Failed to create WebGL context.");
      return;
  }
  
  
  Live2D[this.num].setGL(thisMy[this.num].gl);

  
  thisMy[this.num].gl.clearColor(0.0, 0.0, 0.0, 0.0);

  thisMy[this.num].changeModel();
  
  thisMy[this.num].startDraw();
}

sampleApp.prototype.getWebGLContext = function ()
{
  var NAMES = [ "webgl" , "experimental-webgl" , "webkit-3d" , "moz-webgl"];

  for( var i = 0; i < NAMES.length; i++ ){
      try{
          var ctx = thisMy[this.num].canvas.getContext(NAMES[i], {premultipliedAlpha : true});
          if(ctx) return ctx;
      }
      catch(e){}
  }
  return null;
};


sampleApp.prototype.startDraw = function () {
  if (!thisMy[this.num].isDrawStart) {
    thisMy[this.num].isDrawStart = true;
    var tempMy = thisMy[this.num];
    (function tick() {
      tempMy.draw();

      var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;


      requestAnimationFrame(tick, tempMy.canvas);
    })();
  }
}


sampleApp.prototype.draw = function ()
{
  // thisMy[this.num].l2dLog("--> draw()");

  MatrixStack.reset();
  MatrixStack.loadIdentity();
  
  thisMy[this.num].dragMgr.update(); 
  thisMy[this.num].live2DMgr.setDrag(thisMy[this.num].dragMgr.getX(), thisMy[this.num].dragMgr.getY());
  
  
  thisMy[this.num].gl.clear(thisMy[this.num].gl.COLOR_BUFFER_BIT);
  
  MatrixStack.multMatrix(thisMy[this.num].projMatrix.getArray());
  MatrixStack.multMatrix(thisMy[this.num].viewMatrix.getArray());
  MatrixStack.push();
  
  for (var i = 0; i < thisMy[this.num].live2DMgr.numModels(); i++)
  {
      var model = thisMy[this.num].live2DMgr.getModel(i);

      if(model == null) return;
      
      if (model.initialized && !model.updating)
      {
          model.update();
          model.draw(thisMy[this.num].gl);
          
          if (!thisMy[this.num].isModelShown && i == thisMy[this.num].live2DMgr.numModels()-1) {
              thisMy[this.num].isModelShown = !thisMy[this.num].isModelShown;
              var btnChange = document.getElementById("btnChange_" + this.num);
              btnChange.textContent = "change";
              btnChange.removeAttribute("disabled");
              btnChange.setAttribute("class", "btnChange"); // 切换class
          }
      }
  }
  
  MatrixStack.pop();
}


sampleApp.prototype.changeModel = function ()
{
  var btnChange = document.getElementById("btnChange_" + this.num);
  btnChange.setAttribute("disabled", "disabled");
  btnChange.setAttribute("class", "btnChanging"); // 切换class
  btnChange.textContent = "loading";
  thisMy[this.num].isModelShown = false;
  
  thisMy[this.num].live2DMgr.reloadFlg = true;
  thisMy[this.num].live2DMgr.count++;

  thisMy[this.num].live2DMgr.changeModel(thisMy[this.num].gl);
}


sampleApp.prototype.modelScaling = function (scale)
{  
  var isMaxScale = thisMy[this.num].viewMatrix.isMaxScale();
  var isMinScale = thisMy[this.num].viewMatrix.isMinScale();
  
  thisMy[this.num].viewMatrix.adjustScale(0, 0, scale);

  
  if (!isMaxScale)
  {
      if (thisMy[this.num].viewMatrix.isMaxScale())
      {
          thisMy[this.num].live2DMgr.maxScaleEvent();
      }
  }
  
  if (!isMinScale)
  {
      if (thisMy[this.num].viewMatrix.isMinScale())
      {
          thisMy[this.num].live2DMgr.minScaleEvent();
      }
  }
}



sampleApp.prototype.modelTurnHead = function (event)
{
  thisMy[this.num].drag = true;
  
  var rect = event.target.getBoundingClientRect();
  
  var sx = thisMy[this.num].transformScreenX(event.clientX - rect.left);
  var sy = thisMy[this.num].transformScreenY(event.clientY - rect.top);
  var vx = thisMy[this.num].transformViewX(event.clientX - rect.left);
  var vy = thisMy[this.num].transformViewY(event.clientY - rect.top);
  
  if (LAppDefine[this.num].DEBUG_MOUSE_LOG)
      thisMy[this.num].l2dLog("onMouseDown device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

  thisMy[this.num].lastMouseX = sx;
  thisMy[this.num].lastMouseY = sy;

  thisMy[this.num].dragMgr.setPoint(vx, vy); 
  
  
  thisMy[this.num].live2DMgr.tapEvent(vx, vy);
}



sampleApp.prototype.followPointer = function (event)
{    
  if (thisMy[this.num] == null)
  {
    return;
  }
  // var rect = event.target.getBoundingClientRect();
  var the_div = document.getElementById("drag_" + this.num);

  var cx = event.clientX; 
  var cy = event.clientY;
  var rleft = the_div.offsetLeft;
  var rtop = the_div.offsetTop;  
  var sx = thisMy[this.num].transformScreenX(cx - rleft);
  var sy = thisMy[this.num].transformScreenY(cy - rtop);
  var vx = thisMy[this.num].transformViewX(cx - rleft);
  var vy = thisMy[this.num].transformViewY(cy - rtop);
  
  if (LAppDefine[this.num].DEBUG_MOUSE_LOG)
      thisMy[this.num].l2dLog("onMouseMove device( x:" + cx + " y:" + cy + " ) view( x:" + vx + " y:" + vy + ")");

  // if (thisMy[this.num].drag)
  thisMy[this.num].lastMouseX = sx;
  thisMy[this.num].lastMouseY = sy;

  thisMy[this.num].dragMgr.setPoint(vx, vy); 
}



sampleApp.prototype.lookFront = function()
{   
  if (thisMy[this.num].drag)
  {
      thisMy[this.num].drag = false;
  }

  thisMy[this.num].dragMgr.setPoint(0, 0);
}


sampleApp.prototype.mouseEvent = function ()
{
  var e = window.event;
  e.preventDefault(); // 防止页面滚动

  if (e.type == "mousewheel") {
    if (e.clientX < 0 || e.clientY < 0) {
      return;
    }

    if (e.wheelDelta > 0) thisMy[this.num].modelScaling(1.1);
    else thisMy[this.num].modelScaling(0.9);

  } else if (e.type == "mousedown") {

    if ("button" in e && e.button != 0) return;

    thisMy[this.num].modelTurnHead(e);

  } else if (e.type == "mousemove") {

    thisMy[this.num].followPointer(e);

  } else if (e.type == "mouseup") {

    if ("button" in e && e.button != 0) return;

    thisMy[this.num].lookFront();

  } else if (e.type == "mouseout") {

    thisMy[this.num].lookFront();

  } else if (e.type == "contextmenu") {

    thisMy[this.num].changeModel();
  }

}


sampleApp.prototype.touchEvent = function ()
{
  var e = window.event;
  e.preventDefault(); // 防止页面滚动

  var touch = e.touches[0];

  if (e.type == "touchstart") {
    if (e.touches.length == 1) thisMy[this.num].modelTurnHead(touch);
    // onClick(touch);

  } else if (e.type == "touchmove") {
    thisMy[this.num].followPointer(touch);

    if (e.touches.length == 2) {
      var touch1 = e.touches[0];
      var touch2 = e.touches[1];

      var len = Math.pow(touch1.pageX - touch2.pageX, 2) + Math.pow(touch1.pageY - touch2.pageY, 2);
      if (thisMy[this.num].oldLen - len < 0) thisMy[this.num].modelScaling(1.025);
      else thisMy[this.num].modelScaling(0.975);

      thisMy[this.num].oldLen = len;
    }

  } else if (e.type == "touchend") {
    thisMy[this.num].lookFront();
  }
}




sampleApp.prototype.transformViewX = function (deviceX)
{
  var screenX = thisMy[this.num].deviceToScreen.transformX(deviceX); 
  return thisMy[this.num].viewMatrix.invertTransformX(screenX); 
}


sampleApp.prototype.transformViewY = function (deviceY)
{
  var screenY = thisMy[this.num].deviceToScreen.transformY(deviceY); 
  return thisMy[this.num].viewMatrix.invertTransformY(screenY); 
}


sampleApp.prototype.transformScreenX = function (deviceX)
{
  return thisMy[this.num].deviceToScreen.transformX(deviceX);
}


sampleApp.prototype.transformScreenY = function (deviceY)
{
  return thisMy[this.num].deviceToScreen.transformY(deviceY);
}





sampleApp.prototype.l2dLog = function (msg) {
  if(!LAppDefine[this.num].DEBUG_LOG) return;
  
  var myconsole = document.getElementById("myconsole");
  myconsole.innerHTML = myconsole.innerHTML + "<br>" + msg;
  
  console.log(msg);
}



sampleApp.prototype.l2dError = function (msg)
{
  if(!LAppDefine[this.num].DEBUG_LOG) return;
  
  thisMy[this.num].l2dLog( "<span style='color:red'>" + msg + "</span>");
  
  console.error(msg);
};