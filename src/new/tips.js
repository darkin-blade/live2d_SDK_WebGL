function render(template, context) {

  var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

  return template.replace(tokenReg, function (word, slash1, token, slash2) {
    if (slash1 || slash2) {
      return word.replace('\\', '');
    }

    var variables = token.replace(/\s/g, '').split('.');
    var currentObject = context;
    var i, length, variable;

    for (i = 0, length = variables.length; i < length; ++i) {
      variable = variables[i];
      currentObject = currentObject[variable];
      if (currentObject === undefined || currentObject === null) return '';
    }
    return currentObject;
  });
}

String.prototype.render = function (context) {
  return render(this, context);
};

var re = /x/;
console.log(re);
re.toString = function () {
  showMessage(text, 6000, -1);
  return '';
};

$(document).on('copy', function () {
  showMessage(text, 6000, -1);
});

(function () {
  $.getJSON(tipAddress + "tips.json", function (result) {
    $.each(result.mouseover, function (index, tips) {
      $(document).on("mouseover", tips.selector, function () {
        var temp_num = Number(tips.selector[tips.selector.length - 1]);
        var text = tips.text;
        if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
        text = text.render({
          text: $(this).text()
        });
        showMessage(text, 3000, temp_num);
      });
    });
    $.each(result.click, function (index, tips) {
      $(document).on("click", tips.selector, function () {
        var temp_num = Number(tips.selector[tips.selector.length - 1]);
        var text = tips.text;
        if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
        text = text.render({
          text: $(this).text()
        });
        showMessage(text, 3000, temp_num);
      });
    });
  });
})();

(function () {
  var text;
  if (document.referrer !== '') {
    var referrer = document.createElement('a');
    referrer.href = document.referrer;
    text = 'Hello! 来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友';
    var domain = referrer.hostname.split('.')[1];
    if (domain == 'baidu') {
      text = 'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
    } else if (domain == 'so') {
      text = 'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
    } else if (domain == 'google') {
      text = 'Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
    }
  } else {
    if (window.location.href == 'https://imjad.cn/') { //如果是主页
      var now = (new Date()).getHours();
      if (now > 23 || now <= 5) {
        text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
      } else if (now > 5 && now <= 7) {
        text = '早上好！一日之计在于晨，美好的一天就要开始了';
      } else if (now > 7 && now <= 11) {
        text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
      } else if (now > 11 && now <= 14) {
        text = '中午了，工作了一个上午，现在是午餐时间！';
      } else if (now > 14 && now <= 17) {
        text = '午后很容易犯困呢，今天的运动目标完成了吗？';
      } else if (now > 17 && now <= 19) {
        text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
      } else if (now > 19 && now <= 21) {
        text = '晚上好，今天过得怎么样？';
      } else if (now > 21 && now <= 23) {
        text = '已经这么晚了呀，早点休息吧，晚安~';
      } else {
        text = '嗨~ 快来逗我玩吧！';
      }
    } else {
      text = '欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
    }
  }
  showMessage(text, 3000, -1);
})();

window.setInterval(showHitokoto, 500);

function showHitokoto() {
  // $.getJSON('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=28&encode=json'
  $.getJSON(tipAddress + "/fuck.json", function (result) {
    var randf = Math.random() * 1000;
    var randi = Math.floor(randf * 1000);
    var shit_len = result.fuck[0].wrong.length;
    showMessage(result.fuck[0].wrong[randi % shit_len], 5000, randi % (maxNum + 1) + minNum); // 没有仔细算
  });
}

function showMessage(text, timeout, num) {
  var tempTip = document.getElementById("tip_" + num);
  if (tempTip != null && tempTip.mystop == 1) return;
  if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];
  if (num == -1) {
    for (num = minNum; num <= maxNum; num++) {
      $("#tip_" + num).stop();
      $("#tip_" + num).html(text).fadeTo(200, 1);
      if (timeout === null) timeout = 5000;
      hideMessage(timeout, num);
    }
  } else {
    $("#tip_" + num).stop();
    $("#tip_" + num).html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout, num);
  }
}

function hideMessage(timeout, num) {
  $("#tip_" + num).stop().css('opacity', 1);
  if (timeout === null) timeout = 5000;
  $("#tip_" + num).delay(timeout).fadeTo(200, 0);
}