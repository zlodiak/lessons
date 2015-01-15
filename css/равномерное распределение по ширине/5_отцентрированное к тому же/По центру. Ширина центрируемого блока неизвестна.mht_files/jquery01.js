/*
 �������� ���� ������ ���������� � ��������� � ��� �����.
���������� ��������� ����� ������ ��� ����� �� ���.
 - �������� ��������� ������� ��������� (������/������).
 - ���� ���������� � ���� ������ ����, �� ����� ���������������
  ��� �������������, � ����������� �� �������� ���������.
 - ��� �������� � ������ ���� �� ������ ��������� ��������� (.current)
  � ������� �� ��������� ����.
 - ���������� ��������� ���� � ���������� � �������� ��������������
  ����� �� ���������� ���� ����� ������.
 - ���������� ��������� ����� (����./����.) � ��������� ���� � cookies.
 - ��� ������������� cookies ��������� ����� ����������������� ��� ��������.
*/
//=================================================================================

$(document).ready(function () {
 /*  ����������� ������� �� �����, ������ ������ ���� ���������.
  �������� �������� 'li' ������� ����� ��������� 'ul', ������ ��� ���
  ������, �.�. ������� � ���� 'li' ��������� ��� 'a'
  � � ���� ���������� ������ '<em class="marker"></em>'.
  a:first ������������, ����� ����� ���� 1�� ������ �����������
  ������� �� ����������� ��������.
*/
 var root = $('.menujs');
 // ���������� �������������� ���� �����, �������� ��������� (Nested set)
 $('li', root).each(function (index) {
    this.id = 'n' + index;
 });
 $('li:has("ul")', root).find('a:first').prepend('<em class="marker"></em>');
 
 // ������� ������� ����
 var current_id = $.cookie('current_node');
 if(current_id) $('#'+current_id).find('a:first').toggleClass('current');

 // ������ ������� �� ���� �� ������
 //-----------------------------------
 $('li span', root).click(function () {
    // ������� ��������� ����������� ����
    $('a.current', root).removeClass('current');
    var a = $('a:first',this.parentNode);
    a.toggleClass('current');//������ �������� � ���� ������
    var current_id = a.parent('li').attr('id');
    //alert(a.parents('li').get(0).tagName+"#"+a.parents('li').attr('id'));

    setCookie('current_node',a.parents('li').attr('id') || null);

    // �������� ��������� ����

    toggleNode(this.parentNode);
 });
 //postLoad(); // ������� ��������� �� �������� url
 openNodes(); // ������� �� ������ cookie
})

//---------------------------------------------------------------------------------
// ������� ������� �������������� ������ � ���������
function toggleNode(Node) {// node= li
 prepareLast(Node); 
 // �������� ��������� ���� � ��������� ��������� �������
 var ul=$('ul:first',Node);// ������� ���������
 if (ul.length) {// ��������� ����
    ul.slideToggle(200); //�������� ��� ����������
    // ������ ���������� ������� �� �������/�������
    var em=$('em:first',Node);// this = 'li span'
    // ���� em.hasClass('open')?em.removeClass('open'):em.addClass('open');
    em.toggleClass('open'); 
    saveTreeState();
 }     
}

// ������� ��������� ���������� ���� � ������
function prepareLast(Node) {
 /* ���� ��� ��������� ���� ������, �� �������������� ����� � ����������
�������� �� ����� */
 $(Node).each(function(){
    if (!$(this).next().length) {
       /* ����� ������ ������������ <li>, � ��� ������� ��������� <ul>,
          �������� ������ �������� ul > li, ��������� �� ����� 'last' */
       $(this).find('ul:first > li').addClass('last');
    }  
 }) 
}
// ������� �������������� ������ �� ��������� ����� ������
function postLoad(){
 var url = window.location.toString();
 var max = 0;
 var a = null;
 $('.menujs li span a').each(function(){
    // ���������� ����� �������� � ������ �� ��������
    if(url.indexOf(this.href) >= 0 && this.href.length > max){
       a = this;
       max = this.href.length; 
    }
 });
 // ���� ���� �� �����, �� ������������� ������
 if ($(a).is(':hidden') || $(a).parents(':hidden').length) {
    var li = $(a).parents().filter('li');
    prepareLast(li);
    toggleNode(li);
 }
 // ������� ��������� ����
 if (a) {
    $(a).toggleClass('current');
 }
 else { // ������ �����, ������� ������ ������ (����� ������ ���� �� �����)
    $('.menujs li span a:first').toggleClass('current');
 }
}

// ���������� ���������� � ����������� �����
function GetOpenedNodes(items){ // li:has('ul')
  var str = [];
  $(items).each(function() {
    var res = $(this).attr('id');
    var state = $('em:first',this).hasClass('open') ? 1 : '';
    if(res && state){ 
      str.push(res);
    }
  });
  return str.join(',');
}

// ��������� ������ ������ �������� �����
function saveTreeState(){ 
  var open_id = GetOpenedNodes($('.menujs li:has("ul")')) || null;
  setCookie("open_nodes", open_id);
  return false;
} 

// ��������� ����� �� ���������� ������
function openNodes(){
   // ������ ���� � ��������� ����
  var open_nodes = $.cookie("open_nodes");
    if(open_nodes) {
    var nodes = open_nodes.split(',');
    
    if(nodes[0]){ 
      for(var node in nodes){
        nodes[node] = '#' + nodes[node];   
      }
      var ids = nodes.join(',');
      $(ids).each(function() {
         toggleNode($(this));
      });
    }
  }
  return false;
}

// ��������� ������� � Cookies 1 ����
function setCookie(name, value){
  var DAY = 24 * 60 * 60 * 1000;
  var date = new Date();
  date.setTime(date.getTime() + (1 * DAY)); // 1 день 
  $.cookie(name, value, {expires: date});
  // alert("Cookie set: "+name+"="+value);
}

