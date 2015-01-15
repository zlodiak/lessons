window.onload = function() {
  var s = document.getElementById('menu').getElementsByTagName('span');
  var li = document.getElementById('menu').getElementsByTagName('li');

  for (var i = 0; i < s.length; i++) {
    s[i].onclick = function() {
      for (var j = 0; j < li.length; j++) {
        li[j].className = 'm_hide';
      }
      this.parentNode.className = 'm_show';
    }
  }
}
