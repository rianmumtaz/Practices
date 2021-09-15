/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[13],{368:function(ha,ca,f){f.r(ca);var aa=f(4),z=f(0);f.n(z);var fa=f(1),da=f(124);ha=f(46);var ba=f(79),y=f(201),n=f(56),x=f(200);f=f(313);var h=window,e=function(){function e(e,f,h){var r=-1===e.indexOf("?")?"?":"&";switch(f){case n.a.NEVER_CACHE:this.url=e+r+"_="+Object(z.uniqueId)();break;default:this.url=e}this.lf=h;this.request=new XMLHttpRequest;this.request.open("GET",this.url,!0);this.request.setRequestHeader("X-Requested-With",
"XMLHttpRequest");this.request.overrideMimeType?this.request.overrideMimeType("text/plain; charset=x-user-defined"):this.request.setRequestHeader("Accept-Charset","x-user-defined");this.status=x.a.NOT_STARTED}e.prototype.start=function(f,h){var n=this,r=this,w=this.request,y;r.Wu=0;f&&Object.keys(f).forEach(function(e){n.request.setRequestHeader(e,f[e])});h&&(this.request.withCredentials=h);this.XA=setInterval(function(){var f=0===window.document.URL.indexOf("file:///");f=200===w.status||f&&0===w.status;
if(w.readyState!==x.b.DONE||f){try{w.responseText}catch(pa){return}r.Wu<w.responseText.length&&(y=r.s9())&&r.trigger(e.Events.DATA,[y]);0===w.readyState&&(clearInterval(r.XA),r.trigger(e.Events.DONE))}else clearInterval(r.XA),r.trigger(e.Events.DONE,["Error received return status "+w.status])},1E3);this.request.send(null);this.status=x.a.STARTED};e.prototype.s9=function(){var f=this.request,n=f.responseText;if(0!==n.length)if(this.Wu===n.length)clearInterval(this.XA),this.trigger(e.Events.DONE);else return n=
Math.min(this.Wu+3E6,n.length),f=h.SO(f,this.Wu,!0,n),this.Wu=n,f};e.prototype.abort=function(){clearInterval(this.XA);var f=this;this.request.onreadystatechange=function(){Object(fa.i)("StreamingRequest aborted");f.status=x.a.ABORTED;return f.trigger(e.Events.ABORTED)};this.request.abort()};e.prototype.finish=function(){var f=this;this.request.onreadystatechange=function(){f.status=x.a.SUCCESS;return f.trigger(e.Events.DONE)};this.request.abort()};e.Events={DONE:"done",DATA:"data",ABORTED:"aborted"};
return e}();Object(ha.a)(e);var w;(function(e){e[e.LOCAL_HEADER=0]="LOCAL_HEADER";e[e.FILE=1]="FILE";e[e.CENTRAL_DIR=2]="CENTRAL_DIR"})(w||(w={}));var r=function(e){function f(){var f=e.call(this)||this;f.buffer="";f.state=w.LOCAL_HEADER;f.MI=4;f.Rk=null;f.ur=da.c;f.im={};return f}Object(aa.c)(f,e);f.prototype.m9=function(e){var h;for(e=this.buffer+e;e.length>=this.ur;)switch(this.state){case w.LOCAL_HEADER:this.Rk=h=this.w9(e.slice(0,this.ur));if(h.Yr!==da.g)throw Error("Wrong signature in local header: "+
h.Yr);e=e.slice(this.ur);this.state=w.FILE;this.ur=h.XD+h.Xo+h.cu+this.MI;this.trigger(f.Events.HEADER,[h]);break;case w.FILE:this.Rk.name=e.slice(0,this.Rk.Xo);this.im[this.Rk.name]=this.Rk;h=this.ur-this.MI;var n=e.slice(this.Rk.Xo+this.Rk.cu,h);this.trigger(f.Events.FILE,[this.Rk.name,n,this.Rk.mE]);e=e.slice(h);if(e.slice(0,this.MI)===da.h)this.state=w.LOCAL_HEADER,this.ur=da.c;else return this.state=w.CENTRAL_DIR,!0}this.buffer=e;return!1};f.Events={HEADER:"header",FILE:"file"};return f}(y.a);
Object(ha.a)(r);ha=function(f){function h(h,n,w,x,y){w=f.call(this,h,w,x)||this;w.url=h;w.stream=new e(h,n);w.Kd=new r;w.xR=window.createPromiseCapability();w.UR={};w.lf=y;return w}Object(aa.c)(h,f);h.prototype.Jv=function(f){var h=this;this.request([this.Di,this.Pj,this.Bi]);this.stream.addEventListener(e.Events.DATA,function(e){try{if(h.Kd.m9(e))return h.stream.finish()}catch(la){throw h.stream.abort(),h.$t(la),f(la),la;}});this.stream.addEventListener(e.Events.DONE,function(e){h.U8=!0;h.xR.resolve();
e&&(h.$t(e),f(e))});this.Kd.addEventListener(r.Events.HEADER,Object(z.bind)(this.TR,this));this.Kd.addEventListener(r.Events.FILE,Object(z.bind)(this.M9,this));return this.stream.start(this.lf,this.withCredentials)};h.prototype.PO=function(e){var f=this;this.xR.promise.then(function(){e(Object.keys(f.Kd.im))})};h.prototype.Om=function(){return!0};h.prototype.request=function(e){var f=this;this.U8&&e.forEach(function(e){f.UR[e]||f.Pca(e)})};h.prototype.TR=function(){};h.prototype.abort=function(){this.stream&&
this.stream.abort()};h.prototype.Pca=function(e){this.trigger(ba.a.Events.PART_READY,[{bb:e,error:"Requested part not found",Kh:!1,Hf:!1}])};h.prototype.M9=function(e,f,h){this.UR[e]=!0;this.trigger(ba.a.Events.PART_READY,[{bb:e,data:f,Kh:!1,Hf:!1,error:null,Uc:h}])};return h}(ba.a);Object(f.a)(ha);Object(f.b)(ha);ca["default"]=ha}}]);}).call(this || window)