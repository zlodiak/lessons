/*1337048672,169775815*/

if (window.CavalryLogger) { CavalryLogger.start_js(["vfR\/O"]); }

__d("DataStore",[],function(a,b,c,d,e,f){var g={},h=1;function i(l){if(typeof l=='string'){return 'str_'+l;}else return 'elem_'+(l.__FB_TOKEN||(l.__FB_TOKEN=[h++]))[0];}function j(l){var m=i(l);return g[m]||(g[m]={});}var k={set:function(l,m,n){var o=j(l);o[m]=n;return l;},get:function(l,m,n){var o=j(l),p=o[m];if(typeof p==='undefined'&&l.getAttribute){var q=l.getAttribute('data-'+m);p=(null===q)?undefined:q;}if((n!==undefined)&&(p===undefined))p=o[m]=n;return p;},remove:function(l,m){var n=j(l),o=n[m];delete n[m];return o;},purge:function(l){delete g[i(l)];}};e.exports=k;});
__d("UserAgent",[],function(a,b,c,d,e,f){var g=false,h,i,j,k,l,m,n,o,p,q,r,s,t,u;function v(){if(g)return;g=true;var x=navigator.userAgent,y=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))/.exec(x),z=/(Mac OS X)|(Windows)|(Linux)/.exec(x);r=/\b(iPhone|iP[ao]d)/.exec(x);s=/\b(iP[ao]d)/.exec(x);p=/Android/i.exec(x);t=/FBAN\/\w+;/i.exec(x);u=/Mobile/i.exec(x);q=!!(/Win64/.exec(x));if(y){h=y[1]?parseFloat(y[1]):NaN;if(h&&document.documentMode)h=document.documentMode;i=y[2]?parseFloat(y[2]):NaN;j=y[3]?parseFloat(y[3]):NaN;k=y[4]?parseFloat(y[4]):NaN;if(k){y=/(?:Chrome\/(\d+\.\d+))/.exec(x);l=y&&y[1]?parseFloat(y[1]):NaN;}else l=NaN;}else h=i=j=l=k=NaN;if(z){if(z[1]){var aa=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(x);m=aa?parseFloat(aa[1].replace('_','.')):true;}else m=false;n=!!z[2];o=!!z[3];}else m=n=o=false;}var w={ie:function(){return v()||h;},ie64:function(){return w.ie()&&q;},firefox:function(){return v()||i;},opera:function(){return v()||j;},safari:function(){return v()||k;},chrome:function(){return v()||l;},windows:function(){return v()||n;},osx:function(){return v()||m;},linux:function(){return v()||o;},iphone:function(){return v()||r;},mobile:function(){return v()||(r||s||p||u);},nativeApp:function(){return v()||t;},android:function(){return v()||p;},ipad:function(){return v()||s;}};e.exports=w;});
__d("createObjectFrom",["hasArrayNature"],function(a,b,c,d,e,f){var g=b('hasArrayNature');function h(i,j){var k={},l=g(j);if(typeof j=='undefined')j=true;for(var m=i.length;m--;)k[i[m]]=l?j[m]:j;return k;}e.exports=h;});
__d("DOMQuery",["CSS","UserAgent","createArrayFrom","createObjectFrom","ge"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('UserAgent'),i=b('createArrayFrom'),j=b('createObjectFrom'),k=b('ge'),l={find:function(m,n){var o=l.scry(m,n);return o[0];},scry:function(m,n){if(!m||!m.getElementsByTagName)return [];var o=n.split(' '),p=[m];for(var q=0;q<o.length;q++){if(p.length===0)break;if(o[q]==='')continue;var r=o[q],s=o[q],t=[],u=false;if(r.charAt(0)=='^')if(q===0){u=true;r=r.slice(1);}else return [];r=r.replace(/\./g,' .');r=r.replace(/\#/g,' #');r=r.replace(/\[/g,' [');var v=r.split(' '),w=v[0]||'*',x=w=='*',y=v[1]&&v[1].charAt(0)=='#';if(y){var z=k(v[1].slice(1),true);if(z&&(x||z.tagName.toLowerCase()==w))for(var aa=0;aa<p.length;aa++)if(u&&l.contains(z,p[aa])){t=[z];break;}else if(document==p[aa]||l.contains(p[aa],z)){t=[z];break;}}else{var ba=[],ca=p.length,da,ea=!u&&s.indexOf('[')<0&&document.querySelectorAll;for(var fa=0;fa<ca;fa++){if(u){da=[];var ga=p[fa].parentNode;while(l.isElementNode(ga)){if(x||ga.tagName.toLowerCase()==w)da.push(ga);ga=ga.parentNode;}}else if(ea){da=p[fa].querySelectorAll(s);}else da=p[fa].getElementsByTagName(w);var ha=da.length;for(var ia=0;ia<ha;ia++)ba.push(da[ia]);}if(!ea)for(var ja=1;ja<v.length;ja++){var ka=v[ja],la=ka.charAt(0)=='.',ma=ka.substring(1);for(fa=0;fa<ba.length;fa++){var na=ba[fa];if(!na)continue;if(la){if(!g.hasClass(na,ma))delete ba[fa];continue;}else{var oa=ka.slice(1,ka.length-1);if(oa.indexOf('=')==-1){if(na.getAttribute(oa)===null){delete ba[fa];continue;}}else{var pa=oa.split('='),qa=pa[0],ra=pa[1];ra=ra.slice(1,ra.length-1);if(na.getAttribute(qa)!=ra){delete ba[fa];continue;}}}}}for(fa=0;fa<ba.length;fa++)if(ba[fa]){t.push(ba[fa]);if(u)break;}}p=t;}return p;},getText:(function(){var m=document.createElement('div'),n=m.textContent!=null?'textContent':'innerText';return function(o){if(l.isTextNode(o)){return o.data;}else if(l.isElementNode(o)){return o[n];}else return '';};})(),getSelection:function(){var m=window.getSelection,n=document.selection;if(m){return m()+'';}else if(n)return n.createRange().text;return null;},contains:function(m,n){m=k(m);n=k(n);if(!m||!n){return false;}else if(m===n){return true;}else if(l.isTextNode(m)){return false;}else if(l.isTextNode(n)){return l.contains(m,n.parentNode);}else if(m.contains){return m.contains(n);}else if(m.compareDocumentPosition){return !!(m.compareDocumentPosition(n)&16);}else return false;},getRootElement:function(){var m=null;if(window.Quickling&&Quickling.isActive())m=k('content');return m||document.body;},isNode:function(m){return !!(m&&(typeof Node=='object'?m instanceof Node:typeof m=="object"&&typeof m.nodeType=='number'&&typeof m.nodeName=='string'));},isNodeOfType:function(m,n){var o=i(n).join('|').toUpperCase().split('|'),p=j(o);return l.isNode(m)&&m.nodeName in p;},isElementNode:function(m){return l.isNode(m)&&m.nodeType==1;},isTextNode:function(m){return l.isNode(m)&&m.nodeType==3;},getDocumentScrollElement:function(m){m=m||document;if(g.hasClass(m.documentElement,'wrapped')){var n=m.getElementById('body');if(n)return n;}var o=h.chrome()||h.safari();return !o&&m.compatMode==='CSS1Compat'?m.documentElement:m.body;},getDocumentBodyElement:function(m){m=m||document;if(g.hasClass(m.documentElement,'wrapped')){var n=m.getElementById('body');if(n)return n;}return m.body;}};e.exports=l;});
__d("getObjectValues",["hasArrayNature"],function(a,b,c,d,e,f){var g=b('hasArrayNature');function h(i){var j=[];for(var k in i)j.push(i[k]);return j;}e.exports=h;});
__d("event-extensions",["event-form-bubbling","DataStore","DOMQuery","ErrorUtils","Parent","UserAgent","$","copyProperties","getObjectValues","userAction"],function(a,b,c,d,e,f){b('event-form-bubbling');var g=b('DataStore'),h=b('DOMQuery'),i=b('ErrorUtils'),j=b('Parent'),k=b('UserAgent'),l=b('$'),m=b('copyProperties'),n=b('getObjectValues'),o=b('userAction');Event.DATASTORE_KEY='Event.listeners';if(!Event.prototype)Event.prototype={};function p(y,z,aa){this.target=y;this.type=z;this.data=aa;}m(p.prototype,{getData:function(){this.data=this.data||{};return this.data;},stop:function(){this.cancelBubble=true;this.stopPropagation&&this.stopPropagation();return this;},prevent:function(){this.returnValue=false;this.preventDefault&&this.preventDefault();return this;},kill:function(){this.stop().prevent();return false;},getTarget:function(){var y=this.target||this.srcElement;return y?l(y):null;}});function q(y){if(y instanceof p)return y;y=y||window.event||{};if(!y._inherits_from_prototype)for(var z in Event.prototype)try{y[z]=Event.prototype[z];}catch(aa){}return y;}m(Event.prototype,{_inherits_from_prototype:true,getRelatedTarget:function(){var y=this.relatedTarget||(this.fromElement===this.srcElement?this.toElement:this.fromElement);return y?l(y):null;},getModifiers:function(){var y={control:!!this.ctrlKey,shift:!!this.shiftKey,alt:!!this.altKey,meta:!!this.metaKey};y.access=k.osx()?y.control:y.alt;y.any=y.control||y.shift||y.alt||y.meta;return y;},isMiddleClick:function(){if(this.which)return this.which===2;return this.button&&this.button===4;}});m(Event.prototype,p.prototype);m(Event,{listen:function(y,z,aa,ba){if(typeof y=='string')y=l(y);if(typeof ba=='undefined')ba=Event.Priority.NORMAL;if(typeof z=='object'){var ca={};for(var da in z)ca[da]=Event.listen(y,da,z[da],ba);return ca;}if(z.match(/^on/i))throw new TypeError("Bad event name `"+event+"': use `click', not `onclick'.");if(y.nodeName=='LABEL'&&z=='click'){var ea=y.getElementsByTagName('input');y=ea.length==1?ea[0]:y;}else if(y===window&&z==='scroll'){var fa=h.getDocumentScrollElement();if(fa!==document.documentElement&&fa!==document.body)y=fa;}var ga=g.get(y,s,{});if(u[z]){var ha=u[z];z=ha.base;aa=ha.wrap(aa);}v(y,z);var ia=ga[z];if(!(ba in ia))ia[ba]=[];var ja=ia[ba].length,ka=new x(aa,ia[ba],ja);ia[ba].push(ka);return ka;},stop:function(y){return q(y).stop();},prevent:function(y){return q(y).prevent();},kill:function(y){return q(y).kill();},getKeyCode:function(event){event=q(event);if(!event)return false;switch(event.keyCode){case 63232:return 38;case 63233:return 40;case 63234:return 37;case 63235:return 39;case 63272:case 63273:case 63275:return null;case 63276:return 33;case 63277:return 34;}if(event.shiftKey)switch(event.keyCode){case 33:case 34:case 37:case 38:case 39:case 40:return null;}return event.keyCode;},getPriorities:function(){if(!r){var y=n(Event.Priority);y.sort(function(z,aa){return z-aa;});r=y;}return r;},fire:function(y,z,aa){var ba=new p(y,z,aa),ca;do{var da=Event.__getHandler(y,z);if(da)ca=da(ba);y=y.parentNode;}while(y&&ca!==false&&!ba.cancelBubble);return ca!==false;},__fire:function(y,z,event){var aa=Event.__getHandler(y,z);if(aa)return aa(q(event));},__getHandler:function(y,z){return g.get(y,Event.DATASTORE_KEY+z);},getPosition:function(y){y=q(y);var z=h.getDocumentScrollElement(),aa=y.clientX+z.scrollLeft,ba=y.clientY+z.scrollTop;return {x:aa,y:ba};}});var r=null,s=Event.DATASTORE_KEY,t=function(y){return function(z){if(!h.contains(this,z.getRelatedTarget()))return y.call(this,z);};},u={mouseenter:{base:'mouseover',wrap:t},mouseleave:{base:'mouseout',wrap:t}},v=function(y,z){var aa='on'+z,ba=w.bind(y),ca=g.get(y,s);if(z in ca)return;ca[z]={};if(y.addEventListener){y.addEventListener(z,ba,false);}else if(y.attachEvent)y.attachEvent(aa,ba);g.set(y,s+z,ba);if(y[aa]){var da=y===document.documentElement?Event.Priority._BUBBLE:Event.Priority.TRADITIONAL,ea=y[aa];y[aa]=null;Event.listen(y,z,ea,da);}if(y.nodeName==='FORM'&&z==='submit')Event.listen(y,z,Event.__bubbleSubmit.curry(y),Event.Priority._BUBBLE);},w=function(event){event=q(event);var y=event.type;if(!g.get(this,s))throw new Error("Bad listenHandler context.");var z=g.get(this,s)[y];if(!z)throw new Error("No registered handlers for `"+y+"'.");if(y=='click'){var aa=j.byTag(event.getTarget(),'a'),ba=o('click',aa,event).set_namespace('evt_ext');if(window.ArbiterMonitor)window.ArbiterMonitor.initUA(ba,[aa]);}var ca=Event.getPriorities();for(var da=0;da<ca.length;da++){var ea=ca[da];if(ea in z){var fa=z[ea];for(var ga=0;ga<fa.length;ga++){if(!fa[ga])continue;var ha=fa[ga].fire(this,event);if(ha===false){return event.kill();}else if(event.cancelBubble)event.stop();}}}return event.returnValue;};Event.Priority={URGENT:-20,TRADITIONAL:-10,NORMAL:0,_BUBBLE:1000};function x(y,z,aa){this._handler=y;this._container=z;this._index=aa;}m(x.prototype,{remove:function(){delete this._handler;delete this._container[this._index];},fire:function(y,event){return i.applyWithGuard(this._handler,y,[event],function(z){z.event_type=event.type;z.dom_element=y.name||y.id;z.category='eventhandler';});}});a.$E=f.$E=q;});
__d("throttle",["debounce"],function(a,b,c,d,e,f){var g=b('debounce');function h(i,j,k){return g(i,j,k,true);}e.exports=h;});
__d("UserActivity",["event-extensions","Arbiter","throttle"],function(a,b,c,d,e,f){b('event-extensions');var g=b('Arbiter'),h=b('throttle'),i=Date.now(),j={DEFAULT_IDLE_MS:5000,EVENT_INTERVAL_MS:500,subscribeOnce:function(l){var m=j.subscribe(function(){j.unsubscribe(m);l();});},subscribe:function(l){return g.subscribe('useractivity/activity',l);},unsubscribe:function(l){l.unsubscribe();},isActive:function(l){return (new Date()-i<(l||j.DEFAULT_IDLE_MS));}},k=h(function(event){var l=Date.now(),m=l-i;i=l;g.inform('useractivity/activity',{event:event,idleness:m});},j.EVENT_INTERVAL_MS);Event.listen(document.documentElement,{mouseover:k,keydown:k,click:k});e.exports=j;});