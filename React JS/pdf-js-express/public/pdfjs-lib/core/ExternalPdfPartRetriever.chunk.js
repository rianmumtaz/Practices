/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[7],{366:function(ha,ca,f){f.r(ca);var aa=f(4);ha=f(46);var z=f(137),fa=f(313),da=f(187),ba=window;f=function(){function f(f,x){this.WP=function(f){f=f.split(".");return f[f.length-1].match(/(jpg|jpeg|png|gif)$/i)};x=x||{};this.url=f;this.filename=x.filename||f;this.lf=x.customHeaders;this.mda=!!x.useDownloader;this.withCredentials=!!x.withCredentials}f.prototype.wB=function(f){this.lf=f};f.prototype.getFileData=function(n){var x=
this,h=this,e=new XMLHttpRequest,w=0===this.url.indexOf("blob:")?"blob":"arraybuffer";e.open("GET",this.url,!0);e.withCredentials=this.withCredentials;e.responseType=w;this.lf&&Object.keys(this.lf).forEach(function(f){e.setRequestHeader(f,x.lf[f])});var r=/^https?:/i.test(this.url);e.addEventListener("load",function(e){return Object(aa.b)(this,void 0,void 0,function(){var w,x,y,ba,ca,fa;return Object(aa.d)(this,function(aa){switch(aa.label){case 0:if(200!==this.status&&(r||0!==this.status))return[3,
10];h.trigger(f.Events.DOCUMENT_LOADING_PROGRESS,[e.loaded,e.loaded]);if("blob"!==this.responseType)return[3,4];w=this.response;return h.WP(h.filename)?[4,Object(da.b)(w)]:[3,2];case 1:return x=aa.na(),h.fileSize=x.byteLength,n(new Uint8Array(x)),[3,3];case 2:y=new FileReader,y.onload=function(e){e=new Uint8Array(e.target.result);h.fileSize=e.length;n(e)},y.readAsArrayBuffer(w),aa.label=3;case 3:return[3,9];case 4:aa.ql.push([4,8,,9]);ba=new Uint8Array(this.response);if(!h.WP(h.filename))return[3,
6];w=new Blob([ba.buffer]);return[4,Object(da.b)(w)];case 5:return x=aa.na(),h.fileSize=x.byteLength,n(new Uint8Array(x)),[3,7];case 6:h.fileSize=ba.length,n(ba),aa.label=7;case 7:return[3,9];case 8:return aa.na(),h.trigger(f.Events.ERROR,["pdfLoad","Out of memory"]),[3,9];case 9:return[3,11];case 10:ca=e.currentTarget,fa=Object(z.b)(ca),h.trigger(f.Events.ERROR,["pdfLoad",this.status+" "+ca.statusText,fa]),aa.label=11;case 11:return h.yw=null,[2]}})})},!1);e.onprogress=function(e){h.trigger(f.Events.DOCUMENT_LOADING_PROGRESS,
[e.loaded,0<e.total?e.total:0])};e.addEventListener("error",function(){h.trigger(f.Events.ERROR,["pdfLoad","Network failure"]);h.yw=null},!1);e.send();this.yw=e};f.prototype.getFile=function(){var f=this;return new Promise(function(n){ba.utils.isJSWorker&&n(f.url);if(f.mda){var h=Object(aa.a)({url:f.url},f.lf?{customHeaders:f.lf}:{});n(h)}n(null)})};f.prototype.abort=function(){this.yw&&(this.yw.abort(),this.yw=null)};f.Events={DOCUMENT_LOADING_PROGRESS:"documentLoadingProgress",ERROR:"error"};return f}();
Object(ha.a)(f);Object(fa.a)(f);Object(fa.b)(f);ca["default"]=f}}]);}).call(this || window)
