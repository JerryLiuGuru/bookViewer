var $jscomp={scope:{},getGlobal:function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global?global:a}};$jscomp.global=$jscomp.getGlobal(this);$jscomp.initSymbol=function(){$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol);$jscomp.initSymbol=function(){}};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return"jscomp_symbol_"+a+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();$jscomp.global.Symbol.iterator||($jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));$jscomp.initSymbolIterator=function(){}};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();if(a[$jscomp.global.Symbol.iterator])return a[$jscomp.global.Symbol.iterator]();var c=0;return{next:function(){return c==a.length?{done:!0}:{done:!1,value:a[c++]}}}};
$jscomp.arrayFromIterator=function(a){for(var c,d=[];!(c=a.next()).done;)d.push(c.value);return d};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};
$jscomp.inherits=function(a,c){function d(){}d.prototype=c.prototype;a.prototype=new d;a.prototype.constructor=a;for(var b in c)if($jscomp.global.Object.defineProperties){var e=$jscomp.global.Object.getOwnPropertyDescriptor(c,b);e&&$jscomp.global.Object.defineProperty(a,b,e)}else a[b]=c[b]};$jscomp.array=$jscomp.array||{};$jscomp.array.done_=function(){return{done:!0,value:void 0}};
$jscomp.array.arrayIterator_=function(a,c){a instanceof String&&(a=String(a));var d=0;$jscomp.initSymbol();$jscomp.initSymbolIterator();var b={};$jscomp.initSymbol();$jscomp.initSymbolIterator();var e=(b.next=function(){if(d<a.length){var b=d++;return{value:c(b,a[b]),done:!1}}e.next=$jscomp.array.done_;return $jscomp.array.done_()},b[Symbol.iterator]=function(){return e},b);return e};
$jscomp.array.findInternal_=function(a,c,d){a instanceof String&&(a=String(a));for(var b=a.length,e=0;e<b;e++){var f=a[e];if(c.call(d,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};
$jscomp.array.from=function(a,c,d){c=void 0===c?function(a){return a}:c;var b=[];$jscomp.initSymbol();$jscomp.initSymbolIterator();$jscomp.initSymbol();$jscomp.initSymbolIterator();if(a[Symbol.iterator]){$jscomp.initSymbol();$jscomp.initSymbolIterator();$jscomp.initSymbol();$jscomp.initSymbolIterator();a=a[Symbol.iterator]();for(var e;!(e=a.next()).done;)b.push(c.call(d,e.value))}else{e=a.length;for(var f=0;f<e;f++)b.push(c.call(d,a[f]))}return b};
$jscomp.array.of=function(a){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];return $jscomp.array.from(c)};$jscomp.array.entries=function(){return $jscomp.array.arrayIterator_(this,function(a,c){return[a,c]})};$jscomp.array.installHelper_=function(a,c){!Array.prototype[a]&&Object.defineProperties&&Object.defineProperty&&Object.defineProperty(Array.prototype,a,{configurable:!0,enumerable:!1,writable:!0,value:c})};
$jscomp.array.entries$install=function(){$jscomp.array.installHelper_("entries",$jscomp.array.entries)};$jscomp.array.keys=function(){return $jscomp.array.arrayIterator_(this,function(a){return a})};$jscomp.array.keys$install=function(){$jscomp.array.installHelper_("keys",$jscomp.array.keys)};$jscomp.array.values=function(){return $jscomp.array.arrayIterator_(this,function(a,c){return c})};$jscomp.array.values$install=function(){$jscomp.array.installHelper_("values",$jscomp.array.values)};
$jscomp.array.copyWithin=function(a,c,d){var b=this.length;a=Number(a);c=Number(c);d=Number(null!=d?d:b);if(a<c)for(d=Math.min(d,b);c<d;)c in this?this[a++]=this[c++]:(delete this[a++],c++);else for(d=Math.min(d,b+c-a),a+=d-c;d>c;)--d in this?this[--a]=this[d]:delete this[a];return this};$jscomp.array.copyWithin$install=function(){$jscomp.array.installHelper_("copyWithin",$jscomp.array.copyWithin)};
$jscomp.array.fill=function(a,c,d){null!=d&&a.length||(d=this.length||0);d=Number(d);for(c=Number((void 0===c?0:c)||0);c<d;c++)this[c]=a;return this};$jscomp.array.fill$install=function(){$jscomp.array.installHelper_("fill",$jscomp.array.fill)};$jscomp.array.find=function(a,c){return $jscomp.array.findInternal_(this,a,c).v};$jscomp.array.find$install=function(){$jscomp.array.installHelper_("find",$jscomp.array.find)};
$jscomp.array.findIndex=function(a,c){return $jscomp.array.findInternal_(this,a,c).i};$jscomp.array.findIndex$install=function(){$jscomp.array.installHelper_("findIndex",$jscomp.array.findIndex)};$jscomp.Map=function(a){a=void 0===a?[]:a;this.data_={};this.head_=$jscomp.Map.createHead_();this.size=0;if(a){a=$jscomp.makeIterator(a);for(var c=a.next();!c.done;c=a.next())c=c.value,this.set(c[0],c[1])}};
$jscomp.Map.checkBrowserConformance_=function(){var a=$jscomp.global.Map;if(!a||!a.prototype.entries||!Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a($jscomp.makeIterator([[c,"s"]]));if("s"!=d.get(c)||1!=d.size||d.get({x:4})||d.set({x:4},"t")!=d||2!=d.size)return!1;var b=d.entries(),e=b.next();if(e.done||e.value[0]!=c||"s"!=e.value[1])return!1;e=b.next();return e.done||4!=e.value[0].x||"t"!=e.value[1]||!b.next().done?!1:!0}catch(f){return!1}};
$jscomp.Map.createHead_=function(){var a={};return a.previous=a.next=a.head=a};$jscomp.Map.getId_=function(a){if(!(a instanceof Object))return String(a);$jscomp.Map.key_ in a||a instanceof Object&&Object.isExtensible&&Object.isExtensible(a)&&$jscomp.Map.defineProperty_(a,$jscomp.Map.key_,++$jscomp.Map.index_);return $jscomp.Map.key_ in a?a[$jscomp.Map.key_]:" "+a};
$jscomp.Map.prototype.set=function(a,c){var d=this.maybeGetEntry_(a),b=d.id,e=d.list,d=d.entry;e||(e=this.data_[b]=[]);d?d.value=c:(d={next:this.head_,previous:this.head_.previous,head:this.head_,key:a,value:c},e.push(d),this.head_.previous.next=d,this.head_.previous=d,this.size++);return this};
$jscomp.Map.prototype["delete"]=function(a){var c=this.maybeGetEntry_(a);a=c.id;var d=c.list,b=c.index;return(c=c.entry)&&d?(d.splice(b,1),d.length||delete this.data_[a],c.previous.next=c.next,c.next.previous=c.previous,c.head=null,this.size--,!0):!1};$jscomp.Map.prototype.clear=function(){this.data_={};this.head_=this.head_.previous=$jscomp.Map.createHead_();this.size=0};$jscomp.Map.prototype.has=function(a){return!!this.maybeGetEntry_(a).entry};
$jscomp.Map.prototype.get=function(a){return(a=this.maybeGetEntry_(a).entry)&&a.value};$jscomp.Map.prototype.maybeGetEntry_=function(a){var c=$jscomp.Map.getId_(a),d=this.data_[c];if(d)for(var b=0;b<d.length;b++){var e=d[b];if(a!==a&&e.key!==e.key||a===e.key)return{id:c,list:d,index:b,entry:e}}return{id:c,list:d,index:-1,entry:void 0}};$jscomp.Map.prototype.entries=function(){return this.iter_(function(a){return[a.key,a.value]})};$jscomp.Map.prototype.keys=function(){return this.iter_(function(a){return a.key})};
$jscomp.Map.prototype.values=function(){return this.iter_(function(a){return a.value})};$jscomp.Map.prototype.forEach=function(a,c){for(var d=$jscomp.makeIterator(this.entries()),b=d.next();!b.done;b=d.next())b=b.value,a.call(c,b[1],b[0],this)};
$jscomp.Map.prototype.iter_=function(a){var c=this,d=this.head_;$jscomp.initSymbol();$jscomp.initSymbolIterator();var b={};$jscomp.initSymbol();$jscomp.initSymbolIterator();return b.next=function(){if(d){for(;d.head!=c.head_;)d=d.previous;for(;d.next!=d.head;)return d=d.next,{done:!1,value:a(d)};d=null}return{done:!0,value:void 0}},b[Symbol.iterator]=function(){return this},b};$jscomp.Map.index_=0;
$jscomp.Map.defineProperty_=Object.defineProperty?function(a,c,d){Object.defineProperty(a,c,{value:String(d)})}:function(a,c,d){a[c]=String(d)};$jscomp.Map.Entry_=function(){};$jscomp.Map.ASSUME_NO_NATIVE=!1;
$jscomp.Map$install=function(){$jscomp.initSymbol();$jscomp.initSymbolIterator();!$jscomp.Map.ASSUME_NO_NATIVE&&$jscomp.Map.checkBrowserConformance_()?$jscomp.Map=$jscomp.global.Map:($jscomp.initSymbol(),$jscomp.initSymbolIterator(),$jscomp.initSymbol(),$jscomp.initSymbolIterator(),$jscomp.Map.prototype[Symbol.iterator]=$jscomp.Map.prototype.entries,$jscomp.initSymbol(),$jscomp.initSymbol(),$jscomp.Map.key_=Symbol("map-id-key"));$jscomp.Map$install=function(){}};$jscomp.math=$jscomp.math||{};
$jscomp.math.clz32=function(a){a=Number(a)>>>0;if(0===a)return 32;var c=0;0===(a&4294901760)&&(a<<=16,c+=16);0===(a&4278190080)&&(a<<=8,c+=8);0===(a&4026531840)&&(a<<=4,c+=4);0===(a&3221225472)&&(a<<=2,c+=2);0===(a&2147483648)&&c++;return c};$jscomp.math.imul=function(a,c){a=Number(a);c=Number(c);var d=a&65535,b=c&65535;return d*b+((a>>>16&65535)*b+d*(c>>>16&65535)<<16>>>0)|0};$jscomp.math.sign=function(a){a=Number(a);return 0===a||isNaN(a)?a:0<a?1:-1};
$jscomp.math.log10=function(a){return Math.log(a)/Math.LN10};$jscomp.math.log2=function(a){return Math.log(a)/Math.LN2};$jscomp.math.log1p=function(a){a=Number(a);if(.25>a&&-.25<a){for(var c=a,d=1,b=a,e=0,f=1;e!=b;)c*=a,f*=-1,b=(e=b)+f*c/++d;return b}return Math.log(1+a)};$jscomp.math.expm1=function(a){a=Number(a);if(.25>a&&-.25<a){for(var c=a,d=1,b=a,e=0;e!=b;)c*=a/++d,b=(e=b)+c;return b}return Math.exp(a)-1};$jscomp.math.cosh=function(a){a=Number(a);return(Math.exp(a)+Math.exp(-a))/2};
$jscomp.math.sinh=function(a){a=Number(a);return 0===a?a:(Math.exp(a)-Math.exp(-a))/2};$jscomp.math.tanh=function(a){a=Number(a);if(0===a)return a;var c=Math.exp(2*-Math.abs(a)),c=(1-c)/(1+c);return 0>a?-c:c};$jscomp.math.acosh=function(a){a=Number(a);return Math.log(a+Math.sqrt(a*a-1))};$jscomp.math.asinh=function(a){a=Number(a);if(0===a)return a;var c=Math.log(Math.abs(a)+Math.sqrt(a*a+1));return 0>a?-c:c};
$jscomp.math.atanh=function(a){a=Number(a);return($jscomp.math.log1p(a)-$jscomp.math.log1p(-a))/2};
$jscomp.math.hypot=function(a,c,d){for(var b=[],e=2;e<arguments.length;++e)b[e-2]=arguments[e];a=Number(a);c=Number(c);for(var f=Math.max(Math.abs(a),Math.abs(c)),h=$jscomp.makeIterator(b),e=h.next();!e.done;e=h.next())f=Math.max(f,Math.abs(e.value));if(1E100<f||1E-100>f){a/=f;c/=f;h=a*a+c*c;b=$jscomp.makeIterator(b);for(e=b.next();!e.done;e=b.next())e=e.value,e=Number(e)/f,h+=e*e;return Math.sqrt(h)*f}f=a*a+c*c;b=$jscomp.makeIterator(b);for(e=b.next();!e.done;e=b.next())e=e.value,e=Number(e),f+=
e*e;return Math.sqrt(f)};$jscomp.math.trunc=function(a){a=Number(a);if(isNaN(a)||Infinity===a||-Infinity===a||0===a)return a;var c=Math.floor(Math.abs(a));return 0>a?-c:c};$jscomp.math.cbrt=function(a){if(0===a)return a;a=Number(a);var c=Math.pow(Math.abs(a),1/3);return 0>a?-c:c};$jscomp.number=$jscomp.number||{};$jscomp.number.isFinite=function(a){return"number"!==typeof a?!1:!isNaN(a)&&Infinity!==a&&-Infinity!==a};
$jscomp.number.isInteger=function(a){return $jscomp.number.isFinite(a)?a===Math.floor(a):!1};$jscomp.number.isNaN=function(a){return"number"===typeof a&&isNaN(a)};$jscomp.number.isSafeInteger=function(a){return $jscomp.number.isInteger(a)&&Math.abs(a)<=$jscomp.number.MAX_SAFE_INTEGER};$jscomp.number.EPSILON=Math.pow(2,-52);$jscomp.number.MAX_SAFE_INTEGER=9007199254740991;$jscomp.number.MIN_SAFE_INTEGER=-9007199254740991;$jscomp.object=$jscomp.object||{};
$jscomp.object.assign=function(a,c){for(var d=[],b=1;b<arguments.length;++b)d[b-1]=arguments[b];d=$jscomp.makeIterator(d);for(b=d.next();!b.done;b=d.next())if(b=b.value)for(var e in b)Object.prototype.hasOwnProperty.call(b,e)&&(a[e]=b[e]);return a};$jscomp.object.is=function(a,c){return a===c?0!==a||1/a===1/c:a!==a&&c!==c};$jscomp.Set=function(a){a=void 0===a?[]:a;this.map_=new $jscomp.Map;if(a){a=$jscomp.makeIterator(a);for(var c=a.next();!c.done;c=a.next())this.add(c.value)}this.size=this.map_.size};
$jscomp.Set.checkBrowserConformance_=function(){var a=$jscomp.global.Set;if(!a||!a.prototype.entries||!Object.seal)return!1;var c=Object.seal({x:4}),a=new a($jscomp.makeIterator([c]));if(a.has(c)||1!=a.size||a.add(c)!=a||1!=a.size||a.add({x:4})!=a||2!=a.size)return!1;var a=a.entries(),d=a.next();if(d.done||d.value[0]!=c||d.value[1]!=c)return!1;d=a.next();return d.done||d.value[0]==c||4!=d.value[0].x||d.value[1]!=d.value[0]?!1:a.next().done};
$jscomp.Set.prototype.add=function(a){this.map_.set(a,a);this.size=this.map_.size;return this};$jscomp.Set.prototype["delete"]=function(a){a=this.map_["delete"](a);this.size=this.map_.size;return a};$jscomp.Set.prototype.clear=function(){this.map_.clear();this.size=0};$jscomp.Set.prototype.has=function(a){return this.map_.has(a)};$jscomp.Set.prototype.entries=function(){return this.map_.entries()};$jscomp.Set.prototype.values=function(){return this.map_.values()};
$jscomp.Set.prototype.forEach=function(a,c){var d=this;this.map_.forEach(function(b){return a.call(c,b,b,d)})};$jscomp.Set.ASSUME_NO_NATIVE=!1;$jscomp.Set$install=function(){!$jscomp.Set.ASSUME_NO_NATIVE&&$jscomp.Set.checkBrowserConformance_()?$jscomp.Set=$jscomp.global.Set:($jscomp.Map$install(),$jscomp.initSymbol(),$jscomp.initSymbolIterator(),$jscomp.initSymbol(),$jscomp.initSymbolIterator(),$jscomp.Set.prototype[Symbol.iterator]=$jscomp.Set.prototype.values);$jscomp.Set$install=function(){}};
$jscomp.string=$jscomp.string||{};$jscomp.string.noNullOrUndefined_=function(a,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");};$jscomp.string.noRegExp_=function(a,c){if(a instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");};
$jscomp.string.fromCodePoint=function(a){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];for(var d="",c=$jscomp.makeIterator(c),b=c.next();!b.done;b=c.next()){b=b.value;b=+b;if(0>b||1114111<b||b!==Math.floor(b))throw new RangeError("invalid_code_point "+b);65535>=b?d+=String.fromCharCode(b):(b-=65536,d+=String.fromCharCode(b>>>10&1023|55296),d+=String.fromCharCode(b&1023|56320))}return d};
$jscomp.string.repeat=function(a){$jscomp.string.noNullOrUndefined_(this,"repeat");var c=String(this);if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var d="";a;)if(a&1&&(d+=c),a>>>=1)c+=c;return d};$jscomp.string.repeat$install=function(){String.prototype.repeat||(String.prototype.repeat=$jscomp.string.repeat)};
$jscomp.string.codePointAt=function(a){$jscomp.string.noNullOrUndefined_(this,"codePointAt");var c=String(this),d=c.length;a=Number(a)||0;if(0<=a&&a<d){a|=0;var b=c.charCodeAt(a);if(55296>b||56319<b||a+1===d)return b;a=c.charCodeAt(a+1);return 56320>a||57343<a?b:1024*(b-55296)+a+9216}};$jscomp.string.codePointAt$install=function(){String.prototype.codePointAt||(String.prototype.codePointAt=$jscomp.string.codePointAt)};
$jscomp.string.includes=function(a,c){c=void 0===c?0:c;$jscomp.string.noRegExp_(a,"includes");$jscomp.string.noNullOrUndefined_(this,"includes");return-1!==String(this).indexOf(a,c)};$jscomp.string.includes$install=function(){String.prototype.includes||(String.prototype.includes=$jscomp.string.includes)};
$jscomp.string.startsWith=function(a,c){c=void 0===c?0:c;$jscomp.string.noRegExp_(a,"startsWith");$jscomp.string.noNullOrUndefined_(this,"startsWith");var d=String(this);a+="";for(var b=d.length,e=a.length,f=Math.max(0,Math.min(c|0,d.length)),h=0;h<e&&f<b;)if(d[f++]!=a[h++])return!1;return h>=e};$jscomp.string.startsWith$install=function(){String.prototype.startsWith||(String.prototype.startsWith=$jscomp.string.startsWith)};
$jscomp.string.endsWith=function(a,c){$jscomp.string.noRegExp_(a,"endsWith");$jscomp.string.noNullOrUndefined_(this,"endsWith");var d=String(this);a+="";void 0===c&&(c=d.length);for(var b=Math.max(0,Math.min(c|0,d.length)),e=a.length;0<e&&0<b;)if(d[--b]!=a[--e])return!1;return 0>=e};$jscomp.string.endsWith$install=function(){String.prototype.endsWith||(String.prototype.endsWith=$jscomp.string.endsWith)};
var imgPath="./img/",biA=[],tnArray=[],iLA=[],isImgArrayLoaded=!1,i0loadedti=null,debugMode=!1,sX=-1,sY=-1,sA=[];function handleResize2(){var a;for(a=0;a<allpl.length;a++)null!=allpl[a]&&(allpl[a].width=window.screen.availWidth,allpl[a].height=window.screen.availHeight);return[500,700,500,700]}
function handleResize(a){var c;c=a.width;a=a.height;var d=window.screen.availWidth,b=window.screen.availHeight,e=null,f;2*c/d>bsRatio?(e=bsRatio*d>>1,f=e/c*a):f=a/b;f>5*b/6&&(f=bsRatio*b,e=f/a*c);null==e&&(f>e<<1?(f=bsRatio*b,e=f/a*c):(e=bsRatio*d>>1,f=e/c*a));rw=Math.round(e*scaleUpRatio);rh=Math.round(f*scaleUpRatio);rw2=Math.round(e);rh2=Math.round(f);tbdrw=2*brderWid;tbdrw2=2*brderWid;for(c=0;c<allpl.length;c++)null!=allpl[c]&&(allpl[c].width=window.screen.availWidth,allpl[c].height=window.screen.availHeight);
return[rw2,rh2,rw2,rh2]}function showBookViewer(){dZ=document.getElementById("dz_table");dZ.style["z-index"]=2;debugMode?(sY=Math.floor(window.screen.availHeight/2-sA[1]/2.1),sX=Math.floor(window.screen.availWidth/2-sA[0]/1.5)):(sY=Math.floor(window.screen.availHeight/2-sA[1]/2.3),sX=Math.floor(window.screen.availWidth/2))}
function onLoad(){$("canvas").off("onmousedown");$("canvas").off("onmousemove");$("canvas").off("onmouseup");$("img").off("onload");i0.src=imgPath+"cover.jpg";i0.onload=function(){sA=handleResize2();showBookViewer();shaCfg.spw=50;shaCfg.rect=[[sX,sY,shaCfg.spw,sA[1]],[sX-shaCfg.spw,sY,shaCfg.spw,sA[1]]];shaCfg.grd=[[sX,sY,sX+shaCfg.spw,sY],[sX-shaCfg.spw,sY,sX,sY]];canPos.c_b=[sX,sY,sA[0],sA[1]];canPos.pgs=[sX+(sA[0]-sA[2])/2,sY+(sA[1]-sA[3])/2,sA[2],sA[3]];allpl[0].getContext("2d").drawImage(i0,
sX,sY,sA[0],sA[1])};i0loadedti=setInterval(addOnLoad,500);bC.onmousemove=nC.onmousemove=nnC.onmousemove=mm;bC.onmousedown=nC.onmousedown=nnC.onmousedown=md;bC.onmouseup=nC.onmouseup=nnC.onmouseup=mu;iLA=Array(allpi.length);for(i=0;i<allpi.length;i++)iLA[i]=-1;getImgArray2()}
function getImgArray2(){biA="cover.jpg 1.jpg 2.jpg 3.jpg 4.jpg 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 back".split(" ");imCnt=biA.length;bcimg.src=imgPath+biA[0];pgc.innerHTML=imCnt+" images.";output.style.visibility="visible";isImgArrayLoaded=!0}
function addOnLoad(){if(isImgArrayLoaded){if(null==allpi[1].onload){i0.onload=null;for(var a=0;a<allpi.length;a++)allpi[a].src=imgPath+biA[a],allpi[a].addEventListener("load",function(a){var d;a=a.target;var b=parseInt(a.id[1]);-1==imInd?(b<allpl.length&&(d=allpl[b].getContext("2d"),d.drawImage(a,sX,sY,sA[0],sA[1])),lcnt++,lcnt==allpi.length&&(imInd=0,niInd=1,nniInd=2)):-1!=niInd&&(b==niInd?d=nC.getContext("2d"):b==nniInd?d=nnC.getContext("2d"):console.log("???@78:"+b+",niI="+niInd+",nniI="+nniInd),
0==iLA[b]?(d.drawImage(allpi[b],sX-sA[0],sY,sA[0],sA[1]),console.log("isLoadLpg:"+b+","+(b==niInd?"niI":"nniI"))):1==iLA[b]&&(d.drawImage(allpi[b],sX,sY,sA[0],sA[1]),console.log("isLoadRpg:"+b+","+(b==niInd?"niI":"nniI"))),iLA[b]=-1)})}clearTimeout(i0loadedti)}}
function getImgArray(a){for(var c="",d="",b=-1,e=0,f=a.length;e<f;e++)if(filename=a[e].name,fA=filename.split("."),""!=fA[0]&&""!=fA[1]){b++;if(-1!=fA[0].indexOf("cover"))c=filename,filename="00000.jpg";else if(-1!=fA[0].indexOf("back"))d=filename,filename="99999.jpg";else{for(filename=fA[0];5>filename.length;)filename="0"+filename;filename+=null!=fA[1]?"."+fA[1]:""}tnArray[b]=filename}tnArray.sort();for(e=0;e<tnArray.length;e++){for(fN=tnArray[e];"0"==fN[0]&&!(debugMode&&20>tnArray.length&&2==fN.substring(0,
fN.indexOf(".")).length);)fN=fN.substring(1,fN.length);tnArray[e]=fN}tnArray[0]=c;tnArray[tnArray.length-1]=d;biA=tnArray;imCnt=biA.length;bcimg.src=imgPath+biA[0];pgc.innerHTML=imCnt+" images.";output.style.visibility="visible";isImgArrayLoaded=!0}function update_imInd(a,c){document.getElementById("imInd").innerHTML="imInd: "+imInd+", x,y: ("+a+","+c+")";console.log("Line727: imInd="+imInd)}
function chk_LoR_page_adj_pgInd(a,c,d){parseInt(d[d.length-1]);d=c>=sY&&c<=sY+sA[1];c=a>=sX-sA[0]&&a<=sX&&d;a=a>=sX&&a<=sX+sA[0]&&d;"0"==mouseState&&0<imInd&&imInd<imCnt-1&&(c?imInd-=0==imInd%2?1:0:a&&(imInd+=imInd%2));return[c,a]}function chg_2_ori_size(a){tv=a.style.transform;tv=tv.substring(0,tv.indexOf("translateZ")+11)+"0px)";pP.style.transform=tv}function doCanvasMouseMove(a){console.log("@("+a.clientX+","+a.clientY+")")}
function handlevisibility(a){for(var c=0==a%2,d=c?1:2,b=c?2:1,c=0;c<allpl.length;c++)allpl[c].style.visibility=c>=a-d&&c<=a+b?"visible":"hidden"}function handleFileSelect(a){a.stopPropagation();a.preventDefault();getImgArray(a.dataTransfer.files);showBookViewer()}function handleDragOver(a){a.stopPropagation();a.preventDefault();a.dataTransfer.dropEffect="copy"}
var choose=document.getElementById("choose"),input=document.getElementById("fileURL"),output=document.getElementById("fileOutput"),bcimg=document.getElementById("book_cover_img"),pgc=document.getElementById("page_count"),files,dirpath="file:///Users/jerryliu/Documents/WebFrontendProject/bookViewer/img/",i0=document.getElementById("i0"),i5=document.getElementById("i5"),allpi=[i0,document.getElementById("i1"),document.getElementById("i2"),document.getElementById("i3"),document.getElementById("i4"),
i5],allpl=[document.getElementById("bC"),document.getElementById("nC"),document.getElementById("nnC")],imInd=-1,niInd=-1,nniInd=-1,canPos={c_b:[-1,-1,-1,-1],pgs:[-1,-1,-1,-1]},shaCfg={widPer:.05,spw:-1,rect:[[-1,-1,-1,-1],[-1,-1,-1,-1]],Pg_cs:[["0","255"],["255","0"]],grd:[[-1,-1,-1,-1],[-1,-1,-1,-1]]},tPbrdercolor="#34495e",bgcolor="#ecf0f1",pbOnTopX,pbOnBotX,pbOnLefY,pbOnRigY,isValid,l1,l2,l3,degb,bsRatio=.8,scaleUpRatio=1.05,brderWid=5,showItvl=10,minToShow=10,lcnt=0,mouseState=null,imCnt=0,shkRatio=
.5,doSP=null,isOnLpg_d,isOnRpg_d,isOnLpg_u,isOnRpg_u,dX,dY,lastImg=i5,tAsC=10;
function doShowPageByInterval(a,c,d,b,e,f,h,g){doSP(a,c);null!=h?a==h&&c==g?setTimeout(doShowPageByInterval,e,h,g,d,b,e,f):Math.abs(a-h)<=minToShow||Math.abs(c-g)<=minToShow?setTimeout(doShowPageByInterval,e,h,g,d,b,e,f,h,g):setTimeout(doShowPageByInterval,e,a+(h-a)*f,c+(g-c)*f,d,b,e,f,h,g):Math.abs(a-d)>minToShow||Math.abs(c-b)>minToShow?setTimeout(doShowPageByInterval,e,a+(d-a)*f,c+(b-c)*f,d,b,e,f):(doSP(d,b),isOnLpg_d&&("02"==mouseState||"012"==mouseState&&isOnRpg_u)?(imInd-=2,2<=imInd?(niInd=
(imInd-2)%allpi.length,allpi[niInd].src=imgPath+biA[imInd-2],iLA[niInd]=0):0==imInd&&(niInd=1,allpi[niInd].src=imgPath+biA[1],iLA[niInd]=1),3<=imInd?(nniInd=1>niInd?allpi.length-1:niInd-1,allpi[nniInd].src=imgPath+biA[imInd-3],iLA[nniInd]=0):0==imInd&&(nniInd=2,allpi[nniInd].src=imgPath+biA[2],iLA[nniInd]=1),ctx=allpl[1].getContext("2d"),ctx.drawImage(allpi[(imInd+1)%allpi.length],sX,sY,sA[0],sA[1]),ctx2=allpl[2].getContext("2d"),ctx2.drawImage(allpi[(imInd+2)%allpi.length],sX,sY,sA[0],sA[1])):isOnRpg_d&&
("02"==mouseState||"012"==mouseState&&isOnLpg_u)&&(imInd+=2,imInd<=biA.length-3&&(nniInd=(imInd+2)%allpi.length,allpi[nniInd].src=imgPath+biA[imInd+2],iLA[nniInd]=1),imInd<=biA.length-2&&(niInd=(imInd+1)%allpi.length,allpi[niInd].src=imgPath+biA[imInd+1],iLA[niInd]=1),ctx=allpl[1].getContext("2d"),0<=imInd-2&&ctx.drawImage(allpi[(imInd-2)%allpi.length],sX-sA[0],sY,sA[0],sA[1]),ctx2=allpl[2].getContext("2d"),0<=imInd-3&&ctx2.drawImage(allpi[(imInd-3)%allpi.length],sX-sA[0],sY,sA[0],sA[1])),console.log("end of action: imIaft="+
imInd+",mS="+mouseState+",OLd="+isOnLpg_d+",ORd="+isOnRpg_d+",OLu="+isOnLpg_u+",ORu="+isOnRpg_u),isOnLpg_d=isOnLpg_u=isOnRpg_d=isOnRpg_u=mouseState=null,update_imInd(d,b))}function chk_LoR_page_adj_pgInd(a,c,d){d=c>=sY&&c<=sY+sA[1];c=a>=sX-sA[0]&&a<=sX&&d;a=a>=sX&&a<=sX+sA[0]&&d;"0"==mouseState&&0<imInd&&imInd<imCnt-1&&(c?imInd-=0==imInd%2?1:0:a&&(imInd+=imInd%2));return[c,a]}
function md(a){var c=a.target,d=a.clientX;a=a.clientY;if(!isImgArrayLoaded)alert("Book images not loaded. Drag them into the dropzone.");else if(null==mouseState&&!(d<sX-sA[0]||d>sX+sA[0]||a<sY||a>sY+sA[1])){for(var b=!1,e=0;e<iLA.length;e++)if(0<=iLA[e]){b=!0;break}b?console.log("still loading "+e):(dX=d,dY=a,c=$jscomp.makeIterator(chk_LoR_page_adj_pgInd(dX,dY,c.id)),isOnLpg_d=c.next().value,isOnRpg_d=c.next().value,imInd==imCnt&&isOnRpg_d||0==imInd&&isOnLpg_d?isOnLpg_d=isOnRpg_d=null:mouseState=
"0")}}
function mu(a){var c=a.target,d=!1,b=a.clientX;a=a.clientY;if("0"==mouseState||"01"==mouseState)uX=b,uY=a,mouseState+="2",c=$jscomp.makeIterator(chk_LoR_page_adj_pgInd(uX,uY,c.id)),isOnLpg_u=c.next().value,isOnRpg_u=c.next().value,isOnLpg_d?(doSP=doPagePositionByMouseCorLpg,Math.abs(uX-dX)<tAsC&&Math.abs(uY-dY)<tAsC?setTimeout(doShowPageByInterval,showItvl,sX-sA[0],sY+sA[1],sX+sA[0],sY+sA[1],showItvl,shkRatio,sX-5,sY+4*sA[1]/5):d=!0):isOnRpg_d&&(doSP=doPagePositionByMouseCorRpg,Math.abs(uX-dX)<tAsC&&
Math.abs(uY-dY)<tAsC?setTimeout(doShowPageByInterval,showItvl,sX+sA[0],sY+sA[1],sX-sA[0],sY+sA[1],showItvl,shkRatio,sX-5,sY+4*sA[1]/5):d=!0),d&&slideFromA2B(isOnLpg_u,isOnRpg_u,uX,uY)}function slideFromA2B(a,c,d,b){a=a?[sX-sA[0],sY+sA[1]]:c?[sX+sA[0],sY+sA[1]]:d<sX?[sX-sA[0],sY+sA[1]]:[sX+sA[0],sY+sA[1]];setTimeout(doShowPageByInterval,showItvl,d,b,a[0],a[1],showItvl,.5)}
function mm(a){var c=a.clientX;a=a.clientY;var d=sX+3*sA[0]/4,b=sX-3*sA[0]/4,e=sY+3*sA[1]/4;if("0"==mouseState&&(isOnLpg_d&&(dX>b||dY<e)||isOnRpg_d&&(dX<d||dY<e)))mouseState=null;else{-1!=imInd&&imInd<imCnt&&c>d&&c<sX+sA[0]&&a>e&&a<sY+sA[1]?bC.style.cursor="nw-resize":0<imInd&&c<b&&c>sX-sA[0]&&a>e&&a<sY+sA[1]?bC.style.cursor="ne-resize":"01"!=mouseState&&(bC.style.cursor="default");if("0"==mouseState)mouseState+="1";else if("01"!=mouseState)return;isOnLpg_d?(doSP=doPagePositionByMouseCorLpg,doSP(c,
a)):isOnRpg_d&&(doSP=doPagePositionByMouseCorRpg,doSP(c,a))}}
function mo(a){var c=a.clientX;a=a.clientY;ctx2=bC.getContext("2d");ctx2.beginPath();ctx2.moveTo(sX+sA[0],sY+sA[1]);ctx2.lineTo(sX+3*sA[0]/4,sY+sA[1]);ctx2.lineTo(sX+3*sA[0]/4,sY+3*sA[1]/4);ctx2.lineTo(sX+sA[0],sY+3*sA[1]/4);ctx2.closePath();ctx2.strokeStyle="red";ctx2.stroke();ctx2.beginPath();ctx2.moveTo(sX-sA[0],sY+sA[1]);ctx2.lineTo(sX-3*sA[0]/4,sY+sA[1]);ctx2.lineTo(sX-3*sA[0]/4,sY+3*sA[1]/4);ctx2.lineTo(sX-sA[0],sY+3*sA[1]/4);ctx2.closePath();ctx2.strokeStyle="red";ctx2.stroke();-1!=imInd&&
imInd<imCnt&&c>sX+3*sA[0]/4&&a>sY+3*sA[1]/4?(mouseState="4",bC.style.cursor="nw-resize",isOnRpg_d=!0,doSP=doPagePositionByMouseCorRpg,doSP(c,a),console.log("nw-resize")):0<imInd&&c<sX-3*sA[0]/4&&a>sY+3*sA[1]/4?(mouseState="4",bC.style.cursor="ne-resize",isOnLpg_d=!0,doSP=doPagePositionByMouseCorLpg,doSP(c,a),console.log("ne-resize")):(bC.style.cursor="default","4"==mouseState&&(mouseState="02",slideFromA2B(isOnLpg_d,isOnRpg_d,sX+4*sA[0]/5,sY+4*sA[1]/5),console.log("release")))}
function oc(a){var c=a.target,d=a.clientX;a=a.clientY;mouseState="0";c=$jscomp.makeIterator(chk_LoR_page_adj_pgInd(d,a,c.id));isOnLpg_d=c.next().value;isOnRpg_d=c.next().value;isOnLpg_d?(doSP=doPagePositionByMouseCorLpg,setTimeout(doShowPageByInterval,showItvl,sX-sA[0],sY+sA[1],sX+sA[0],sY+sA[1],showItvl,shkRatio,sX-5,sY+4*sA[1]/5)):isOnRpg_d&&(doSP=doPagePositionByMouseCorRpg,setTimeout(doShowPageByInterval,showItvl,sX+sA[0],sY+sA[1],sX-sA[0],sY+sA[1],showItvl,shkRatio,sX-5,sY+4*sA[1]/5))}
function doPagePositionByMouseCorRpg(a,c){var d=[a,c],b=[sX+sA[0],sY+sA[1]],e=[sX,sY],f=imInd%allpi.length,h=0<=imInd-1?(imInd-1)%allpi.length:null;ctx2=bC.getContext("2d");var g=[(d[0]+b[0])/2,(d[1]+b[1])/2],m=-(1/((d[1]-b[1])/(d[0]-b[0])));pbOnTopX=Math.floor((sY-g[1])/m+g[0]);pbOnBotX=Math.floor((b[1]-g[1])/m+g[0]);pbOnLefY=Math.floor(m*(sX-g[0])+g[1]);pbOnRigY=Math.floor(m*(b[0]-g[0])+g[1]);g=[pbOnTopX>=sX&&pbOnTopX<=b[0],pbOnBotX>=sX&&pbOnBotX<=b[0],pbOnLefY>=sY&&pbOnLefY<=b[1],pbOnRigY>=sY&&
pbOnRigY<=b[1]];if(!(!g[0]&&g[1]&&g[2]&&c>b[1])){if(!(g[0]||g[1]||g[2]||g[3])||g[0]&&g[3])if(b[0]-d[0]>minToShow||b[1]-d[1]>minToShow)return;if(!g[1]&&g[2]&&g[3])tdeg=Math.atan((b[1]-d[1])/(d[0]-sX))/2,ts=Math.sin(tdeg)*sA[0]<<1,degb=Math.PI/2-tdeg,c=b[1]-ts*Math.sin(degb),a=b[0]-ts*Math.cos(degb),console.log("mousemove315"),doSP(a,c);else{bC.width=bC.width;ctx2.drawImage(allpi[f],sX,sY,sA[0],sA[1]);null!=h&&ctx2.drawImage(allpi[h],sX-sA[0],sY,sA[0],sA[1]);0<imInd&&(ctx2.beginPath(),ctx2.moveTo(sX-
sA[0],b[1]),ctx2.lineTo(sX,b[1]),ctx2.lineTo(sX,sY),ctx2.lineTo(sX-sA[0],sY),ctx2.closePath(),ctx2.strokeStyle=tPbrdercolor,ctx2.stroke(),ctx2.beginPath(),ctx2.moveTo(b[0],b[1]),ctx2.lineTo(sX,b[1]),ctx2.lineTo(sX,sY),ctx2.lineTo(b[0],sY),ctx2.closePath(),ctx2.stroke(),doPaintShadow(ctx2,e,[shaCfg.spw,sY],[shaCfg.spw,b[1]],[sX,b[1]]));var k,l,f=Math.sqrt(Math.pow(d[0]-b[0],2)+Math.pow(d[1]-b[1],2))>>1;if(g[1]&&g[3])l1=Math.sqrt(Math.pow(pbOnBotX-d[0],2)+Math.pow(b[1]-d[1],2)),l2=Math.sqrt(Math.pow(b[0]-
d[0],2)+Math.pow(pbOnRigY-d[1],2)),ctx2.beginPath(),imInd!=imCnt-2?(ctx2.moveTo(b[0],b[1]),ctx2.lineTo(b[0]-l1,b[1]),ctx2.lineTo(b[0],b[1]-l2),ctx2.fillStyle=ctx2.createPattern(nnC,"no-repeat"),ctx2.strokeStyle=tPbrdercolor):(ctx2.moveTo(b[0]+1,b[1]+1),ctx2.lineTo(b[0]-l1,b[1]),ctx2.lineTo(b[0]+1,b[1]-l2),ctx2.fillStyle=bgcolor,ctx2.strokeStyle=bgcolor),ctx2.closePath(),ctx2.fill(),ctx2.stroke(),degb=Math.atan((b[0]-pbOnBotX)/(b[1]-pbOnRigY)),ctx2.translate(d[0],d[1]),ctx2.rotate(2*degb),ctx2.translate(-sX,
-b[1]),ctx2.beginPath(),ctx2.moveTo(sX,b[1]-l2),ctx2.lineTo(sX,b[1]),ctx2.lineTo(sX+l1,b[1]),l=pbOnRigY-sY,ctx2.closePath(),ctx2.fillStyle=ctx2.createPattern(nC,"no-repeat"),ctx2.fill(),ctx2.strokeStyle=tPbrdercolor,ctx2.stroke(),ctx2.translate(sX,sY+l),ctx2.rotate(-degb),ctx2.translate(-sX,-sY),l3=Math.sqrt(Math.pow(l2,2)+Math.pow(l1,2)),k=[f/3,sY+f/3/Math.tan(degb)],l=[k[0],sY+l3-f/3*Math.tan(degb)];else if(g[0]&&g[1])if(d[1]>=b[1])ctx2.beginPath(),imInd!=imCnt-2?(ctx2.moveTo(b[0],b[1]),ctx2.lineTo(pbOnBotX,
b[1]),ctx2.lineTo(pbOnTopX,sY),ctx2.lineTo(b[0],sY),ctx2.fillStyle=ctx2.createPattern(nnC,"no-repeat"),ctx2.strokeStyle=tPbrdercolor):(ctx2.moveTo(b[0]+1,b[1]+1),ctx2.lineTo(pbOnBotX,b[1]+1),ctx2.lineTo(pbOnTopX,sY-1),ctx2.lineTo(b[0]+1,sY-1),ctx2.fillStyle=bgcolor,ctx2.strokeStyle=bgcolor),ctx2.closePath(),ctx2.fill(),ctx2.stroke(),ctx2.translate(d[0],d[1]),ts=Math.sqrt(Math.pow(pbOnBotX-pbOnTopX,2)+Math.pow(sA[1],2)),dega=Math.asin(sA[1]/ts),degb=Math.PI-2*dega,ctx2.rotate(-degb),ctx2.translate(-sX,
-b[1]),ctx2.beginPath(),ctx2.moveTo(sX,sY),ctx2.lineTo(sX,b[1]),ctx2.lineTo(sX+(b[0]-pbOnBotX),b[1]),ctx2.lineTo(sX+(b[0]-pbOnTopX),sY),ctx2.closePath(),ctx2.fillStyle=ctx2.createPattern(nC,"no-repeat"),ctx2.fill(),ctx2.strokeStyle=tPbrdercolor,ctx2.stroke(),ctx2.translate(sX+(b[0]-pbOnTopX),sY),ctx2.rotate(degb/2),ctx2.translate(-sX,-sY),l3=ts,l5=100>f?f:50<f/2?50:f/2,k=[l5,sY+l5/Math.tan(dega)],l=[k[0],sY+l3+l5/Math.tan(dega)];else{l1=Math.sqrt(Math.pow(pbOnBotX-d[0],2)+Math.pow(b[1]-d[1],2));l2=
Math.sqrt(Math.pow(b[0]-d[0],2)+Math.pow(pbOnRigY-d[1],2));if(Infinity==l2){console.log("mousemove410");doSP(a,b[1]+2);return}ctx2.beginPath();imInd!=imCnt-2?(ctx2.moveTo(b[0],b[1]),ctx2.lineTo(b[0]-l1,b[1]),ctx2.lineTo(pbOnTopX,sY),ctx2.lineTo(b[0],sY),ctx2.fillStyle=ctx2.createPattern(nnC,"no-repeat"),ctx2.strokeStyle=tPbrdercolor):(ctx2.moveTo(b[0]+1,b[1]+1),ctx2.lineTo(b[0]-l1,b[1]+1),ctx2.lineTo(pbOnTopX-1,sY-1),ctx2.lineTo(b[0]+1,sY-1),ctx2.fillStyle=bgcolor,ctx2.strokeStyle=bgcolor);ctx2.closePath();
ctx2.fill();ctx2.stroke();degb=Math.atan((b[0]-pbOnBotX)/(b[1]-pbOnRigY));ctx2.translate(d[0],d[1]);ctx2.rotate(2*degb);ctx2.translate(-sX,-b[1]);ctx2.beginPath();ctx2.moveTo(sX,sY);ctx2.lineTo(sX,b[1]);ctx2.lineTo(sX+l1,b[1]);k=Math.abs(pbOnRigY-sY)*Math.tan(degb);ctx2.lineTo(sX+k,sY);ctx2.lineTo(sX,sY);k/=Math.sin(degb);l=pbOnRigY-sY;ctx2.closePath();ctx2.fillStyle=ctx2.createPattern(nC,"no-repeat");ctx2.fill();ctx2.strokeStyle=tPbrdercolor;ctx2.stroke();ctx2.translate(sX,sY+l);ctx2.rotate(-degb);
ctx2.translate(-sX,-sY);ctx2.translate(0,k);l3=Math.sqrt(Math.pow(l2,2)+Math.pow(l1,2))-k;l5=100>f?f:50<f/2?50:f/2;k=[l5,sY-l5*Math.tan(degb)];l=[k[0],sY+l3-l5*Math.tan(degb)]}d=[sX,sY+l3];(imInd<imCnt-2||imInd==imCnt-2&&a>sX-sA[0])&&doPaintShadow(ctx2,e,k,l,d)}}}
function doPagePositionByMouseCorLpg(a,c){var d=[a,c],b=[sX-sA[0],sY+sA[1]],e=[sX,sY],f=imInd>=imCnt?null:imInd%allpi.length,h=(imInd-1)%allpi.length;ctx2=bC.getContext("2d");var g=[(d[0]+b[0])/2,(d[1]+b[1])/2],m=-(1/((d[1]-b[1])/(d[0]-b[0])));pbOnTopX=Math.floor((sY-g[1])/m+g[0]);pbOnBotX=Math.floor((b[1]-g[1])/m+g[0]);pbOnLefY=Math.floor(m*(sX-g[0])+g[1]);pbOnRigY=Math.floor(m*(b[0]-g[0])+g[1]);g=[pbOnTopX<=sX&&pbOnTopX>=b[0],pbOnBotX<=sX&&pbOnBotX>=b[0],pbOnLefY>=sY&&pbOnLefY<=b[1],pbOnRigY>=sY&&
pbOnRigY<=b[1]];if(!(!g[0]&&g[1]&&g[2]&&c>b[1])){if(!(g[0]||g[1]||g[2]||g[3])||g[0]&&g[3])if(d[0]-b[0]>minToShow||d[1]-b[1]>minToShow)return;if(!g[1]&&g[2]&&g[3])tdeg=Math.atan((b[1]-d[1])/(sX-d[0]))/2,ts=Math.sin(tdeg)*sA[0]<<1,degb=Math.PI/2-tdeg,c=b[1]-ts*Math.sin(degb),a=ts*Math.cos(degb)+b[0],console.log("mousemove315"),doSP(a,c);else{bC.width=bC.width;null!=f&&ctx2.drawImage(allpi[f],sX,sY,sA[0],sA[1]);ctx2.drawImage(allpi[h],sX-sA[0],sY,sA[0],sA[1]);imInd<imCnt&&(ctx2.beginPath(),ctx2.moveTo(sX-
sA[0],b[1]),ctx2.lineTo(sX,b[1]),ctx2.lineTo(sX,sY),ctx2.lineTo(sX-sA[0],sY),ctx2.closePath(),ctx2.strokeStyle=tPbrdercolor,ctx2.stroke(),ctx2.beginPath(),ctx2.moveTo(sX+sA[0],b[1]),ctx2.lineTo(sX,b[1]),ctx2.lineTo(sX,sY),ctx2.lineTo(sX+sA[0],sY),ctx2.closePath(),ctx2.stroke(),doPaintShadow(ctx2,e,[shaCfg.spw,sY],[shaCfg.spw,b[1]],[sX,b[1]]));var k,l,f=Math.sqrt(Math.pow(d[0]-b[0],2)+Math.pow(d[1]-b[1],2))>>1;if(g[1]&&g[3])l1=Math.sqrt(Math.pow(pbOnBotX-d[0],2)+Math.pow(b[1]-d[1],2)),l2=Math.sqrt(Math.pow(b[0]-
d[0],2)+Math.pow(pbOnRigY-d[1],2)),ctx2.beginPath(),2!=imInd?(ctx2.moveTo(b[0],b[1]),ctx2.lineTo(b[0]+l1,b[1]),ctx2.lineTo(b[0],b[1]-l2),ctx2.fillStyle=ctx2.createPattern(nnC,"no-repeat"),ctx2.strokeStyle=tPbrdercolor):(ctx2.moveTo(b[0]-1,b[1]+1),ctx2.lineTo(b[0]+l1,b[1]+1),ctx2.lineTo(b[0]-1,b[1]-l2),ctx2.fillStyle=bgcolor,ctx2.strokeStyle=bgcolor),ctx2.closePath(),ctx2.fill(),ctx2.stroke(),degb=Math.atan((b[0]-pbOnBotX)/(b[1]-pbOnRigY)),ctx2.translate(d[0],d[1]),ctx2.rotate(2*degb),ctx2.translate(-sX,
-b[1]),ctx2.beginPath(),ctx2.moveTo(sX,b[1]-l2),ctx2.lineTo(sX,b[1]),ctx2.lineTo(sX-l1,b[1]),l=pbOnRigY-sY,ctx2.closePath(),ctx2.fillStyle=ctx2.createPattern(nC,"no-repeat"),ctx2.fill(),ctx2.strokeStyle=tPbrdercolor,ctx2.stroke(),ctx2.translate(sX,sY+l),ctx2.rotate(-degb),ctx2.translate(-sX,-sY),l3=Math.sqrt(Math.pow(l2,2)+Math.pow(l1,2)),k=[f/3,sY+f/3/Math.tan(-degb)],l=[k[0],sY+l3-f/3*Math.tan(-degb)];else if(g[0]&&g[1])if(d[1]>=b[1])ctx2.beginPath(),2!=imInd?(ctx2.moveTo(b[0],b[1]),ctx2.lineTo(pbOnBotX,
b[1]),ctx2.lineTo(pbOnTopX,sY),ctx2.lineTo(b[0],sY),ctx2.fillStyle=ctx2.createPattern(nnC,"no-repeat"),ctx2.strokeStyle=tPbrdercolor):(ctx2.moveTo(b[0]-1,b[1]+1),ctx2.lineTo(pbOnBotX,b[1]+1),ctx2.lineTo(pbOnTopX,sY-1),ctx2.lineTo(b[0]-1,sY-1),ctx2.fillStyle=bgcolor,ctx2.strokeStyle=bgcolor),ctx2.closePath(),ctx2.fill(),ctx2.stroke(),ctx2.translate(d[0],d[1]),ts=Math.sqrt(Math.pow(pbOnBotX-pbOnTopX,2)+Math.pow(sA[1],2)),dega=Math.asin(sA[1]/ts),degb=Math.PI-2*dega,ctx2.rotate(degb),ctx2.translate(-sX,
-b[1]),ctx2.beginPath(),ctx2.moveTo(sX,sY),ctx2.lineTo(sX,b[1]),ctx2.lineTo(sX-(pbOnBotX-b[0]),b[1]),ctx2.lineTo(sX-(pbOnTopX-b[0]),sY),ctx2.closePath(),ctx2.fillStyle=ctx2.createPattern(nC,"no-repeat"),ctx2.fill(),ctx2.strokeStyle=tPbrdercolor,ctx2.stroke(),ctx2.translate(sX-(pbOnTopX-b[0]),sY),ctx2.rotate(-degb/2),ctx2.translate(-sX,-sY),l3=ts,l5=100>f?f:50<f/2?50:f/2,k=[l5,sY+l5/Math.tan(dega)],l=[k[0],sY+l3+l5/Math.tan(dega)];else{l1=Math.sqrt(Math.pow(pbOnBotX-d[0],2)+Math.pow(b[1]-d[1],2));
l2=Math.sqrt(Math.pow(b[0]-d[0],2)+Math.pow(pbOnRigY-d[1],2));if(Infinity==l2){console.log("mousemove410");doSP(a,b[1]+2);return}ctx2.beginPath();2!=imInd?(ctx2.moveTo(b[0],b[1]),ctx2.lineTo(b[0]+l1,b[1]),ctx2.lineTo(pbOnTopX,sY),ctx2.lineTo(b[0],sY),ctx2.fillStyle=ctx2.createPattern(nnC,"no-repeat"),ctx2.strokeStyle=tPbrdercolor):(ctx2.moveTo(b[0]-1,b[1]+1),ctx2.lineTo(b[0]+l1,b[1]+1),ctx2.lineTo(pbOnTopX+1,sY-1),ctx2.lineTo(b[0]-1,sY-1),ctx2.fillStyle=bgcolor,ctx2.strokeStyle=bgcolor);ctx2.closePath();
ctx2.fill();ctx2.stroke();degb=Math.atan((b[0]-pbOnBotX)/(b[1]-pbOnRigY));ctx2.translate(d[0],d[1]);ctx2.rotate(2*degb);ctx2.translate(-sX,-b[1]);ctx2.beginPath();ctx2.moveTo(sX,sY);ctx2.lineTo(sX,b[1]);ctx2.lineTo(sX-l1,b[1]);k=Math.abs(pbOnRigY-sY)*Math.tan(degb);ctx2.lineTo(sX+k,sY);ctx2.lineTo(sX,sY);k/=Math.sin(degb);l=pbOnRigY-sY;ctx2.closePath();ctx2.fillStyle=ctx2.createPattern(nC,"no-repeat");ctx2.fill();ctx2.strokeStyle=tPbrdercolor;ctx2.stroke();ctx2.translate(sX,sY+l);ctx2.rotate(-degb);
ctx2.translate(-sX,-sY);ctx2.translate(0,k);l3=Math.sqrt(Math.pow(l2,2)+Math.pow(l1,2))-k;l5=100>f?f:50<f/2?50:f/2;k=[l5,sY-l5*Math.tan(-degb)];l=[k[0],sY+l3-l5*Math.tan(-degb)]}d=[sX,sY+l3];(2<imInd||2==imInd&&a<sX+sA[0])&&doPaintShadow(ctx2,e,k,l,d)}}}
function doPaintShadow(a,c,d,b,e){if(null!=d&&null!=b)for(var f=d[0],h=0,g=-1,m=1;1>=h;h++,g*=-1,m--){a.beginPath();a.moveTo(c[0],c[1]);a.lineTo(sX+g*d[0],d[1]);a.lineTo(sX+g*b[0],b[1]);a.lineTo(e[0],e[1]);a.closePath();var k=0==h?a.createLinearGradient(sX-f,sY,sX,sY):a.createLinearGradient(sX,sY,sX+f,sY);te=shaCfg.Pg_cs[m];k.addColorStop(0,"rgba("+te[0]+","+te[0]+","+te[0]+","+(0==h?.01:.4)+")");k.addColorStop(0==h?.6:.5,"rgba("+te[h]+","+te[h]+","+te[h]+",0.1)");k.addColorStop(1,"rgba("+te[1]+","+
te[1]+","+te[1]+","+(0==h?.4:.01)+")");a.fillStyle=k;a.fill()}}function dOriPattern2(a,c){a.beginPath();a.moveTo(sX,sY);a.lineTo(sX,sY+sA[1]);a.lineTo(sX-sA[0],sY+sA[1]);a.lineTo(sX-sA[0],sY);a.closePath();a.strokeStyle=c;a.stroke()}function dOriPattern(a,c){a.beginPath();a.moveTo(sX,sY);a.lineTo(sX,sY+sA[1]);a.lineTo(sX+sA[0],sY+sA[1]);a.lineTo(sX+sA[0],sY);a.closePath();a.strokeStyle=c;a.stroke()};