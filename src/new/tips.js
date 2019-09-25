function Tips(num)
{// 将提示框与序号绑定
  this.num = num;
}

Tips.prototype.init = function ()
{
  $(document).on('copy', function () {// 复制(ctrl+c)
    showMessage("copy", 6000, this.num);
  });

  this.welcome();
  this.getJson();

  var tempThis = this;
  window.tips[this.num] = setInterval(function () {
    tempThis.showHitokoto(tempThis.num) }, 2000);// 无限鸡汤
}

Tips.prototype.welcome = function ()
{// 第一句话
  var text;
  if (document.referrer !== '') {// 通过搜索引擎访问
    var referrer = document.createElement('a');
    referrer.href = document.referrer;
    var domain = referrer.hostname.split('.')[1];// 获取搜索引擎
    text = 'you are from ' + domain;
  } else {
    if (window.location.href == '') {// 如果是主页
      var cur_time = (new Date()).getHours();// 获取时间
      text = 'it is ' + cur_time + " now";
    } else {
      text = 'welcome to' + document.title + '';// 获取标题
    }
  }
  this.showMessage(text, 3000, this.num);
};

Tips.prototype.getJson = function ()// 删除了原api的render函数,不知道有没有影响
{// 对固定事件绑定tips
  var tempThis = this;
  $.getJSON(tipAddress + "tips.json", function (result) {
    $.each(result.mouseover, function (index, tips) {
      $(document).on("mouseover", tips.selector, function () {
        var text = tips.text;
        if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
        tempThis.showMessage(text, 3000, this.num);
      });
    });
    $.each(result.click, function (index, tips) {
      $(document).on("click", tips.selector, function () {
        var text = tips.text;
        if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
        tempThis.showMessage(text, 3000, this.num);
      });
    });
  });
}

Tips.prototype.showHitokoto = function (num)
{// 从文件/api获取随机tips
  // $.getJSON('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=28&encode=json'
  $.getJSON(tipAddress + "/fuck.json", function (result) {
    var randf = Math.random() * 1000;
    var randi = Math.floor(randf * 1000);
    var shit_len = result.fuck[0].wrong.length;
    thisMy[num].tips.showMessage(result.fuck[0].wrong[randi % shit_len], 5000); // 没有仔细算
  });
}

Tips.prototype.showMessage = function (text, timeout)
{// TODO 显示的对应编号
  var tempTip = document.getElementById("tip_" + this.num);
  if (tempTip != null && tempTip.mystop == 1) return;
  if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1]; // 如果有多条tips

  $("#tip_" + this.num).stop();
  $("#tip_" + this.num).html(text).fadeTo(200, 1);
  if (timeout === null) timeout = 5000;
  this.hideMessage(timeout, this.num);
}

Tips.prototype.hideMessage = function (timeout)
{
  $("#tip_" + this.num).stop().css('opacity', 1);
  if (timeout === null) timeout = 5000;
  $("#tip_" + this.num).delay(timeout).fadeTo(200, 0);
}

Tips.prototype.delete = function ()
{
  window.clearInterval(window.tips[this.num]);// 取消无限鸡汤
}