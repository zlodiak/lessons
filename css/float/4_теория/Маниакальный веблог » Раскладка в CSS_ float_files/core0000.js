function initPreview(url) {
  $(window).keypress(function(e) {
    if (e.ctrlKey && e.keyCode == 37)
      var links = $('a.previous');
    else if (e.ctrlKey && e.keyCode == 39)
      var links = $('a.next');
    else
      return;
    if (e.target.nodeName == 'TEXTAREA' || e.target.nodeName == 'INPUT')
      return;
    links.eq(0).each(function(index) {
      document.location = this.href;
    });
  });

  var preview = $('#preview');
  var usertext = preview.find('.usertext');
  var scroller = document.body.parentNode;
  var timeout;
  var needs_update = '';

  function updatePreview(cont) {
    var textarea = $('#id_text').get(0);
    $.post(url, {
        filter: textarea.form.filter && textarea.form.filter.value,
        text: textarea.value,
      },
      function(value, status) {
        if (status == 'success' && value.status == 'valid') {
          preview.toggle(!!textarea.value);
          var offset = scroller.scrollHeight - scroller.scrollTop;
          usertext.html(value.html);
          scroller.scrollTop = scroller.scrollHeight - offset;
          usertext.find('pre code').each(function() {
            hljs.highlightBlock(this);
          });
        }
        cont();
      },
      'json'
    );
  }

  function scheduleUpdate(source) {
    if (source.nodeName == 'TEXTAREA') {
      if (needs_update == source.value)
        return;
      var textarea = source;
    } else {
      var textarea = $('#id_text').get(0);
    }
    needs_update = textarea.value;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      clearTimeout(timeout);
      updatePreview(function() {
        preview.removeClass('updating');
        if (needs_update != textarea.value && !timeout)
          scheduleUpdate(textarea);
      });
    }, 1000);
    preview.show();
    preview.addClass('updating');
  }

  $('#id_text').keyup(function(e) {
    scheduleUpdate(this);
  });

  $('#id_filter').change(function(e) {
    scheduleUpdate(this);
  });

  // Force update on first load
  updatePreview(function(){});
}

function initAutoIndent(textarea) {
  textarea.keydown(function(e) {
    if (e.keyCode != 13) {
      return;
    }
    var start = this.selectionStart;
    var val = $(this).val();
    var match = val.substring(0, start).match(/(^|\n)([ \t]*)([^\n]*)$/);
    if (!match) {
      return;
    }
    var spaces = match[2];
    var length = spaces.length + 1;
    $(this).val(val.substring(0, start) + '\n' + spaces + val.substr(this.selectionEnd));
    this.setSelectionRange(start + length, start + length);
    return false;
  });
}

$(document).ready(function() {
  $(document.body).addClass('js');
  if (hljs) {
    $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
  }
});
