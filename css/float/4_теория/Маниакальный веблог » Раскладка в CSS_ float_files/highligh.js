var hljs=new function(){function l(o){return o.replace(/&/gm,"&amp;").replace(/</gm,"&lt;")}function c(q,p,o){return RegExp(p,"m"+(q.cI?"i":"")+(o?"g":""))}function i(q){for(var o=0;o<q.childNodes.length;o++){var p=q.childNodes[o];if(p.nodeName=="CODE"){return p}if(!(p.nodeType==3&&p.nodeValue.match(/\s+/))){break}}}function g(s,r){var q="";for(var p=0;p<s.childNodes.length;p++){if(s.childNodes[p].nodeType==3){var o=s.childNodes[p].nodeValue;if(r){o=o.replace(/\n/g,"")}q+=o}else{if(s.childNodes[p].nodeName=="BR"){q+="\n"}else{q+=g(s.childNodes[p])}}}if(/MSIE [678]/.test(navigator.userAgent)){q=q.replace(/\r/g,"\n")}return q}function a(r){var p=r.className.split(/\s+/);p=p.concat(r.parentNode.className.split(/\s+/));for(var o=0;o<p.length;o++){var q=p[o].replace(/^language-/,"");if(d[q]||q=="no-highlight"){return q}}}function b(o){var p=[];(function(r,s){for(var q=0;q<r.childNodes.length;q++){if(r.childNodes[q].nodeType==3){s+=r.childNodes[q].nodeValue.length}else{if(r.childNodes[q].nodeName=="BR"){s+=1}else{p.push({event:"start",offset:s,node:r.childNodes[q]});s=arguments.callee(r.childNodes[q],s);p.push({event:"stop",offset:s,node:r.childNodes[q]})}}}return s})(o,0);return p}function k(x,y,w){var q=0;var v="";var s=[];function t(){if(x.length&&y.length){if(x[0].offset!=y[0].offset){return(x[0].offset<y[0].offset)?x:y}else{return y[0].event=="start"?x:y}}else{return x.length?x:y}}function r(B){var C="<"+B.nodeName.toLowerCase();for(var z=0;z<B.attributes.length;z++){var A=B.attributes[z];C+=" "+A.nodeName.toLowerCase();if(A.nodeValue!=undefined){C+='="'+l(A.nodeValue)+'"'}}return C+">"}while(x.length||y.length){var u=t().splice(0,1)[0];v+=l(w.substr(q,u.offset-q));q=u.offset;if(u.event=="start"){v+=r(u.node);s.push(u.node)}else{if(u.event=="stop"){var p=s.length;do{p--;var o=s[p];v+=("</"+o.nodeName.toLowerCase()+">")}while(o!=u.node);s.splice(p,1);while(p<s.length){v+=r(s[p]);p++}}}}v+=w.substr(q);return v}function f(I,C){function y(r,L){for(var K=0;K<L.c.length;K++){if(L.c[K].bR.test(r)){return L.c[K]}}}function v(K,r){if(B[K].e&&B[K].eR.test(r)){return 1}if(B[K].eW){var L=v(K-1,r);return L?L+1:0}return 0}function w(r,K){return K.iR&&K.iR.test(r)}function z(N,M){var L=[];for(var K=0;K<N.c.length;K++){L.push(N.c[K].b)}var r=B.length-1;do{if(B[r].e){L.push(B[r].e)}r--}while(B[r+1].eW);if(N.i){L.push(N.i)}return c(M,"("+L.join("|")+")",true)}function q(L,K){var M=B[B.length-1];if(!M.t){M.t=z(M,G)}M.t.lastIndex=K;var r=M.t.exec(L);if(r){return[L.substr(K,r.index-K),r[0],false]}else{return[L.substr(K),"",true]}}function o(N,r){var K=G.cI?r[0].toLowerCase():r[0];for(var M in N.kG){if(!N.kG.hasOwnProperty(M)){continue}var L=N.kG[M].hasOwnProperty(K);if(L){return[M,L]}}return false}function E(L,N){if(!N.k){return l(L)}var M="";var O=0;N.lR.lastIndex=0;var K=N.lR.exec(L);while(K){M+=l(L.substr(O,K.index-O));var r=o(N,K);if(r){s+=r[1];M+='<span class="'+r[0]+'">'+l(K[0])+"</span>"}else{M+=l(K[0])}O=N.lR.lastIndex;K=N.lR.exec(L)}M+=l(L.substr(O,L.length-O));return M}function J(r,L){if(L.sL&&d[L.sL]){var K=f(L.sL,r);s+=K.keyword_count;return K.value}else{return E(r,L)}}function H(L,r){var K=L.cN?'<span class="'+L.cN+'">':"";if(L.rB){p+=K;L.buffer=""}else{if(L.eB){p+=l(r)+K;L.buffer=""}else{p+=K;L.buffer=r}}B.push(L);A+=L.r}function D(N,K,P){var Q=B[B.length-1];if(P){p+=J(Q.buffer+N,Q);return false}var L=y(K,Q);if(L){p+=J(Q.buffer+N,Q);H(L,K);return L.rB}var r=v(B.length-1,K);if(r){var M=Q.cN?"</span>":"";if(Q.rE){p+=J(Q.buffer+N,Q)+M}else{if(Q.eE){p+=J(Q.buffer+N,Q)+M+l(K)}else{p+=J(Q.buffer+N+K,Q)+M}}while(r>1){M=B[B.length-2].cN?"</span>":"";p+=M;r--;B.length--}var O=B[B.length-1];B.length--;B[B.length-1].buffer="";if(O.starts){H(O.starts,"")}return Q.rE}if(w(K,Q)){throw"Illegal"}}var G=d[I];var B=[G.dM];var A=0;var s=0;var p="";try{var u=0;G.dM.buffer="";do{var x=q(C,u);var t=D(x[0],x[1],x[2]);u+=x[0].length;if(!t){u+=x[1].length}}while(!x[2]);if(B.length>1){throw"Illegal"}return{language:I,r:A,keyword_count:s,value:p}}catch(F){if(F=="Illegal"){return{language:null,r:0,keyword_count:0,value:l(C)}}else{throw F}}}function h(){function o(t,s,u){if(t.compiled){return}if(!u){t.bR=c(s,t.b?t.b:"\\B|\\b");if(!t.e&&!t.eW){t.e="\\B|\\b"}if(t.e){t.eR=c(s,t.e)}}if(t.i){t.iR=c(s,t.i)}if(t.r==undefined){t.r=1}if(t.k){t.lR=c(s,t.l||hljs.IR,true)}for(var r in t.k){if(!t.k.hasOwnProperty(r)){continue}if(t.k[r] instanceof Object){t.kG=t.k}else{t.kG={keyword:t.k}}break}if(!t.c){t.c=[]}t.compiled=true;for(var q=0;q<t.c.length;q++){o(t.c[q],s,false)}if(t.starts){o(t.starts,s,false)}}for(var p in d){if(!d.hasOwnProperty(p)){continue}o(d[p].dM,d[p],true)}}function e(){if(e.called){return}e.called=true;h()}function n(t,y,p){e();var A=g(t,p);var r=a(t);if(r=="no-highlight"){return}if(r){var w=f(r,A)}else{var w={language:"",keyword_count:0,r:0,value:l(A)};var x=w;for(var z in d){if(!d.hasOwnProperty(z)){continue}var u=f(z,A);if(u.keyword_count+u.r>x.keyword_count+x.r){x=u}if(u.keyword_count+u.r>w.keyword_count+w.r){x=w;w=u}}}var s=t.className;if(!s.match(w.language)){s=s?(s+" "+w.language):w.language}var o=b(t);if(o.length){var q=document.createElement("pre");q.innerHTML=w.value;w.value=k(o,b(q),A)}if(y){w.value=w.value.replace(/^((<[^>]+>|\t)+)/gm,function(B,E,D,C){return E.replace(/\t/g,y)})}if(p){w.value=w.value.replace(/\n/g,"<br>")}if(/MSIE [678]/.test(navigator.userAgent)&&t.tagName=="CODE"&&t.parentNode.tagName=="PRE"){var q=t.parentNode;var v=document.createElement("div");v.innerHTML="<pre><code>"+w.value+"</code></pre>";t=v.firstChild.firstChild;v.firstChild.cN=q.cN;q.parentNode.replaceChild(v.firstChild,q)}else{t.innerHTML=w.value}t.className=s;t.dataset={};t.dataset.result={language:w.language,kw:w.keyword_count,re:w.r};if(x&&x.language){t.dataset.second_best={language:x.language,kw:x.keyword_count,re:x.r}}}function j(){if(j.called){return}j.called=true;e();var q=document.getElementsByTagName("pre");for(var o=0;o<q.length;o++){var p=i(q[o]);if(p){n(p,hljs.tabReplace)}}}function m(){var o=arguments;var p=function(){j.apply(null,o)};if(window.addEventListener){window.addEventListener("DOMContentLoaded",p,false);window.addEventListener("load",p,false)}else{if(window.attachEvent){window.attachEvent("onload",p)}else{window.onload=p}}}var d={};this.LANGUAGES=d;this.initHighlightingOnLoad=m;this.highlightBlock=n;this.initHighlighting=j;this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.BE={b:"\\\\.",r:0};this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE],r:0};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE],r:0};this.CLCM={cN:"comment",b:"//",e:"$"};this.CBLCLM={cN:"comment",b:"/\\*",e:"\\*/"};this.HCM={cN:"comment",b:"#",e:"$"};this.NM={cN:"number",b:this.NR,r:0};this.CNM={cN:"number",b:this.CNR,r:0};this.inherit=function(o,r){var q={};for(var p in o){q[p]=o[p]}if(r){for(var p in r){q[p]=r[p]}}return q}}();hljs.LANGUAGES.ruby=function(){var g="[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?";var a="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";var n={keyword:{and:1,"false":1,then:1,defined:1,module:1,"in":1,"return":1,redo:1,"if":1,BEGIN:1,retry:1,end:1,"for":1,"true":1,self:1,when:1,next:1,until:1,"do":1,begin:1,unless:1,END:1,rescue:1,nil:1,"else":1,"break":1,undef:1,not:1,"super":1,"class":1,"case":1,require:1,yield:1,alias:1,"while":1,ensure:1,elsif:1,or:1,def:1},keymethods:{__id__:1,__send__:1,abort:1,abs:1,"all?":1,allocate:1,ancestors:1,"any?":1,arity:1,assoc:1,at:1,at_exit:1,autoload:1,"autoload?":1,"between?":1,binding:1,binmode:1,"block_given?":1,call:1,callcc:1,caller:1,capitalize:1,"capitalize!":1,casecmp:1,"catch":1,ceil:1,center:1,chomp:1,"chomp!":1,chop:1,"chop!":1,chr:1,"class":1,class_eval:1,"class_variable_defined?":1,class_variables:1,clear:1,clone:1,close:1,close_read:1,close_write:1,"closed?":1,coerce:1,collect:1,"collect!":1,compact:1,"compact!":1,concat:1,"const_defined?":1,const_get:1,const_missing:1,const_set:1,constants:1,count:1,crypt:1,"default":1,default_proc:1,"delete":1,"delete!":1,delete_at:1,delete_if:1,detect:1,display:1,div:1,divmod:1,downcase:1,"downcase!":1,downto:1,dump:1,dup:1,each:1,each_byte:1,each_index:1,each_key:1,each_line:1,each_pair:1,each_value:1,each_with_index:1,"empty?":1,entries:1,eof:1,"eof?":1,"eql?":1,"equal?":1,"eval":1,exec:1,exit:1,"exit!":1,extend:1,fail:1,fcntl:1,fetch:1,fileno:1,fill:1,find:1,find_all:1,first:1,flatten:1,"flatten!":1,floor:1,flush:1,for_fd:1,foreach:1,fork:1,format:1,freeze:1,"frozen?":1,fsync:1,getc:1,gets:1,global_variables:1,grep:1,gsub:1,"gsub!":1,"has_key?":1,"has_value?":1,hash:1,hex:1,id:1,include:1,"include?":1,included_modules:1,index:1,indexes:1,indices:1,induced_from:1,inject:1,insert:1,inspect:1,instance_eval:1,instance_method:1,instance_methods:1,"instance_of?":1,"instance_variable_defined?":1,instance_variable_get:1,instance_variable_set:1,instance_variables:1,"integer?":1,intern:1,invert:1,ioctl:1,"is_a?":1,isatty:1,"iterator?":1,join:1,"key?":1,keys:1,"kind_of?":1,lambda:1,last:1,length:1,lineno:1,ljust:1,load:1,local_variables:1,loop:1,lstrip:1,"lstrip!":1,map:1,"map!":1,match:1,max:1,"member?":1,merge:1,"merge!":1,method:1,"method_defined?":1,method_missing:1,methods:1,min:1,module_eval:1,modulo:1,name:1,nesting:1,"new":1,next:1,"next!":1,"nil?":1,nitems:1,"nonzero?":1,object_id:1,oct:1,open:1,pack:1,partition:1,pid:1,pipe:1,pop:1,popen:1,pos:1,prec:1,prec_f:1,prec_i:1,print:1,printf:1,private_class_method:1,private_instance_methods:1,"private_method_defined?":1,private_methods:1,proc:1,protected_instance_methods:1,"protected_method_defined?":1,protected_methods:1,public_class_method:1,public_instance_methods:1,"public_method_defined?":1,public_methods:1,push:1,putc:1,puts:1,quo:1,raise:1,rand:1,rassoc:1,read:1,read_nonblock:1,readchar:1,readline:1,readlines:1,readpartial:1,rehash:1,reject:1,"reject!":1,remainder:1,reopen:1,replace:1,require:1,"respond_to?":1,reverse:1,"reverse!":1,reverse_each:1,rewind:1,rindex:1,rjust:1,round:1,rstrip:1,"rstrip!":1,scan:1,seek:1,select:1,send:1,set_trace_func:1,shift:1,singleton_method_added:1,singleton_methods:1,size:1,sleep:1,slice:1,"slice!":1,sort:1,"sort!":1,sort_by:1,split:1,sprintf:1,squeeze:1,"squeeze!":1,srand:1,stat:1,step:1,store:1,strip:1,"strip!":1,sub:1,"sub!":1,succ:1,"succ!":1,sum:1,superclass:1,swapcase:1,"swapcase!":1,sync:1,syscall:1,sysopen:1,sysread:1,sysseek:1,system:1,syswrite:1,taint:1,"tainted?":1,tell:1,test:1,"throw":1,times:1,to_a:1,to_ary:1,to_f:1,to_hash:1,to_i:1,to_int:1,to_io:1,to_proc:1,to_s:1,to_str:1,to_sym:1,tr:1,"tr!":1,tr_s:1,"tr_s!":1,trace_var:1,transpose:1,trap:1,truncate:1,"tty?":1,type:1,ungetc:1,uniq:1,"uniq!":1,unpack:1,unshift:1,untaint:1,untrace_var:1,upcase:1,"upcase!":1,update:1,upto:1,"value?":1,values:1,values_at:1,warn:1,write:1,write_nonblock:1,"zero?":1,zip:1}};var h={cN:"yardoctag",b:"@[A-Za-z]+"};var d={cN:"comment",b:"#",e:"$",c:[h]};var c={cN:"comment",b:"^\\=begin",e:"^\\=end",c:[h],r:10};var b={cN:"comment",b:"^__END__",e:"\\n$"};var u={cN:"subst",b:"#\\{",e:"}",l:g,k:n};var p=[hljs.BE,u];var s={cN:"string",b:"'",e:"'",c:p,r:0};var r={cN:"string",b:'"',e:'"',c:p,r:0};var q={cN:"string",b:"%[qw]?\\(",e:"\\)",c:p,r:10};var o={cN:"string",b:"%[qw]?\\[",e:"\\]",c:p,r:10};var m={cN:"string",b:"%[qw]?{",e:"}",c:p,r:10};var l={cN:"string",b:"%[qw]?<",e:">",c:p,r:10};var k={cN:"string",b:"%[qw]?/",e:"/",c:p,r:10};var j={cN:"string",b:"%[qw]?%",e:"%",c:p,r:10};var i={cN:"string",b:"%[qw]?-",e:"-",c:p,r:10};var t={cN:"string",b:"%[qw]?\\|",e:"\\|",c:p,r:10};var e={cN:"function",b:"\\bdef\\s+",e:" |$|;",l:g,k:n,c:[{cN:"title",b:a,l:g,k:n},{cN:"params",b:"\\(",e:"\\)",l:g,k:n},d,c,b]};var f={cN:"identifier",b:g,l:g,k:n,r:0};var v=[d,c,b,s,r,q,o,m,l,k,j,i,t,{cN:"class",b:"\\b(class|module)\\b",e:"$|;",k:{"class":1,module:1},c:[{cN:"title",b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?",r:0},{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+hljs.IR+"::)?"+hljs.IR}]},d,c,b]},e,{cN:"constant",b:"(::)?([A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:":",c:[s,r,q,o,m,l,k,j,i,t,f],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"number",b:"\\?\\w"},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},f,{b:"("+hljs.RSR+")\\s*",c:[d,c,b,{cN:"regexp",b:"/",e:"/[a-z]*",i:"\\n",c:[hljs.BE]}],r:0}];u.c=v;e.c[1].c=v;return{dM:{l:g,k:n,c:v}}}();hljs.LANGUAGES.diff={cI:true,dM:{c:[{cN:"chunk",b:"^\\@\\@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +\\@\\@$",r:10},{cN:"chunk",b:"^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$",r:10},{cN:"chunk",b:"^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$",r:10},{cN:"header",b:"Index: ",e:"$"},{cN:"header",b:"=====",e:"=====$"},{cN:"header",b:"^\\-\\-\\-",e:"$"},{cN:"header",b:"^\\*{3} ",e:"$"},{cN:"header",b:"^\\+\\+\\+",e:"$"},{cN:"header",b:"\\*{5}",e:"\\*{5}$"},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"change",b:"^\\!",e:"$"}]}};hljs.LANGUAGES.javascript={dM:{k:{keyword:{"in":1,"if":1,"for":1,"while":1,"finally":1,"var":1,"new":1,"function":1,"do":1,"return":1,"void":1,"else":1,"break":1,"catch":1,"instanceof":1,"with":1,"throw":1,"case":1,"default":1,"try":1,"this":1,"switch":1,"continue":1,"typeof":1,"delete":1},literal:{"true":1,"false":1,"null":1}},c:[hljs.ASM,hljs.QSM,hljs.CLCM,hljs.CBLCLM,hljs.CNM,{b:"("+hljs.RSR+"|case|return|throw)\\s*",k:{"return":1,"throw":1,"case":1},c:[hljs.CLCM,hljs.CBLCLM,{cN:"regexp",b:"/.*?[^\\\\/]/[gim]*"}],r:0},{cN:"function",b:"\\bfunction\\b",e:"{",k:{"function":1},c:[{cN:"title",b:"[A-Za-z$_][0-9A-Za-z$_]*"},{cN:"params",b:"\\(",e:"\\)",c:[hljs.ASM,hljs.QSM,hljs.CLCM,hljs.CBLCLM]}]}]}};hljs.LANGUAGES.css=function(){var a={cN:"function",b:hljs.IR+"\\(",e:"\\)",c:[{eW:true,eE:true,c:[hljs.NM,hljs.ASM,hljs.QSM]}]};return{cI:true,dM:{i:"[=/|']",c:[hljs.CBLCLM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@font-face",l:"[a-z-]+",k:{"font-face":1}},{cN:"at_rule",b:"@",e:"[{;]",eE:true,k:{"import":1,page:1,media:1,charset:1},c:[a,hljs.ASM,hljs.QSM,hljs.NM]},{cN:"tag",b:hljs.IR,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[hljs.CBLCLM,{cN:"rule",b:"[^\\s]",rB:true,e:";",eW:true,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[a,hljs.NM,hljs.QSM,hljs.ASM,hljs.CBLCLM,{cN:"hexcolor",b:"\\#[0-9A-F]+"},{cN:"important",b:"!important"}]}}]}]}]}}}();hljs.LANGUAGES.xml=function(){var b="[A-Za-z0-9\\._:-]+";var a={eW:true,c:[{cN:"attribute",b:b,r:0},{b:'="',rB:true,e:'"',c:[{cN:"value",b:'"',eW:true}]},{b:"='",rB:true,e:"'",c:[{cN:"value",b:"'",eW:true}]},{b:"=",c:[{cN:"value",b:"[^\\s/>]+"}]}]};return{cI:true,dM:{c:[{cN:"pi",b:"<\\?",e:"\\?>",r:10},{cN:"doctype",b:"<!DOCTYPE",e:">",r:10},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style",e:">",k:{title:{style:1}},c:[a],starts:{cN:"css",e:"</style>",rE:true,sL:"css"}},{cN:"tag",b:"<script",e:">",k:{title:{script:1}},c:[a],starts:{cN:"javascript",e:"<\/script>",rE:true,sL:"javascript"}},{cN:"vbscript",b:"<%",e:"%>",sL:"vbscript"},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ />]+"},a]}]}}}();hljs.LANGUAGES.python=function(){var c={cN:"string",b:"u?r?'''",e:"'''",r:10};var b={cN:"string",b:'u?r?"""',e:'"""',r:10};var a={cN:"string",b:"(u|r|ur)'",e:"'",c:[hljs.BE],r:10};var f={cN:"string",b:'(u|r|ur)"',e:'"',c:[hljs.BE],r:10};var d={cN:"title",b:hljs.UIR};var e={cN:"params",b:"\\(",e:"\\)",c:[c,b,a,f,hljs.ASM,hljs.QSM]};return{dM:{k:{keyword:{and:1,elif:1,is:1,global:1,as:1,"in":1,"if":1,from:1,raise:1,"for":1,except:1,"finally":1,print:1,"import":1,pass:1,"return":1,exec:1,"else":1,"break":1,not:1,"with":1,"class":1,assert:1,yield:1,"try":1,"while":1,"continue":1,del:1,or:1,def:1,lambda:1,nonlocal:10},built_in:{None:1,True:1,False:1,Ellipsis:1,NotImplemented:1}},i:"(</|->|\\?)",c:[hljs.HCM,c,b,a,f,hljs.ASM,hljs.QSM,{cN:"function",b:"\\bdef ",e:":",i:"$",k:{def:1},c:[d,e],r:10},{cN:"class",b:"\\bclass ",e:":",i:"[${]",k:{"class":1},c:[d,e],r:10},hljs.CNM,{cN:"decorator",b:"@",e:"$"}]}}}();hljs.LANGUAGES.sql={cI:true,dM:{i:"[^\\s]",c:[{cN:"operator",b:"(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma)\\b",e:";|$",k:{keyword:{all:1,partial:1,global:1,month:1,current_timestamp:1,using:1,go:1,revoke:1,smallint:1,indicator:1,"end-exec":1,disconnect:1,zone:1,"with":1,character:1,assertion:1,to:1,add:1,current_user:1,usage:1,input:1,local:1,alter:1,match:1,collate:1,real:1,then:1,rollback:1,get:1,read:1,timestamp:1,session_user:1,not:1,integer:1,bit:1,unique:1,day:1,minute:1,desc:1,insert:1,execute:1,like:1,ilike:2,level:1,decimal:1,drop:1,"continue":1,isolation:1,found:1,where:1,constraints:1,domain:1,right:1,national:1,some:1,module:1,transaction:1,relative:1,second:1,connect:1,escape:1,close:1,system_user:1,"for":1,deferred:1,section:1,cast:1,current:1,sqlstate:1,allocate:1,intersect:1,deallocate:1,numeric:1,"public":1,preserve:1,full:1,"goto":1,initially:1,asc:1,no:1,key:1,output:1,collation:1,group:1,by:1,union:1,session:1,both:1,last:1,language:1,constraint:1,column:1,of:1,space:1,foreign:1,deferrable:1,prior:1,connection:1,unknown:1,action:1,commit:1,view:1,or:1,first:1,into:1,"float":1,year:1,primary:1,cascaded:1,except:1,restrict:1,set:1,references:1,names:1,table:1,outer:1,open:1,select:1,size:1,are:1,rows:1,from:1,prepare:1,distinct:1,leading:1,create:1,only:1,next:1,inner:1,authorization:1,schema:1,corresponding:1,option:1,declare:1,precision:1,immediate:1,"else":1,timezone_minute:1,external:1,varying:1,translation:1,"true":1,"case":1,exception:1,join:1,hour:1,"default":1,"double":1,scroll:1,value:1,cursor:1,descriptor:1,values:1,dec:1,fetch:1,procedure:1,"delete":1,and:1,"false":1,"int":1,is:1,describe:1,"char":1,as:1,at:1,"in":1,varchar:1,"null":1,trailing:1,any:1,absolute:1,current_time:1,end:1,grant:1,privileges:1,when:1,cross:1,check:1,write:1,current_date:1,pad:1,begin:1,temporary:1,exec:1,time:1,update:1,catalog:1,user:1,sql:1,date:1,on:1,identity:1,timezone_hour:1,natural:1,whenever:1,interval:1,work:1,order:1,cascade:1,diagnostics:1,nchar:1,having:1,left:1,call:1,"do":1,handler:1,load:1,replace:1,truncate:1,start:1,lock:1,show:1,pragma:1},aggregate:{count:1,sum:1,min:1,max:1,avg:1}},c:[{cN:"string",b:"'",e:"'",c:[hljs.BE,{b:"''"}],r:0},{cN:"string",b:'"',e:'"',c:[hljs.BE,{b:'""'}],r:0},{cN:"string",b:"`",e:"`",c:[hljs.BE]},hljs.CNM,{b:"\\n"}]},hljs.CBLCLM,{cN:"comment",b:"--",e:"$"}]}};hljs.LANGUAGES.nginx=function(){var c={cN:"variable",b:"\\$\\d+"};var b={cN:"variable",b:"\\${",e:"}"};var a={cN:"variable",b:"[\\$\\@]"+hljs.UIR};return{dM:{c:[hljs.HCM,{b:hljs.UIR,e:";|{",rE:true,k:{accept_mutex:1,accept_mutex_delay:1,access_log:1,add_after_body:1,add_before_body:1,add_header:1,addition_types:1,alias:1,allow:1,ancient_browser:1,ancient_browser:1,ancient_browser_value:1,ancient_browser_value:1,auth_basic:1,auth_basic_user_file:1,autoindex:1,autoindex_exact_size:1,autoindex_localtime:1,"break":1,charset:1,charset:1,charset_map:1,charset_map:1,charset_types:1,charset_types:1,client_body_buffer_size:1,client_body_in_file_only:1,client_body_in_single_buffer:1,client_body_temp_path:1,client_body_timeout:1,client_header_buffer_size:1,client_header_timeout:1,client_max_body_size:1,connection_pool_size:1,connections:1,create_full_put_path:1,daemon:1,dav_access:1,dav_methods:1,debug_connection:1,debug_points:1,default_type:1,deny:1,directio:1,directio_alignment:1,echo:1,echo_after_body:1,echo_before_body:1,echo_blocking_sleep:1,echo_duplicate:1,echo_end:1,echo_exec:1,echo_flush:1,echo_foreach_split:1,echo_location:1,echo_location_async:1,echo_read_request_body:1,echo_request_body:1,echo_reset_timer:1,echo_sleep:1,echo_subrequest:1,echo_subrequest_async:1,empty_gif:1,empty_gif:1,env:1,error_log:1,error_log:1,error_page:1,events:1,expires:1,fastcgi_bind:1,fastcgi_buffer_size:1,fastcgi_buffers:1,fastcgi_busy_buffers_size:1,fastcgi_cache:1,fastcgi_cache_key:1,fastcgi_cache_methods:1,fastcgi_cache_min_uses:1,fastcgi_cache_path:1,fastcgi_cache_use_stale:1,fastcgi_cache_valid:1,fastcgi_catch_stderr:1,fastcgi_connect_timeout:1,fastcgi_hide_header:1,fastcgi_ignore_client_abort:1,fastcgi_ignore_headers:1,fastcgi_index:1,fastcgi_intercept_errors:1,fastcgi_max_temp_file_size:1,fastcgi_next_upstream:1,fastcgi_param:1,fastcgi_pass:1,fastcgi_pass_header:1,fastcgi_pass_request_body:1,fastcgi_pass_request_headers:1,fastcgi_read_timeout:1,fastcgi_send_lowat:1,fastcgi_send_timeout:1,fastcgi_split_path_info:1,fastcgi_store:1,fastcgi_store_access:1,fastcgi_temp_file_write_size:1,fastcgi_temp_path:1,fastcgi_upstream_fail_timeout:1,fastcgi_upstream_max_fails:1,flv:1,geo:1,geo:1,geoip_city:1,geoip_country:1,gzip:1,gzip_buffers:1,gzip_comp_level:1,gzip_disable:1,gzip_hash:1,gzip_http_version:1,gzip_min_length:1,gzip_no_buffer:1,gzip_proxied:1,gzip_static:1,gzip_types:1,gzip_vary:1,gzip_window:1,http:1,"if":1,if_modified_since:1,ignore_invalid_headers:1,image_filter:1,image_filter_buffer:1,image_filter_jpeg_quality:1,image_filter_transparency:1,include:1,index:1,internal:1,ip_hash:1,js:1,js_load:1,js_require:1,js_utf8:1,keepalive_requests:1,keepalive_timeout:1,kqueue_changes:1,kqueue_events:1,large_client_header_buffers:1,limit_conn:1,limit_conn_log_level:1,limit_except:1,limit_rate:1,limit_rate_after:1,limit_req:1,limit_req_log_level:1,limit_req_zone:1,limit_zone:1,lingering_time:1,lingering_timeout:1,listen:1,location:1,lock_file:1,log_format:1,log_not_found:1,log_subrequest:1,map:1,map_hash_bucket_size:1,map_hash_max_size:1,master_process:1,memcached_bind:1,memcached_buffer_size:1,memcached_connect_timeout:1,memcached_next_upstream:1,memcached_pass:1,memcached_read_timeout:1,memcached_send_timeout:1,memcached_upstream_fail_timeout:1,memcached_upstream_max_fails:1,merge_slashes:1,min_delete_depth:1,modern_browser:1,modern_browser:1,modern_browser_value:1,modern_browser_value:1,more_clear_headers:1,more_clear_input_headers:1,more_set_headers:1,more_set_input_headers:1,msie_padding:1,msie_refresh:1,multi_accept:1,open_file_cache:1,open_file_cache_errors:1,open_file_cache_events:1,open_file_cache_min_uses:1,open_file_cache_retest:1,open_file_cache_valid:1,open_log_file_cache:1,optimize_server_names:1,output_buffers:1,override_charset:1,override_charset:1,perl:1,perl_modules:1,perl_require:1,perl_set:1,pid:1,port_in_redirect:1,post_action:1,postpone_gzipping:1,postpone_output:1,proxy_bind:1,proxy_buffer_size:1,proxy_buffering:1,proxy_buffers:1,proxy_busy_buffers_size:1,proxy_cache:1,proxy_cache_key:1,proxy_cache_methods:1,proxy_cache_min_uses:1,proxy_cache_path:1,proxy_cache_use_stale:1,proxy_cache_valid:1,proxy_connect_timeout:1,proxy_headers_hash_bucket_size:1,proxy_headers_hash_max_size:1,proxy_hide_header:1,proxy_ignore_client_abort:1,proxy_ignore_headers:1,proxy_intercept_errors:1,proxy_max_temp_file_size:1,proxy_method:1,proxy_next_upstream:1,proxy_pass:1,proxy_pass_header:1,proxy_pass_request_body:1,proxy_pass_request_headers:1,proxy_read_timeout:1,proxy_redirect:1,proxy_send_lowat:1,proxy_send_timeout:1,proxy_set_body:1,proxy_set_header:1,proxy_store:1,proxy_store_access:1,proxy_temp_file_write_size:1,proxy_temp_path:1,proxy_upstream_fail_timeout:1,proxy_upstream_max_fails:1,push_authorized_channels_only:1,push_channel_group:1,push_max_channel_id_length:1,push_max_channel_subscribers:1,push_max_message_buffer_length:1,push_max_reserved_memory:1,push_message_buffer_length:1,push_message_timeout:1,push_min_message_buffer_length:1,push_min_message_recipients:1,push_publisher:1,push_store_messages:1,push_subscriber:1,push_subscriber_concurrency:1,random_index:1,read_ahead:1,real_ip_header:1,recursive_error_pages:1,request_pool_size:1,reset_timedout_connection:1,resolver:1,resolver_timeout:1,"return":1,rewrite:1,rewrite_log:1,root:1,satisfy:1,satisfy_any:1,send_lowat:1,send_timeout:1,sendfile:1,sendfile_max_chunk:1,server:1,server:1,server_name:1,server_name_in_redirect:1,server_names_hash_bucket_size:1,server_names_hash_max_size:1,server_tokens:1,set:1,set_real_ip_from:1,source_charset:1,source_charset:1,ssi:1,ssi_ignore_recycled_buffers:1,ssi_min_file_chunk:1,ssi_silent_errors:1,ssi_types:1,ssi_value_length:1,ssl:1,ssl_certificate:1,ssl_certificate_key:1,ssl_ciphers:1,ssl_client_certificate:1,ssl_crl:1,ssl_dhparam:1,ssl_prefer_server_ciphers:1,ssl_protocols:1,ssl_session_cache:1,ssl_session_timeout:1,ssl_verify_client:1,ssl_verify_depth:1,sub_filter:1,sub_filter_once:1,sub_filter_types:1,tcp_nodelay:1,tcp_nopush:1,timer_resolution:1,try_files:1,types:1,types_hash_bucket_size:1,types_hash_max_size:1,underscores_in_headers:1,uninitialized_variable_warn:1,upstream:1,use:1,user:1,userid:1,userid:1,userid_domain:1,userid_domain:1,userid_expires:1,userid_expires:1,userid_mark:1,userid_name:1,userid_name:1,userid_p3p:1,userid_p3p:1,userid_path:1,userid_path:1,userid_service:1,userid_service:1,valid_referers:1,variables_hash_bucket_size:1,variables_hash_max_size:1,worker_connections:1,worker_cpu_affinity:1,worker_priority:1,worker_processes:1,worker_rlimit_core:1,worker_rlimit_nofile:1,worker_rlimit_sigpending:1,working_directory:1,xml_entities:1,xslt_stylesheet:1,xslt_types:1},r:0,c:[hljs.HCM,{b:"\\s",e:"[;{]",rB:true,rE:true,l:"[a-z/]+",k:{built_in:{on:1,off:1,yes:1,no:1,"true":1,"false":1,none:1,blocked:1,debug:1,info:1,notice:1,warn:1,error:1,crit:1,select:1,permanent:1,redirect:1,kqueue:1,rtsig:1,epoll:1,poll:1,"/dev/poll":1}},r:0,c:[hljs.HCM,{cN:"string",b:'"',e:'"',c:[hljs.BE,c,b,a],r:0},{cN:"string",b:"'",e:"'",c:[hljs.BE,c,b,a],r:0},{cN:"string",b:"([a-z]+):/",e:"[;\\s]",rE:true},{cN:"regexp",b:"\\s\\^",e:"\\s|{|;",rE:true,c:[hljs.BE,c,b,a]},{cN:"regexp",b:"~\\*?\\s+",e:"\\s|{|;",rE:true,c:[hljs.BE,c,b,a]},{cN:"regexp",b:"\\*(\\.[a-z\\-]+)+",c:[hljs.BE,c,b,a]},{cN:"regexp",b:"([a-z\\-]+\\.)+\\*",c:[hljs.BE,c,b,a]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b"},{cN:"number",b:"\\s\\d+[kKmMgGdshdwy]*\\b",r:0},c,b,a]}]}]}}}();hljs.LANGUAGES.django=function(){function c(f,e){return(e==undefined||(!f.cN&&e.cN=="tag")||f.cN=="value")}function d(j,e){var h={};for(var g in j){if(g!="contains"){h[g]=j[g]}var k=[];for(var f=0;j.c&&f<j.c.length;f++){k.push(d(j.c[f],j))}if(c(j,e)){k=b.concat(k)}if(k.length){h.c=k}}return h}var a={cN:"filter",b:"\\|[A-Za-z]+\\:?",eE:true,k:{truncatewords:1,removetags:1,linebreaksbr:1,yesno:1,get_digit:1,timesince:1,random:1,striptags:1,filesizeformat:1,escape:1,linebreaks:1,length_is:1,ljust:1,rjust:1,cut:1,urlize:1,fix_ampersands:1,title:1,floatformat:1,capfirst:1,pprint:1,divisibleby:1,add:1,make_list:1,unordered_list:1,urlencode:1,timeuntil:1,urlizetrunc:1,wordcount:1,stringformat:1,linenumbers:1,slice:1,date:1,dictsort:1,dictsortreversed:1,default_if_none:1,pluralize:1,lower:1,join:1,center:1,"default":1,truncatewords_html:1,upper:1,length:1,phone2numeric:1,wordwrap:1,time:1,addslashes:1,slugify:1,first:1},c:[{cN:"argument",b:'"',e:'"'}]};var b=[{cN:"template_comment",b:"{%\\s*comment\\s*%}",e:"{%\\s*endcomment\\s*%}"},{cN:"template_comment",b:"{#",e:"#}"},{cN:"template_tag",b:"{%",e:"%}",k:{comment:1,endcomment:1,load:1,templatetag:1,ifchanged:1,endifchanged:1,"if":1,endif:1,firstof:1,"for":1,endfor:1,"in":1,ifnotequal:1,endifnotequal:1,widthratio:1,"extends":1,include:1,spaceless:1,endspaceless:1,regroup:1,by:1,as:1,ifequal:1,endifequal:1,ssi:1,now:1,"with":1,cycle:1,url:1,filter:1,endfilter:1,debug:1,block:1,endblock:1,"else":1},c:[a]},{cN:"variable",b:"{{",e:"}}",c:[a]}];return{cI:true,dM:d(hljs.LANGUAGES.xml.dM)}}();hljs.LANGUAGES.delphi=function(){var a={and:1,safecall:1,cdecl:1,then:1,string:1,exports:1,library:1,not:1,pascal:1,set:1,virtual:1,file:1,"in":1,array:1,label:1,packed:1,"end.":1,index:1,"while":1,"const":1,raise:1,"for":1,to:1,implementation:1,"with":1,except:1,overload:1,destructor:1,downto:1,"finally":1,program:1,exit:1,unit:1,inherited:1,override:1,"if":1,type:1,until:1,"function":1,"do":1,begin:1,repeat:1,"goto":1,nil:1,far:1,initialization:1,object:1,"else":1,"var":1,uses:1,external:1,resourcestring:1,"interface":1,end:1,finalization:1,"class":1,asm:1,mod:1,"case":1,on:1,shr:1,shl:1,of:1,register:1,xorwrite:1,threadvar:1,"try":1,record:1,near:1,stored:1,constructor:1,stdcall:1,inline:1,div:1,out:1,or:1,procedure:1};var c={safecall:1,stdcall:1,pascal:1,stored:1,"const":1,implementation:1,finalization:1,except:1,to:1,"finally":1,program:1,inherited:1,override:1,then:1,exports:1,string:1,read:1,not:1,mod:1,shr:1,"try":1,div:1,shl:1,set:1,library:1,message:1,packed:1,index:1,"for":1,near:1,overload:1,label:1,downto:1,exit:1,"public":1,"goto":1,"interface":1,asm:1,on:1,of:1,constructor:1,or:1,"private":1,array:1,unit:1,raise:1,destructor:1,"var":1,type:1,until:1,"function":1,"else":1,external:1,"with":1,"case":1,"default":1,record:1,"while":1,"protected":1,property:1,procedure:1,published:1,and:1,cdecl:1,"do":1,threadvar:1,file:1,"in":1,"if":1,end:1,virtual:1,write:1,far:1,out:1,begin:1,repeat:1,nil:1,initialization:1,object:1,uses:1,resourcestring:1,"class":1,register:1,xorwrite:1,inline:1,"static":1};var f={cN:"comment",b:"{",e:"}",r:0};var e={cN:"comment",b:"\\(\\*",e:"\\*\\)",r:10};var d={cN:"string",b:"'",e:"'",c:[{b:"''"}],r:0};var b={cN:"string",b:"(#\\d+)+"};var g={cN:"function",b:"(procedure|constructor|destructor|function)\\b",e:"[:;]",k:{"function":1,constructor:10,destructor:10,procedure:10},c:[{cN:"title",b:hljs.IR},{cN:"params",b:"\\(",e:"\\)",k:a,c:[d,b]},f,e]};return{cI:true,dM:{k:a,i:'("|\\$[G-Zg-z]|\\/\\*|</)',c:[f,e,hljs.CLCM,d,b,hljs.NM,g,{cN:"class",b:"=\\bclass\\b",e:"end;",k:c,c:[d,b,f,e,g]}]},m:[]}}();hljs.LANGUAGES.apache=function(){var b={cN:"number",b:"[\\$%]\\d+"};var a={cN:"cbracket",b:"[\\$%]\\{",e:"\\}"};a.c=[a,b];return{cI:true,dM:{k:{keyword:{acceptfilter:1,acceptmutex:1,acceptpathinfo:1,accessfilename:1,action:1,addalt:1,addaltbyencoding:1,addaltbytype:1,addcharset:1,adddefaultcharset:1,adddescription:1,addencoding:1,addhandler:1,addicon:1,addiconbyencoding:1,addiconbytype:1,addinputfilter:1,addlanguage:1,addmoduleinfo:1,addoutputfilter:1,addoutputfilterbytype:1,addtype:1,alias:1,aliasmatch:1,allow:1,allowconnect:1,allowencodedslashes:1,allowoverride:1,anonymous:1,anonymous_logemail:1,anonymous_mustgiveemail:1,anonymous_nouserid:1,anonymous_verifyemail:1,authbasicauthoritative:1,authbasicprovider:1,authdbduserpwquery:1,authdbduserrealmquery:1,authdbmgroupfile:1,authdbmtype:1,authdbmuserfile:1,authdefaultauthoritative:1,authdigestalgorithm:1,authdigestdomain:1,authdigestnccheck:1,authdigestnonceformat:1,authdigestnoncelifetime:1,authdigestprovider:1,authdigestqop:1,authdigestshmemsize:1,authgroupfile:1,authldapbinddn:1,authldapbindpassword:1,authldapcharsetconfig:1,authldapcomparednonserver:1,authldapdereferencealiases:1,authldapgroupattribute:1,authldapgroupattributeisdn:1,authldapremoteuserattribute:1,authldapremoteuserisdn:1,authldapurl:1,authname:1,authnprovideralias:1,authtype:1,authuserfile:1,authzdbmauthoritative:1,authzdbmtype:1,authzdefaultauthoritative:1,authzgroupfileauthoritative:1,authzldapauthoritative:1,authzownerauthoritative:1,authzuserauthoritative:1,balancermember:1,browsermatch:1,browsermatchnocase:1,bufferedlogs:1,cachedefaultexpire:1,cachedirlength:1,cachedirlevels:1,cachedisable:1,cacheenable:1,cachefile:1,cacheignorecachecontrol:1,cacheignoreheaders:1,cacheignorenolastmod:1,cacheignorequerystring:1,cachelastmodifiedfactor:1,cachemaxexpire:1,cachemaxfilesize:1,cacheminfilesize:1,cachenegotiateddocs:1,cacheroot:1,cachestorenostore:1,cachestoreprivate:1,cgimapextension:1,charsetdefault:1,charsetoptions:1,charsetsourceenc:1,checkcaseonly:1,checkspelling:1,chrootdir:1,contentdigest:1,cookiedomain:1,cookieexpires:1,cookielog:1,cookiename:1,cookiestyle:1,cookietracking:1,coredumpdirectory:1,customlog:1,dav:1,davdepthinfinity:1,davgenericlockdb:1,davlockdb:1,davmintimeout:1,dbdexptime:1,dbdkeep:1,dbdmax:1,dbdmin:1,dbdparams:1,dbdpersist:1,dbdpreparesql:1,dbdriver:1,defaulticon:1,defaultlanguage:1,defaulttype:1,deflatebuffersize:1,deflatecompressionlevel:1,deflatefilternote:1,deflatememlevel:1,deflatewindowsize:1,deny:1,directoryindex:1,directorymatch:1,directoryslash:1,documentroot:1,dumpioinput:1,dumpiologlevel:1,dumpiooutput:1,enableexceptionhook:1,enablemmap:1,enablesendfile:1,errordocument:1,errorlog:1,example:1,expiresactive:1,expiresbytype:1,expiresdefault:1,extendedstatus:1,extfilterdefine:1,extfilteroptions:1,fileetag:1,filterchain:1,filterdeclare:1,filterprotocol:1,filterprovider:1,filtertrace:1,forcelanguagepriority:1,forcetype:1,forensiclog:1,gracefulshutdowntimeout:1,group:1,header:1,headername:1,hostnamelookups:1,identitycheck:1,identitychecktimeout:1,imapbase:1,imapdefault:1,imapmenu:1,include:1,indexheadinsert:1,indexignore:1,indexoptions:1,indexorderdefault:1,indexstylesheet:1,isapiappendlogtoerrors:1,isapiappendlogtoquery:1,isapicachefile:1,isapifakeasync:1,isapilognotsupported:1,isapireadaheadbuffer:1,keepalive:1,keepalivetimeout:1,languagepriority:1,ldapcacheentries:1,ldapcachettl:1,ldapconnectiontimeout:1,ldapopcacheentries:1,ldapopcachettl:1,ldapsharedcachefile:1,ldapsharedcachesize:1,ldaptrustedclientcert:1,ldaptrustedglobalcert:1,ldaptrustedmode:1,ldapverifyservercert:1,limitinternalrecursion:1,limitrequestbody:1,limitrequestfields:1,limitrequestfieldsize:1,limitrequestline:1,limitxmlrequestbody:1,listen:1,listenbacklog:1,loadfile:1,loadmodule:1,lockfile:1,logformat:1,loglevel:1,maxclients:1,maxkeepaliverequests:1,maxmemfree:1,maxrequestsperchild:1,maxrequestsperthread:1,maxspareservers:1,maxsparethreads:1,maxthreads:1,mcachemaxobjectcount:1,mcachemaxobjectsize:1,mcachemaxstreamingbuffer:1,mcacheminobjectsize:1,mcacheremovalalgorithm:1,mcachesize:1,metadir:1,metafiles:1,metasuffix:1,mimemagicfile:1,minspareservers:1,minsparethreads:1,mmapfile:1,mod_gzip_on:1,mod_gzip_add_header_count:1,mod_gzip_keep_workfiles:1,mod_gzip_dechunk:1,mod_gzip_min_http:1,mod_gzip_minimum_file_size:1,mod_gzip_maximum_file_size:1,mod_gzip_maximum_inmem_size:1,mod_gzip_temp_dir:1,mod_gzip_item_include:1,mod_gzip_item_exclude:1,mod_gzip_command_version:1,mod_gzip_can_negotiate:1,mod_gzip_handle_methods:1,mod_gzip_static_suffix:1,mod_gzip_send_vary:1,mod_gzip_update_static:1,modmimeusepathinfo:1,multiviewsmatch:1,namevirtualhost:1,noproxy:1,nwssltrustedcerts:1,nwsslupgradeable:1,options:1,order:1,passenv:1,pidfile:1,protocolecho:1,proxybadheader:1,proxyblock:1,proxydomain:1,proxyerroroverride:1,proxyftpdircharset:1,proxyiobuffersize:1,proxymaxforwards:1,proxypass:1,proxypassinterpolateenv:1,proxypassmatch:1,proxypassreverse:1,proxypassreversecookiedomain:1,proxypassreversecookiepath:1,proxypreservehost:1,proxyreceivebuffersize:1,proxyremote:1,proxyremotematch:1,proxyrequests:1,proxyset:1,proxystatus:1,proxytimeout:1,proxyvia:1,readmename:1,receivebuffersize:1,redirect:1,redirectmatch:1,redirectpermanent:1,redirecttemp:1,removecharset:1,removeencoding:1,removehandler:1,removeinputfilter:1,removelanguage:1,removeoutputfilter:1,removetype:1,requestheader:1,require:2,rewritebase:1,rewritecond:10,rewriteengine:1,rewritelock:1,rewritelog:1,rewriteloglevel:1,rewritemap:1,rewriteoptions:1,rewriterule:10,rlimitcpu:1,rlimitmem:1,rlimitnproc:1,satisfy:1,scoreboardfile:1,script:1,scriptalias:1,scriptaliasmatch:1,scriptinterpretersource:1,scriptlog:1,scriptlogbuffer:1,scriptloglength:1,scriptsock:1,securelisten:1,seerequesttail:1,sendbuffersize:1,serveradmin:1,serveralias:1,serverlimit:1,servername:1,serverpath:1,serverroot:1,serversignature:1,servertokens:1,setenv:1,setenvif:1,setenvifnocase:1,sethandler:1,setinputfilter:1,setoutputfilter:1,ssienableaccess:1,ssiendtag:1,ssierrormsg:1,ssistarttag:1,ssitimeformat:1,ssiundefinedecho:1,sslcacertificatefile:1,sslcacertificatepath:1,sslcadnrequestfile:1,sslcadnrequestpath:1,sslcarevocationfile:1,sslcarevocationpath:1,sslcertificatechainfile:1,sslcertificatefile:1,sslcertificatekeyfile:1,sslciphersuite:1,sslcryptodevice:1,sslengine:1,sslhonorciperorder:1,sslmutex:1,ssloptions:1,sslpassphrasedialog:1,sslprotocol:1,sslproxycacertificatefile:1,sslproxycacertificatepath:1,sslproxycarevocationfile:1,sslproxycarevocationpath:1,sslproxyciphersuite:1,sslproxyengine:1,sslproxymachinecertificatefile:1,sslproxymachinecertificatepath:1,sslproxyprotocol:1,sslproxyverify:1,sslproxyverifydepth:1,sslrandomseed:1,sslrequire:1,sslrequiressl:1,sslsessioncache:1,sslsessioncachetimeout:1,sslusername:1,sslverifyclient:1,sslverifydepth:1,startservers:1,startthreads:1,substitute:1,suexecusergroup:1,threadlimit:1,threadsperchild:1,threadstacksize:1,timeout:1,traceenable:1,transferlog:1,typesconfig:1,unsetenv:1,usecanonicalname:1,usecanonicalphysicalport:1,user:1,userdir:1,virtualdocumentroot:1,virtualdocumentrootip:1,virtualscriptalias:1,virtualscriptaliasip:1,win32disableacceptex:1,xbithack:1},literal:{on:1,off:1}},c:[hljs.HCM,{cN:"sqbracket",b:"\\s\\[",e:"\\]$"},a,b,{cN:"tag",b:"</?",e:">"},hljs.QSM]}}}();hljs.LANGUAGES.cpp=function(){var b={keyword:{"false":1,"int":1,"float":1,"while":1,"private":1,"char":1,"catch":1,"export":1,virtual:1,operator:2,sizeof:2,dynamic_cast:2,typedef:2,const_cast:2,"const":1,struct:1,"for":1,static_cast:2,union:1,namespace:1,unsigned:1,"long":1,"throw":1,"volatile":2,"static":1,"protected":1,bool:1,template:1,mutable:1,"if":1,"public":1,friend:2,"do":1,"return":1,"goto":1,auto:1,"void":2,"enum":1,"else":1,"break":1,"new":1,extern:1,using:1,"true":1,"class":1,asm:1,"case":1,typeid:1,"short":1,reinterpret_cast:2,"default":1,"double":1,register:1,explicit:1,signed:1,typename:1,"try":1,"this":1,"switch":1,"continue":1,wchar_t:1,inline:1,"delete":1,alignof:1,char16_t:1,char32_t:1,constexpr:1,decltype:1,noexcept:1,nullptr:1,static_assert:1,thread_local:1},built_in:{std:1,string:1,cin:1,cout:1,cerr:1,clog:1,stringstream:1,istringstream:1,ostringstream:1,auto_ptr:1,deque:1,list:1,queue:1,stack:1,vector:1,map:1,set:1,bitset:1,multiset:1,multimap:1,unordered_set:1,unordered_map:1,unordered_multiset:1,unordered_multimap:1,array:1,shared_ptr:1}};var a={cN:"stl_container",b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:b.built_in,r:10};a.c=[a];return{dM:{k:b,i:"</",c:[hljs.CLCM,hljs.CBLCLM,hljs.QSM,{cN:"string",b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"},hljs.CNM,{cN:"preprocessor",b:"#",e:"$"},a]}}}();