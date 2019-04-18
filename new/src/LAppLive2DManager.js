function LAppLive2DManager(num)
{
    // console.log("--> LAppLive2DManager()");
    
    this.num = num;
    this.models = [];  
    
    
    this.count = -1;
    this.reloadFlg = false; 
    
    Live2D[this.num].init();
    Live2DFramework.setPlatformManager((new PlatformManager(this.num)), this.num);
    
}

LAppLive2DManager.prototype.createModel = function()
{
    // console.log("--> LAppLive2DManager.prototype.createModel")
    
    var model = new LAppModel(this.num);
    this.models.push(model);
    
    return model;
}


LAppLive2DManager.prototype.changeModel = function(gl)
{
    // console.log("--> LAppLive2DManager.update(gl)// (changeModel)");
    var tempNum = this.num;
    
    if (this.reloadFlg)
    {
        
        this.reloadFlg = false;
        var last_no = parseInt((this.count + LAppDefine[tempNum].MODELS.length - 1) % LAppDefine[tempNum].MODELS.length);
        var cur_no = parseInt(this.count % LAppDefine[tempNum].MODELS.length);

        if (Array.isArray(LAppDefine[tempNum].MODELS[last_no]))
        {
            for (var i = LAppDefine[tempNum].MODELS[last_no].length - 1; i >= 0; i --)
            {
                this.releaseModel(i, gl);
            }
        }
        else
        {
            this.releaseModel(0, gl);
        }
        if (Array.isArray(LAppDefine[tempNum].MODELS[cur_no]))
        {
            thisRef = this;
            this.createModel();
            this.models[0].load(gl, LAppDefine[tempNum].MODELS[cur_no][0], function () {
                for (var i = 1; i < LAppDefine[tempNum].MODELS[cur_no].length; i ++)
                {
                    thisRef.createModel();
                    thisRef.models[i].load(gl, LAppDefine[tempNum].MODELS[cur_no][i]);
                }
            })
        }
        else
        {
            this.createModel();
            this.models[0].load(gl, LAppDefine[tempNum].MODELS[cur_no]);
        }
    }
}

LAppLive2DManager.prototype.getModel = function(no)
{
    // console.log("--> LAppLive2DManager.getModel(" + no + ")");
    
    if (no >= this.models.length) return null;
    
    return this.models[no];
};



LAppLive2DManager.prototype.releaseModel = function(no, gl)
{
    // console.log("--> LAppLive2DManager.releaseModel(" + no + ")");
    
    if (this.models.length <= no) return;

    this.models[no].release(gl);
    
    delete this.models[no];
    this.models.splice(no, 1);
};



LAppLive2DManager.prototype.numModels = function()
{
    return this.models.length;
};



LAppLive2DManager.prototype.setDrag = function(x, y)
{
    for (var i = 0; i < this.models.length; i++)
    {
        this.models[i].setDrag(x, y);
    }
}



LAppLive2DManager.prototype.maxScaleEvent = function()
{
    if (LAppDefine[this.num].DEBUG_LOG)
        console.log("Max scale event.");
    for (var i = 0; i < this.models.length; i++)
    {
        this.models[i].startRandomMotion(LAppDefine[this.num].MOTION_GROUP_PINCH_IN,
                                         LAppDefine[this.num].PRIORITY_NORMAL);
    }
}



LAppLive2DManager.prototype.minScaleEvent = function()
{
    if (LAppDefine[this.num].DEBUG_LOG)
        console.log("Min scale event.");
    for (var i = 0; i < this.models.length; i++)
    {
        this.models[i].startRandomMotion(LAppDefine[this.num].MOTION_GROUP_PINCH_OUT,
                                         LAppDefine[this.num].PRIORITY_NORMAL);
    }
}



LAppLive2DManager.prototype.tapEvent = function(x, y)
{    
    if (LAppDefine[this.num].DEBUG_LOG)
        console.log("tapEvent view x:" + x + " y:" + y);

    for (var i = 0; i < this.models.length; i++)
    {

        if (this.models[i].hitTest(LAppDefine[this.num].HIT_AREA_HEAD, x, y))
        {
            
            if (LAppDefine[this.num].DEBUG_LOG)
                console.log("Tap face.");

            this.models[i].setRandomExpression();
        }
        else if (this.models[i].hitTest(LAppDefine[this.num].HIT_AREA_BODY, x, y))
        {
            
            if (LAppDefine[this.num].DEBUG_LOG)
                console.log("Tap body." + " models[" + i + "]");

            this.models[i].startRandomMotion(LAppDefine[this.num].MOTION_GROUP_TAP_BODY,
                                             LAppDefine[this.num].PRIORITY_NORMAL);
        }
        else if (this.models[i].hitTest(LAppDefine[this.num].HIT_AREA_SHIT, x, y))
        {
            
            if (LAppDefine[this.num].DEBUG_LOG)
                console.log("Tap SHIT." + " models[" + i + "]");

            this.models[i].startRandomMotion(LAppDefine[this.num].MOTION_GROUP_TAP_SHIT,
                                             LAppDefine[this.num].PRIORITY_NORMAL);
        }
    }

    return true;
};

