function render(template, context) {
  return;

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
  return;
  $.getJSON(apiAddress + "new/tips/tips.json", function (result) {
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


window.setInterval(showHitokoto, 500);

function showHitokoto() {
  return;
  // $.getJSON('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=28&encode=json'
  $.getJSON(apiAddress + "new/tips/fuck.json", function (result) {
    var randf = Math.random() * 1000;
    var randi = Math.floor(randf * 1000);
    var shit_len = result.fuck[0].wrong.length;
    showMessage(result.fuck[0].wrong[randi % shit_len], 5000, randi % (maxNum + 1) + minNum); // 没有仔细算
  });
}

function showMessage(text, timeout, num) {
  return;
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
  return;
  $("#tip_" + num).stop().css('opacity', 1);
  if (timeout === null) timeout = 5000;
  $("#tip_" + num).delay(timeout).fadeTo(200, 0);
}