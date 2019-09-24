var myDefine = 
{
    DEBUG_LOG : false,
    /*
    DEBUG_MOUSE_LOG : false, 
    DEBUG_DRAW_HIT_AREA : false, 
    DEBUG_DRAW_ALPHA_MODEL : false, 
    */
    width: 200,
    height: 300,

    VIEW_MAX_SCALE: 1.1, // 不想用这个功能
    VIEW_MIN_SCALE: 0.5,

    VIEW_LOGICAL_LEFT: -1,
    VIEW_LOGICAL_RIGHT: 1,

    VIEW_LOGICAL_MAX_LEFT: -2,
    VIEW_LOGICAL_MAX_RIGHT: 2,
    VIEW_LOGICAL_MAX_BOTTOM : -2,
    VIEW_LOGICAL_MAX_TOP : 2,
    
    MODELS : null,
    
    PRIORITY_NONE : 0,
    PRIORITY_IDLE : 1,
    PRIORITY_NORMAL : 2,
    PRIORITY_FORCE : 3,

    // BACK_IMAGE_NAME : "assets/image/back_class_normal.png",
    
    MOTION_GROUP_IDLE : "idle", // 无操作
    MOTION_GROUP_TAP_BODY : "tap_body", // 点击身体
    MOTION_GROUP_FLICK_HEAD : "flick_head", // 切换表情?
    MOTION_GROUP_PINCH_IN : "pinch_in", // 放大至1.5
    MOTION_GROUP_PINCH_OUT : "pinch_out",  // 缩小至0.5
    MOTION_GROUP_SHAKE : "shake", 

    
    HIT_AREA_HEAD : "head",
    HIT_AREA_BODY : "body"
};

var LAppDefine = new Array();

(function (){
    for (var i = minNum; i <= maxNum; i ++)
    {
        LAppDefine[i] = Object.create(myDefine);
        LAppDefine[i].MODELS = [ // 注意数组声明方式
            modelAddress + "Epsilon/Epsilon.model.json",
            modelAddress + "Epsilon2.1/Epsilon2.1.model.json",
        ];
    }
    
}());