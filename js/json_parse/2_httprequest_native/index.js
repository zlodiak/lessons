var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
     var massive = JSON.parse(xmlhttp.responseText);

console.log(massive.news[0].id);
console.log(massive.news[0].img);
console.log(massive.news[0].title);
console.log(massive.news[0].url);
    }
}
xmlhttp.open("GET","http://news.smi2.ru/data/js/81060.js",true);
xmlhttp.send();