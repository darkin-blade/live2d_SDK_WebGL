var LAppDefine = new Array();
LAppDefine[0] =
LAppDefine[1] =
LAppDefine[2] =
LAppDefine[3] =
LAppDefine[4] =
LAppDefine[5] =
LAppDefine[6] =
LAppDefine[7] =
LAppDefine[8] =
LAppDefine[9] =
LAppDefine[10] =
LAppDefine[11] =
LAppDefine[12] =
LAppDefine[13] =
LAppDefine[14] =
LAppDefine[15] =
{
    DEBUG_LOG : false,
    /*
    DEBUG_MOUSE_LOG : false, 
    DEBUG_DRAW_HIT_AREA : false, 
    DEBUG_DRAW_ALPHA_MODEL : false, 
    */
    width: 200,
    height: 300,

    VIEW_MAX_SCALE: 1, // 不想用这个功能
    VIEW_MIN_SCALE: 1,

    VIEW_LOGICAL_LEFT: -1,
    VIEW_LOGICAL_RIGHT: 1,

    VIEW_LOGICAL_MAX_LEFT: -2,
    VIEW_LOGICAL_MAX_RIGHT: 2,
    VIEW_LOGICAL_MAX_BOTTOM : -2,
    VIEW_LOGICAL_MAX_TOP : 2,
    
    
    PRIORITY_NONE : 0,
    PRIORITY_IDLE : 1,
    PRIORITY_NORMAL : 2,
    PRIORITY_FORCE : 3,

    
    BACK_IMAGE_NAME : "assets/image/back_class_normal.png",

    MODELS: [ // 注意数组声明方式
        "assets/haru/haru.model.json",
        [
            "assets/haru/haru_01.model.json",
            "assets/haru/haru_02.model.json"
        ],
        "assets/shizuku/shizuku.model.json",
        "assets/wanko/wanko.model.json",
        "assets/Epsilon2.1/Epsilon2.1.model.json",
        [
            // "assets/live2d-hiyori/hiyori.model.json",
            "assets/live2d-hiyori/hiyori_1.model.json",
            "assets/live2d-hiyori/hiyori_2.model.json"
        ]
    ],

    
    MOTION_GROUP_IDLE : "idle", 
    MOTION_GROUP_TAP_BODY : "tap_body", 
    MOTION_GROUP_FLICK_HEAD : "flick_head", 
    MOTION_GROUP_PINCH_IN : "pinch_in", 
    MOTION_GROUP_PINCH_OUT : "pinch_out", 
    MOTION_GROUP_SHAKE : "shake", 

    
    HIT_AREA_HEAD : "head",
    HIT_AREA_BODY : "body"
};

