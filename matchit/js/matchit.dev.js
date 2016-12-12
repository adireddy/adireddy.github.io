(function (console, $hx_exports, $global) { "use strict";
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var AssetsList = function() { };
$hxClasses["AssetsList"] = AssetsList;
AssetsList.__name__ = ["AssetsList"];
AssetsList.exists = function(val) {
	return HxOverrides.indexOf(AssetsList.LIST,val,0) > -1;
};
var AudioManager = function() {
	this.bufferList = new haxe_ds_StringMap();
	this.types = new haxe_ds_StringMap();
	this.types.set("mp3","audio/mpeg");
	this.types.set("ogg","audio/ogg");
	this.types.set("wav","audio/wav");
	this.types.set("aac","audio/aac");
	this.types.set("m4a","audio/x-m4a");
};
$hxClasses["AudioManager"] = AudioManager;
AudioManager.__name__ = ["AudioManager"];
AudioManager.prototype = {
	checkWebAudioAPISupport: function() {
		return Reflect.field(window,"AudioContext") != null || Reflect.field(window,"webkitAudioContext") != null;
	}
	,unlockAudio: function() {
		if(this.audioContext != null) {
			var bfr = this.audioContext.createBuffer(1,1,Waud.preferredSampleRate);
			var src = this.audioContext.createBufferSource();
			src.buffer = bfr;
			src.connect(this.audioContext.destination);
			if(Reflect.field(src,"start") != null) src.start(0); else src.noteOn(0);
			if(src.onended != null) src.onended = $bind(this,this._unlockCallback); else haxe_Timer.delay($bind(this,this._unlockCallback),1);
		} else {
			var audio;
			var _this = window.document;
			audio = _this.createElement("audio");
			var source;
			var _this1 = window.document;
			source = _this1.createElement("source");
			source.src = "data:audio/wave;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==";
			audio.appendChild(source);
			window.document.appendChild(audio);
			audio.play();
			if(Waud.__touchUnlockCallback != null) Waud.__touchUnlockCallback();
			Waud.dom.ontouchend = null;
		}
	}
	,_unlockCallback: function() {
		if(Waud.__touchUnlockCallback != null) Waud.__touchUnlockCallback();
		Waud.dom.ontouchend = null;
	}
	,createAudioContext: function() {
		if(this.audioContext == null) try {
			if(Reflect.field(window,"AudioContext") != null) this.audioContext = new AudioContext(); else if(Reflect.field(window,"webkitAudioContext") != null) this.audioContext = new webkitAudioContext();
			this.masterGainNode = this.createGain();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			this.audioContext = null;
		}
		return this.audioContext;
	}
	,createGain: function() {
		if(($_=this.audioContext,$bind($_,$_.createGain)) != null) return this.audioContext.createGain(); else return Reflect.callMethod(this.audioContext,Reflect.field(this.audioContext,"createGainNode"),[]);
	}
	,destroy: function() {
		if(this.audioContext != null && (this.audioContext.close != null && this.audioContext.close != "")) this.audioContext.close();
		this.audioContext = null;
		this.bufferList = null;
		this.types = null;
	}
	,__class__: AudioManager
};
var BaseSound = function(sndUrl,options) {
	this._b64 = new EReg("(^data:audio).*(;base64,)","i");
	if(sndUrl == null || sndUrl == "") {
		console.log("invalid sound url");
		return;
	}
	if(Waud.audioManager == null) {
		console.log("initialise Waud using Waud.init() before loading sounds");
		return;
	}
	this.isSpriteSound = false;
	this.url = sndUrl;
	this._isLoaded = false;
	this._isPlaying = false;
	this._muted = false;
	this._duration = 0;
	this._options = WaudUtils.setDefaultOptions(options);
	this.rate = this._options.playbackRate;
};
$hxClasses["BaseSound"] = BaseSound;
BaseSound.__name__ = ["BaseSound"];
BaseSound.prototype = {
	isReady: function() {
		return this._isLoaded;
	}
	,__class__: BaseSound
};
var CompileTimeClassList = function() { };
$hxClasses["CompileTimeClassList"] = CompileTimeClassList;
CompileTimeClassList.__name__ = ["CompileTimeClassList"];
CompileTimeClassList.get = function(id) {
	if(CompileTimeClassList.lists == null) CompileTimeClassList.initialise();
	return CompileTimeClassList.lists.get(id);
};
CompileTimeClassList.initialise = function() {
	CompileTimeClassList.lists = new haxe_ds_StringMap();
	var m = haxe_rtti_Meta.getType(CompileTimeClassList);
	if(m.classLists != null) {
		var _g = 0;
		var _g1 = m.classLists;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			var array = item;
			var listID = array[0];
			var list = new List();
			var _g2 = 0;
			var _g3 = array[1].split(",");
			while(_g2 < _g3.length) {
				var typeName = _g3[_g2];
				++_g2;
				var type = Type.resolveClass(typeName);
				if(type != null) list.push(type);
			}
			CompileTimeClassList.lists.set(listID,list);
		}
	}
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,__class__: EReg
};
var IWaudSound = function() { };
$hxClasses["IWaudSound"] = IWaudSound;
IWaudSound.__name__ = ["IWaudSound"];
IWaudSound.prototype = {
	__class__: IWaudSound
};
var HTML5Sound = function(url,options,src) {
	BaseSound.call(this,url,options);
	this._snd = Waud.dom.createElement("audio");
	if(src == null) this._addSource(url); else this._snd.appendChild(src);
	if(this._options.preload) this.load();
	if(this._b64.match(url)) url = "";
};
$hxClasses["HTML5Sound"] = HTML5Sound;
HTML5Sound.__name__ = ["HTML5Sound"];
HTML5Sound.__interfaces__ = [IWaudSound];
HTML5Sound.__super__ = BaseSound;
HTML5Sound.prototype = $extend(BaseSound.prototype,{
	load: function(callback) {
		var _g = this;
		if(!this._isLoaded) {
			this._snd.autoplay = this._options.autoplay;
			this._snd.loop = this._options.loop;
			this._snd.volume = this._options.volume;
			this._snd.playbackRate = this.rate;
			if(callback != null) this._options.onload = callback;
			if(this._options.preload) this._snd.preload = "auto"; else this._snd.preload = "metadata";
			if(this._options.onload != null) {
				this._isLoaded = true;
				this._snd.onloadeddata = function() {
					_g._options.onload(_g);
				};
			}
			this._snd.onplaying = function() {
				_g._isPlaying = true;
			};
			this._snd.onended = function() {
				_g._isPlaying = false;
				if(_g._options.onend != null) _g._options.onend(_g);
			};
			if(this._options.onerror != null) this._snd.onerror = function() {
				_g._options.onerror(_g);
			};
			this._snd.load();
		}
		return this;
	}
	,getDuration: function() {
		if(!this._isLoaded) return 0;
		this._duration = this._snd.duration;
		return this._duration;
	}
	,_addSource: function(url) {
		this.source = Waud.dom.createElement("source");
		this.source.src = url;
		if((function($this) {
			var $r;
			var key = $this._getExt(url);
			$r = Waud.audioManager.types.get(key);
			return $r;
		}(this)) != null) {
			var key1 = this._getExt(url);
			this.source.type = Waud.audioManager.types.get(key1);
		}
		this._snd.appendChild(this.source);
		return this.source;
	}
	,_getExt: function(filename) {
		return filename.split(".").pop();
	}
	,setVolume: function(val,spriteName) {
		if(val >= 0 && val <= 1) this._options.volume = val;
		if(!this._isLoaded) return;
		this._snd.volume = this._options.volume;
	}
	,getVolume: function(spriteName) {
		return this._options.volume;
	}
	,mute: function(val,spriteName) {
		if(!this._isLoaded) return;
		this._snd.muted = val;
		if(WaudUtils.isiOS()) {
			if(val && this.isPlaying()) {
				this._muted = true;
				this._snd.pause();
			} else if(this._muted) {
				this._muted = false;
				this._snd.play();
			}
		}
	}
	,toggleMute: function(spriteName) {
		this.mute(!this._muted);
	}
	,play: function(sprite,soundProps) {
		var _g = this;
		this.spriteName = sprite;
		if(!this._isLoaded || this._snd == null) {
			console.log("sound not loaded");
			return -1;
		}
		if(this._isPlaying) {
			if(this._options.autostop) this.stop(this.spriteName); else {
				var n;
				n = js_Boot.__cast(this._snd.cloneNode(true) , HTMLAudioElement);
				haxe_Timer.delay($bind(n,n.play),100);
			}
		}
		if(this._muted) return -1;
		if(this.isSpriteSound && soundProps != null) {
			if(this._pauseTime == null) this._snd.currentTime = soundProps.start; else this._snd.currentTime = this._pauseTime;
			if(this._tmr != null) this._tmr.stop();
			this._tmr = haxe_Timer.delay(function() {
				if(soundProps.loop != null && soundProps.loop) _g.play(_g.spriteName,soundProps); else _g.stop(_g.spriteName);
			},Math.ceil(soundProps.duration * 1000));
		}
		haxe_Timer.delay(($_=this._snd,$bind($_,$_.play)),100);
		this._pauseTime = null;
		return 0;
	}
	,togglePlay: function(spriteName) {
		if(this._isPlaying) this.pause(); else this.play();
	}
	,isPlaying: function(spriteName) {
		return this._isPlaying;
	}
	,loop: function(val) {
		if(!this._isLoaded || this._snd == null) return;
		this._snd.loop = val;
	}
	,autoStop: function(val) {
		this._options.autostop = val;
	}
	,stop: function(spriteName) {
		if(!this._isLoaded || this._snd == null) return;
		this._snd.currentTime = 0;
		this._snd.pause();
		this._isPlaying = false;
		if(this._tmr != null) this._tmr.stop();
	}
	,pause: function(spriteName) {
		if(!this._isLoaded || this._snd == null) return;
		this._snd.pause();
		this._pauseTime = this._snd.currentTime;
		this._isPlaying = false;
		if(this._tmr != null) this._tmr.stop();
	}
	,playbackRate: function(val,spriteName) {
		if(val == null) return this.rate;
		this._snd.playbackRate = val;
		return this.rate = val;
	}
	,setTime: function(time) {
		if(!this._isLoaded || this._snd == null || time > this._snd.duration) return;
		this._snd.currentTime = time;
	}
	,getTime: function() {
		if(this._snd == null || !this._isLoaded || !this._isPlaying) return 0;
		return this._snd.currentTime;
	}
	,onEnd: function(callback,spriteName) {
		this._options.onend = callback;
		return this;
	}
	,onLoad: function(callback) {
		this._options.onload = callback;
		return this;
	}
	,onError: function(callback) {
		this._options.onerror = callback;
		return this;
	}
	,destroy: function() {
		if(this._snd != null) {
			this._snd.pause();
			this._snd.removeChild(this.source);
			this.source = null;
			this._snd = null;
		}
		this._isPlaying = false;
	}
	,__class__: HTML5Sound
});
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var JConsole = function() { };
$hxClasses["JConsole"] = JConsole;
JConsole.__name__ = ["JConsole"];
JConsole.info = function(msg) {
	console.info(msg);
};
JConsole.error = function(msg) {
	console.error(msg);
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Random = function() { };
$hxClasses["Random"] = Random;
Random.__name__ = ["Random"];
Random.shuffle = function(arr) {
	if(arr != null) {
		var _g1 = 0;
		var _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			var j = Math.floor((arr.length - 1 + 1) * Math.random());
			var a = arr[i];
			var b = arr[j];
			arr[i] = b;
			arr[j] = a;
		}
	}
	return arr;
};
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var Waud = $hx_exports.Waud = function() { };
$hxClasses["Waud"] = Waud;
Waud.__name__ = ["Waud"];
Waud.init = function(d) {
	if(Waud.__audioElement == null) {
		if(d == null) d = window.document;
		Waud.dom = d;
		Waud.__audioElement = Waud.dom.createElement("audio");
		if(Waud.audioManager == null) Waud.audioManager = new AudioManager();
		Waud.isWebAudioSupported = Waud.audioManager.checkWebAudioAPISupport();
		Waud.isHTML5AudioSupported = Reflect.field(window,"Audio") != null;
		if(Waud.isWebAudioSupported) Waud.audioContext = Waud.audioManager.createAudioContext();
		Waud.sounds = new haxe_ds_StringMap();
		Waud._volume = 1;
	}
};
Waud.autoMute = function() {
	Waud._focusManager = new WaudFocusManager();
	Waud._focusManager.focus = function() {
		Waud.mute(false);
	};
	Waud._focusManager.blur = function() {
		Waud.mute(true);
	};
};
Waud.enableTouchUnlock = function(callback) {
	Waud.__touchUnlockCallback = callback;
	Waud.dom.ontouchend = ($_=Waud.audioManager,$bind($_,$_.unlockAudio));
};
Waud.setVolume = function(val) {
	if((((val | 0) === val) || typeof(val) == "number") && val >= 0 && val <= 1) {
		Waud._volume = val;
		if(Waud.sounds != null) {
			var $it0 = Waud.sounds.iterator();
			while( $it0.hasNext() ) {
				var sound = $it0.next();
				sound.setVolume(val);
			}
		}
	} else window.console.warn("Volume should be a number between 0 and 1. Received: " + val);
};
Waud.getVolume = function() {
	return Waud._volume;
};
Waud.mute = function(val) {
	if(val == null) val = true;
	Waud.isMuted = val;
	if(Waud.sounds != null) {
		var $it0 = Waud.sounds.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.mute(val);
		}
	}
};
Waud.playbackRate = function(val) {
	if(val == null) return Waud._playbackRate; else if(Waud.sounds != null) {
		var $it0 = Waud.sounds.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.playbackRate(val);
		}
	}
	return Waud._playbackRate = val;
};
Waud.stop = function() {
	if(Waud.sounds != null) {
		var $it0 = Waud.sounds.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.stop();
		}
	}
};
Waud.pause = function() {
	if(Waud.sounds != null) {
		var $it0 = Waud.sounds.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.pause();
		}
	}
};
Waud.getFormatSupportString = function() {
	var support = "OGG: " + Waud.__audioElement.canPlayType("audio/ogg; codecs=\"vorbis\"");
	support += ", WAV: " + Waud.__audioElement.canPlayType("audio/wav; codecs=\"1\"");
	support += ", MP3: " + Waud.__audioElement.canPlayType("audio/mpeg;");
	support += ", AAC: " + Waud.__audioElement.canPlayType("audio/aac;");
	support += ", M4A: " + Waud.__audioElement.canPlayType("audio/x-m4a;");
	return support;
};
Waud.isSupported = function() {
	if(Waud.isWebAudioSupported == null || Waud.isHTML5AudioSupported == null) {
		Waud.isWebAudioSupported = Waud.audioManager.checkWebAudioAPISupport();
		Waud.isHTML5AudioSupported = Reflect.field(window,"Audio") != null;
	}
	return Waud.isWebAudioSupported || Waud.isHTML5AudioSupported;
};
Waud.isOGGSupported = function() {
	var canPlay = Waud.__audioElement.canPlayType("audio/ogg; codecs=\"vorbis\"");
	return Waud.isHTML5AudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isWAVSupported = function() {
	var canPlay = Waud.__audioElement.canPlayType("audio/wav; codecs=\"1\"");
	return Waud.isHTML5AudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isMP3Supported = function() {
	var canPlay = Waud.__audioElement.canPlayType("audio/mpeg;");
	return Waud.isHTML5AudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isAACSupported = function() {
	var canPlay = Waud.__audioElement.canPlayType("audio/aac;");
	return Waud.isHTML5AudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isM4ASupported = function() {
	var canPlay = Waud.__audioElement.canPlayType("audio/x-m4a;");
	return Waud.isHTML5AudioSupported && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.getSampleRate = function() {
	if(Waud.audioContext != null) return Waud.audioContext.sampleRate; else return 0;
};
Waud.destroy = function() {
	if(Waud.sounds != null) {
		var $it0 = Waud.sounds.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.destroy();
		}
	}
	Waud.sounds = null;
	if(Waud.audioManager != null) Waud.audioManager.destroy();
	Waud.audioManager = null;
	Waud.audioContext = null;
	Waud.__audioElement = null;
	if(Waud._focusManager != null) {
		Waud._focusManager.clearEvents();
		Waud._focusManager.blur = null;
		Waud._focusManager.focus = null;
		Waud._focusManager = null;
	}
};
var WaudFocusManager = $hx_exports.WaudFocusManager = function() {
	var _g = this;
	this._hidden = "";
	this._visibilityChange = "";
	this._currentState = "";
	if(Reflect.field(window.document,"hidden") != null) {
		this._hidden = "hidden";
		this._visibilityChange = "visibilitychange";
	} else if(Reflect.field(window.document,"mozHidden") != null) {
		this._hidden = "mozHidden";
		this._visibilityChange = "mozvisibilitychange";
	} else if(Reflect.field(window.document,"msHidden") != null) {
		this._hidden = "msHidden";
		this._visibilityChange = "msvisibilitychange";
	} else if(Reflect.field(window.document,"webkitHidden") != null) {
		this._hidden = "webkitHidden";
		this._visibilityChange = "webkitvisibilitychange";
	}
	if(Reflect.field(window,"addEventListener") != null) {
		window.addEventListener("focus",$bind(this,this._focus));
		window.addEventListener("blur",$bind(this,this._blur));
		window.addEventListener("pageshow",$bind(this,this._focus));
		window.addEventListener("pagehide",$bind(this,this._blur));
		document.addEventListener(this._visibilityChange,$bind(this,this._handleVisibilityChange));
	} else if(Reflect.field(window,"attachEvent") != null) {
		window.attachEvent("onfocus",$bind(this,this._focus));
		window.attachEvent("onblur",$bind(this,this._blur));
		window.attachEvent("pageshow",$bind(this,this._focus));
		window.attachEvent("pagehide",$bind(this,this._blur));
		document.attachEvent(this._visibilityChange,$bind(this,this._handleVisibilityChange));
	} else window.onload = function() {
		window.onfocus = $bind(_g,_g._focus);
		window.onblur = $bind(_g,_g._blur);
		window.onpageshow = $bind(_g,_g._focus);
		window.onpagehide = $bind(_g,_g._blur);
	};
};
$hxClasses["WaudFocusManager"] = WaudFocusManager;
WaudFocusManager.__name__ = ["WaudFocusManager"];
WaudFocusManager.prototype = {
	_handleVisibilityChange: function() {
		if(Reflect.field(window.document,this._hidden) != null && Reflect.field(window.document,this._hidden) && this.blur != null) this.blur(); else if(this.focus != null) this.focus();
	}
	,_focus: function() {
		if(this._currentState != "focus" && this.focus != null) this.focus();
		this._currentState = "focus";
	}
	,_blur: function() {
		if(this._currentState != "blur" && this.blur != null) this.blur();
		this._currentState = "blur";
	}
	,clearEvents: function() {
		if(Reflect.field(window,"removeEventListener") != null) {
			window.removeEventListener("focus",$bind(this,this._focus));
			window.removeEventListener("blur",$bind(this,this._blur));
			window.removeEventListener("pageshow",$bind(this,this._focus));
			window.removeEventListener("pagehide",$bind(this,this._blur));
			window.removeEventListener(this._visibilityChange,$bind(this,this._handleVisibilityChange));
		} else if(Reflect.field(window,"removeEvent") != null) {
			window.removeEvent("onfocus",$bind(this,this._focus));
			window.removeEvent("onblur",$bind(this,this._blur));
			window.removeEvent("pageshow",$bind(this,this._focus));
			window.removeEvent("pagehide",$bind(this,this._blur));
			window.removeEvent(this._visibilityChange,$bind(this,this._handleVisibilityChange));
		} else {
			window.onfocus = null;
			window.onblur = null;
			window.onpageshow = null;
			window.onpagehide = null;
		}
	}
	,__class__: WaudFocusManager
};
var WaudSound = $hx_exports.WaudSound = function(url,options) {
	if(Waud.audioManager == null) {
		console.log("initialise Waud using Waud.init() before loading sounds");
		return;
	}
	this.rate = 1;
	this._options = options;
	if(url.indexOf(".json") > 0) {
		this.isSpriteSound = true;
		this._spriteDuration = 0;
		this._spriteSounds = new haxe_ds_StringMap();
		this._spriteSoundEndCallbacks = new haxe_ds_StringMap();
		this._loadSpriteJson(url);
	} else {
		this.isSpriteSound = false;
		this._init(url);
	}
	if(new EReg("(^data:audio).*(;base64,)","i").match(url)) {
		var key = "snd" + new Date().getTime();
		Waud.sounds.set(key,this);
		url = "";
	} else Waud.sounds.set(url,this);
};
$hxClasses["WaudSound"] = WaudSound;
WaudSound.__name__ = ["WaudSound"];
WaudSound.__interfaces__ = [IWaudSound];
WaudSound.prototype = {
	_loadSpriteJson: function(jsonUrl) {
		var _g = this;
		var xobj = new XMLHttpRequest();
		xobj.open("GET",jsonUrl,true);
		xobj.onreadystatechange = function() {
			if(xobj.readyState == 4 && xobj.status == 200) {
				_g._spriteData = JSON.parse(xobj.responseText);
				var src = _g._spriteData.src;
				if(jsonUrl.indexOf("/") > -1) src = jsonUrl.substring(0,jsonUrl.lastIndexOf("/") + 1) + src;
				_g._init(src);
			}
		};
		xobj.send(null);
	}
	,_init: function(soundUrl) {
		this.url = soundUrl;
		if(Waud.isWebAudioSupported && Waud.useWebAudio && (this._options == null || this._options.webaudio == null || this._options.webaudio)) {
			if(this.isSpriteSound) this._loadSpriteSound(this.url); else this._snd = new WebAudioAPISound(this.url,this._options);
		} else if(Waud.isHTML5AudioSupported) {
			if(this._spriteData != null && this._spriteData.sprite != null) {
				var _g = 0;
				var _g1 = this._spriteData.sprite;
				while(_g < _g1.length) {
					var snd = _g1[_g];
					++_g;
					var sound = new HTML5Sound(this.url,this._options);
					sound.isSpriteSound = true;
					this._spriteSounds.set(snd.name,sound);
				}
			} else this._snd = new HTML5Sound(this.url,this._options);
		} else {
			console.log("no audio support in this browser");
			return;
		}
	}
	,getDuration: function() {
		if(this.isSpriteSound) return this._spriteDuration;
		if(this._snd == null) return 0;
		return this._snd.getDuration();
	}
	,setVolume: function(val,spriteName) {
		if(((val | 0) === val) || typeof(val) == "number") {
			if(this.isSpriteSound) {
				if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).setVolume(val);
				return;
			}
			if(this._snd == null) return;
			this._snd.setVolume(val);
		} else window.console.warn("Volume should be a number between 0 and 1. Received: " + val);
	}
	,getVolume: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) return this._spriteSounds.get(spriteName).getVolume();
			return 0;
		}
		if(this._snd == null) return 0;
		return this._snd.getVolume();
	}
	,mute: function(val,spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).mute(val); else {
				var $it0 = this._spriteSounds.iterator();
				while( $it0.hasNext() ) {
					var snd = $it0.next();
					snd.mute(val);
				}
			}
			return;
		}
		if(this._snd == null) return;
		this._snd.mute(val);
	}
	,toggleMute: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).toggleMute(); else {
				var $it0 = this._spriteSounds.iterator();
				while( $it0.hasNext() ) {
					var snd = $it0.next();
					snd.toggleMute();
				}
			}
			return;
		}
		if(this._snd == null) return;
		this._snd.toggleMute();
	}
	,load: function(callback) {
		if(this._snd == null || this.isSpriteSound) return null;
		this._snd.load(callback);
		return this;
	}
	,isReady: function() {
		if(this.isSpriteSound) {
			var $it0 = this._spriteSounds.iterator();
			while( $it0.hasNext() ) {
				var snd = $it0.next();
				return snd.isReady();
			}
		}
		return this._snd.isReady();
	}
	,play: function(spriteName,soundProps) {
		if(this.isSpriteSound) {
			if(spriteName != null) {
				var _g = 0;
				var _g1 = this._spriteData.sprite;
				while(_g < _g1.length) {
					var snd = _g1[_g];
					++_g;
					if(snd.name == spriteName) {
						soundProps = snd;
						break;
					}
				}
				if(soundProps == null) return null;
				if(this._spriteSounds.get(spriteName) != null) {
					this._spriteSounds.get(spriteName).stop();
					return this._spriteSounds.get(spriteName).play(spriteName,soundProps);
				}
			} else return null;
		}
		if(this._snd == null) return null;
		return this._snd.play(spriteName,soundProps);
	}
	,togglePlay: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).togglePlay();
			return;
		}
		if(this._snd == null) return;
		this._snd.togglePlay();
	}
	,isPlaying: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) return this._spriteSounds.get(spriteName).isPlaying();
			return false;
		}
		if(this._snd == null) return false;
		return this._snd.isPlaying();
	}
	,loop: function(val) {
		if(this._snd == null || this.isSpriteSound) return;
		this._snd.loop(val);
	}
	,autoStop: function(val) {
		if(this._snd == null) return;
		this._snd.autoStop(val);
	}
	,stop: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).stop(); else {
				var $it0 = this._spriteSounds.iterator();
				while( $it0.hasNext() ) {
					var snd = $it0.next();
					snd.stop();
				}
			}
		} else if(this._snd != null) this._snd.stop();
	}
	,pause: function(spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).pause(); else {
				var $it0 = this._spriteSounds.iterator();
				while( $it0.hasNext() ) {
					var snd = $it0.next();
					snd.pause();
				}
			}
		} else if(this._snd != null) this._snd.pause();
	}
	,playbackRate: function(val,spriteName) {
		if(val != null) {
			if(this.isSpriteSound) {
				if(spriteName != null && this._spriteSounds.get(spriteName) != null) this._spriteSounds.get(spriteName).playbackRate(val); else {
					var $it0 = this._spriteSounds.iterator();
					while( $it0.hasNext() ) {
						var snd = $it0.next();
						snd.playbackRate(val);
					}
				}
			} else if(this._snd != null) this._snd.playbackRate(val);
			return this.rate = val;
		}
		return this.rate;
	}
	,setTime: function(time) {
		if(this._snd == null || this.isSpriteSound) return;
		this._snd.setTime(time);
	}
	,getTime: function() {
		if(this._snd == null || this.isSpriteSound) return 0;
		return this._snd.getTime();
	}
	,onEnd: function(callback,spriteName) {
		if(this.isSpriteSound) {
			if(spriteName != null) this._spriteSoundEndCallbacks.set(spriteName,callback);
			return this;
		} else if(this._snd != null) {
			this._snd.onEnd(callback);
			return this;
		}
		return null;
	}
	,onLoad: function(callback) {
		if(this._snd == null || this.isSpriteSound) return null;
		this._snd.onLoad(callback);
		return this;
	}
	,onError: function(callback) {
		if(this._snd == null || this.isSpriteSound) return null;
		this._snd.onError(callback);
		return this;
	}
	,destroy: function() {
		if(this.isSpriteSound) {
			var $it0 = this._spriteSounds.iterator();
			while( $it0.hasNext() ) {
				var snd = $it0.next();
				snd.destroy();
			}
		} else if(this._snd != null) {
			this._snd.destroy();
			this._snd = null;
		}
	}
	,_loadSpriteSound: function(url) {
		var request = new XMLHttpRequest();
		request.open("GET",url,true);
		request.responseType = "arraybuffer";
		request.onload = $bind(this,this._onSpriteSoundLoaded);
		request.onerror = $bind(this,this._onSpriteSoundError);
		request.send();
	}
	,_onSpriteSoundLoaded: function(evt) {
		Waud.audioManager.audioContext.decodeAudioData(evt.target.response,$bind(this,this._decodeSuccess),$bind(this,this._onSpriteSoundError));
	}
	,_onSpriteSoundError: function() {
		if(this._options != null && this._options.onerror != null) this._options.onerror(this);
	}
	,_decodeSuccess: function(buffer) {
		if(buffer == null) {
			this._onSpriteSoundError();
			return;
		}
		Waud.audioManager.bufferList.set(this.url,buffer);
		this._spriteDuration = buffer.duration;
		if(this._options != null && this._options.onload != null) this._options.onload(this);
		var _g = 0;
		var _g1 = this._spriteData.sprite;
		while(_g < _g1.length) {
			var snd = _g1[_g];
			++_g;
			var sound = new WebAudioAPISound(this.url,this._options,true,buffer.duration);
			sound.isSpriteSound = true;
			this._spriteSounds.set(snd.name,sound);
			sound.onEnd($bind(this,this._spriteOnEnd),snd.name);
		}
	}
	,_spriteOnEnd: function(snd) {
		if(this._spriteSoundEndCallbacks.get(snd.spriteName) != null) this._spriteSoundEndCallbacks.get(snd.spriteName)(snd);
	}
	,__class__: WaudSound
};
var WaudUtils = $hx_exports.WaudUtils = function() { };
$hxClasses["WaudUtils"] = WaudUtils;
WaudUtils.__name__ = ["WaudUtils"];
WaudUtils.isAndroid = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("Android","i").match(ua);
};
WaudUtils.isiOS = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("(iPad|iPhone|iPod)","i").match(ua);
};
WaudUtils.isWindowsPhone = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("(IEMobile|Windows Phone)","i").match(ua);
};
WaudUtils.isFirefox = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("Firefox","i").match(ua);
};
WaudUtils.isOpera = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("Opera","i").match(ua) || Reflect.field(window,"opera") != null;
};
WaudUtils.isChrome = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("Chrome","i").match(ua);
};
WaudUtils.isSafari = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("Safari","i").match(ua);
};
WaudUtils.isMobile = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	return new EReg("(iPad|iPhone|iPod|Android|webOS|BlackBerry|Windows Phone|IEMobile)","i").match(ua);
};
WaudUtils.getiOSVersion = function(ua) {
	if(ua == null) ua = window.navigator.userAgent;
	var v = new EReg("[0-9_]+?[0-9_]+?[0-9_]+","i");
	var matched = [];
	if(v.match(ua)) {
		var match = v.matched(0).split("_");
		var _g = [];
		var _g1 = 0;
		while(_g1 < match.length) {
			var i = match[_g1];
			++_g1;
			_g.push(Std.parseInt(i));
		}
		matched = _g;
	}
	return matched;
};
WaudUtils.setDefaultOptions = function(options) {
	if(options == null) options = { };
	if(options.autoplay != null) options.autoplay = options.autoplay; else options.autoplay = Waud.defaults.autoplay;
	if(options.autostop != null) options.autostop = options.autostop; else options.autostop = Waud.defaults.autostop;
	if(options.webaudio != null) options.webaudio = options.webaudio; else options.webaudio = Waud.defaults.webaudio;
	if(options.preload != null) options.preload = options.preload; else options.preload = Waud.defaults.preload;
	if(options.loop != null) options.loop = options.loop; else options.loop = Waud.defaults.loop;
	if(options.onload != null) options.onload = options.onload; else options.onload = Waud.defaults.onload;
	if(options.onend != null) options.onend = options.onend; else options.onend = Waud.defaults.onend;
	if(options.onerror != null) options.onerror = options.onerror; else options.onerror = Waud.defaults.onerror;
	if(options.volume == null || options.volume < 0 || options.volume > 1) options.volume = Waud.defaults.volume;
	if(options.playbackRate == null || options.playbackRate <= 0 || options.playbackRate >= 4) options.playbackRate = Waud.defaults.playbackRate;
	return options;
};
var WebAudioAPISound = function(url,options,loaded,d) {
	if(d == null) d = 0;
	if(loaded == null) loaded = false;
	BaseSound.call(this,url,options);
	this._playStartTime = 0;
	this._pauseTime = 0;
	this._srcNodes = [];
	this._gainNodes = [];
	this._currentSoundProps = null;
	this._isLoaded = loaded;
	this._duration = d;
	this._manager = Waud.audioManager;
	if(this._b64.match(url)) {
		this._decodeAudio(this._base64ToArrayBuffer(url));
		url = "";
	} else if(this._options.preload && !loaded) this.load();
};
$hxClasses["WebAudioAPISound"] = WebAudioAPISound;
WebAudioAPISound.__name__ = ["WebAudioAPISound"];
WebAudioAPISound.__interfaces__ = [IWaudSound];
WebAudioAPISound.__super__ = BaseSound;
WebAudioAPISound.prototype = $extend(BaseSound.prototype,{
	load: function(callback) {
		if(!this._isLoaded) {
			var request = new XMLHttpRequest();
			request.open("GET",this.url,true);
			request.responseType = "arraybuffer";
			request.onload = $bind(this,this._onSoundLoaded);
			request.onerror = $bind(this,this._error);
			request.send();
			if(callback != null) this._options.onload = callback;
		}
		return this;
	}
	,_base64ToArrayBuffer: function(base64) {
		var raw = window.atob(base64.split(",")[1]);
		var rawLength = raw.length;
		var array = new Uint8Array(new ArrayBuffer(rawLength));
		var _g = 0;
		while(_g < rawLength) {
			var i = _g++;
			array[i] = HxOverrides.cca(raw,i);
		}
		return array.buffer;
	}
	,_onSoundLoaded: function(evt) {
		this._manager.audioContext.decodeAudioData(evt.target.response,$bind(this,this._decodeSuccess),$bind(this,this._error));
	}
	,_decodeAudio: function(data) {
		this._manager.audioContext.decodeAudioData(data,$bind(this,this._decodeSuccess),$bind(this,this._error));
	}
	,_error: function() {
		if(this._options.onerror != null) this._options.onerror(this);
	}
	,_decodeSuccess: function(buffer) {
		if(buffer == null) {
			console.log("empty buffer: " + this.url);
			this._error();
			return;
		}
		this._manager.bufferList.set(this.url,buffer);
		this._isLoaded = true;
		this._duration = buffer.duration;
		if(this._options.onload != null) this._options.onload(this);
		if(this._options.autoplay) this.play();
	}
	,_makeSource: function(buffer) {
		var bufferSource = this._manager.audioContext.createBufferSource();
		bufferSource.buffer = buffer;
		this._gainNode = this._manager.createGain();
		bufferSource.connect(this._gainNode);
		bufferSource.playbackRate.value = this.rate;
		this._gainNode.connect(this._manager.masterGainNode);
		this._manager.masterGainNode.connect(this._manager.audioContext.destination);
		this._srcNodes.push(bufferSource);
		this._gainNodes.push(this._gainNode);
		if(this._muted) this._gainNode.gain.value = 0; else this._gainNode.gain.value = this._options.volume;
		return bufferSource;
	}
	,getDuration: function() {
		if(!this._isLoaded) return 0;
		return this._duration;
	}
	,play: function(sprite,soundProps) {
		var _g = this;
		this.spriteName = sprite;
		if(this._isPlaying && this._options.autostop) this.stop(this.spriteName);
		if(!this._isLoaded) {
			console.log("sound not loaded");
			return -1;
		}
		var start = 0;
		var end = -1;
		if(this.isSpriteSound && soundProps != null) {
			this._currentSoundProps = soundProps;
			start = soundProps.start + this._pauseTime;
			end = soundProps.duration;
		}
		var buffer;
		if(this._manager.bufferList != null) buffer = this._manager.bufferList.get(this.url); else buffer = null;
		if(buffer != null) {
			this.source = this._makeSource(buffer);
			if(start >= 0 && end > -1) this._start(0,start,end); else {
				this._start(0,this._pauseTime,this.source.buffer.duration);
				this.source.loop = this._options.loop;
			}
			this._playStartTime = this._manager.audioContext.currentTime;
			this._isPlaying = true;
			this.source.onended = function() {
				_g._pauseTime = 0;
				_g._isPlaying = false;
				if(_g.isSpriteSound && soundProps != null && soundProps.loop != null && soundProps.loop && start >= 0 && end > -1) {
					_g.destroy();
					_g.play(_g.spriteName,soundProps);
				} else if(_g._options.onend != null) _g._options.onend(_g);
			};
		}
		return HxOverrides.indexOf(this._srcNodes,this.source,0);
	}
	,_start: function(when,offset,duration) {
		if(Reflect.field(this.source,"start") != null) this.source.start(when,offset,duration); else if(Reflect.field(this.source,"noteGrainOn") != null) Reflect.callMethod(this.source,Reflect.field(this.source,"noteGrainOn"),[when,offset,duration]); else if(Reflect.field(this.source,"noteOn") != null) Reflect.callMethod(this.source,Reflect.field(this.source,"noteOn"),[when,offset,duration]);
	}
	,togglePlay: function(spriteName) {
		if(this._isPlaying) this.pause(); else this.play();
	}
	,isPlaying: function(spriteName) {
		return this._isPlaying;
	}
	,loop: function(val) {
		this._options.loop = val;
		if(this.source != null) this.source.loop = val;
	}
	,setVolume: function(val,spriteName) {
		this._options.volume = val;
		if(this._gainNode == null || !this._isLoaded || this._muted) return;
		this._gainNode.gain.value = this._options.volume;
	}
	,getVolume: function(spriteName) {
		return this._options.volume;
	}
	,mute: function(val,spriteName) {
		this._muted = val;
		if(this._gainNode == null || !this._isLoaded) return;
		if(val) this._gainNode.gain.value = 0; else this._gainNode.gain.value = this._options.volume;
	}
	,toggleMute: function(spriteName) {
		this.mute(!this._muted);
	}
	,autoStop: function(val) {
		this._options.autostop = val;
	}
	,stop: function(spriteName) {
		this._pauseTime = 0;
		if(this.source == null || !this._isLoaded || !this._isPlaying) return;
		this.destroy();
	}
	,pause: function(spriteName) {
		if(this.source == null || !this._isLoaded || !this._isPlaying) return;
		this.destroy();
		this._pauseTime += this._manager.audioContext.currentTime - this._playStartTime;
	}
	,playbackRate: function(val,spriteName) {
		if(val == null) return this.rate;
		var _g = 0;
		var _g1 = this._srcNodes;
		while(_g < _g1.length) {
			var src = _g1[_g];
			++_g;
			src.playbackRate.value = val;
		}
		return this.rate = val;
	}
	,setTime: function(time) {
		if(!this._isLoaded || time > this._duration) return;
		if(this._isPlaying) {
			this.stop();
			this._pauseTime = time;
			this.play();
		} else this._pauseTime = time;
	}
	,getTime: function() {
		if(this.source == null || !this._isLoaded || !this._isPlaying) return 0;
		return this._manager.audioContext.currentTime - this._playStartTime + this._pauseTime;
	}
	,onEnd: function(callback,spriteName) {
		this._options.onend = callback;
		return this;
	}
	,onLoad: function(callback) {
		this._options.onload = callback;
		return this;
	}
	,onError: function(callback) {
		this._options.onerror = callback;
		return this;
	}
	,destroy: function() {
		var _g = 0;
		var _g1 = this._srcNodes;
		while(_g < _g1.length) {
			var src = _g1[_g];
			++_g;
			if(Reflect.field(src,"stop") != null) src.stop(0); else if(Reflect.field(src,"noteOff") != null) Reflect.callMethod(src,Reflect.field(src,"noteOff"),[0]);
			src.disconnect();
			src = null;
		}
		var _g2 = 0;
		var _g11 = this._gainNodes;
		while(_g2 < _g11.length) {
			var gain = _g11[_g2];
			++_g2;
			gain.disconnect();
			gain = null;
		}
		this._srcNodes = [];
		this._gainNodes = [];
		this._isPlaying = false;
	}
	,__class__: WebAudioAPISound
});
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe_Http;
haxe_Http.__name__ = ["haxe","Http"];
haxe_Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var pixi_plugins_app_Application = function() {
	this._animationFrameId = null;
	this.pixelRatio = 1;
	this.set_skipFrame(false);
	this.autoResize = true;
	this.transparent = false;
	this.antialias = false;
	this.forceFXAA = false;
	this.roundPixels = false;
	this.clearBeforeRender = true;
	this.preserveDrawingBuffer = false;
	this.backgroundColor = 16777215;
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.set_fps(60);
};
$hxClasses["pixi.plugins.app.Application"] = pixi_plugins_app_Application;
pixi_plugins_app_Application.__name__ = ["pixi","plugins","app","Application"];
pixi_plugins_app_Application.prototype = {
	set_fps: function(val) {
		this._frameCount = 0;
		return val >= 1 && val < 60?this.fps = val | 0:this.fps = 60;
	}
	,set_skipFrame: function(val) {
		if(val) {
			console.log("pixi.plugins.app.Application > Deprecated: skipFrame - use fps property and set it to 30 instead");
			this.set_fps(30);
		}
		return this.skipFrame = val;
	}
	,start: function(rendererType,parentDom,canvasElement) {
		if(rendererType == null) rendererType = "auto";
		if(canvasElement == null) {
			var _this = window.document;
			this.canvas = _this.createElement("canvas");
			this.canvas.style.width = this.width + "px";
			this.canvas.style.height = this.height + "px";
			this.canvas.style.position = "absolute";
		} else this.canvas = canvasElement;
		if(parentDom == null) window.document.body.appendChild(this.canvas); else parentDom.appendChild(this.canvas);
		this.stage = new PIXI.Container();
		var renderingOptions = { };
		renderingOptions.view = this.canvas;
		renderingOptions.backgroundColor = this.backgroundColor;
		renderingOptions.resolution = this.pixelRatio;
		renderingOptions.antialias = this.antialias;
		renderingOptions.forceFXAA = this.forceFXAA;
		renderingOptions.autoResize = this.autoResize;
		renderingOptions.transparent = this.transparent;
		renderingOptions.clearBeforeRender = this.clearBeforeRender;
		renderingOptions.preserveDrawingBuffer = this.preserveDrawingBuffer;
		if(rendererType == "auto") this.renderer = PIXI.autoDetectRenderer(this.width,this.height,renderingOptions); else if(rendererType == "canvas") this.renderer = new PIXI.CanvasRenderer(this.width,this.height,renderingOptions); else this.renderer = new PIXI.WebGLRenderer(this.width,this.height,renderingOptions);
		if(this.roundPixels) this.renderer.roundPixels = true;
		if(parentDom == null) window.document.body.appendChild(this.renderer.view); else parentDom.appendChild(this.renderer.view);
		this.resumeRendering();
	}
	,resumeRendering: function() {
		if(this.autoResize) window.onresize = $bind(this,this._onWindowResize);
		if(this._animationFrameId == null) this._animationFrameId = window.requestAnimationFrame($bind(this,this._onRequestAnimationFrame));
	}
	,_onWindowResize: function(event) {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer.resize(this.width,this.height);
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		if(this.onResize != null) this.onResize();
	}
	,_onRequestAnimationFrame: function(elapsedTime) {
		this._frameCount++;
		if(this._frameCount == (60 / this.fps | 0)) {
			this._frameCount = 0;
			if(this.onUpdate != null) this.onUpdate(elapsedTime);
			this.renderer.render(this.stage);
		}
		this._animationFrameId = window.requestAnimationFrame($bind(this,this._onRequestAnimationFrame));
	}
	,__class__: pixi_plugins_app_Application
	,__properties__: {set_fps:"set_fps",set_skipFrame:"set_skipFrame"}
};
var matchit_Main = function() {
	pixi_plugins_app_Application.call(this);
	this._stageProperties = new matchit_core_utils_StageProperties();
	this._stageProperties.actualPixelRatio = window.devicePixelRatio;
	this._stageProperties.pixelRatio = matchit_core_utils_BrowserUtils.getPixelRatio();
	this._stageProperties.screenWidth = window.innerWidth;
	this._stageProperties.screenHeight = window.innerHeight;
	if(this._stageProperties.screenWidth > this._stageProperties.screenHeight) this._stageProperties.orientation = "LANDSCAPE"; else this._stageProperties.orientation = "PORTRAIT";
	this._loadBucketConfig();
};
$hxClasses["matchit.Main"] = matchit_Main;
matchit_Main.__name__ = ["matchit","Main"];
matchit_Main.main = function() {
	Waud.init();
	Waud.enableTouchUnlock(null);
	new matchit_Main();
};
matchit_Main.__super__ = pixi_plugins_app_Application;
matchit_Main.prototype = $extend(pixi_plugins_app_Application.prototype,{
	_loadBucketConfig: function() {
		var _g = this;
		var request = new haxe_Http("assets/resolutions.json");
		request.onData = function(json) {
			var resolutions = JSON.parse(json);
			var resolutionSizes = [];
			if(_g._stageProperties.orientation == "LANDSCAPE" && resolutions.landscape != null) resolutionSizes = resolutions.landscape; else if(resolutions.portrait != null) resolutionSizes = resolutions.portrait;
			var closestResolution = resolutionSizes[0];
			var _g2 = 0;
			var _g1 = resolutionSizes.length;
			while(_g2 < _g1) {
				var i = _g2++;
				var res = resolutionSizes[i];
				if(res.height <= _g._stageProperties.screenHeight) closestResolution = res;
			}
			if(resolutionSizes.length > 0) {
				_g._stageProperties.bucketWidth = closestResolution.width;
				_g._stageProperties.bucketHeight = closestResolution.height;
				_g._stageProperties.screenX = (_g._stageProperties.screenWidth - _g._stageProperties.bucketWidth) / 2;
				_g._stageProperties.screenY = (_g._stageProperties.screenHeight - _g._stageProperties.bucketHeight) / 2;
			}
			_g._init();
			_g._setupApplication();
		};
		request.request(false);
	}
	,_init: function() {
		matchit_Main.resize = new msignal_Signal0();
		matchit_Main.update = new msignal_Signal1(Float);
		this.pixelRatio = this._stageProperties.pixelRatio;
		this.backgroundColor = 407626;
		this.roundPixels = true;
		this.onUpdate = $bind(this,this._onUpdate);
		this.onResize = $bind(this,this._onResize);
		this.transparent = false;
		pixi_plugins_app_Application.prototype.start.call(this);
	}
	,_setupApplication: function() {
		this.stage.interactive = true;
		this._model = new matchit_model_Model();
		this._model.updateFps.add($bind(this,this._onUpdateFps));
		this._view = new matchit_view_View(this.stage);
		this._controller = new matchit_controller_Controller();
		var injector = new minject_Injector();
		injector.mapValue(matchit_core_utils_StageProperties,this._stageProperties);
		injector.mapValue(matchit_model_Model,this._model);
		injector.mapValue(matchit_view_View,this._view);
		injector.injectInto(this._controller);
		this._controller.init();
	}
	,_onUpdateFps: function(val) {
		if(val > 0) this.set_fps(val);
	}
	,_onUpdate: function(time) {
		matchit_Main.update.dispatch(time);
	}
	,_onResize: function() {
		this._stageProperties.screenWidth = window.innerWidth;
		this._stageProperties.screenHeight = window.innerHeight;
		if(this._stageProperties.screenWidth > this._stageProperties.screenHeight) this._stageProperties.orientation = "LANDSCAPE"; else this._stageProperties.orientation = "PORTRAIT";
		matchit_Main.resize.dispatch();
	}
	,__class__: matchit_Main
});
var matchit_core_components_ComponentController = function() {
};
$hxClasses["matchit.core.components.ComponentController"] = matchit_core_components_ComponentController;
matchit_core_components_ComponentController.__name__ = ["matchit","core","components","ComponentController"];
matchit_core_components_ComponentController.prototype = {
	init: function() {
	}
	,setup: function() {
	}
	,reset: function() {
	}
	,__class__: matchit_core_components_ComponentController
};
var matchit_components_backgrounds_BackgroundsController = function() {
	matchit_core_components_ComponentController.call(this);
};
$hxClasses["matchit.components.backgrounds.BackgroundsController"] = matchit_components_backgrounds_BackgroundsController;
matchit_components_backgrounds_BackgroundsController.__name__ = ["matchit","components","backgrounds","BackgroundsController"];
matchit_components_backgrounds_BackgroundsController.__super__ = matchit_core_components_ComponentController;
matchit_components_backgrounds_BackgroundsController.prototype = $extend(matchit_core_components_ComponentController.prototype,{
	setup: function() {
		this.view.showBg();
	}
	,__class__: matchit_components_backgrounds_BackgroundsController
});
var matchit_core_components_ComponentView = function(mainView,viewName) {
	this.view = mainView;
	this._container = new PIXI.Container();
	this._container.name = viewName + "Container";
	this.componentName = viewName.substring(0,viewName.indexOf("View")).toLowerCase();
};
$hxClasses["matchit.core.components.ComponentView"] = matchit_core_components_ComponentView;
matchit_core_components_ComponentView.__name__ = ["matchit","core","components","ComponentView"];
matchit_core_components_ComponentView.prototype = {
	show: function() {
		this._container.visible = true;
	}
	,hide: function() {
		this._container.visible = false;
	}
	,init: function() {
		this.view.stage.addChild(this._container);
	}
	,addAssetsToLoad: function() {
	}
	,destroy: function() {
		this._container.destroy(true);
		this.view.stage.removeChild(this._container);
		this._container = null;
	}
	,applyIndex: function() {
		if(this.index != null && this.index <= this.view.stage.children.length - 1) this.view.stage.setChildIndex(this._container,this.index); else {
			this.index = this.view.stage.children.length - 1;
			this.view.stage.setChildIndex(this._container,this.index);
		}
	}
	,__class__: matchit_core_components_ComponentView
};
var matchit_components_backgrounds_BackgroundsView = function(mainView,viewName) {
	matchit_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["matchit.components.backgrounds.BackgroundsView"] = matchit_components_backgrounds_BackgroundsView;
matchit_components_backgrounds_BackgroundsView.__name__ = ["matchit","components","backgrounds","BackgroundsView"];
matchit_components_backgrounds_BackgroundsView.__super__ = matchit_core_components_ComponentView;
matchit_components_backgrounds_BackgroundsView.prototype = $extend(matchit_core_components_ComponentView.prototype,{
	init: function() {
		matchit_core_components_ComponentView.prototype.init.call(this);
		this.index = 2;
		matchit_Main.resize.add($bind(this,this._resize));
	}
	,addAssetsToLoad: function() {
		this.loader.addAsset("backgrounds_bg","backgrounds/bg.jpg");
	}
	,showBg: function() {
		this._bg = new PIXI.extras.TilingSprite(this.loader.getTexture("backgrounds_bg"),this.stageProperties.screenWidth,this.stageProperties.screenHeight);
		this._container.addChild(this._bg);
	}
	,_resize: function() {
		if(this._bg != null) {
			this._bg.width = this.stageProperties.screenWidth;
			this._bg.height = this.stageProperties.screenHeight;
		}
	}
	,__class__: matchit_components_backgrounds_BackgroundsView
});
var matchit_components_categories_CategoriesController = function() {
	matchit_core_components_ComponentController.call(this);
};
$hxClasses["matchit.components.categories.CategoriesController"] = matchit_components_categories_CategoriesController;
matchit_components_categories_CategoriesController.__name__ = ["matchit","components","categories","CategoriesController"];
matchit_components_categories_CategoriesController.__super__ = matchit_core_components_ComponentController;
matchit_components_categories_CategoriesController.prototype = $extend(matchit_core_components_ComponentController.prototype,{
	setup: function() {
		this.model.showCategories.add($bind(this,this._showCategories));
		this.view.selectedCategory.add($bind(this,this._onCategory));
		this.view.createCategories();
	}
	,_showCategories: function() {
		this.view._container.visible = true;
	}
	,_onCategory: function(category) {
		this.model.showMenu.dispatch();
		this.model.category.dispatch(category,Reflect.field(this.componentModel,category));
		this.view._container.visible = false;
	}
	,__class__: matchit_components_categories_CategoriesController
});
var matchit_core_components_ComponentModel = function() {
};
$hxClasses["matchit.core.components.ComponentModel"] = matchit_core_components_ComponentModel;
matchit_core_components_ComponentModel.__name__ = ["matchit","core","components","ComponentModel"];
matchit_core_components_ComponentModel.prototype = {
	init: function() {
	}
	,reset: function() {
	}
	,__class__: matchit_core_components_ComponentModel
};
var matchit_components_categories_CategoriesModel = function() {
	this.random = 78;
	this.social = 30;
	this.pokeman = 99;
	this.education = 32;
	matchit_core_components_ComponentModel.call(this);
};
$hxClasses["matchit.components.categories.CategoriesModel"] = matchit_components_categories_CategoriesModel;
matchit_components_categories_CategoriesModel.__name__ = ["matchit","components","categories","CategoriesModel"];
matchit_components_categories_CategoriesModel.__super__ = matchit_core_components_ComponentModel;
matchit_components_categories_CategoriesModel.prototype = $extend(matchit_core_components_ComponentModel.prototype,{
	__class__: matchit_components_categories_CategoriesModel
});
var matchit_components_categories_CategoriesView = function(mainView,viewName) {
	matchit_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["matchit.components.categories.CategoriesView"] = matchit_components_categories_CategoriesView;
matchit_components_categories_CategoriesView.__name__ = ["matchit","components","categories","CategoriesView"];
matchit_components_categories_CategoriesView.__super__ = matchit_core_components_ComponentView;
matchit_components_categories_CategoriesView.prototype = $extend(matchit_core_components_ComponentView.prototype,{
	init: function() {
		matchit_core_components_ComponentView.prototype.init.call(this);
		this.index = 2;
		this.selectedCategory = new msignal_Signal1(String);
		matchit_Main.resize.add($bind(this,this._resize));
	}
	,addAssetsToLoad: function() {
		this.loader.addAsset("categories_education","categories/education.png");
		this.loader.addAsset("categories_pokeman","categories/pokeman.png");
		this.loader.addAsset("categories_social","categories/social.png");
		this.loader.addAsset("categories_random","categories/random.png");
	}
	,createCategories: function() {
		var _g = this;
		this._education = new PIXI.Sprite(this.loader.getTexture("categories_education"));
		this._container.addChild(this._education);
		this._pokeman = new PIXI.Sprite(this.loader.getTexture("categories_pokeman"));
		this._pokeman.position.x = this._education.position.x + this._education.width + 15;
		this._container.addChild(this._pokeman);
		this._social = new PIXI.Sprite(this.loader.getTexture("categories_social"));
		this._social.position.y = this._education.position.y + this._education.height + 15;
		this._container.addChild(this._social);
		this._random = new PIXI.Sprite(this.loader.getTexture("categories_random"));
		this._random.position.x = this._pokeman.position.x;
		this._random.position.y = this._education.position.y + this._education.height + 15;
		this._container.addChild(this._random);
		this._education.click = this._education.tap = function(evt) {
			_g.selectedCategory.dispatch("education");
		};
		this._pokeman.click = this._pokeman.tap = function(evt1) {
			_g.selectedCategory.dispatch("pokeman");
		};
		this._social.click = this._social.tap = function(evt2) {
			_g.selectedCategory.dispatch("social");
		};
		this._random.click = this._random.tap = function(evt3) {
			_g.selectedCategory.dispatch("random");
		};
		this._education.interactive = true;
		this._pokeman.interactive = true;
		this._social.interactive = true;
		this._random.interactive = true;
		this._resize();
	}
	,_resize: function() {
		this._container.position.set((this.stageProperties.screenWidth - this._container.width) / 2,(this.stageProperties.screenHeight - this._container.height) / 2);
	}
	,__class__: matchit_components_categories_CategoriesView
});
var matchit_components_menu_MenuController = function() {
	matchit_core_components_ComponentController.call(this);
};
$hxClasses["matchit.components.menu.MenuController"] = matchit_components_menu_MenuController;
matchit_components_menu_MenuController.__name__ = ["matchit","components","menu","MenuController"];
matchit_components_menu_MenuController.__super__ = matchit_core_components_ComponentController;
matchit_components_menu_MenuController.prototype = $extend(matchit_core_components_ComponentController.prototype,{
	setup: function() {
		this.model.showMenu.add($bind(this,this._showMenu));
		this.model.showCategories.add($bind(this,this._showCategories));
		this.view.tiles.add($bind(this,this._onTiles));
		this.view.createMenu();
		this.view._container.visible = false;
	}
	,_showMenu: function() {
		this.view._container.visible = true;
	}
	,_showCategories: function() {
		this.view._container.visible = false;
	}
	,_onTiles: function(count) {
		this.model.tiles.dispatch(count);
		this.view._container.visible = false;
	}
	,__class__: matchit_components_menu_MenuController
});
var matchit_components_menu_MenuView = function(mainView,viewName) {
	matchit_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["matchit.components.menu.MenuView"] = matchit_components_menu_MenuView;
matchit_components_menu_MenuView.__name__ = ["matchit","components","menu","MenuView"];
matchit_components_menu_MenuView.__super__ = matchit_core_components_ComponentView;
matchit_components_menu_MenuView.prototype = $extend(matchit_core_components_ComponentView.prototype,{
	init: function() {
		matchit_core_components_ComponentView.prototype.init.call(this);
		this.index = 3;
		this.tiles = new msignal_Signal1(Int);
		matchit_Main.resize.add($bind(this,this._resize));
	}
	,addAssetsToLoad: function() {
		this.loader.addAsset("menu_button_6_tiles","menu/button_6-tiles.png");
		this.loader.addAsset("menu_button_12_tiles","menu/button_12-tiles.png");
		this.loader.addAsset("menu_button_24_tiles","menu/button_24-tiles.png");
		this.loader.addAsset("menu_button_48_tiles","menu/button_48-tiles.png");
	}
	,createMenu: function() {
		var _g = this;
		this._menu6 = new PIXI.Sprite(this.loader.getTexture("menu_button_6_tiles"));
		this._container.addChild(this._menu6);
		this._menu12 = new PIXI.Sprite(this.loader.getTexture("menu_button_12_tiles"));
		this._menu12.position.y = this._menu6.position.y + this._menu6.height + 15;
		this._container.addChild(this._menu12);
		this._menu24 = new PIXI.Sprite(this.loader.getTexture("menu_button_24_tiles"));
		this._menu24.position.y = this._menu12.position.y + this._menu12.height + 15;
		this._container.addChild(this._menu24);
		this._menu48 = new PIXI.Sprite(this.loader.getTexture("menu_button_48_tiles"));
		this._menu48.position.y = this._menu24.position.y + this._menu24.height + 15;
		this._container.addChild(this._menu48);
		this._menu6.click = this._menu6.tap = function(evt) {
			_g.tiles.dispatch(6);
		};
		this._menu12.click = this._menu12.tap = function(evt1) {
			_g.tiles.dispatch(12);
		};
		this._menu24.click = this._menu24.tap = function(evt2) {
			_g.tiles.dispatch(24);
		};
		this._menu48.click = this._menu48.tap = function(evt3) {
			_g.tiles.dispatch(48);
		};
		this._menu6.interactive = true;
		this._menu12.interactive = true;
		this._menu24.interactive = true;
		this._menu48.interactive = true;
		this._resize();
	}
	,_resize: function() {
		this._container.position.set((this.stageProperties.screenWidth - this._container.width) / 2,(this.stageProperties.screenHeight - this._container.height) / 2);
	}
	,__class__: matchit_components_menu_MenuView
});
var matchit_components_preloader_PreloaderController = function() {
	matchit_core_components_ComponentController.call(this);
};
$hxClasses["matchit.components.preloader.PreloaderController"] = matchit_components_preloader_PreloaderController;
matchit_components_preloader_PreloaderController.__name__ = ["matchit","components","preloader","PreloaderController"];
matchit_components_preloader_PreloaderController.__super__ = matchit_core_components_ComponentController;
matchit_components_preloader_PreloaderController.prototype = $extend(matchit_core_components_ComponentController.prototype,{
	init: function() {
		matchit_core_components_ComponentController.prototype.init.call(this);
		this.view.setup();
		this.view.ready.addOnce($bind(this,this._onReady));
	}
	,setup: function() {
		this.view.reset();
		this.view = null;
	}
	,_onReady: function() {
		this.model.set_preloaderReady(true);
	}
	,__class__: matchit_components_preloader_PreloaderController
});
var matchit_components_preloader_PreloaderView = function(mainView,viewName) {
	matchit_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["matchit.components.preloader.PreloaderView"] = matchit_components_preloader_PreloaderView;
matchit_components_preloader_PreloaderView.__name__ = ["matchit","components","preloader","PreloaderView"];
matchit_components_preloader_PreloaderView.__super__ = matchit_core_components_ComponentView;
matchit_components_preloader_PreloaderView.prototype = $extend(matchit_core_components_ComponentView.prototype,{
	init: function() {
		matchit_core_components_ComponentView.prototype.init.call(this);
		this.index = 1;
		this.ready = new msignal_Signal0();
	}
	,setup: function() {
		this.loader.addAsset("preloader_logo","preloader/logo.png");
		this.loader.start($bind(this,this._onLoaded));
	}
	,_onLoaded: function() {
		this._logo = new PIXI.Sprite(this.loader.getTexture("preloader_logo"));
		this._logo.anchor.set(0.5);
		this._container.addChild(this._logo);
		this._createLoadingBar();
		this._resize();
		if(matchit_Main.update != null) matchit_Main.update.add($bind(this,this._update));
		if(matchit_Main.resize != null) matchit_Main.resize.add($bind(this,this._resize));
		this.loader.reset();
		this.ready.dispatch();
	}
	,_createLoadingBar: function() {
		this._loadingBarContainer = new PIXI.Container();
		this._container.addChild(this._loadingBarContainer);
		this._loadingBarBG = new PIXI.Graphics();
		this._loadingBarBG.beginFill(15358496);
		this._loadingBarBG.drawRect(0,0,204,24);
		this._loadingBarBG.endFill();
		this._loadingBar = new PIXI.Graphics();
		this._loadingBar.beginFill(16777215);
		this._loadingBar.drawRect(0,0,200,20);
		this._loadingBar.endFill();
		this._loadingBarContainer.addChild(this._loadingBarBG);
		this._loadingBarContainer.addChild(this._loadingBar);
		this._loadingBar.x = this._loadingBar.y = 2;
		this._loadingBar.scale.x = 0.05;
		this._loadingBarContainer.position.set(this._logo.x - this._loadingBarBG.width / 2,this._logo.y + this._logo.height / 2 + 25);
	}
	,reset: function() {
		motion_Actuate.stop(this._logo);
		this._container.removeChild(this._logo);
		this._container.removeChild(this._loadingBarContainer);
		this._loadingBarContainer = null;
		this._logo = null;
		if(matchit_Main.update != null) matchit_Main.update.remove($bind(this,this._update));
		if(matchit_Main.resize != null) matchit_Main.resize.remove($bind(this,this._resize));
	}
	,_update: function(elapsed) {
		if(this._loadingBar != null) {
			this._loadingBar.scale.x = this.loader.loadProgress / 100;
			if(this._loadingBar.scale.x == 1) {
				this._loadingBarContainer.visible = false;
				this._animateLogo();
				matchit_Main.update.remove($bind(this,this._update));
			}
		}
	}
	,_animateLogo: function() {
		motion_Actuate.tween(this._logo.scale,0.4,{ x : 2, y : 2}).ease(motion_easing_Bounce.get_easeOut());
		motion_Actuate.tween(this._logo,0.4,{ y : this._logo.y + 25}).ease(motion_easing_Bounce.get_easeOut()).reflect();
	}
	,_resize: function() {
		this._container.position.set(this.stageProperties.screenWidth / 2,this.stageProperties.screenHeight / 2 - 25);
	}
	,__class__: matchit_components_preloader_PreloaderView
});
var matchit_components_quickmenu_QuickMenuController = function() {
	matchit_core_components_ComponentController.call(this);
};
$hxClasses["matchit.components.quickmenu.QuickMenuController"] = matchit_components_quickmenu_QuickMenuController;
matchit_components_quickmenu_QuickMenuController.__name__ = ["matchit","components","quickmenu","QuickMenuController"];
matchit_components_quickmenu_QuickMenuController.__super__ = matchit_core_components_ComponentController;
matchit_components_quickmenu_QuickMenuController.prototype = $extend(matchit_core_components_ComponentController.prototype,{
	setup: function() {
		this.view.home.add($bind(this,this._onHome));
		this.view.menu.add($bind(this,this._onMenu));
		this.view.categories.add($bind(this,this._onCategories));
		this.model.showMenu.add($bind(this,this._onShowMenu));
		this.model.tiles.add($bind(this,this._onTiles));
		this.view.createMenu();
		this.view._container.visible = false;
	}
	,_onHome: function() {
		this.model.showCategories.dispatch();
		this.view._container.visible = false;
	}
	,_onMenu: function() {
		this.model.showMenu.dispatch();
	}
	,_onCategories: function() {
		this.model.showCategories.dispatch();
		this.view._container.visible = false;
	}
	,_onTiles: function(count) {
		this.view.setupForTiles();
		this.view._container.visible = true;
	}
	,_onShowMenu: function() {
		this.view.setupForMenu();
		this.view._container.visible = true;
	}
	,__class__: matchit_components_quickmenu_QuickMenuController
});
var matchit_components_quickmenu_QuickMenuView = function(mainView,viewName) {
	matchit_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["matchit.components.quickmenu.QuickMenuView"] = matchit_components_quickmenu_QuickMenuView;
matchit_components_quickmenu_QuickMenuView.__name__ = ["matchit","components","quickmenu","QuickMenuView"];
matchit_components_quickmenu_QuickMenuView.__super__ = matchit_core_components_ComponentView;
matchit_components_quickmenu_QuickMenuView.prototype = $extend(matchit_core_components_ComponentView.prototype,{
	init: function() {
		matchit_core_components_ComponentView.prototype.init.call(this);
		this.index = 5;
		this.home = new msignal_Signal0();
		this.menu = new msignal_Signal0();
		this.categories = new msignal_Signal0();
		matchit_Main.resize.add($bind(this,this._resize));
	}
	,addAssetsToLoad: function() {
		this.loader.addAsset("quickmenu_home","quickmenu/home.png");
		this.loader.addAsset("quickmenu_back","quickmenu/back.png");
	}
	,createMenu: function() {
		var _g = this;
		this._home = new PIXI.Sprite(this.loader.getTexture("quickmenu_home"));
		this._container.addChild(this._home);
		this._back = new PIXI.Sprite(this.loader.getTexture("quickmenu_back"));
		this._container.addChild(this._back);
		this._home.click = this._home.tap = function(evt) {
			_g.home.dispatch();
		};
		this._back.click = this._back.tap = function(evt1) {
			_g.menu.dispatch();
		};
		this._home.interactive = true;
		this._back.interactive = true;
		this._resize();
	}
	,setupForMenu: function() {
		var _g = this;
		this._home.visible = false;
		this._back.click = this._back.tap = function(evt) {
			_g.categories.dispatch();
		};
	}
	,setupForTiles: function() {
		var _g = this;
		this._home.visible = true;
		this._back.click = this._back.tap = function(evt) {
			_g.menu.dispatch();
		};
	}
	,_resize: function() {
		this._home.position.set(5,5);
		this._back.position.set(this.stageProperties.screenWidth - this._back.width - 5,5);
	}
	,__class__: matchit_components_quickmenu_QuickMenuView
});
var matchit_components_tiles_Tile = function(open,close) {
	PIXI.Container.call(this);
	this.clicked = new msignal_Signal2(String,Int);
	this._openTile = new PIXI.Sprite(open);
	this._closeTile = new PIXI.Sprite(close);
	this.addChild(this._openTile);
	this.addChild(this._closeTile);
	this._closeTile.click = this._closeTile.tap = $bind(this,this._onClick);
	this.enable();
};
$hxClasses["matchit.components.tiles.Tile"] = matchit_components_tiles_Tile;
matchit_components_tiles_Tile.__name__ = ["matchit","components","tiles","Tile"];
matchit_components_tiles_Tile.__super__ = PIXI.Container;
matchit_components_tiles_Tile.prototype = $extend(PIXI.Container.prototype,{
	_onClick: function(evt) {
		var _g = this;
		motion_Actuate.tween(this._closeTile,0.5,{ alpha : 0}).onComplete(function() {
			_g._closeTile.visible = false;
			_g._closeTile.alpha = 1;
		});
		this.clicked.dispatch(this.name,this.id);
		this.disable();
	}
	,disable: function() {
		this._closeTile.interactive = false;
	}
	,enable: function() {
		this._closeTile.interactive = true;
	}
	,reset: function() {
		this._closeTile.visible = true;
	}
	,__class__: matchit_components_tiles_Tile
});
var matchit_components_tiles_TilesController = function() {
	matchit_core_components_ComponentController.call(this);
};
$hxClasses["matchit.components.tiles.TilesController"] = matchit_components_tiles_TilesController;
matchit_components_tiles_TilesController.__name__ = ["matchit","components","tiles","TilesController"];
matchit_components_tiles_TilesController.__super__ = matchit_core_components_ComponentController;
matchit_components_tiles_TilesController.prototype = $extend(matchit_core_components_ComponentController.prototype,{
	setup: function() {
		this.model.showCategories.add($bind(this,this._reset));
		this.model.category.add($bind(this,this._setCategory));
		this.model.showMenu.add($bind(this,this._reset));
		this.model.tiles.add($bind(this,this._onTiles));
	}
	,_onTiles: function(count) {
		this.view.drawTiles(count);
	}
	,_setCategory: function(category,count) {
		this.view.loadCategoryTiles(category,count);
	}
	,_reset: function() {
		this.view.reset();
	}
	,__class__: matchit_components_tiles_TilesController
});
var matchit_components_tiles_TilesView = function(mainView,viewName) {
	matchit_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["matchit.components.tiles.TilesView"] = matchit_components_tiles_TilesView;
matchit_components_tiles_TilesView.__name__ = ["matchit","components","tiles","TilesView"];
matchit_components_tiles_TilesView.__super__ = matchit_core_components_ComponentView;
matchit_components_tiles_TilesView.prototype = $extend(matchit_core_components_ComponentView.prototype,{
	init: function() {
		matchit_core_components_ComponentView.prototype.init.call(this);
		this.index = 4;
		this._tilesLoaded = false;
		this._tilesContainer = new PIXI.Container();
		this._container.addChild(this._tilesContainer);
		var style1 = { };
		style1.fill = 13158;
		style1.fontSize = 14;
		this._movesCountTxt = new PIXI.Text("",style1);
		this._movesCountTxt.anchor.set(0,1);
		this._container.addChild(this._movesCountTxt);
		this._movesTimeTxt = new PIXI.Text("",style1);
		this._movesTimeTxt.anchor.set(1,0);
		this._container.addChild(this._movesTimeTxt);
		this._bestTxt = new PIXI.Text("",style1);
		this._bestTxt.anchor.set(0.5,1);
		this._container.addChild(this._bestTxt);
		matchit_Main.resize.add($bind(this,this._resize));
		this._ls = js_Browser.getLocalStorage();
		if(this._ls.getItem("best") != null) this._bestTxt.text = this._ls.getItem("best");
	}
	,addAssetsToLoad: function() {
		this.loader.addAudioAsset("audio_applause","audio/applause.mp3");
		this.loader.addAudioAsset("audio_nice","audio/nice.mp3");
		this.loader.addAudioAsset("audio_touch","audio/touch.mp3");
		this.loader.addAudioAsset("audio_uhoh","audio/uhoh.mp3");
		this.loader.addAudioAsset("audio_wow","audio/wow.mp3");
		this.loader.addAsset("tiles_tile","tiles/tile.png");
	}
	,loadCategoryTiles: function(category,count) {
		this._tilesLoaded = false;
		this._category = category;
		this._availableTilesCount = count;
		this.loader.reset();
		var _g1 = 1;
		var _g = this._availableTilesCount;
		while(_g1 < _g) {
			var i = _g1++;
			this.loader.addAsset("tiles_" + this._category + "_" + i,"tiles/" + this._category + "/icon" + i + ".png");
		}
		this.loader.start($bind(this,this._onTilesLoaded));
	}
	,_onTilesLoaded: function() {
		this._tilesLoaded = true;
		if(this._tileCount != null && this._tileCount > 0) this.drawTiles(this._tileCount);
	}
	,drawTiles: function(drawCount) {
		this._tileCount = drawCount;
		if(!this._tilesLoaded) return;
		this._startTime = new Date().getSeconds();
		matchit_Main.update.add($bind(this,this._update));
		this._movesCounter = 0;
		this._matchCount = 0;
		this._movesTime = 0;
		this._tiles = [];
		this._movesCountTxt.text = "Moves: " + this._movesCounter;
		this._determineRowMax();
		var tile;
		var scale = this._getScaleFactor();
		var tileId = 1;
		var _g1 = 0;
		var _g = this._tileCount;
		while(_g1 < _g) {
			var i = _g1++;
			tile = new matchit_components_tiles_Tile(this.loader.getTexture("tiles_" + this._category + "_" + tileId),this.loader.getTexture("tiles_tile"));
			tile.scale.set(scale);
			tile.id = tileId;
			tile.name = "tile" + i;
			tile.clicked.add($bind(this,this._onSelect));
			tileId++;
			if(tileId > this._tileCount / 2) tileId = 1;
			this._tiles.push(tile);
		}
		this._tiles = Random.shuffle(this._tiles);
		this._resize();
	}
	,_onSelect: function(name,id) {
		this.loader.playAudio("audio_touch");
		if(this._firstOpenTile == null) this._firstOpenTile = this._tilesContainer.getChildByName(name); else {
			this._secondOpenTile = this._tilesContainer.getChildByName(name);
			this._disableAll();
		}
		this._checkCards();
	}
	,_checkCards: function() {
		if(this._secondOpenTile != null) {
			this._movesCounter++;
			this._movesCountTxt.text = "Moves: " + this._movesCounter;
			if(this._firstOpenTile.id == this._secondOpenTile.id) {
				this._firstOpenTile = null;
				this._secondOpenTile = null;
				this._enableAll();
				this._matchCount += 2;
				if(this._matchCount == this._tileCount) {
					this.loader.playAudio("audio_wow");
					this.loader.playAudio("audio_applause");
					matchit_Main.update.remove($bind(this,this._update));
					var bestMoves = this._ls.getItem("bestMoves");
					var bestTime = this._ls.getItem("bestTime");
					if(bestMoves == null) bestMoves = "0";
					if(bestTime == null) bestTime = "0";
					if(Std.parseInt(bestMoves) < this._movesCounter && Std.parseInt(bestTime) < this._movesTime) this._ls.setItem("best","Best - " + this._movesCounter + " moves in " + this._movesTime);
				}
				this.loader.playAudio("audio_nice");
			} else {
				this.loader.playAudio("audio_uhoh");
				haxe_Timer.delay($bind(this,this._resetTiles),1000);
			}
			if(this._clickTimer != null) this._clickTimer.stop();
		} else this._clickTimer = haxe_Timer.delay($bind(this,this.resetTile),2000);
	}
	,_resetTiles: function() {
		if(this._firstOpenTile != null) this._firstOpenTile.reset();
		if(this._secondOpenTile != null) this._secondOpenTile.reset();
		this._firstOpenTile = null;
		this._secondOpenTile = null;
		this._enableAll();
	}
	,resetTile: function() {
		if(this._clickTimer != null) this._clickTimer.stop();
		if(this._secondOpenTile == null && this._firstOpenTile != null) {
			this._firstOpenTile.reset();
			this._firstOpenTile = null;
		}
		this._enableAll();
	}
	,_disableAll: function() {
		var _g = 0;
		var _g1 = this._tiles;
		while(_g < _g1.length) {
			var tile = _g1[_g];
			++_g;
			tile.disable();
		}
	}
	,_enableAll: function() {
		var _g = 0;
		var _g1 = this._tiles;
		while(_g < _g1.length) {
			var tile = _g1[_g];
			++_g;
			tile.enable();
		}
	}
	,_positionTiles: function() {
		var xpos = 0;
		var ypos = 0;
		var tile;
		var _g1 = 0;
		var _g = this._tileCount;
		while(_g1 < _g) {
			var i = _g1++;
			tile = this._tiles[i];
			this._tilesContainer.addChild(tile);
			if(i == 0) {
				tile.position.set(xpos,ypos);
				continue;
			}
			if(i % this._rowMax > 0) xpos += tile.width + 15; else {
				xpos = 0;
				ypos += tile.height + 15;
			}
			tile.position.set(xpos,ypos);
		}
	}
	,_determineRowMax: function() {
		if(this.stageProperties.orientation == "LANDSCAPE") {
			var _g = this._tileCount;
			switch(_g) {
			case 6:
				this._rowMax = 3;
				break;
			case 12:
				this._rowMax = 4;
				break;
			case 24:
				this._rowMax = 6;
				break;
			case 48:
				this._rowMax = 8;
				break;
			}
		} else {
			var _g1 = this._tileCount;
			switch(_g1) {
			case 6:
				this._rowMax = 2;
				break;
			case 12:
				this._rowMax = 3;
				break;
			case 24:
				this._rowMax = 4;
				break;
			case 48:
				this._rowMax = 6;
				break;
			}
		}
	}
	,_getScaleFactor: function() {
		var _g = this._tileCount;
		switch(_g) {
		case 12:
			return 0.8;
		case 24:
			return 0.7;
		case 48:
			return 0.4;
		default:
			return 1;
		}
	}
	,_resize: function() {
		if(this._tiles == null || this._tiles.length == 0) return;
		this._determineRowMax();
		this._positionTiles();
		this._tilesContainer.position.set((this.stageProperties.screenWidth - this._tilesContainer.width) / 2,(this.stageProperties.screenHeight - this._tilesContainer.height) / 2);
		if(this._tilesContainer.position.y < 50 || this._tilesContainer.position.x < 50) {
			this._tilesContainer.scale.set(this._tilesContainer.scale.x - 0.01,this._tilesContainer.scale.y - 0.01);
			this._resize();
		} else if(this._tilesContainer.position.y > 80 && this._tilesContainer.position.x > 80) {
			this._tilesContainer.scale.set(this._tilesContainer.scale.x + 0.01,this._tilesContainer.scale.y + 0.01);
			this._resize();
		}
		this._movesCountTxt.position.set(0,this.stageProperties.screenHeight);
		this._movesTimeTxt.position.set(this.stageProperties.screenWidth,this.stageProperties.screenHeight - this._movesCountTxt.height);
		this._bestTxt.position.set(this.stageProperties.screenWidth / 2,this.stageProperties.screenHeight);
	}
	,_update: function(t) {
		this._movesTime = new Date().getSeconds() - this._startTime;
		this._movesTimeTxt.text = matchit_core_utils_TimeUtils.convertToHHMMSS(this._movesTime);
	}
	,reset: function() {
		matchit_Main.update.remove($bind(this,this._update));
		this._firstOpenTile = null;
		this._secondOpenTile = null;
		this._tileCount = 0;
		this._rowMax = 0;
		this._tiles = [];
		if(this._clickTimer != null) this._clickTimer.stop();
		this._tilesContainer.removeChildren();
		this._movesCounter = 0;
		this._movesTime = 0;
		this._movesCountTxt.text = "";
		this._movesTimeTxt.text = "";
	}
	,__class__: matchit_components_tiles_TilesView
});
var matchit_controller_Controller = function() {
	this.componentControllers = [];
	this._componentViews = [];
};
$hxClasses["matchit.controller.Controller"] = matchit_controller_Controller;
matchit_controller_Controller.__name__ = ["matchit","controller","Controller"];
matchit_controller_Controller.prototype = {
	init: function() {
		this.model.init();
		this.view.init();
		this.model.addAssets.addOnce($bind(this,this._onAddAssets));
		this._loader = new matchit_core_loader_AssetLoader();
		this._loader.baseUrl = "assets/";
		this._loader.pixelRatio = this.stageProperties.pixelRatio;
		if(this.stageProperties.bucketWidth > this.stageProperties.bucketHeight) this._loader.resolution = this.stageProperties.bucketWidth + "x" + this.stageProperties.bucketHeight; else this._loader.resolution = this.stageProperties.bucketHeight + "x" + this.stageProperties.bucketWidth;
		this._setupComponents();
	}
	,_onAddAssets: function() {
		this.view.addAssetsToLoad();
		var _g = 0;
		var _g1 = this._componentViews;
		while(_g < _g1.length) {
			var componentView = _g1[_g];
			++_g;
			componentView.addAssetsToLoad();
		}
		this._loader.start($bind(this,this._onPreloadingComplete));
	}
	,_onPreloadingComplete: function() {
		var _g = this;
		haxe_Timer.delay(function() {
			var _g1 = 0;
			var _g2 = _g.componentControllers;
			while(_g1 < _g2.length) {
				var controller = _g2[_g1];
				++_g1;
				controller.setup();
			}
			_g._componentViews = null;
		},1000);
	}
	,_setupComponents: function() {
		var models = CompileTimeClassList.get("null,true,matchit.core.components.ComponentModel");
		var views = CompileTimeClassList.get("null,true,matchit.core.components.ComponentView");
		var controllers = CompileTimeClassList.get("null,true,matchit.core.components.ComponentController");
		var viewInjector = new minject_Injector();
		viewInjector.mapValue(matchit_core_loader_AssetLoader,this._loader);
		viewInjector.injectInto(this.view);
		var modelMap = new haxe_ds_StringMap();
		var _g_head = models.h;
		var _g_val = null;
		while(_g_head != null) {
			var modelClass;
			modelClass = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			var key = Type.getClassName(modelClass).split(".").pop();
			if(__map_reserved[key] != null) modelMap.setReserved(key,modelClass); else modelMap.h[key] = modelClass;
		}
		var viewMap = new haxe_ds_StringMap();
		var _g_head1 = views.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var viewClass;
			viewClass = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			var key1 = Type.getClassName(viewClass).split(".").pop();
			if(__map_reserved[key1] != null) viewMap.setReserved(key1,viewClass); else viewMap.h[key1] = viewClass;
		}
		var _g_head2 = controllers.h;
		var _g_val2 = null;
		while(_g_head2 != null) {
			var controllerClass;
			controllerClass = (function($this) {
				var $r;
				_g_val2 = _g_head2[0];
				_g_head2 = _g_head2[1];
				$r = _g_val2;
				return $r;
			}(this));
			var controllerName = Type.getClassName(controllerClass).split(".").pop();
			controllerName = controllerName.substring(0,controllerName.indexOf("Controller"));
			var modelClass1 = modelMap.get(controllerName + "Model");
			var viewClass1 = viewMap.get(controllerName + "View");
			this._setupComponent(modelClass1,viewClass1,controllerClass);
		}
		this._componentViews.sort(function(comp1,comp2) {
			return Reflect.compare(comp1.index,comp2.index);
		});
		var _g = 0;
		var _g1 = this._componentViews;
		while(_g < _g1.length) {
			var componentView = _g1[_g];
			++_g;
			componentView.applyIndex();
		}
	}
	,_setupComponent: function(modelClass,viewClass,controllerClass) {
		var componentInjector = new minject_Injector();
		componentInjector.mapValue(matchit_model_Model,this.model);
		var componentModel = null;
		var componentView = null;
		if(modelClass != null) {
			componentModel = Type.createInstance(modelClass,[]);
			componentInjector.mapValue(modelClass,componentModel);
			var modelInjector = new minject_Injector();
			modelInjector.mapValue(matchit_model_Model,this.model);
			modelInjector.injectInto(componentModel);
			componentModel.init();
		}
		if(viewClass != null) {
			var viewName = Type.getClassName(viewClass).split(".").pop();
			componentView = Type.createInstance(viewClass,[this.view,viewName]);
			componentInjector.mapValue(viewClass,componentView);
			var viewInjector = new minject_Injector();
			viewInjector.mapValue(matchit_core_loader_AssetLoader,this._loader);
			viewInjector.mapValue(matchit_core_utils_StageProperties,this.stageProperties);
			viewInjector.injectInto(componentView);
			componentView.init();
			this._componentViews.push(js_Boot.__cast(componentView , matchit_core_components_ComponentView));
		}
		var componentController = Type.createInstance(controllerClass,[]);
		componentInjector.injectInto(componentController);
		componentController.init();
		this.componentControllers.push(componentController);
	}
	,__class__: matchit_controller_Controller
};
var matchit_core_loader_AssetLoader = function() {
	PIXI.loaders.Loader.call(this);
	this.count = 0;
	this.loadProgress = 0;
	this.pixelRatio = 1;
	this._loadCount = 0;
	this._audioCount = 0;
	this._audioKeys = [];
	this._audioAssets = new haxe_ds_StringMap();
	this._audioAssetPaths = new haxe_ds_StringMap();
	matchit_core_loader_MultipackParser.loader = this;
	this["use"](matchit_core_loader_MultipackParser.parse);
};
$hxClasses["matchit.core.loader.AssetLoader"] = matchit_core_loader_AssetLoader;
matchit_core_loader_AssetLoader.__name__ = ["matchit","core","loader","AssetLoader"];
matchit_core_loader_AssetLoader.__super__ = PIXI.loaders.Loader;
matchit_core_loader_AssetLoader.prototype = $extend(PIXI.loaders.Loader.prototype,{
	start: function(onComplete,onProgress) {
		this._onComplete = onComplete;
		this._onProgress = onProgress;
		if(this._audioCount > 0) this._loadAudioAsset(); else this.load(this._onComplete);
	}
	,_loadAudioAsset: function() {
		var id = this._audioKeys.pop();
		var value = new matchit_core_loader_AudioAsset(this.baseUrl + this._audioAssetPaths.get(id),false,false,$bind(this,this._onAudioAssetLoaded),$bind(this,this._onAudioAssetLoadError));
		this._audioAssets.set(id,value);
	}
	,_onAudioAssetLoaded: function(snd) {
		this._loadCount++;
		if(this._loadCount == this._audioCount) {
			if(this.count - this._audioCount > 0) this.load(this._onComplete); else this._onComplete();
		} else if(this._audioKeys.length > 0) this._loadAudioAsset();
		this._checkProgress();
	}
	,_onAudioAssetLoadError: function(snd) {
		this._loadCount++;
		if(this._loadCount == this._audioCount) {
			if(this.count - this._audioCount > 0) this.load(this._onComplete); else this._onComplete();
		} else if(this._audioKeys.length > 0) this._loadAudioAsset();
		this._checkProgress();
	}
	,_onAssetLoaded: function(resource) {
		this._loadCount++;
		this._checkProgress();
	}
	,_checkProgress: function() {
		this.loadProgress = this._loadCount / this.count * 100;
		if(this._onProgress != null) this._onProgress();
	}
	,addAudioAsset: function(id,path) {
		this.count++;
		this._audioCount++;
		this._audioAssetPaths.set(id,path);
		this._audioKeys.push(id);
	}
	,addAsset: function(id,path,usePixelRatio) {
		if(usePixelRatio == null) usePixelRatio = true;
		if(!(Reflect.field(this.resources,id) != null)) {
			var url = "";
			if(usePixelRatio) {
				if(AssetsList.exists(this.baseUrl + (this.resolution != null?this.resolution + "/":"") + ("@" + this.pixelRatio + "x/") + path)) url = (this.resolution != null?this.resolution + "/":"") + ("@" + this.pixelRatio + "x/") + path; else if(AssetsList.exists(this.baseUrl + (this.resolution != null?this.resolution + "/":"") + ("@" + 1 + "x/") + path)) url = (this.resolution != null?this.resolution + "/":"") + ("@" + 1 + "x/") + path;
			} else if(AssetsList.exists(this.baseUrl + (this.resolution != null?this.resolution + "/":"") + path)) url = (this.resolution != null?this.resolution + "/":"") + path; else if(AssetsList.exists(this.baseUrl + path)) url = path;
			if(url != "") {
				this.add(id,url,{ loadType : this._getLoadtype(path)},$bind(this,this._onAssetLoaded));
				this.count++;
			} else JConsole.info("'" + this.baseUrl + path + "' not availabble in AssetList. Make sure the asset is available or run the build to update AssetsList");
		}
	}
	,getTexture: function(id) {
		var resource = Reflect.field(this.resources,id);
		if(resource != null && resource.texture != null) return resource.texture; else if(PIXI.Texture.fromFrame(id) != null) return PIXI.Texture.fromFrame(id); else JConsole.error("Texture with id '" + id + "' not found");
		return null;
	}
	,playAudio: function(id,loop,onend) {
		if(loop == null) loop = false;
		var snd = this._audioAssets.get(id);
		snd.play(loop,onend);
	}
	,reset: function() {
		this.removeAllListeners();
		this.count = 0;
		this._loadCount = 0;
		this._audioCount = 0;
		this.loadProgress = 0;
		this._audioKeys = [];
		this.resources = { };
		PIXI.loaders.Loader.prototype.reset.call(this);
	}
	,_getLoadtype: function(asset) {
		if(new EReg("(.png|.gif|.svg|.jpg|.jpeg|.bmp)","i").match(asset)) return 2; else if(new EReg("(.mp3|.wav|.ogg|.aac|.m4a|.oga|.webma)","i").match(asset)) return 3; else if(new EReg("(.mp4|.webm|.m3u8)","i").match(asset)) return 4;
		return 1;
	}
	,__class__: matchit_core_loader_AssetLoader
});
var matchit_core_loader_AudioAsset = function(path,autoPlay,loop,loadComplete,loadError) {
	if(loop == null) loop = false;
	if(autoPlay == null) autoPlay = false;
	var options = { };
	options.autoplay = autoPlay;
	options.loop = loop;
	if(loadComplete != null) options.onload = loadComplete;
	if(loadError != null) options.onerror = loadError;
	this._snd = new WaudSound(path,options);
};
$hxClasses["matchit.core.loader.AudioAsset"] = matchit_core_loader_AudioAsset;
matchit_core_loader_AudioAsset.__name__ = ["matchit","core","loader","AudioAsset"];
matchit_core_loader_AudioAsset.prototype = {
	play: function(loop,onend) {
		if(loop == null) loop = false;
		this._snd.stop();
		this._snd.loop(loop);
		this._snd.play();
		if(onend != null) this._snd.onEnd(onend);
	}
	,__class__: matchit_core_loader_AudioAsset
};
var matchit_core_loader_MultipackParser = function() { };
$hxClasses["matchit.core.loader.MultipackParser"] = matchit_core_loader_MultipackParser;
matchit_core_loader_MultipackParser.__name__ = ["matchit","core","loader","MultipackParser"];
matchit_core_loader_MultipackParser.parse = function(resource,next) {
	var data = resource.data;
	if(data != null && data.multipack) {
		var textures = data.textures;
		var imgCount = textures.length;
		var imgLoadedCount = 0;
		var resolution = PIXI.utils.getResolutionOfUrl(resource.url);
		var baseURL = resource.url.split(matchit_core_loader_MultipackParser.loader.baseUrl)[1];
		baseURL = baseURL.substring(0,baseURL.lastIndexOf("/") + 1);
		var _g = 0;
		while(_g < textures.length) {
			var texture = [textures[_g]];
			++_g;
			var url = baseURL + texture[0].meta.image;
			matchit_core_loader_MultipackParser.loader.add(texture[0].meta.image,url,{ loadType : 2, crossOrigin : resource.crossOrigin},(function(texture) {
				return function(image) {
					var frames = texture[0].frames;
					var _g1 = 0;
					var _g2 = Reflect.fields(frames);
					while(_g1 < _g2.length) {
						var n = _g2[_g1];
						++_g1;
						var frameData = Reflect.field(frames,n);
						var rect = frameData.frame;
						if(rect != null) {
							var size = new PIXI.Rectangle(rect.x,rect.y,rect.w,rect.h);
							var trim = null;
							if(frameData.trimmed) {
								var actualSize = frameData.sourceSize;
								var realSize = frameData.spriteSourceSize;
								trim = new PIXI.Rectangle(realSize.x / resolution,realSize.y / resolution,actualSize.w / resolution,actualSize.h / resolution);
							}
							size.x /= resolution;
							size.y /= resolution;
							size.width /= resolution;
							size.height /= resolution;
							PIXI.Texture.addTextureToCache(new PIXI.Texture(image.texture.baseTexture,size,size.clone(),trim),n);
						}
					}
				};
			})(texture));
		}
		next();
	} else next();
};
var matchit_core_utils_BrowserUtils = function() { };
$hxClasses["matchit.core.utils.BrowserUtils"] = matchit_core_utils_BrowserUtils;
matchit_core_utils_BrowserUtils.__name__ = ["matchit","core","utils","BrowserUtils"];
matchit_core_utils_BrowserUtils.getPixelRatio = function() {
	var pixelRatio;
	if(window.devicePixelRatio <= 2) pixelRatio = Math.floor(window.devicePixelRatio); else pixelRatio = 2;
	if(matchit_core_utils_BrowserUtils.isiOS() && (window.screen.width == 320 && window.screen.height == 480)) pixelRatio = 1;
	if(pixelRatio < 1) pixelRatio = 1;
	JConsole.info("Pixel Ratio: " + pixelRatio);
	return pixelRatio;
};
matchit_core_utils_BrowserUtils.isiOS = function() {
	return new EReg("(iPad|iPhone|iPod)","i").match(window.navigator.userAgent);
};
var matchit_core_utils_StageProperties = function() {
	this.pixelRatio = 1;
	this.screenWidth = 1024;
	this.screenHeight = 768;
	this.bucketWidth = 1024;
	this.bucketHeight = 768;
	this.screenX = 0;
	this.screenY = 0;
};
$hxClasses["matchit.core.utils.StageProperties"] = matchit_core_utils_StageProperties;
matchit_core_utils_StageProperties.__name__ = ["matchit","core","utils","StageProperties"];
matchit_core_utils_StageProperties.prototype = {
	__class__: matchit_core_utils_StageProperties
};
var matchit_core_utils_TimeUtils = function() { };
$hxClasses["matchit.core.utils.TimeUtils"] = matchit_core_utils_TimeUtils;
matchit_core_utils_TimeUtils.__name__ = ["matchit","core","utils","TimeUtils"];
matchit_core_utils_TimeUtils.convertToHHMMSS = function(seconds) {
	var s = seconds % 60;
	var m = Math.floor(seconds % 3600 / 60);
	var h = Math.floor(seconds / 3600);
	var hourStr;
	if(h == 0) hourStr = ""; else hourStr = matchit_core_utils_TimeUtils.doubleDigitFormat(h) + ":";
	var minuteStr = matchit_core_utils_TimeUtils.doubleDigitFormat(m) + ":";
	var secondsStr = matchit_core_utils_TimeUtils.doubleDigitFormat(s);
	return hourStr + minuteStr + secondsStr;
};
matchit_core_utils_TimeUtils.doubleDigitFormat = function(num) {
	if(num < 10) return "0" + num;
	return "" + num;
};
var matchit_model_Model = function() {
	this.addAssets = new msignal_Signal0();
	this.updateFps = new msignal_Signal1(Int);
	this.tiles = new msignal_Signal1(Int);
	this.category = new msignal_Signal2(String,Int);
	this.showMenu = new msignal_Signal0();
	this.showCategories = new msignal_Signal0();
};
$hxClasses["matchit.model.Model"] = matchit_model_Model;
matchit_model_Model.__name__ = ["matchit","model","Model"];
matchit_model_Model.prototype = {
	init: function() {
	}
	,set_preloaderReady: function(val) {
		this.preloaderReady = val;
		if(this.preloaderReady) this.addAssets.dispatch();
		return this.preloaderReady;
	}
	,__class__: matchit_model_Model
	,__properties__: {set_preloaderReady:"set_preloaderReady"}
};
var matchit_view_View = function(stage) {
	this.stage = stage;
};
$hxClasses["matchit.view.View"] = matchit_view_View;
matchit_view_View.__name__ = ["matchit","view","View"];
matchit_view_View.prototype = {
	init: function() {
	}
	,addAssetsToLoad: function() {
	}
	,__class__: matchit_view_View
};
var minject_ClassMap = function() {
	this.map = new haxe_ds_StringMap();
};
$hxClasses["minject.ClassMap"] = minject_ClassMap;
minject_ClassMap.__name__ = ["minject","ClassMap"];
minject_ClassMap.__interfaces__ = [haxe_IMap];
minject_ClassMap.prototype = {
	get: function(k) {
		var key = Type.getClassName(k);
		return this.map.get(key);
	}
	,set: function(k,v) {
		var key = Type.getClassName(k);
		this.map.set(key,v);
	}
	,exists: function(k) {
		var key = Type.getClassName(k);
		return this.map.exists(key);
	}
	,__class__: minject_ClassMap
};
var minject_InjectionConfig = function(request,injectionName) {
	this.request = request;
	this.injectionName = injectionName;
};
$hxClasses["minject.InjectionConfig"] = minject_InjectionConfig;
minject_InjectionConfig.__name__ = ["minject","InjectionConfig"];
minject_InjectionConfig.prototype = {
	getResponse: function(injector) {
		if(this.injector != null) injector = this.injector;
		if(this.result != null) return this.result.getResponse(injector);
		var parentConfig = injector.getAncestorMapping(this.request,this.injectionName);
		if(parentConfig != null) return parentConfig.getResponse(injector);
		return null;
	}
	,hasResponse: function(injector) {
		return this.result != null;
	}
	,hasOwnResponse: function() {
		return this.result != null;
	}
	,setResult: function(result) {
		if(this.result != null && result != null) console.log("Warning: Injector contains " + this.toString() + ".\nAttempting to overwrite this " + ("with mapping for [" + result.toString() + "].\nIf you have overwritten this mapping ") + "intentionally you can use `injector.unmap()` prior to your replacement mapping " + "in order to avoid seeing this message.");
		this.result = result;
	}
	,toString: function() {
		var named;
		if(this.injectionName != null && this.injectionName != "") named = " named \"" + this.injectionName + "\" and"; else named = "";
		return "rule: [" + Type.getClassName(this.request) + ("]" + named + " mapped to [" + Std.string(this.result) + "]");
	}
	,__class__: minject_InjectionConfig
};
var minject_Injector = function() {
	this.injectionConfigs = new haxe_ds_StringMap();
	this.injecteeDescriptions = new minject_ClassMap();
	this.attendedToInjectees = new minject_InjecteeSet();
};
$hxClasses["minject.Injector"] = minject_Injector;
minject_Injector.__name__ = ["minject","Injector"];
minject_Injector.prototype = {
	mapValue: function(whenAskedFor,useValue,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectValueResult(useValue));
		return config;
	}
	,getMapping: function(forClass,named) {
		if(named == null) named = "";
		var requestName = this.getClassName(forClass) + "#" + named;
		if(this.injectionConfigs.exists(requestName)) return this.injectionConfigs.get(requestName);
		var config = new minject_InjectionConfig(forClass,named);
		this.injectionConfigs.set(requestName,config);
		return config;
	}
	,injectInto: function(target) {
		if(this.attendedToInjectees.contains(target)) return;
		this.attendedToInjectees.add(target);
		var targetClass = Type.getClass(target);
		var injecteeDescription = null;
		if(this.injecteeDescriptions.exists(targetClass)) injecteeDescription = this.injecteeDescriptions.get(targetClass); else injecteeDescription = this.getInjectionPoints(targetClass);
		if(injecteeDescription == null) return;
		var injectionPoints = injecteeDescription.injectionPoints;
		var length = injectionPoints.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			var injectionPoint = injectionPoints[i];
			injectionPoint.applyInjection(target,this);
		}
	}
	,hasMapping: function(forClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(forClass,named);
		if(mapping == null) return false;
		return mapping.hasResponse(this);
	}
	,getAncestorMapping: function(forClass,named) {
		var parent = this.parentInjector;
		while(parent != null) {
			var parentConfig = parent.getConfigurationForRequest(forClass,named,false);
			if(parentConfig != null && parentConfig.hasOwnResponse()) return parentConfig;
			parent = parent.parentInjector;
		}
		return null;
	}
	,getInjectionPoints: function(forClass) {
		var typeMeta = haxe_rtti_Meta.getType(forClass);
		if(typeMeta != null && Object.prototype.hasOwnProperty.call(typeMeta,"interface")) throw new js__$Boot_HaxeError("Interfaces can't be used as instantiatable classes.");
		var fieldsMeta = this.getFields(forClass);
		var ctorInjectionPoint = null;
		var injectionPoints = [];
		var postConstructMethodPoints = [];
		var _g = 0;
		var _g1 = Reflect.fields(fieldsMeta);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var fieldMeta = Reflect.field(fieldsMeta,field);
			var inject = Object.prototype.hasOwnProperty.call(fieldMeta,"inject");
			var post = Object.prototype.hasOwnProperty.call(fieldMeta,"post");
			var type = Reflect.field(fieldMeta,"type");
			var args = Reflect.field(fieldMeta,"args");
			if(field == "_") {
				if(args.length > 0) ctorInjectionPoint = new minject_point_ConstructorInjectionPoint(fieldMeta.args);
			} else if(Object.prototype.hasOwnProperty.call(fieldMeta,"args")) {
				if(inject) {
					var point = new minject_point_MethodInjectionPoint(field,fieldMeta.args);
					injectionPoints.push(point);
				} else if(post) {
					var order;
					if(fieldMeta.post == null) order = 0; else order = fieldMeta.post[0];
					var point1 = new minject_point_PostConstructInjectionPoint(field,order);
					postConstructMethodPoints.push(point1);
				}
			} else if(type != null) {
				var name;
				if(fieldMeta.inject == null) name = null; else name = fieldMeta.inject[0];
				var point2 = new minject_point_PropertyInjectionPoint(field,fieldMeta.type[0],name);
				injectionPoints.push(point2);
			}
		}
		if(postConstructMethodPoints.length > 0) {
			postConstructMethodPoints.sort(function(a,b) {
				return a.order - b.order;
			});
			var _g2 = 0;
			while(_g2 < postConstructMethodPoints.length) {
				var point3 = postConstructMethodPoints[_g2];
				++_g2;
				injectionPoints.push(point3);
			}
		}
		if(ctorInjectionPoint == null) ctorInjectionPoint = new minject_point_NoParamsConstructorInjectionPoint();
		var injecteeDescription = new minject_InjecteeDescription(ctorInjectionPoint,injectionPoints);
		this.injecteeDescriptions.set(forClass,injecteeDescription);
		return injecteeDescription;
	}
	,getConfigurationForRequest: function(forClass,named,traverseAncestors) {
		if(traverseAncestors == null) traverseAncestors = true;
		var requestName = this.getClassName(forClass) + "#" + named;
		if(!this.injectionConfigs.exists(requestName)) {
			if(traverseAncestors && this.parentInjector != null && this.parentInjector.hasMapping(forClass,named)) return this.getAncestorMapping(forClass,named);
			return null;
		}
		return this.injectionConfigs.get(requestName);
	}
	,getClassName: function(forClass) {
		if(forClass == null) return "Dynamic"; else return Type.getClassName(forClass);
	}
	,getFields: function(type) {
		var meta = { };
		while(type != null) {
			var typeMeta = haxe_rtti_Meta.getFields(type);
			var _g = 0;
			var _g1 = Reflect.fields(typeMeta);
			while(_g < _g1.length) {
				var field = _g1[_g];
				++_g;
				Reflect.setField(meta,field,Reflect.field(typeMeta,field));
			}
			type = Type.getSuperClass(type);
		}
		return meta;
	}
	,__class__: minject_Injector
};
var minject_InjecteeSet = function() {
};
$hxClasses["minject.InjecteeSet"] = minject_InjecteeSet;
minject_InjecteeSet.__name__ = ["minject","InjecteeSet"];
minject_InjecteeSet.prototype = {
	add: function(value) {
		value.__injected__ = true;
	}
	,contains: function(value) {
		return value.__injected__ == true;
	}
	,__class__: minject_InjecteeSet
};
var minject_InjecteeDescription = function(ctor,injectionPoints) {
	this.ctor = ctor;
	this.injectionPoints = injectionPoints;
};
$hxClasses["minject.InjecteeDescription"] = minject_InjecteeDescription;
minject_InjecteeDescription.__name__ = ["minject","InjecteeDescription"];
minject_InjecteeDescription.prototype = {
	__class__: minject_InjecteeDescription
};
var minject_point_InjectionPoint = function() { };
$hxClasses["minject.point.InjectionPoint"] = minject_point_InjectionPoint;
minject_point_InjectionPoint.__name__ = ["minject","point","InjectionPoint"];
minject_point_InjectionPoint.prototype = {
	__class__: minject_point_InjectionPoint
};
var minject_point_MethodInjectionPoint = function(name,args) {
	this.name = name;
	this.args = args;
	var _g = 0;
	while(_g < args.length) {
		var arg = args[_g];
		++_g;
		if(arg.type == "Dynamic") throw new js__$Boot_HaxeError("Error in method definition of injectee. Required parameters can't have non class type.");
	}
};
$hxClasses["minject.point.MethodInjectionPoint"] = minject_point_MethodInjectionPoint;
minject_point_MethodInjectionPoint.__name__ = ["minject","point","MethodInjectionPoint"];
minject_point_MethodInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_MethodInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),this.gatherArgs(target,injector));
		return target;
	}
	,gatherArgs: function(target,injector) {
		var values = [];
		var _g = 0;
		var _g1 = this.args;
		while(_g < _g1.length) {
			var arg = _g1[_g];
			++_g;
			var name;
			if(arg.name == null) name = ""; else name = arg.name;
			var config = injector.getMapping(Type.resolveClass(arg.type),arg.name);
			var injection = config.getResponse(injector);
			if(injection == null && !arg.opt) {
				var targetName = Type.getClassName(Type.getClass(target));
				var requestName = Type.getClassName(config.request);
				throw new js__$Boot_HaxeError("Injector is missing a rule to handle injection into target " + targetName + ". " + ("Target dependency: " + requestName + ", method: " + name + ", named: ") + arg.name);
			}
			values.push(injection);
		}
		return values;
	}
	,__class__: minject_point_MethodInjectionPoint
};
var minject_point_ConstructorInjectionPoint = function(args) {
	minject_point_MethodInjectionPoint.call(this,"new",args);
};
$hxClasses["minject.point.ConstructorInjectionPoint"] = minject_point_ConstructorInjectionPoint;
minject_point_ConstructorInjectionPoint.__name__ = ["minject","point","ConstructorInjectionPoint"];
minject_point_ConstructorInjectionPoint.__super__ = minject_point_MethodInjectionPoint;
minject_point_ConstructorInjectionPoint.prototype = $extend(minject_point_MethodInjectionPoint.prototype,{
	applyInjection: function(target,injector) {
		return Type.createInstance(target,this.gatherArgs(target,injector));
	}
	,__class__: minject_point_ConstructorInjectionPoint
});
var minject_point_NoParamsConstructorInjectionPoint = function() {
};
$hxClasses["minject.point.NoParamsConstructorInjectionPoint"] = minject_point_NoParamsConstructorInjectionPoint;
minject_point_NoParamsConstructorInjectionPoint.__name__ = ["minject","point","NoParamsConstructorInjectionPoint"];
minject_point_NoParamsConstructorInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_NoParamsConstructorInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		return Type.createInstance(target,[]);
	}
	,__class__: minject_point_NoParamsConstructorInjectionPoint
};
var minject_point_PostConstructInjectionPoint = function(name,order) {
	if(order == null) order = 0;
	this.name = name;
	this.order = order;
};
$hxClasses["minject.point.PostConstructInjectionPoint"] = minject_point_PostConstructInjectionPoint;
minject_point_PostConstructInjectionPoint.__name__ = ["minject","point","PostConstructInjectionPoint"];
minject_point_PostConstructInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PostConstructInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),[]);
		return target;
	}
	,__class__: minject_point_PostConstructInjectionPoint
};
var minject_point_PropertyInjectionPoint = function(name,type,injectionName) {
	this.name = name;
	this.type = type;
	this.injectionName = injectionName;
};
$hxClasses["minject.point.PropertyInjectionPoint"] = minject_point_PropertyInjectionPoint;
minject_point_PropertyInjectionPoint.__name__ = ["minject","point","PropertyInjectionPoint"];
minject_point_PropertyInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PropertyInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		var injectionConfig = injector.getMapping(Type.resolveClass(this.type),this.injectionName);
		var injection = injectionConfig.getResponse(injector);
		if(injection == null) throw new js__$Boot_HaxeError("Injector is missing a rule to handle injection into property \"" + this.name + "\" " + ("of object \"" + Std.string(target) + "\". Target dependency: \"" + this.type + "\", named \"" + this.injectionName + "\""));
		Reflect.setProperty(target,this.name,injection);
		return target;
	}
	,__class__: minject_point_PropertyInjectionPoint
};
var minject_result_InjectionResult = function() {
};
$hxClasses["minject.result.InjectionResult"] = minject_result_InjectionResult;
minject_result_InjectionResult.__name__ = ["minject","result","InjectionResult"];
minject_result_InjectionResult.prototype = {
	getResponse: function(injector) {
		return null;
	}
	,toString: function() {
		return "";
	}
	,__class__: minject_result_InjectionResult
};
var minject_result_InjectValueResult = function(value) {
	minject_result_InjectionResult.call(this);
	this.value = value;
};
$hxClasses["minject.result.InjectValueResult"] = minject_result_InjectValueResult;
minject_result_InjectValueResult.__name__ = ["minject","result","InjectValueResult"];
minject_result_InjectValueResult.__super__ = minject_result_InjectionResult;
minject_result_InjectValueResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		return this.value;
	}
	,toString: function() {
		return "instance of " + Type.getClassName(Type.getClass(this.value));
	}
	,__class__: minject_result_InjectValueResult
});
var motion_actuators_IGenericActuator = function() { };
$hxClasses["motion.actuators.IGenericActuator"] = motion_actuators_IGenericActuator;
motion_actuators_IGenericActuator.__name__ = ["motion","actuators","IGenericActuator"];
motion_actuators_IGenericActuator.prototype = {
	__class__: motion_actuators_IGenericActuator
};
var motion_actuators_GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion_Actuate.defaultEase;
};
$hxClasses["motion.actuators.GenericActuator"] = motion_actuators_GenericActuator;
motion_actuators_GenericActuator.__name__ = ["motion","actuators","GenericActuator"];
motion_actuators_GenericActuator.__interfaces__ = [motion_actuators_IGenericActuator];
motion_actuators_GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) Reflect.setField(this.target,i,Reflect.field(this.properties,i)); else Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) params = [];
		return Reflect.callMethod(method,method,params);
	}
	,change: function() {
		if(this._onUpdate != null) this.callMethod(this._onUpdate,this._onUpdateParams);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) this.callMethod(this._onComplete,this._onCompleteParams);
		}
		motion_Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,onPause: function(handler,parameters) {
		this._onPause = handler;
		if(parameters == null) this._onPauseParams = []; else this._onPauseParams = parameters;
		return this;
	}
	,onResume: function(handler,parameters) {
		this._onResume = handler;
		if(parameters == null) this._onResumeParams = []; else this._onResumeParams = parameters;
		return this;
	}
	,pause: function() {
		if(this._onPause != null) this.callMethod(this._onPause,this._onPauseParams);
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,resume: function() {
		if(this._onResume != null) this.callMethod(this._onResume,this._onResumeParams);
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: motion_actuators_GenericActuator
};
var motion_actuators_SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = [];
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = haxe_Timer.stamp();
	motion_actuators_GenericActuator.call(this,target,duration,properties);
	if(!motion_actuators_SimpleActuator.addedEvent) {
		motion_actuators_SimpleActuator.addedEvent = true;
		motion_actuators_SimpleActuator.timer = new haxe_Timer(33);
		motion_actuators_SimpleActuator.timer.run = motion_actuators_SimpleActuator.stage_onEnterFrame;
	}
};
$hxClasses["motion.actuators.SimpleActuator"] = motion_actuators_SimpleActuator;
motion_actuators_SimpleActuator.__name__ = ["motion","actuators","SimpleActuator"];
motion_actuators_SimpleActuator.stage_onEnterFrame = function() {
	var currentTime = haxe_Timer.stamp();
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g1 = 0;
	var _g = motion_actuators_SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		var i = _g1++;
		actuator = motion_actuators_SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime >= actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			motion_actuators_SimpleActuator.actuators.splice(j,1);
			--motion_actuators_SimpleActuator.actuatorsLength;
		}
	}
};
motion_actuators_SimpleActuator.__super__ = motion_actuators_GenericActuator;
motion_actuators_SimpleActuator.prototype = $extend(motion_actuators_GenericActuator.prototype,{
	setField_motion_actuators_MotionPathActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,setField_motion_actuators_SimpleActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",this.cacheVisible);
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) value = Reflect.field(target,propertyName); else value = Reflect.getProperty(target,propertyName);
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) start = Reflect.field(this.target,i); else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			if(typeof(start) == "number") {
				var value = this.getField(this.properties,i);
				if(start == null) start = 0;
				if(value == null) value = 0;
				details = new motion_actuators_PropertyDetails(this.target,i,start,value - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		if(this.toggleVisible && this.properties.alpha != 0 && !this.getField(this.target,"visible")) {
			this.setVisible = true;
			this.cacheVisible = this.getField(this.target,"visible");
			this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",true);
		}
		this.timeOffset = this.startTime;
		motion_actuators_SimpleActuator.actuators.push(this);
		++motion_actuators_SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		if(!this.paused) {
			this.paused = true;
			motion_actuators_GenericActuator.prototype.pause.call(this);
			this.pauseTime = haxe_Timer.stamp();
		}
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += haxe_Timer.stamp() - this.pauseTime;
			motion_actuators_GenericActuator.prototype.resume.call(this);
		}
	}
	,setProperty: function(details,value) {
		if(details.isField) details.target[details.propertyName] = value; else Reflect.setProperty(details.target,details.propertyName,value);
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0;
				var _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					this.setProperty(details,details.start + details.change * easing);
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g11 = 0;
				var _g2 = this.detailsLength;
				while(_g11 < _g2) {
					var i2 = _g11++;
					details = this.propertyDetails[i2];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) details.target[details.propertyName] = endValue; else Reflect.setProperty(details.target,details.propertyName,endValue);
					} else this.setProperty(details,Math.round(endValue));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_SimpleActuator
});
var motion_easing_Expo = function() { };
$hxClasses["motion.easing.Expo"] = motion_easing_Expo;
motion_easing_Expo.__name__ = ["motion","easing","Expo"];
motion_easing_Expo.__properties__ = {get_easeOut:"get_easeOut"}
motion_easing_Expo.get_easeOut = function() {
	return new motion_easing_ExpoEaseOut();
};
var motion_easing_IEasing = function() { };
$hxClasses["motion.easing.IEasing"] = motion_easing_IEasing;
motion_easing_IEasing.__name__ = ["motion","easing","IEasing"];
motion_easing_IEasing.prototype = {
	__class__: motion_easing_IEasing
};
var motion_easing_ExpoEaseOut = function() {
};
$hxClasses["motion.easing.ExpoEaseOut"] = motion_easing_ExpoEaseOut;
motion_easing_ExpoEaseOut.__name__ = ["motion","easing","ExpoEaseOut"];
motion_easing_ExpoEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseOut.prototype = {
	calculate: function(k) {
		if(k == 1) return 1; else return 1 - Math.pow(2,-10 * k);
	}
	,__class__: motion_easing_ExpoEaseOut
};
var motion_Actuate = function() { };
$hxClasses["motion.Actuate"] = motion_Actuate;
motion_Actuate.__name__ = ["motion","Actuate"];
motion_Actuate.apply = function(target,properties,customActuator) {
	motion_Actuate.stop(target,properties);
	if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion_Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) && allowCreation) motion_Actuate.targetLibraries.set(target,[]);
	return motion_Actuate.targetLibraries.h[target.__id__];
};
motion_Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
			var actuator = target;
			actuator.stop(null,complete,sendEvent);
		} else {
			var library = motion_Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					Reflect.setField(temp,properties,null);
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1;
					_g1 = js_Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						Reflect.setField(temp1,property,null);
					}
					properties = temp1;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					i--;
				}
			}
		}
	}
};
motion_Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion_Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = motion_Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return motion_Actuate.apply(target,properties,customActuator);
	}
	return null;
};
motion_Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion_Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion_Actuate.targetLibraries.h[target.__id__].length == 0) motion_Actuate.targetLibraries.remove(target);
	}
};
var motion_IComponentPath = function() { };
$hxClasses["motion.IComponentPath"] = motion_IComponentPath;
motion_IComponentPath.__name__ = ["motion","IComponentPath"];
motion_IComponentPath.prototype = {
	__class__: motion_IComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_actuators_MethodActuator = function(target,duration,properties) {
	this.currentParameters = [];
	this.tweenProperties = { };
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = [];
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(this.properties.start[i]);
	}
};
$hxClasses["motion.actuators.MethodActuator"] = motion_actuators_MethodActuator;
motion_actuators_MethodActuator.__name__ = ["motion","actuators","MethodActuator"];
motion_actuators_MethodActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MethodActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		this.callMethod(this.target,this.properties.end);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		this.callMethod(this.target,this.currentParameters);
		motion_actuators_SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || ((start | 0) === start)) {
				details = new motion_actuators_PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active && !this.paused) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
	}
	,__class__: motion_actuators_MethodActuator
});
var motion_actuators_MotionPathActuator = function(target,duration,properties) {
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["motion.actuators.MotionPathActuator"] = motion_actuators_MotionPathActuator;
motion_actuators_MotionPathActuator.__name__ = ["motion","actuators","MotionPathActuator"];
motion_actuators_MotionPathActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MotionPathActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) Reflect.setField(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end()); else Reflect.setProperty(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end());
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					path.start = Reflect.getProperty(this.target,propertyName);
				}
				details = new motion_actuators_PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) Reflect.setField(details1.target,details1.propertyName,(js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details1.target,details1.propertyName,(js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g2 = 0;
				var _g11 = this.propertyDetails;
				while(_g2 < _g11.length) {
					var details2 = _g11[_g2];
					++_g2;
					if(!this._snapping) {
						if(details2.isField) Reflect.setField(details2.target,details2.propertyName,(js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details2.target,details2.propertyName,(js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
					} else if(details2.isField) Reflect.setField(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing))); else Reflect.setProperty(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing)));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_MotionPathActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_MotionPathActuator
});
var motion_actuators_PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
$hxClasses["motion.actuators.PropertyDetails"] = motion_actuators_PropertyDetails;
motion_actuators_PropertyDetails.__name__ = ["motion","actuators","PropertyDetails"];
motion_actuators_PropertyDetails.prototype = {
	__class__: motion_actuators_PropertyDetails
};
var motion_actuators_PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	motion_actuators_PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
$hxClasses["motion.actuators.PropertyPathDetails"] = motion_actuators_PropertyPathDetails;
motion_actuators_PropertyPathDetails.__name__ = ["motion","actuators","PropertyPathDetails"];
motion_actuators_PropertyPathDetails.__super__ = motion_actuators_PropertyDetails;
motion_actuators_PropertyPathDetails.prototype = $extend(motion_actuators_PropertyDetails.prototype,{
	__class__: motion_actuators_PropertyPathDetails
});
var motion_easing_Bounce = function() { };
$hxClasses["motion.easing.Bounce"] = motion_easing_Bounce;
motion_easing_Bounce.__name__ = ["motion","easing","Bounce"];
motion_easing_Bounce.__properties__ = {get_easeOut:"get_easeOut"}
motion_easing_Bounce.get_easeOut = function() {
	return new motion_easing_BounceEaseOut();
};
var motion_easing_BounceEaseOut = function() {
};
$hxClasses["motion.easing.BounceEaseOut"] = motion_easing_BounceEaseOut;
motion_easing_BounceEaseOut.__name__ = ["motion","easing","BounceEaseOut"];
motion_easing_BounceEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_BounceEaseOut._ease = function(t,b,c,d) {
	if((t /= d) < 0.363636363636363646) return c * (7.5625 * t * t) + b; else if(t < 0.727272727272727293) return c * (7.5625 * (t -= 0.545454545454545414) * t + .75) + b; else if(t < 0.909090909090909061) return c * (7.5625 * (t -= 0.818181818181818232) * t + .9375) + b; else return c * (7.5625 * (t -= 0.954545454545454586) * t + .984375) + b;
};
motion_easing_BounceEaseOut.prototype = {
	calculate: function(k) {
		return motion_easing_BounceEaseOut._ease(k,0,1,1);
	}
	,__class__: motion_easing_BounceEaseOut
};
var msignal_Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal_SlotList.NIL;
	this.priorityBased = false;
};
$hxClasses["msignal.Signal"] = msignal_Signal;
msignal_Signal.__name__ = ["msignal","Signal"];
msignal_Signal.prototype = {
	add: function(listener) {
		return this.registerListener(listener);
	}
	,addOnce: function(listener) {
		return this.registerListener(listener,true);
	}
	,addWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,false,priority);
	}
	,addOnceWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,true,priority);
	}
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
	}
	,removeAll: function() {
		this.slots = msignal_SlotList.NIL;
	}
	,registerListener: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		if(this.registrationPossible(listener,once)) {
			var newSlot = this.createSlot(listener,once,priority);
			if(!this.priorityBased && priority != 0) this.priorityBased = true;
			if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
			return newSlot;
		}
		return this.slots.find(listener);
	}
	,registrationPossible: function(listener,once) {
		if(!this.slots.nonEmpty) return true;
		var existingSlot = this.slots.find(listener);
		if(existingSlot == null) return true;
		if(existingSlot.once != once) throw new js__$Boot_HaxeError("You cannot addOnce() then add() the same listener without removing the relationship first.");
		return false;
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,get_numListeners: function() {
		return this.slots.get_length();
	}
	,__class__: msignal_Signal
	,__properties__: {get_numListeners:"get_numListeners"}
};
var msignal_Signal0 = function() {
	msignal_Signal.call(this);
};
$hxClasses["msignal.Signal0"] = msignal_Signal0;
msignal_Signal0.__name__ = ["msignal","Signal0"];
msignal_Signal0.__super__ = msignal_Signal;
msignal_Signal0.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function() {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute();
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot0(this,listener,once,priority);
	}
	,__class__: msignal_Signal0
});
var msignal_Signal1 = function(type) {
	msignal_Signal.call(this,[type]);
};
$hxClasses["msignal.Signal1"] = msignal_Signal1;
msignal_Signal1.__name__ = ["msignal","Signal1"];
msignal_Signal1.__super__ = msignal_Signal;
msignal_Signal1.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot1(this,listener,once,priority);
	}
	,__class__: msignal_Signal1
});
var msignal_Signal2 = function(type1,type2) {
	msignal_Signal.call(this,[type1,type2]);
};
$hxClasses["msignal.Signal2"] = msignal_Signal2;
msignal_Signal2.__name__ = ["msignal","Signal2"];
msignal_Signal2.__super__ = msignal_Signal;
msignal_Signal2.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value1,value2) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value1,value2);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot2(this,listener,once,priority);
	}
	,__class__: msignal_Signal2
});
var msignal_Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
$hxClasses["msignal.Slot"] = msignal_Slot;
msignal_Slot.__name__ = ["msignal","Slot"];
msignal_Slot.prototype = {
	remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		if(value == null) throw new js__$Boot_HaxeError("listener cannot be null");
		return this.listener = value;
	}
	,__class__: msignal_Slot
	,__properties__: {set_listener:"set_listener"}
};
var msignal_Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot0"] = msignal_Slot0;
msignal_Slot0.__name__ = ["msignal","Slot0"];
msignal_Slot0.__super__ = msignal_Slot;
msignal_Slot0.prototype = $extend(msignal_Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
	,__class__: msignal_Slot0
});
var msignal_Slot1 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot1"] = msignal_Slot1;
msignal_Slot1.__name__ = ["msignal","Slot1"];
msignal_Slot1.__super__ = msignal_Slot;
msignal_Slot1.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param != null) value1 = this.param;
		this.listener(value1);
	}
	,__class__: msignal_Slot1
});
var msignal_Slot2 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot2"] = msignal_Slot2;
msignal_Slot2.__name__ = ["msignal","Slot2"];
msignal_Slot2.__super__ = msignal_Slot;
msignal_Slot2.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1,value2) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param1 != null) value1 = this.param1;
		if(this.param2 != null) value2 = this.param2;
		this.listener(value1,value2);
	}
	,__class__: msignal_Slot2
});
var msignal_SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) {
		if(msignal_SlotList.NIL != null) throw new js__$Boot_HaxeError("Parameters head and tail are null. Use the NIL element instead.");
		this.nonEmpty = false;
	} else if(head == null) throw new js__$Boot_HaxeError("Parameter head cannot be null."); else {
		this.head = head;
		if(tail == null) this.tail = msignal_SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
$hxClasses["msignal.SlotList"] = msignal_SlotList;
msignal_SlotList.__name__ = ["msignal","SlotList"];
msignal_SlotList.prototype = {
	get_length: function() {
		if(!this.nonEmpty) return 0;
		if(this.tail == msignal_SlotList.NIL) return 1;
		var result = 0;
		var p = this;
		while(p.nonEmpty) {
			++result;
			p = p.tail;
		}
		return result;
	}
	,prepend: function(slot) {
		return new msignal_SlotList(slot,this);
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		return this;
	}
	,find: function(listener) {
		if(!this.nonEmpty) return null;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
			p = p.tail;
		}
		return null;
	}
	,__class__: msignal_SlotList
	,__properties__: {get_length:"get_length"}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
msignal_SlotList.NIL = new msignal_SlotList(null,null);
AssetsList.LIST = ["assets/resolutions.json","assets/audio/applause.mp3","assets/audio/nice.mp3","assets/audio/touch.mp3","assets/audio/uhoh.mp3","assets/audio/wow.mp3","assets/1024x648/@1x/backgrounds/bg.jpg","assets/1024x648/@1x/backgrounds/restaurant.png","assets/1024x648/@1x/backgrounds/school.png","assets/1024x648/@1x/backgrounds/weather.png","assets/1024x648/@1x/categories/education.png","assets/1024x648/@1x/categories/pokeman.png","assets/1024x648/@1x/categories/random.png","assets/1024x648/@1x/categories/social.png","assets/1024x648/@1x/menu/button_12-tiles.png","assets/1024x648/@1x/menu/button_24-tiles.png","assets/1024x648/@1x/menu/button_48-tiles.png","assets/1024x648/@1x/menu/button_6-tiles.png","assets/1024x648/@1x/preloader/logo.png","assets/1024x648/@1x/quickmenu/back.png","assets/1024x648/@1x/quickmenu/home.png","assets/1024x648/@1x/tiles/tile.png","assets/1024x648/@2x/backgrounds/bg.jpg","assets/1024x648/@2x/backgrounds/restaurant.png","assets/1024x648/@2x/backgrounds/school.png","assets/1024x648/@2x/backgrounds/weather.png","assets/1024x648/@2x/categories/education.png","assets/1024x648/@2x/categories/pokeman.png","assets/1024x648/@2x/categories/random.png","assets/1024x648/@2x/categories/social.png","assets/1024x648/@2x/menu/button_12-tiles.png","assets/1024x648/@2x/menu/button_24-tiles.png","assets/1024x648/@2x/menu/button_48-tiles.png","assets/1024x648/@2x/menu/button_6-tiles.png","assets/1024x648/@2x/preloader/logo.png","assets/1024x648/@2x/quickmenu/back.png","assets/1024x648/@2x/quickmenu/home.png","assets/1024x648/@2x/tiles/tile.png","assets/480x320/@1x/backgrounds/bg.jpg","assets/480x320/@1x/backgrounds/restaurant.png","assets/480x320/@1x/backgrounds/school.png","assets/480x320/@1x/backgrounds/weather.png","assets/480x320/@1x/categories/education.png","assets/480x320/@1x/categories/pokeman.png","assets/480x320/@1x/categories/random.png","assets/480x320/@1x/categories/social.png","assets/480x320/@1x/menu/button_12-tiles.png","assets/480x320/@1x/menu/button_24-tiles.png","assets/480x320/@1x/menu/button_48-tiles.png","assets/480x320/@1x/menu/button_6-tiles.png","assets/480x320/@1x/preloader/logo.png","assets/480x320/@1x/quickmenu/back.png","assets/480x320/@1x/quickmenu/home.png","assets/480x320/@1x/tiles/tile.png","assets/480x320/@2x/backgrounds/bg.jpg","assets/480x320/@2x/backgrounds/restaurant.png","assets/480x320/@2x/backgrounds/school.png","assets/480x320/@2x/backgrounds/weather.png","assets/480x320/@2x/categories/education.png","assets/480x320/@2x/categories/pokeman.png","assets/480x320/@2x/categories/random.png","assets/480x320/@2x/categories/social.png","assets/480x320/@2x/menu/button_12-tiles.png","assets/480x320/@2x/menu/button_24-tiles.png","assets/480x320/@2x/menu/button_48-tiles.png","assets/480x320/@2x/menu/button_6-tiles.png","assets/480x320/@2x/preloader/logo.png","assets/480x320/@2x/quickmenu/back.png","assets/480x320/@2x/quickmenu/home.png","assets/480x320/@2x/tiles/tile.png","assets/728x392/@1x/backgrounds/bg.jpg","assets/728x392/@1x/backgrounds/restaurant.png","assets/728x392/@1x/backgrounds/school.png","assets/728x392/@1x/backgrounds/weather.png","assets/728x392/@1x/categories/education.png","assets/728x392/@1x/categories/pokeman.png","assets/728x392/@1x/categories/random.png","assets/728x392/@1x/categories/social.png","assets/728x392/@1x/menu/button_12-tiles.png","assets/728x392/@1x/menu/button_24-tiles.png","assets/728x392/@1x/menu/button_48-tiles.png","assets/728x392/@1x/menu/button_6-tiles.png","assets/728x392/@1x/preloader/logo.png","assets/728x392/@1x/quickmenu/back.png","assets/728x392/@1x/quickmenu/home.png","assets/728x392/@1x/tiles/tile.png","assets/728x392/@2x/backgrounds/bg.jpg","assets/728x392/@2x/backgrounds/restaurant.png","assets/728x392/@2x/backgrounds/school.png","assets/728x392/@2x/backgrounds/weather.png","assets/728x392/@2x/categories/education.png","assets/728x392/@2x/categories/pokeman.png","assets/728x392/@2x/categories/random.png","assets/728x392/@2x/categories/social.png","assets/728x392/@2x/menu/button_12-tiles.png","assets/728x392/@2x/menu/button_24-tiles.png","assets/728x392/@2x/menu/button_48-tiles.png","assets/728x392/@2x/menu/button_6-tiles.png","assets/728x392/@2x/preloader/logo.png","assets/728x392/@2x/quickmenu/back.png","assets/728x392/@2x/quickmenu/home.png","assets/728x392/@2x/tiles/tile.png","assets/1024x648/@1x/tiles/education/icon1.png","assets/1024x648/@1x/tiles/education/icon10.png","assets/1024x648/@1x/tiles/education/icon11.png","assets/1024x648/@1x/tiles/education/icon12.png","assets/1024x648/@1x/tiles/education/icon13.png","assets/1024x648/@1x/tiles/education/icon14.png","assets/1024x648/@1x/tiles/education/icon15.png","assets/1024x648/@1x/tiles/education/icon16.png","assets/1024x648/@1x/tiles/education/icon17.png","assets/1024x648/@1x/tiles/education/icon18.png","assets/1024x648/@1x/tiles/education/icon19.png","assets/1024x648/@1x/tiles/education/icon2.png","assets/1024x648/@1x/tiles/education/icon20.png","assets/1024x648/@1x/tiles/education/icon21.png","assets/1024x648/@1x/tiles/education/icon22.png","assets/1024x648/@1x/tiles/education/icon23.png","assets/1024x648/@1x/tiles/education/icon24.png","assets/1024x648/@1x/tiles/education/icon25.png","assets/1024x648/@1x/tiles/education/icon26.png","assets/1024x648/@1x/tiles/education/icon27.png","assets/1024x648/@1x/tiles/education/icon28.png","assets/1024x648/@1x/tiles/education/icon29.png","assets/1024x648/@1x/tiles/education/icon3.png","assets/1024x648/@1x/tiles/education/icon30.png","assets/1024x648/@1x/tiles/education/icon31.png","assets/1024x648/@1x/tiles/education/icon32.png","assets/1024x648/@1x/tiles/education/icon4.png","assets/1024x648/@1x/tiles/education/icon5.png","assets/1024x648/@1x/tiles/education/icon6.png","assets/1024x648/@1x/tiles/education/icon7.png","assets/1024x648/@1x/tiles/education/icon8.png","assets/1024x648/@1x/tiles/education/icon9.png","assets/1024x648/@1x/tiles/pokeman/icon1.png","assets/1024x648/@1x/tiles/pokeman/icon10.png","assets/1024x648/@1x/tiles/pokeman/icon11.png","assets/1024x648/@1x/tiles/pokeman/icon12.png","assets/1024x648/@1x/tiles/pokeman/icon13.png","assets/1024x648/@1x/tiles/pokeman/icon14.png","assets/1024x648/@1x/tiles/pokeman/icon15.png","assets/1024x648/@1x/tiles/pokeman/icon16.png","assets/1024x648/@1x/tiles/pokeman/icon17.png","assets/1024x648/@1x/tiles/pokeman/icon18.png","assets/1024x648/@1x/tiles/pokeman/icon19.png","assets/1024x648/@1x/tiles/pokeman/icon2.png","assets/1024x648/@1x/tiles/pokeman/icon20.png","assets/1024x648/@1x/tiles/pokeman/icon21.png","assets/1024x648/@1x/tiles/pokeman/icon22.png","assets/1024x648/@1x/tiles/pokeman/icon23.png","assets/1024x648/@1x/tiles/pokeman/icon24.png","assets/1024x648/@1x/tiles/pokeman/icon25.png","assets/1024x648/@1x/tiles/pokeman/icon26.png","assets/1024x648/@1x/tiles/pokeman/icon27.png","assets/1024x648/@1x/tiles/pokeman/icon28.png","assets/1024x648/@1x/tiles/pokeman/icon29.png","assets/1024x648/@1x/tiles/pokeman/icon3.png","assets/1024x648/@1x/tiles/pokeman/icon30.png","assets/1024x648/@1x/tiles/pokeman/icon31.png","assets/1024x648/@1x/tiles/pokeman/icon32.png","assets/1024x648/@1x/tiles/pokeman/icon33.png","assets/1024x648/@1x/tiles/pokeman/icon34.png","assets/1024x648/@1x/tiles/pokeman/icon35.png","assets/1024x648/@1x/tiles/pokeman/icon36.png","assets/1024x648/@1x/tiles/pokeman/icon37.png","assets/1024x648/@1x/tiles/pokeman/icon38.png","assets/1024x648/@1x/tiles/pokeman/icon39.png","assets/1024x648/@1x/tiles/pokeman/icon4.png","assets/1024x648/@1x/tiles/pokeman/icon40.png","assets/1024x648/@1x/tiles/pokeman/icon41.png","assets/1024x648/@1x/tiles/pokeman/icon42.png","assets/1024x648/@1x/tiles/pokeman/icon43.png","assets/1024x648/@1x/tiles/pokeman/icon44.png","assets/1024x648/@1x/tiles/pokeman/icon45.png","assets/1024x648/@1x/tiles/pokeman/icon46.png","assets/1024x648/@1x/tiles/pokeman/icon47.png","assets/1024x648/@1x/tiles/pokeman/icon48.png","assets/1024x648/@1x/tiles/pokeman/icon49.png","assets/1024x648/@1x/tiles/pokeman/icon5.png","assets/1024x648/@1x/tiles/pokeman/icon50.png","assets/1024x648/@1x/tiles/pokeman/icon51.png","assets/1024x648/@1x/tiles/pokeman/icon52.png","assets/1024x648/@1x/tiles/pokeman/icon53.png","assets/1024x648/@1x/tiles/pokeman/icon54.png","assets/1024x648/@1x/tiles/pokeman/icon55.png","assets/1024x648/@1x/tiles/pokeman/icon56.png","assets/1024x648/@1x/tiles/pokeman/icon57.png","assets/1024x648/@1x/tiles/pokeman/icon58.png","assets/1024x648/@1x/tiles/pokeman/icon59.png","assets/1024x648/@1x/tiles/pokeman/icon6.png","assets/1024x648/@1x/tiles/pokeman/icon60.png","assets/1024x648/@1x/tiles/pokeman/icon61.png","assets/1024x648/@1x/tiles/pokeman/icon62.png","assets/1024x648/@1x/tiles/pokeman/icon63.png","assets/1024x648/@1x/tiles/pokeman/icon64.png","assets/1024x648/@1x/tiles/pokeman/icon65.png","assets/1024x648/@1x/tiles/pokeman/icon66.png","assets/1024x648/@1x/tiles/pokeman/icon67.png","assets/1024x648/@1x/tiles/pokeman/icon68.png","assets/1024x648/@1x/tiles/pokeman/icon69.png","assets/1024x648/@1x/tiles/pokeman/icon7.png","assets/1024x648/@1x/tiles/pokeman/icon70.png","assets/1024x648/@1x/tiles/pokeman/icon71.png","assets/1024x648/@1x/tiles/pokeman/icon72.png","assets/1024x648/@1x/tiles/pokeman/icon73.png","assets/1024x648/@1x/tiles/pokeman/icon74.png","assets/1024x648/@1x/tiles/pokeman/icon75.png","assets/1024x648/@1x/tiles/pokeman/icon76.png","assets/1024x648/@1x/tiles/pokeman/icon77.png","assets/1024x648/@1x/tiles/pokeman/icon78.png","assets/1024x648/@1x/tiles/pokeman/icon79.png","assets/1024x648/@1x/tiles/pokeman/icon8.png","assets/1024x648/@1x/tiles/pokeman/icon80.png","assets/1024x648/@1x/tiles/pokeman/icon81.png","assets/1024x648/@1x/tiles/pokeman/icon82.png","assets/1024x648/@1x/tiles/pokeman/icon83.png","assets/1024x648/@1x/tiles/pokeman/icon84.png","assets/1024x648/@1x/tiles/pokeman/icon85.png","assets/1024x648/@1x/tiles/pokeman/icon86.png","assets/1024x648/@1x/tiles/pokeman/icon87.png","assets/1024x648/@1x/tiles/pokeman/icon88.png","assets/1024x648/@1x/tiles/pokeman/icon89.png","assets/1024x648/@1x/tiles/pokeman/icon9.png","assets/1024x648/@1x/tiles/pokeman/icon90.png","assets/1024x648/@1x/tiles/pokeman/icon91.png","assets/1024x648/@1x/tiles/pokeman/icon92.png","assets/1024x648/@1x/tiles/pokeman/icon93.png","assets/1024x648/@1x/tiles/pokeman/icon94.png","assets/1024x648/@1x/tiles/pokeman/icon95.png","assets/1024x648/@1x/tiles/pokeman/icon96.png","assets/1024x648/@1x/tiles/pokeman/icon97.png","assets/1024x648/@1x/tiles/pokeman/icon98.png","assets/1024x648/@1x/tiles/pokeman/icon99.png","assets/1024x648/@1x/tiles/random/icon1.png","assets/1024x648/@1x/tiles/random/icon10.png","assets/1024x648/@1x/tiles/random/icon11.png","assets/1024x648/@1x/tiles/random/icon12.png","assets/1024x648/@1x/tiles/random/icon13.png","assets/1024x648/@1x/tiles/random/icon14.png","assets/1024x648/@1x/tiles/random/icon15.png","assets/1024x648/@1x/tiles/random/icon16.png","assets/1024x648/@1x/tiles/random/icon17.png","assets/1024x648/@1x/tiles/random/icon18.png","assets/1024x648/@1x/tiles/random/icon19.png","assets/1024x648/@1x/tiles/random/icon2.png","assets/1024x648/@1x/tiles/random/icon20.png","assets/1024x648/@1x/tiles/random/icon21.png","assets/1024x648/@1x/tiles/random/icon22.png","assets/1024x648/@1x/tiles/random/icon23.png","assets/1024x648/@1x/tiles/random/icon24.png","assets/1024x648/@1x/tiles/random/icon25.png","assets/1024x648/@1x/tiles/random/icon26.png","assets/1024x648/@1x/tiles/random/icon27.png","assets/1024x648/@1x/tiles/random/icon28.png","assets/1024x648/@1x/tiles/random/icon29.png","assets/1024x648/@1x/tiles/random/icon3.png","assets/1024x648/@1x/tiles/random/icon30.png","assets/1024x648/@1x/tiles/random/icon31.png","assets/1024x648/@1x/tiles/random/icon32.png","assets/1024x648/@1x/tiles/random/icon33.png","assets/1024x648/@1x/tiles/random/icon34.png","assets/1024x648/@1x/tiles/random/icon35.png","assets/1024x648/@1x/tiles/random/icon36.png","assets/1024x648/@1x/tiles/random/icon37.png","assets/1024x648/@1x/tiles/random/icon38.png","assets/1024x648/@1x/tiles/random/icon39.png","assets/1024x648/@1x/tiles/random/icon4.png","assets/1024x648/@1x/tiles/random/icon40.png","assets/1024x648/@1x/tiles/random/icon41.png","assets/1024x648/@1x/tiles/random/icon42.png","assets/1024x648/@1x/tiles/random/icon43.png","assets/1024x648/@1x/tiles/random/icon44.png","assets/1024x648/@1x/tiles/random/icon45.png","assets/1024x648/@1x/tiles/random/icon46.png","assets/1024x648/@1x/tiles/random/icon47.png","assets/1024x648/@1x/tiles/random/icon48.png","assets/1024x648/@1x/tiles/random/icon49.png","assets/1024x648/@1x/tiles/random/icon5.png","assets/1024x648/@1x/tiles/random/icon50.png","assets/1024x648/@1x/tiles/random/icon51.png","assets/1024x648/@1x/tiles/random/icon52.png","assets/1024x648/@1x/tiles/random/icon53.png","assets/1024x648/@1x/tiles/random/icon54.png","assets/1024x648/@1x/tiles/random/icon55.png","assets/1024x648/@1x/tiles/random/icon56.png","assets/1024x648/@1x/tiles/random/icon57.png","assets/1024x648/@1x/tiles/random/icon58.png","assets/1024x648/@1x/tiles/random/icon59.png","assets/1024x648/@1x/tiles/random/icon6.png","assets/1024x648/@1x/tiles/random/icon60.png","assets/1024x648/@1x/tiles/random/icon61.png","assets/1024x648/@1x/tiles/random/icon62.png","assets/1024x648/@1x/tiles/random/icon63.png","assets/1024x648/@1x/tiles/random/icon64.png","assets/1024x648/@1x/tiles/random/icon65.png","assets/1024x648/@1x/tiles/random/icon66.png","assets/1024x648/@1x/tiles/random/icon67.png","assets/1024x648/@1x/tiles/random/icon68.png","assets/1024x648/@1x/tiles/random/icon69.png","assets/1024x648/@1x/tiles/random/icon7.png","assets/1024x648/@1x/tiles/random/icon70.png","assets/1024x648/@1x/tiles/random/icon71.png","assets/1024x648/@1x/tiles/random/icon72.png","assets/1024x648/@1x/tiles/random/icon73.png","assets/1024x648/@1x/tiles/random/icon74.png","assets/1024x648/@1x/tiles/random/icon75.png","assets/1024x648/@1x/tiles/random/icon76.png","assets/1024x648/@1x/tiles/random/icon77.png","assets/1024x648/@1x/tiles/random/icon78.png","assets/1024x648/@1x/tiles/random/icon8.png","assets/1024x648/@1x/tiles/random/icon9.png","assets/1024x648/@1x/tiles/social/icon1.png","assets/1024x648/@1x/tiles/social/icon10.png","assets/1024x648/@1x/tiles/social/icon11.png","assets/1024x648/@1x/tiles/social/icon12.png","assets/1024x648/@1x/tiles/social/icon13.png","assets/1024x648/@1x/tiles/social/icon14.png","assets/1024x648/@1x/tiles/social/icon15.png","assets/1024x648/@1x/tiles/social/icon16.png","assets/1024x648/@1x/tiles/social/icon17.png","assets/1024x648/@1x/tiles/social/icon18.png","assets/1024x648/@1x/tiles/social/icon19.png","assets/1024x648/@1x/tiles/social/icon2.png","assets/1024x648/@1x/tiles/social/icon20.png","assets/1024x648/@1x/tiles/social/icon21.png","assets/1024x648/@1x/tiles/social/icon22.png","assets/1024x648/@1x/tiles/social/icon23.png","assets/1024x648/@1x/tiles/social/icon24.png","assets/1024x648/@1x/tiles/social/icon25.png","assets/1024x648/@1x/tiles/social/icon26.png","assets/1024x648/@1x/tiles/social/icon27.png","assets/1024x648/@1x/tiles/social/icon28.png","assets/1024x648/@1x/tiles/social/icon29.png","assets/1024x648/@1x/tiles/social/icon3.png","assets/1024x648/@1x/tiles/social/icon30.png","assets/1024x648/@1x/tiles/social/icon4.png","assets/1024x648/@1x/tiles/social/icon5.png","assets/1024x648/@1x/tiles/social/icon6.png","assets/1024x648/@1x/tiles/social/icon7.png","assets/1024x648/@1x/tiles/social/icon8.png","assets/1024x648/@1x/tiles/social/icon9.png","assets/1024x648/@2x/tiles/education/icon1.png","assets/1024x648/@2x/tiles/education/icon10.png","assets/1024x648/@2x/tiles/education/icon11.png","assets/1024x648/@2x/tiles/education/icon12.png","assets/1024x648/@2x/tiles/education/icon13.png","assets/1024x648/@2x/tiles/education/icon14.png","assets/1024x648/@2x/tiles/education/icon15.png","assets/1024x648/@2x/tiles/education/icon16.png","assets/1024x648/@2x/tiles/education/icon17.png","assets/1024x648/@2x/tiles/education/icon18.png","assets/1024x648/@2x/tiles/education/icon19.png","assets/1024x648/@2x/tiles/education/icon2.png","assets/1024x648/@2x/tiles/education/icon20.png","assets/1024x648/@2x/tiles/education/icon21.png","assets/1024x648/@2x/tiles/education/icon22.png","assets/1024x648/@2x/tiles/education/icon23.png","assets/1024x648/@2x/tiles/education/icon24.png","assets/1024x648/@2x/tiles/education/icon25.png","assets/1024x648/@2x/tiles/education/icon26.png","assets/1024x648/@2x/tiles/education/icon27.png","assets/1024x648/@2x/tiles/education/icon28.png","assets/1024x648/@2x/tiles/education/icon29.png","assets/1024x648/@2x/tiles/education/icon3.png","assets/1024x648/@2x/tiles/education/icon30.png","assets/1024x648/@2x/tiles/education/icon31.png","assets/1024x648/@2x/tiles/education/icon32.png","assets/1024x648/@2x/tiles/education/icon4.png","assets/1024x648/@2x/tiles/education/icon5.png","assets/1024x648/@2x/tiles/education/icon6.png","assets/1024x648/@2x/tiles/education/icon7.png","assets/1024x648/@2x/tiles/education/icon8.png","assets/1024x648/@2x/tiles/education/icon9.png","assets/1024x648/@2x/tiles/pokeman/icon1.png","assets/1024x648/@2x/tiles/pokeman/icon10.png","assets/1024x648/@2x/tiles/pokeman/icon11.png","assets/1024x648/@2x/tiles/pokeman/icon12.png","assets/1024x648/@2x/tiles/pokeman/icon13.png","assets/1024x648/@2x/tiles/pokeman/icon14.png","assets/1024x648/@2x/tiles/pokeman/icon15.png","assets/1024x648/@2x/tiles/pokeman/icon16.png","assets/1024x648/@2x/tiles/pokeman/icon17.png","assets/1024x648/@2x/tiles/pokeman/icon18.png","assets/1024x648/@2x/tiles/pokeman/icon19.png","assets/1024x648/@2x/tiles/pokeman/icon2.png","assets/1024x648/@2x/tiles/pokeman/icon20.png","assets/1024x648/@2x/tiles/pokeman/icon21.png","assets/1024x648/@2x/tiles/pokeman/icon22.png","assets/1024x648/@2x/tiles/pokeman/icon23.png","assets/1024x648/@2x/tiles/pokeman/icon24.png","assets/1024x648/@2x/tiles/pokeman/icon25.png","assets/1024x648/@2x/tiles/pokeman/icon26.png","assets/1024x648/@2x/tiles/pokeman/icon27.png","assets/1024x648/@2x/tiles/pokeman/icon28.png","assets/1024x648/@2x/tiles/pokeman/icon29.png","assets/1024x648/@2x/tiles/pokeman/icon3.png","assets/1024x648/@2x/tiles/pokeman/icon30.png","assets/1024x648/@2x/tiles/pokeman/icon31.png","assets/1024x648/@2x/tiles/pokeman/icon32.png","assets/1024x648/@2x/tiles/pokeman/icon33.png","assets/1024x648/@2x/tiles/pokeman/icon34.png","assets/1024x648/@2x/tiles/pokeman/icon35.png","assets/1024x648/@2x/tiles/pokeman/icon36.png","assets/1024x648/@2x/tiles/pokeman/icon37.png","assets/1024x648/@2x/tiles/pokeman/icon38.png","assets/1024x648/@2x/tiles/pokeman/icon39.png","assets/1024x648/@2x/tiles/pokeman/icon4.png","assets/1024x648/@2x/tiles/pokeman/icon40.png","assets/1024x648/@2x/tiles/pokeman/icon41.png","assets/1024x648/@2x/tiles/pokeman/icon42.png","assets/1024x648/@2x/tiles/pokeman/icon43.png","assets/1024x648/@2x/tiles/pokeman/icon44.png","assets/1024x648/@2x/tiles/pokeman/icon45.png","assets/1024x648/@2x/tiles/pokeman/icon46.png","assets/1024x648/@2x/tiles/pokeman/icon47.png","assets/1024x648/@2x/tiles/pokeman/icon48.png","assets/1024x648/@2x/tiles/pokeman/icon49.png","assets/1024x648/@2x/tiles/pokeman/icon5.png","assets/1024x648/@2x/tiles/pokeman/icon50.png","assets/1024x648/@2x/tiles/pokeman/icon51.png","assets/1024x648/@2x/tiles/pokeman/icon52.png","assets/1024x648/@2x/tiles/pokeman/icon53.png","assets/1024x648/@2x/tiles/pokeman/icon54.png","assets/1024x648/@2x/tiles/pokeman/icon55.png","assets/1024x648/@2x/tiles/pokeman/icon56.png","assets/1024x648/@2x/tiles/pokeman/icon57.png","assets/1024x648/@2x/tiles/pokeman/icon58.png","assets/1024x648/@2x/tiles/pokeman/icon59.png","assets/1024x648/@2x/tiles/pokeman/icon6.png","assets/1024x648/@2x/tiles/pokeman/icon60.png","assets/1024x648/@2x/tiles/pokeman/icon61.png","assets/1024x648/@2x/tiles/pokeman/icon62.png","assets/1024x648/@2x/tiles/pokeman/icon63.png","assets/1024x648/@2x/tiles/pokeman/icon64.png","assets/1024x648/@2x/tiles/pokeman/icon65.png","assets/1024x648/@2x/tiles/pokeman/icon66.png","assets/1024x648/@2x/tiles/pokeman/icon67.png","assets/1024x648/@2x/tiles/pokeman/icon68.png","assets/1024x648/@2x/tiles/pokeman/icon69.png","assets/1024x648/@2x/tiles/pokeman/icon7.png","assets/1024x648/@2x/tiles/pokeman/icon70.png","assets/1024x648/@2x/tiles/pokeman/icon71.png","assets/1024x648/@2x/tiles/pokeman/icon72.png","assets/1024x648/@2x/tiles/pokeman/icon73.png","assets/1024x648/@2x/tiles/pokeman/icon74.png","assets/1024x648/@2x/tiles/pokeman/icon75.png","assets/1024x648/@2x/tiles/pokeman/icon76.png","assets/1024x648/@2x/tiles/pokeman/icon77.png","assets/1024x648/@2x/tiles/pokeman/icon78.png","assets/1024x648/@2x/tiles/pokeman/icon79.png","assets/1024x648/@2x/tiles/pokeman/icon8.png","assets/1024x648/@2x/tiles/pokeman/icon80.png","assets/1024x648/@2x/tiles/pokeman/icon81.png","assets/1024x648/@2x/tiles/pokeman/icon82.png","assets/1024x648/@2x/tiles/pokeman/icon83.png","assets/1024x648/@2x/tiles/pokeman/icon84.png","assets/1024x648/@2x/tiles/pokeman/icon85.png","assets/1024x648/@2x/tiles/pokeman/icon86.png","assets/1024x648/@2x/tiles/pokeman/icon87.png","assets/1024x648/@2x/tiles/pokeman/icon88.png","assets/1024x648/@2x/tiles/pokeman/icon89.png","assets/1024x648/@2x/tiles/pokeman/icon9.png","assets/1024x648/@2x/tiles/pokeman/icon90.png","assets/1024x648/@2x/tiles/pokeman/icon91.png","assets/1024x648/@2x/tiles/pokeman/icon92.png","assets/1024x648/@2x/tiles/pokeman/icon93.png","assets/1024x648/@2x/tiles/pokeman/icon94.png","assets/1024x648/@2x/tiles/pokeman/icon95.png","assets/1024x648/@2x/tiles/pokeman/icon96.png","assets/1024x648/@2x/tiles/pokeman/icon97.png","assets/1024x648/@2x/tiles/pokeman/icon98.png","assets/1024x648/@2x/tiles/pokeman/icon99.png","assets/1024x648/@2x/tiles/random/icon1.png","assets/1024x648/@2x/tiles/random/icon10.png","assets/1024x648/@2x/tiles/random/icon11.png","assets/1024x648/@2x/tiles/random/icon12.png","assets/1024x648/@2x/tiles/random/icon13.png","assets/1024x648/@2x/tiles/random/icon14.png","assets/1024x648/@2x/tiles/random/icon15.png","assets/1024x648/@2x/tiles/random/icon16.png","assets/1024x648/@2x/tiles/random/icon17.png","assets/1024x648/@2x/tiles/random/icon18.png","assets/1024x648/@2x/tiles/random/icon19.png","assets/1024x648/@2x/tiles/random/icon2.png","assets/1024x648/@2x/tiles/random/icon20.png","assets/1024x648/@2x/tiles/random/icon21.png","assets/1024x648/@2x/tiles/random/icon22.png","assets/1024x648/@2x/tiles/random/icon23.png","assets/1024x648/@2x/tiles/random/icon24.png","assets/1024x648/@2x/tiles/random/icon25.png","assets/1024x648/@2x/tiles/random/icon26.png","assets/1024x648/@2x/tiles/random/icon27.png","assets/1024x648/@2x/tiles/random/icon28.png","assets/1024x648/@2x/tiles/random/icon29.png","assets/1024x648/@2x/tiles/random/icon3.png","assets/1024x648/@2x/tiles/random/icon30.png","assets/1024x648/@2x/tiles/random/icon31.png","assets/1024x648/@2x/tiles/random/icon32.png","assets/1024x648/@2x/tiles/random/icon33.png","assets/1024x648/@2x/tiles/random/icon34.png","assets/1024x648/@2x/tiles/random/icon35.png","assets/1024x648/@2x/tiles/random/icon36.png","assets/1024x648/@2x/tiles/random/icon37.png","assets/1024x648/@2x/tiles/random/icon38.png","assets/1024x648/@2x/tiles/random/icon39.png","assets/1024x648/@2x/tiles/random/icon4.png","assets/1024x648/@2x/tiles/random/icon40.png","assets/1024x648/@2x/tiles/random/icon41.png","assets/1024x648/@2x/tiles/random/icon42.png","assets/1024x648/@2x/tiles/random/icon43.png","assets/1024x648/@2x/tiles/random/icon44.png","assets/1024x648/@2x/tiles/random/icon45.png","assets/1024x648/@2x/tiles/random/icon46.png","assets/1024x648/@2x/tiles/random/icon47.png","assets/1024x648/@2x/tiles/random/icon48.png","assets/1024x648/@2x/tiles/random/icon49.png","assets/1024x648/@2x/tiles/random/icon5.png","assets/1024x648/@2x/tiles/random/icon50.png","assets/1024x648/@2x/tiles/random/icon51.png","assets/1024x648/@2x/tiles/random/icon52.png","assets/1024x648/@2x/tiles/random/icon53.png","assets/1024x648/@2x/tiles/random/icon54.png","assets/1024x648/@2x/tiles/random/icon55.png","assets/1024x648/@2x/tiles/random/icon56.png","assets/1024x648/@2x/tiles/random/icon57.png","assets/1024x648/@2x/tiles/random/icon58.png","assets/1024x648/@2x/tiles/random/icon59.png","assets/1024x648/@2x/tiles/random/icon6.png","assets/1024x648/@2x/tiles/random/icon60.png","assets/1024x648/@2x/tiles/random/icon61.png","assets/1024x648/@2x/tiles/random/icon62.png","assets/1024x648/@2x/tiles/random/icon63.png","assets/1024x648/@2x/tiles/random/icon64.png","assets/1024x648/@2x/tiles/random/icon65.png","assets/1024x648/@2x/tiles/random/icon66.png","assets/1024x648/@2x/tiles/random/icon67.png","assets/1024x648/@2x/tiles/random/icon68.png","assets/1024x648/@2x/tiles/random/icon69.png","assets/1024x648/@2x/tiles/random/icon7.png","assets/1024x648/@2x/tiles/random/icon70.png","assets/1024x648/@2x/tiles/random/icon71.png","assets/1024x648/@2x/tiles/random/icon72.png","assets/1024x648/@2x/tiles/random/icon73.png","assets/1024x648/@2x/tiles/random/icon74.png","assets/1024x648/@2x/tiles/random/icon75.png","assets/1024x648/@2x/tiles/random/icon76.png","assets/1024x648/@2x/tiles/random/icon77.png","assets/1024x648/@2x/tiles/random/icon78.png","assets/1024x648/@2x/tiles/random/icon8.png","assets/1024x648/@2x/tiles/random/icon9.png","assets/1024x648/@2x/tiles/social/icon1.png","assets/1024x648/@2x/tiles/social/icon10.png","assets/1024x648/@2x/tiles/social/icon11.png","assets/1024x648/@2x/tiles/social/icon12.png","assets/1024x648/@2x/tiles/social/icon13.png","assets/1024x648/@2x/tiles/social/icon14.png","assets/1024x648/@2x/tiles/social/icon15.png","assets/1024x648/@2x/tiles/social/icon16.png","assets/1024x648/@2x/tiles/social/icon17.png","assets/1024x648/@2x/tiles/social/icon18.png","assets/1024x648/@2x/tiles/social/icon19.png","assets/1024x648/@2x/tiles/social/icon2.png","assets/1024x648/@2x/tiles/social/icon20.png","assets/1024x648/@2x/tiles/social/icon21.png","assets/1024x648/@2x/tiles/social/icon22.png","assets/1024x648/@2x/tiles/social/icon23.png","assets/1024x648/@2x/tiles/social/icon24.png","assets/1024x648/@2x/tiles/social/icon25.png","assets/1024x648/@2x/tiles/social/icon26.png","assets/1024x648/@2x/tiles/social/icon27.png","assets/1024x648/@2x/tiles/social/icon28.png","assets/1024x648/@2x/tiles/social/icon29.png","assets/1024x648/@2x/tiles/social/icon3.png","assets/1024x648/@2x/tiles/social/icon30.png","assets/1024x648/@2x/tiles/social/icon4.png","assets/1024x648/@2x/tiles/social/icon5.png","assets/1024x648/@2x/tiles/social/icon6.png","assets/1024x648/@2x/tiles/social/icon7.png","assets/1024x648/@2x/tiles/social/icon8.png","assets/1024x648/@2x/tiles/social/icon9.png","assets/480x320/@1x/tiles/education/icon1.png","assets/480x320/@1x/tiles/education/icon10.png","assets/480x320/@1x/tiles/education/icon11.png","assets/480x320/@1x/tiles/education/icon12.png","assets/480x320/@1x/tiles/education/icon13.png","assets/480x320/@1x/tiles/education/icon14.png","assets/480x320/@1x/tiles/education/icon15.png","assets/480x320/@1x/tiles/education/icon16.png","assets/480x320/@1x/tiles/education/icon17.png","assets/480x320/@1x/tiles/education/icon18.png","assets/480x320/@1x/tiles/education/icon19.png","assets/480x320/@1x/tiles/education/icon2.png","assets/480x320/@1x/tiles/education/icon20.png","assets/480x320/@1x/tiles/education/icon21.png","assets/480x320/@1x/tiles/education/icon22.png","assets/480x320/@1x/tiles/education/icon23.png","assets/480x320/@1x/tiles/education/icon24.png","assets/480x320/@1x/tiles/education/icon25.png","assets/480x320/@1x/tiles/education/icon26.png","assets/480x320/@1x/tiles/education/icon27.png","assets/480x320/@1x/tiles/education/icon28.png","assets/480x320/@1x/tiles/education/icon29.png","assets/480x320/@1x/tiles/education/icon3.png","assets/480x320/@1x/tiles/education/icon30.png","assets/480x320/@1x/tiles/education/icon31.png","assets/480x320/@1x/tiles/education/icon32.png","assets/480x320/@1x/tiles/education/icon4.png","assets/480x320/@1x/tiles/education/icon5.png","assets/480x320/@1x/tiles/education/icon6.png","assets/480x320/@1x/tiles/education/icon7.png","assets/480x320/@1x/tiles/education/icon8.png","assets/480x320/@1x/tiles/education/icon9.png","assets/480x320/@1x/tiles/pokeman/icon1.png","assets/480x320/@1x/tiles/pokeman/icon10.png","assets/480x320/@1x/tiles/pokeman/icon11.png","assets/480x320/@1x/tiles/pokeman/icon12.png","assets/480x320/@1x/tiles/pokeman/icon13.png","assets/480x320/@1x/tiles/pokeman/icon14.png","assets/480x320/@1x/tiles/pokeman/icon15.png","assets/480x320/@1x/tiles/pokeman/icon16.png","assets/480x320/@1x/tiles/pokeman/icon17.png","assets/480x320/@1x/tiles/pokeman/icon18.png","assets/480x320/@1x/tiles/pokeman/icon19.png","assets/480x320/@1x/tiles/pokeman/icon2.png","assets/480x320/@1x/tiles/pokeman/icon20.png","assets/480x320/@1x/tiles/pokeman/icon21.png","assets/480x320/@1x/tiles/pokeman/icon22.png","assets/480x320/@1x/tiles/pokeman/icon23.png","assets/480x320/@1x/tiles/pokeman/icon24.png","assets/480x320/@1x/tiles/pokeman/icon25.png","assets/480x320/@1x/tiles/pokeman/icon26.png","assets/480x320/@1x/tiles/pokeman/icon27.png","assets/480x320/@1x/tiles/pokeman/icon28.png","assets/480x320/@1x/tiles/pokeman/icon29.png","assets/480x320/@1x/tiles/pokeman/icon3.png","assets/480x320/@1x/tiles/pokeman/icon30.png","assets/480x320/@1x/tiles/pokeman/icon31.png","assets/480x320/@1x/tiles/pokeman/icon32.png","assets/480x320/@1x/tiles/pokeman/icon33.png","assets/480x320/@1x/tiles/pokeman/icon34.png","assets/480x320/@1x/tiles/pokeman/icon35.png","assets/480x320/@1x/tiles/pokeman/icon36.png","assets/480x320/@1x/tiles/pokeman/icon37.png","assets/480x320/@1x/tiles/pokeman/icon38.png","assets/480x320/@1x/tiles/pokeman/icon39.png","assets/480x320/@1x/tiles/pokeman/icon4.png","assets/480x320/@1x/tiles/pokeman/icon40.png","assets/480x320/@1x/tiles/pokeman/icon41.png","assets/480x320/@1x/tiles/pokeman/icon42.png","assets/480x320/@1x/tiles/pokeman/icon43.png","assets/480x320/@1x/tiles/pokeman/icon44.png","assets/480x320/@1x/tiles/pokeman/icon45.png","assets/480x320/@1x/tiles/pokeman/icon46.png","assets/480x320/@1x/tiles/pokeman/icon47.png","assets/480x320/@1x/tiles/pokeman/icon48.png","assets/480x320/@1x/tiles/pokeman/icon49.png","assets/480x320/@1x/tiles/pokeman/icon5.png","assets/480x320/@1x/tiles/pokeman/icon50.png","assets/480x320/@1x/tiles/pokeman/icon51.png","assets/480x320/@1x/tiles/pokeman/icon52.png","assets/480x320/@1x/tiles/pokeman/icon53.png","assets/480x320/@1x/tiles/pokeman/icon54.png","assets/480x320/@1x/tiles/pokeman/icon55.png","assets/480x320/@1x/tiles/pokeman/icon56.png","assets/480x320/@1x/tiles/pokeman/icon57.png","assets/480x320/@1x/tiles/pokeman/icon58.png","assets/480x320/@1x/tiles/pokeman/icon59.png","assets/480x320/@1x/tiles/pokeman/icon6.png","assets/480x320/@1x/tiles/pokeman/icon60.png","assets/480x320/@1x/tiles/pokeman/icon61.png","assets/480x320/@1x/tiles/pokeman/icon62.png","assets/480x320/@1x/tiles/pokeman/icon63.png","assets/480x320/@1x/tiles/pokeman/icon64.png","assets/480x320/@1x/tiles/pokeman/icon65.png","assets/480x320/@1x/tiles/pokeman/icon66.png","assets/480x320/@1x/tiles/pokeman/icon67.png","assets/480x320/@1x/tiles/pokeman/icon68.png","assets/480x320/@1x/tiles/pokeman/icon69.png","assets/480x320/@1x/tiles/pokeman/icon7.png","assets/480x320/@1x/tiles/pokeman/icon70.png","assets/480x320/@1x/tiles/pokeman/icon71.png","assets/480x320/@1x/tiles/pokeman/icon72.png","assets/480x320/@1x/tiles/pokeman/icon73.png","assets/480x320/@1x/tiles/pokeman/icon74.png","assets/480x320/@1x/tiles/pokeman/icon75.png","assets/480x320/@1x/tiles/pokeman/icon76.png","assets/480x320/@1x/tiles/pokeman/icon77.png","assets/480x320/@1x/tiles/pokeman/icon78.png","assets/480x320/@1x/tiles/pokeman/icon79.png","assets/480x320/@1x/tiles/pokeman/icon8.png","assets/480x320/@1x/tiles/pokeman/icon80.png","assets/480x320/@1x/tiles/pokeman/icon81.png","assets/480x320/@1x/tiles/pokeman/icon82.png","assets/480x320/@1x/tiles/pokeman/icon83.png","assets/480x320/@1x/tiles/pokeman/icon84.png","assets/480x320/@1x/tiles/pokeman/icon85.png","assets/480x320/@1x/tiles/pokeman/icon86.png","assets/480x320/@1x/tiles/pokeman/icon87.png","assets/480x320/@1x/tiles/pokeman/icon88.png","assets/480x320/@1x/tiles/pokeman/icon89.png","assets/480x320/@1x/tiles/pokeman/icon9.png","assets/480x320/@1x/tiles/pokeman/icon90.png","assets/480x320/@1x/tiles/pokeman/icon91.png","assets/480x320/@1x/tiles/pokeman/icon92.png","assets/480x320/@1x/tiles/pokeman/icon93.png","assets/480x320/@1x/tiles/pokeman/icon94.png","assets/480x320/@1x/tiles/pokeman/icon95.png","assets/480x320/@1x/tiles/pokeman/icon96.png","assets/480x320/@1x/tiles/pokeman/icon97.png","assets/480x320/@1x/tiles/pokeman/icon98.png","assets/480x320/@1x/tiles/pokeman/icon99.png","assets/480x320/@1x/tiles/random/icon1.png","assets/480x320/@1x/tiles/random/icon10.png","assets/480x320/@1x/tiles/random/icon11.png","assets/480x320/@1x/tiles/random/icon12.png","assets/480x320/@1x/tiles/random/icon13.png","assets/480x320/@1x/tiles/random/icon14.png","assets/480x320/@1x/tiles/random/icon15.png","assets/480x320/@1x/tiles/random/icon16.png","assets/480x320/@1x/tiles/random/icon17.png","assets/480x320/@1x/tiles/random/icon18.png","assets/480x320/@1x/tiles/random/icon19.png","assets/480x320/@1x/tiles/random/icon2.png","assets/480x320/@1x/tiles/random/icon20.png","assets/480x320/@1x/tiles/random/icon21.png","assets/480x320/@1x/tiles/random/icon22.png","assets/480x320/@1x/tiles/random/icon23.png","assets/480x320/@1x/tiles/random/icon24.png","assets/480x320/@1x/tiles/random/icon25.png","assets/480x320/@1x/tiles/random/icon26.png","assets/480x320/@1x/tiles/random/icon27.png","assets/480x320/@1x/tiles/random/icon28.png","assets/480x320/@1x/tiles/random/icon29.png","assets/480x320/@1x/tiles/random/icon3.png","assets/480x320/@1x/tiles/random/icon30.png","assets/480x320/@1x/tiles/random/icon31.png","assets/480x320/@1x/tiles/random/icon32.png","assets/480x320/@1x/tiles/random/icon33.png","assets/480x320/@1x/tiles/random/icon34.png","assets/480x320/@1x/tiles/random/icon35.png","assets/480x320/@1x/tiles/random/icon36.png","assets/480x320/@1x/tiles/random/icon37.png","assets/480x320/@1x/tiles/random/icon38.png","assets/480x320/@1x/tiles/random/icon39.png","assets/480x320/@1x/tiles/random/icon4.png","assets/480x320/@1x/tiles/random/icon40.png","assets/480x320/@1x/tiles/random/icon41.png","assets/480x320/@1x/tiles/random/icon42.png","assets/480x320/@1x/tiles/random/icon43.png","assets/480x320/@1x/tiles/random/icon44.png","assets/480x320/@1x/tiles/random/icon45.png","assets/480x320/@1x/tiles/random/icon46.png","assets/480x320/@1x/tiles/random/icon47.png","assets/480x320/@1x/tiles/random/icon48.png","assets/480x320/@1x/tiles/random/icon49.png","assets/480x320/@1x/tiles/random/icon5.png","assets/480x320/@1x/tiles/random/icon50.png","assets/480x320/@1x/tiles/random/icon51.png","assets/480x320/@1x/tiles/random/icon52.png","assets/480x320/@1x/tiles/random/icon53.png","assets/480x320/@1x/tiles/random/icon54.png","assets/480x320/@1x/tiles/random/icon55.png","assets/480x320/@1x/tiles/random/icon56.png","assets/480x320/@1x/tiles/random/icon57.png","assets/480x320/@1x/tiles/random/icon58.png","assets/480x320/@1x/tiles/random/icon59.png","assets/480x320/@1x/tiles/random/icon6.png","assets/480x320/@1x/tiles/random/icon60.png","assets/480x320/@1x/tiles/random/icon61.png","assets/480x320/@1x/tiles/random/icon62.png","assets/480x320/@1x/tiles/random/icon63.png","assets/480x320/@1x/tiles/random/icon64.png","assets/480x320/@1x/tiles/random/icon65.png","assets/480x320/@1x/tiles/random/icon66.png","assets/480x320/@1x/tiles/random/icon67.png","assets/480x320/@1x/tiles/random/icon68.png","assets/480x320/@1x/tiles/random/icon69.png","assets/480x320/@1x/tiles/random/icon7.png","assets/480x320/@1x/tiles/random/icon70.png","assets/480x320/@1x/tiles/random/icon71.png","assets/480x320/@1x/tiles/random/icon72.png","assets/480x320/@1x/tiles/random/icon73.png","assets/480x320/@1x/tiles/random/icon74.png","assets/480x320/@1x/tiles/random/icon75.png","assets/480x320/@1x/tiles/random/icon76.png","assets/480x320/@1x/tiles/random/icon77.png","assets/480x320/@1x/tiles/random/icon78.png","assets/480x320/@1x/tiles/random/icon8.png","assets/480x320/@1x/tiles/random/icon9.png","assets/480x320/@1x/tiles/social/icon1.png","assets/480x320/@1x/tiles/social/icon10.png","assets/480x320/@1x/tiles/social/icon11.png","assets/480x320/@1x/tiles/social/icon12.png","assets/480x320/@1x/tiles/social/icon13.png","assets/480x320/@1x/tiles/social/icon14.png","assets/480x320/@1x/tiles/social/icon15.png","assets/480x320/@1x/tiles/social/icon16.png","assets/480x320/@1x/tiles/social/icon17.png","assets/480x320/@1x/tiles/social/icon18.png","assets/480x320/@1x/tiles/social/icon19.png","assets/480x320/@1x/tiles/social/icon2.png","assets/480x320/@1x/tiles/social/icon20.png","assets/480x320/@1x/tiles/social/icon21.png","assets/480x320/@1x/tiles/social/icon22.png","assets/480x320/@1x/tiles/social/icon23.png","assets/480x320/@1x/tiles/social/icon24.png","assets/480x320/@1x/tiles/social/icon25.png","assets/480x320/@1x/tiles/social/icon26.png","assets/480x320/@1x/tiles/social/icon27.png","assets/480x320/@1x/tiles/social/icon28.png","assets/480x320/@1x/tiles/social/icon29.png","assets/480x320/@1x/tiles/social/icon3.png","assets/480x320/@1x/tiles/social/icon30.png","assets/480x320/@1x/tiles/social/icon4.png","assets/480x320/@1x/tiles/social/icon5.png","assets/480x320/@1x/tiles/social/icon6.png","assets/480x320/@1x/tiles/social/icon7.png","assets/480x320/@1x/tiles/social/icon8.png","assets/480x320/@1x/tiles/social/icon9.png","assets/480x320/@2x/tiles/education/icon1.png","assets/480x320/@2x/tiles/education/icon10.png","assets/480x320/@2x/tiles/education/icon11.png","assets/480x320/@2x/tiles/education/icon12.png","assets/480x320/@2x/tiles/education/icon13.png","assets/480x320/@2x/tiles/education/icon14.png","assets/480x320/@2x/tiles/education/icon15.png","assets/480x320/@2x/tiles/education/icon16.png","assets/480x320/@2x/tiles/education/icon17.png","assets/480x320/@2x/tiles/education/icon18.png","assets/480x320/@2x/tiles/education/icon19.png","assets/480x320/@2x/tiles/education/icon2.png","assets/480x320/@2x/tiles/education/icon20.png","assets/480x320/@2x/tiles/education/icon21.png","assets/480x320/@2x/tiles/education/icon22.png","assets/480x320/@2x/tiles/education/icon23.png","assets/480x320/@2x/tiles/education/icon24.png","assets/480x320/@2x/tiles/education/icon25.png","assets/480x320/@2x/tiles/education/icon26.png","assets/480x320/@2x/tiles/education/icon27.png","assets/480x320/@2x/tiles/education/icon28.png","assets/480x320/@2x/tiles/education/icon29.png","assets/480x320/@2x/tiles/education/icon3.png","assets/480x320/@2x/tiles/education/icon30.png","assets/480x320/@2x/tiles/education/icon31.png","assets/480x320/@2x/tiles/education/icon32.png","assets/480x320/@2x/tiles/education/icon4.png","assets/480x320/@2x/tiles/education/icon5.png","assets/480x320/@2x/tiles/education/icon6.png","assets/480x320/@2x/tiles/education/icon7.png","assets/480x320/@2x/tiles/education/icon8.png","assets/480x320/@2x/tiles/education/icon9.png","assets/480x320/@2x/tiles/pokeman/icon1.png","assets/480x320/@2x/tiles/pokeman/icon10.png","assets/480x320/@2x/tiles/pokeman/icon11.png","assets/480x320/@2x/tiles/pokeman/icon12.png","assets/480x320/@2x/tiles/pokeman/icon13.png","assets/480x320/@2x/tiles/pokeman/icon14.png","assets/480x320/@2x/tiles/pokeman/icon15.png","assets/480x320/@2x/tiles/pokeman/icon16.png","assets/480x320/@2x/tiles/pokeman/icon17.png","assets/480x320/@2x/tiles/pokeman/icon18.png","assets/480x320/@2x/tiles/pokeman/icon19.png","assets/480x320/@2x/tiles/pokeman/icon2.png","assets/480x320/@2x/tiles/pokeman/icon20.png","assets/480x320/@2x/tiles/pokeman/icon21.png","assets/480x320/@2x/tiles/pokeman/icon22.png","assets/480x320/@2x/tiles/pokeman/icon23.png","assets/480x320/@2x/tiles/pokeman/icon24.png","assets/480x320/@2x/tiles/pokeman/icon25.png","assets/480x320/@2x/tiles/pokeman/icon26.png","assets/480x320/@2x/tiles/pokeman/icon27.png","assets/480x320/@2x/tiles/pokeman/icon28.png","assets/480x320/@2x/tiles/pokeman/icon29.png","assets/480x320/@2x/tiles/pokeman/icon3.png","assets/480x320/@2x/tiles/pokeman/icon30.png","assets/480x320/@2x/tiles/pokeman/icon31.png","assets/480x320/@2x/tiles/pokeman/icon32.png","assets/480x320/@2x/tiles/pokeman/icon33.png","assets/480x320/@2x/tiles/pokeman/icon34.png","assets/480x320/@2x/tiles/pokeman/icon35.png","assets/480x320/@2x/tiles/pokeman/icon36.png","assets/480x320/@2x/tiles/pokeman/icon37.png","assets/480x320/@2x/tiles/pokeman/icon38.png","assets/480x320/@2x/tiles/pokeman/icon39.png","assets/480x320/@2x/tiles/pokeman/icon4.png","assets/480x320/@2x/tiles/pokeman/icon40.png","assets/480x320/@2x/tiles/pokeman/icon41.png","assets/480x320/@2x/tiles/pokeman/icon42.png","assets/480x320/@2x/tiles/pokeman/icon43.png","assets/480x320/@2x/tiles/pokeman/icon44.png","assets/480x320/@2x/tiles/pokeman/icon45.png","assets/480x320/@2x/tiles/pokeman/icon46.png","assets/480x320/@2x/tiles/pokeman/icon47.png","assets/480x320/@2x/tiles/pokeman/icon48.png","assets/480x320/@2x/tiles/pokeman/icon49.png","assets/480x320/@2x/tiles/pokeman/icon5.png","assets/480x320/@2x/tiles/pokeman/icon50.png","assets/480x320/@2x/tiles/pokeman/icon51.png","assets/480x320/@2x/tiles/pokeman/icon52.png","assets/480x320/@2x/tiles/pokeman/icon53.png","assets/480x320/@2x/tiles/pokeman/icon54.png","assets/480x320/@2x/tiles/pokeman/icon55.png","assets/480x320/@2x/tiles/pokeman/icon56.png","assets/480x320/@2x/tiles/pokeman/icon57.png","assets/480x320/@2x/tiles/pokeman/icon58.png","assets/480x320/@2x/tiles/pokeman/icon59.png","assets/480x320/@2x/tiles/pokeman/icon6.png","assets/480x320/@2x/tiles/pokeman/icon60.png","assets/480x320/@2x/tiles/pokeman/icon61.png","assets/480x320/@2x/tiles/pokeman/icon62.png","assets/480x320/@2x/tiles/pokeman/icon63.png","assets/480x320/@2x/tiles/pokeman/icon64.png","assets/480x320/@2x/tiles/pokeman/icon65.png","assets/480x320/@2x/tiles/pokeman/icon66.png","assets/480x320/@2x/tiles/pokeman/icon67.png","assets/480x320/@2x/tiles/pokeman/icon68.png","assets/480x320/@2x/tiles/pokeman/icon69.png","assets/480x320/@2x/tiles/pokeman/icon7.png","assets/480x320/@2x/tiles/pokeman/icon70.png","assets/480x320/@2x/tiles/pokeman/icon71.png","assets/480x320/@2x/tiles/pokeman/icon72.png","assets/480x320/@2x/tiles/pokeman/icon73.png","assets/480x320/@2x/tiles/pokeman/icon74.png","assets/480x320/@2x/tiles/pokeman/icon75.png","assets/480x320/@2x/tiles/pokeman/icon76.png","assets/480x320/@2x/tiles/pokeman/icon77.png","assets/480x320/@2x/tiles/pokeman/icon78.png","assets/480x320/@2x/tiles/pokeman/icon79.png","assets/480x320/@2x/tiles/pokeman/icon8.png","assets/480x320/@2x/tiles/pokeman/icon80.png","assets/480x320/@2x/tiles/pokeman/icon81.png","assets/480x320/@2x/tiles/pokeman/icon82.png","assets/480x320/@2x/tiles/pokeman/icon83.png","assets/480x320/@2x/tiles/pokeman/icon84.png","assets/480x320/@2x/tiles/pokeman/icon85.png","assets/480x320/@2x/tiles/pokeman/icon86.png","assets/480x320/@2x/tiles/pokeman/icon87.png","assets/480x320/@2x/tiles/pokeman/icon88.png","assets/480x320/@2x/tiles/pokeman/icon89.png","assets/480x320/@2x/tiles/pokeman/icon9.png","assets/480x320/@2x/tiles/pokeman/icon90.png","assets/480x320/@2x/tiles/pokeman/icon91.png","assets/480x320/@2x/tiles/pokeman/icon92.png","assets/480x320/@2x/tiles/pokeman/icon93.png","assets/480x320/@2x/tiles/pokeman/icon94.png","assets/480x320/@2x/tiles/pokeman/icon95.png","assets/480x320/@2x/tiles/pokeman/icon96.png","assets/480x320/@2x/tiles/pokeman/icon97.png","assets/480x320/@2x/tiles/pokeman/icon98.png","assets/480x320/@2x/tiles/pokeman/icon99.png","assets/480x320/@2x/tiles/random/icon1.png","assets/480x320/@2x/tiles/random/icon10.png","assets/480x320/@2x/tiles/random/icon11.png","assets/480x320/@2x/tiles/random/icon12.png","assets/480x320/@2x/tiles/random/icon13.png","assets/480x320/@2x/tiles/random/icon14.png","assets/480x320/@2x/tiles/random/icon15.png","assets/480x320/@2x/tiles/random/icon16.png","assets/480x320/@2x/tiles/random/icon17.png","assets/480x320/@2x/tiles/random/icon18.png","assets/480x320/@2x/tiles/random/icon19.png","assets/480x320/@2x/tiles/random/icon2.png","assets/480x320/@2x/tiles/random/icon20.png","assets/480x320/@2x/tiles/random/icon21.png","assets/480x320/@2x/tiles/random/icon22.png","assets/480x320/@2x/tiles/random/icon23.png","assets/480x320/@2x/tiles/random/icon24.png","assets/480x320/@2x/tiles/random/icon25.png","assets/480x320/@2x/tiles/random/icon26.png","assets/480x320/@2x/tiles/random/icon27.png","assets/480x320/@2x/tiles/random/icon28.png","assets/480x320/@2x/tiles/random/icon29.png","assets/480x320/@2x/tiles/random/icon3.png","assets/480x320/@2x/tiles/random/icon30.png","assets/480x320/@2x/tiles/random/icon31.png","assets/480x320/@2x/tiles/random/icon32.png","assets/480x320/@2x/tiles/random/icon33.png","assets/480x320/@2x/tiles/random/icon34.png","assets/480x320/@2x/tiles/random/icon35.png","assets/480x320/@2x/tiles/random/icon36.png","assets/480x320/@2x/tiles/random/icon37.png","assets/480x320/@2x/tiles/random/icon38.png","assets/480x320/@2x/tiles/random/icon39.png","assets/480x320/@2x/tiles/random/icon4.png","assets/480x320/@2x/tiles/random/icon40.png","assets/480x320/@2x/tiles/random/icon41.png","assets/480x320/@2x/tiles/random/icon42.png","assets/480x320/@2x/tiles/random/icon43.png","assets/480x320/@2x/tiles/random/icon44.png","assets/480x320/@2x/tiles/random/icon45.png","assets/480x320/@2x/tiles/random/icon46.png","assets/480x320/@2x/tiles/random/icon47.png","assets/480x320/@2x/tiles/random/icon48.png","assets/480x320/@2x/tiles/random/icon49.png","assets/480x320/@2x/tiles/random/icon5.png","assets/480x320/@2x/tiles/random/icon50.png","assets/480x320/@2x/tiles/random/icon51.png","assets/480x320/@2x/tiles/random/icon52.png","assets/480x320/@2x/tiles/random/icon53.png","assets/480x320/@2x/tiles/random/icon54.png","assets/480x320/@2x/tiles/random/icon55.png","assets/480x320/@2x/tiles/random/icon56.png","assets/480x320/@2x/tiles/random/icon57.png","assets/480x320/@2x/tiles/random/icon58.png","assets/480x320/@2x/tiles/random/icon59.png","assets/480x320/@2x/tiles/random/icon6.png","assets/480x320/@2x/tiles/random/icon60.png","assets/480x320/@2x/tiles/random/icon61.png","assets/480x320/@2x/tiles/random/icon62.png","assets/480x320/@2x/tiles/random/icon63.png","assets/480x320/@2x/tiles/random/icon64.png","assets/480x320/@2x/tiles/random/icon65.png","assets/480x320/@2x/tiles/random/icon66.png","assets/480x320/@2x/tiles/random/icon67.png","assets/480x320/@2x/tiles/random/icon68.png","assets/480x320/@2x/tiles/random/icon69.png","assets/480x320/@2x/tiles/random/icon7.png","assets/480x320/@2x/tiles/random/icon70.png","assets/480x320/@2x/tiles/random/icon71.png","assets/480x320/@2x/tiles/random/icon72.png","assets/480x320/@2x/tiles/random/icon73.png","assets/480x320/@2x/tiles/random/icon74.png","assets/480x320/@2x/tiles/random/icon75.png","assets/480x320/@2x/tiles/random/icon76.png","assets/480x320/@2x/tiles/random/icon77.png","assets/480x320/@2x/tiles/random/icon78.png","assets/480x320/@2x/tiles/random/icon8.png","assets/480x320/@2x/tiles/random/icon9.png","assets/480x320/@2x/tiles/social/icon1.png","assets/480x320/@2x/tiles/social/icon10.png","assets/480x320/@2x/tiles/social/icon11.png","assets/480x320/@2x/tiles/social/icon12.png","assets/480x320/@2x/tiles/social/icon13.png","assets/480x320/@2x/tiles/social/icon14.png","assets/480x320/@2x/tiles/social/icon15.png","assets/480x320/@2x/tiles/social/icon16.png","assets/480x320/@2x/tiles/social/icon17.png","assets/480x320/@2x/tiles/social/icon18.png","assets/480x320/@2x/tiles/social/icon19.png","assets/480x320/@2x/tiles/social/icon2.png","assets/480x320/@2x/tiles/social/icon20.png","assets/480x320/@2x/tiles/social/icon21.png","assets/480x320/@2x/tiles/social/icon22.png","assets/480x320/@2x/tiles/social/icon23.png","assets/480x320/@2x/tiles/social/icon24.png","assets/480x320/@2x/tiles/social/icon25.png","assets/480x320/@2x/tiles/social/icon26.png","assets/480x320/@2x/tiles/social/icon27.png","assets/480x320/@2x/tiles/social/icon28.png","assets/480x320/@2x/tiles/social/icon29.png","assets/480x320/@2x/tiles/social/icon3.png","assets/480x320/@2x/tiles/social/icon30.png","assets/480x320/@2x/tiles/social/icon4.png","assets/480x320/@2x/tiles/social/icon5.png","assets/480x320/@2x/tiles/social/icon6.png","assets/480x320/@2x/tiles/social/icon7.png","assets/480x320/@2x/tiles/social/icon8.png","assets/480x320/@2x/tiles/social/icon9.png","assets/728x392/@1x/tiles/education/icon1.png","assets/728x392/@1x/tiles/education/icon10.png","assets/728x392/@1x/tiles/education/icon11.png","assets/728x392/@1x/tiles/education/icon12.png","assets/728x392/@1x/tiles/education/icon13.png","assets/728x392/@1x/tiles/education/icon14.png","assets/728x392/@1x/tiles/education/icon15.png","assets/728x392/@1x/tiles/education/icon16.png","assets/728x392/@1x/tiles/education/icon17.png","assets/728x392/@1x/tiles/education/icon18.png","assets/728x392/@1x/tiles/education/icon19.png","assets/728x392/@1x/tiles/education/icon2.png","assets/728x392/@1x/tiles/education/icon20.png","assets/728x392/@1x/tiles/education/icon21.png","assets/728x392/@1x/tiles/education/icon22.png","assets/728x392/@1x/tiles/education/icon23.png","assets/728x392/@1x/tiles/education/icon24.png","assets/728x392/@1x/tiles/education/icon25.png","assets/728x392/@1x/tiles/education/icon26.png","assets/728x392/@1x/tiles/education/icon27.png","assets/728x392/@1x/tiles/education/icon28.png","assets/728x392/@1x/tiles/education/icon29.png","assets/728x392/@1x/tiles/education/icon3.png","assets/728x392/@1x/tiles/education/icon30.png","assets/728x392/@1x/tiles/education/icon31.png","assets/728x392/@1x/tiles/education/icon32.png","assets/728x392/@1x/tiles/education/icon4.png","assets/728x392/@1x/tiles/education/icon5.png","assets/728x392/@1x/tiles/education/icon6.png","assets/728x392/@1x/tiles/education/icon7.png","assets/728x392/@1x/tiles/education/icon8.png","assets/728x392/@1x/tiles/education/icon9.png","assets/728x392/@1x/tiles/pokeman/icon1.png","assets/728x392/@1x/tiles/pokeman/icon10.png","assets/728x392/@1x/tiles/pokeman/icon11.png","assets/728x392/@1x/tiles/pokeman/icon12.png","assets/728x392/@1x/tiles/pokeman/icon13.png","assets/728x392/@1x/tiles/pokeman/icon14.png","assets/728x392/@1x/tiles/pokeman/icon15.png","assets/728x392/@1x/tiles/pokeman/icon16.png","assets/728x392/@1x/tiles/pokeman/icon17.png","assets/728x392/@1x/tiles/pokeman/icon18.png","assets/728x392/@1x/tiles/pokeman/icon19.png","assets/728x392/@1x/tiles/pokeman/icon2.png","assets/728x392/@1x/tiles/pokeman/icon20.png","assets/728x392/@1x/tiles/pokeman/icon21.png","assets/728x392/@1x/tiles/pokeman/icon22.png","assets/728x392/@1x/tiles/pokeman/icon23.png","assets/728x392/@1x/tiles/pokeman/icon24.png","assets/728x392/@1x/tiles/pokeman/icon25.png","assets/728x392/@1x/tiles/pokeman/icon26.png","assets/728x392/@1x/tiles/pokeman/icon27.png","assets/728x392/@1x/tiles/pokeman/icon28.png","assets/728x392/@1x/tiles/pokeman/icon29.png","assets/728x392/@1x/tiles/pokeman/icon3.png","assets/728x392/@1x/tiles/pokeman/icon30.png","assets/728x392/@1x/tiles/pokeman/icon31.png","assets/728x392/@1x/tiles/pokeman/icon32.png","assets/728x392/@1x/tiles/pokeman/icon33.png","assets/728x392/@1x/tiles/pokeman/icon34.png","assets/728x392/@1x/tiles/pokeman/icon35.png","assets/728x392/@1x/tiles/pokeman/icon36.png","assets/728x392/@1x/tiles/pokeman/icon37.png","assets/728x392/@1x/tiles/pokeman/icon38.png","assets/728x392/@1x/tiles/pokeman/icon39.png","assets/728x392/@1x/tiles/pokeman/icon4.png","assets/728x392/@1x/tiles/pokeman/icon40.png","assets/728x392/@1x/tiles/pokeman/icon41.png","assets/728x392/@1x/tiles/pokeman/icon42.png","assets/728x392/@1x/tiles/pokeman/icon43.png","assets/728x392/@1x/tiles/pokeman/icon44.png","assets/728x392/@1x/tiles/pokeman/icon45.png","assets/728x392/@1x/tiles/pokeman/icon46.png","assets/728x392/@1x/tiles/pokeman/icon47.png","assets/728x392/@1x/tiles/pokeman/icon48.png","assets/728x392/@1x/tiles/pokeman/icon49.png","assets/728x392/@1x/tiles/pokeman/icon5.png","assets/728x392/@1x/tiles/pokeman/icon50.png","assets/728x392/@1x/tiles/pokeman/icon51.png","assets/728x392/@1x/tiles/pokeman/icon52.png","assets/728x392/@1x/tiles/pokeman/icon53.png","assets/728x392/@1x/tiles/pokeman/icon54.png","assets/728x392/@1x/tiles/pokeman/icon55.png","assets/728x392/@1x/tiles/pokeman/icon56.png","assets/728x392/@1x/tiles/pokeman/icon57.png","assets/728x392/@1x/tiles/pokeman/icon58.png","assets/728x392/@1x/tiles/pokeman/icon59.png","assets/728x392/@1x/tiles/pokeman/icon6.png","assets/728x392/@1x/tiles/pokeman/icon60.png","assets/728x392/@1x/tiles/pokeman/icon61.png","assets/728x392/@1x/tiles/pokeman/icon62.png","assets/728x392/@1x/tiles/pokeman/icon63.png","assets/728x392/@1x/tiles/pokeman/icon64.png","assets/728x392/@1x/tiles/pokeman/icon65.png","assets/728x392/@1x/tiles/pokeman/icon66.png","assets/728x392/@1x/tiles/pokeman/icon67.png","assets/728x392/@1x/tiles/pokeman/icon68.png","assets/728x392/@1x/tiles/pokeman/icon69.png","assets/728x392/@1x/tiles/pokeman/icon7.png","assets/728x392/@1x/tiles/pokeman/icon70.png","assets/728x392/@1x/tiles/pokeman/icon71.png","assets/728x392/@1x/tiles/pokeman/icon72.png","assets/728x392/@1x/tiles/pokeman/icon73.png","assets/728x392/@1x/tiles/pokeman/icon74.png","assets/728x392/@1x/tiles/pokeman/icon75.png","assets/728x392/@1x/tiles/pokeman/icon76.png","assets/728x392/@1x/tiles/pokeman/icon77.png","assets/728x392/@1x/tiles/pokeman/icon78.png","assets/728x392/@1x/tiles/pokeman/icon79.png","assets/728x392/@1x/tiles/pokeman/icon8.png","assets/728x392/@1x/tiles/pokeman/icon80.png","assets/728x392/@1x/tiles/pokeman/icon81.png","assets/728x392/@1x/tiles/pokeman/icon82.png","assets/728x392/@1x/tiles/pokeman/icon83.png","assets/728x392/@1x/tiles/pokeman/icon84.png","assets/728x392/@1x/tiles/pokeman/icon85.png","assets/728x392/@1x/tiles/pokeman/icon86.png","assets/728x392/@1x/tiles/pokeman/icon87.png","assets/728x392/@1x/tiles/pokeman/icon88.png","assets/728x392/@1x/tiles/pokeman/icon89.png","assets/728x392/@1x/tiles/pokeman/icon9.png","assets/728x392/@1x/tiles/pokeman/icon90.png","assets/728x392/@1x/tiles/pokeman/icon91.png","assets/728x392/@1x/tiles/pokeman/icon92.png","assets/728x392/@1x/tiles/pokeman/icon93.png","assets/728x392/@1x/tiles/pokeman/icon94.png","assets/728x392/@1x/tiles/pokeman/icon95.png","assets/728x392/@1x/tiles/pokeman/icon96.png","assets/728x392/@1x/tiles/pokeman/icon97.png","assets/728x392/@1x/tiles/pokeman/icon98.png","assets/728x392/@1x/tiles/pokeman/icon99.png","assets/728x392/@1x/tiles/random/icon1.png","assets/728x392/@1x/tiles/random/icon10.png","assets/728x392/@1x/tiles/random/icon11.png","assets/728x392/@1x/tiles/random/icon12.png","assets/728x392/@1x/tiles/random/icon13.png","assets/728x392/@1x/tiles/random/icon14.png","assets/728x392/@1x/tiles/random/icon15.png","assets/728x392/@1x/tiles/random/icon16.png","assets/728x392/@1x/tiles/random/icon17.png","assets/728x392/@1x/tiles/random/icon18.png","assets/728x392/@1x/tiles/random/icon19.png","assets/728x392/@1x/tiles/random/icon2.png","assets/728x392/@1x/tiles/random/icon20.png","assets/728x392/@1x/tiles/random/icon21.png","assets/728x392/@1x/tiles/random/icon22.png","assets/728x392/@1x/tiles/random/icon23.png","assets/728x392/@1x/tiles/random/icon24.png","assets/728x392/@1x/tiles/random/icon25.png","assets/728x392/@1x/tiles/random/icon26.png","assets/728x392/@1x/tiles/random/icon27.png","assets/728x392/@1x/tiles/random/icon28.png","assets/728x392/@1x/tiles/random/icon29.png","assets/728x392/@1x/tiles/random/icon3.png","assets/728x392/@1x/tiles/random/icon30.png","assets/728x392/@1x/tiles/random/icon31.png","assets/728x392/@1x/tiles/random/icon32.png","assets/728x392/@1x/tiles/random/icon33.png","assets/728x392/@1x/tiles/random/icon34.png","assets/728x392/@1x/tiles/random/icon35.png","assets/728x392/@1x/tiles/random/icon36.png","assets/728x392/@1x/tiles/random/icon37.png","assets/728x392/@1x/tiles/random/icon38.png","assets/728x392/@1x/tiles/random/icon39.png","assets/728x392/@1x/tiles/random/icon4.png","assets/728x392/@1x/tiles/random/icon40.png","assets/728x392/@1x/tiles/random/icon41.png","assets/728x392/@1x/tiles/random/icon42.png","assets/728x392/@1x/tiles/random/icon43.png","assets/728x392/@1x/tiles/random/icon44.png","assets/728x392/@1x/tiles/random/icon45.png","assets/728x392/@1x/tiles/random/icon46.png","assets/728x392/@1x/tiles/random/icon47.png","assets/728x392/@1x/tiles/random/icon48.png","assets/728x392/@1x/tiles/random/icon49.png","assets/728x392/@1x/tiles/random/icon5.png","assets/728x392/@1x/tiles/random/icon50.png","assets/728x392/@1x/tiles/random/icon51.png","assets/728x392/@1x/tiles/random/icon52.png","assets/728x392/@1x/tiles/random/icon53.png","assets/728x392/@1x/tiles/random/icon54.png","assets/728x392/@1x/tiles/random/icon55.png","assets/728x392/@1x/tiles/random/icon56.png","assets/728x392/@1x/tiles/random/icon57.png","assets/728x392/@1x/tiles/random/icon58.png","assets/728x392/@1x/tiles/random/icon59.png","assets/728x392/@1x/tiles/random/icon6.png","assets/728x392/@1x/tiles/random/icon60.png","assets/728x392/@1x/tiles/random/icon61.png","assets/728x392/@1x/tiles/random/icon62.png","assets/728x392/@1x/tiles/random/icon63.png","assets/728x392/@1x/tiles/random/icon64.png","assets/728x392/@1x/tiles/random/icon65.png","assets/728x392/@1x/tiles/random/icon66.png","assets/728x392/@1x/tiles/random/icon67.png","assets/728x392/@1x/tiles/random/icon68.png","assets/728x392/@1x/tiles/random/icon69.png","assets/728x392/@1x/tiles/random/icon7.png","assets/728x392/@1x/tiles/random/icon70.png","assets/728x392/@1x/tiles/random/icon71.png","assets/728x392/@1x/tiles/random/icon72.png","assets/728x392/@1x/tiles/random/icon73.png","assets/728x392/@1x/tiles/random/icon74.png","assets/728x392/@1x/tiles/random/icon75.png","assets/728x392/@1x/tiles/random/icon76.png","assets/728x392/@1x/tiles/random/icon77.png","assets/728x392/@1x/tiles/random/icon78.png","assets/728x392/@1x/tiles/random/icon8.png","assets/728x392/@1x/tiles/random/icon9.png","assets/728x392/@1x/tiles/social/icon1.png","assets/728x392/@1x/tiles/social/icon10.png","assets/728x392/@1x/tiles/social/icon11.png","assets/728x392/@1x/tiles/social/icon12.png","assets/728x392/@1x/tiles/social/icon13.png","assets/728x392/@1x/tiles/social/icon14.png","assets/728x392/@1x/tiles/social/icon15.png","assets/728x392/@1x/tiles/social/icon16.png","assets/728x392/@1x/tiles/social/icon17.png","assets/728x392/@1x/tiles/social/icon18.png","assets/728x392/@1x/tiles/social/icon19.png","assets/728x392/@1x/tiles/social/icon2.png","assets/728x392/@1x/tiles/social/icon20.png","assets/728x392/@1x/tiles/social/icon21.png","assets/728x392/@1x/tiles/social/icon22.png","assets/728x392/@1x/tiles/social/icon23.png","assets/728x392/@1x/tiles/social/icon24.png","assets/728x392/@1x/tiles/social/icon25.png","assets/728x392/@1x/tiles/social/icon26.png","assets/728x392/@1x/tiles/social/icon27.png","assets/728x392/@1x/tiles/social/icon28.png","assets/728x392/@1x/tiles/social/icon29.png","assets/728x392/@1x/tiles/social/icon3.png","assets/728x392/@1x/tiles/social/icon30.png","assets/728x392/@1x/tiles/social/icon4.png","assets/728x392/@1x/tiles/social/icon5.png","assets/728x392/@1x/tiles/social/icon6.png","assets/728x392/@1x/tiles/social/icon7.png","assets/728x392/@1x/tiles/social/icon8.png","assets/728x392/@1x/tiles/social/icon9.png","assets/728x392/@2x/tiles/education/icon1.png","assets/728x392/@2x/tiles/education/icon10.png","assets/728x392/@2x/tiles/education/icon11.png","assets/728x392/@2x/tiles/education/icon12.png","assets/728x392/@2x/tiles/education/icon13.png","assets/728x392/@2x/tiles/education/icon14.png","assets/728x392/@2x/tiles/education/icon15.png","assets/728x392/@2x/tiles/education/icon16.png","assets/728x392/@2x/tiles/education/icon17.png","assets/728x392/@2x/tiles/education/icon18.png","assets/728x392/@2x/tiles/education/icon19.png","assets/728x392/@2x/tiles/education/icon2.png","assets/728x392/@2x/tiles/education/icon20.png","assets/728x392/@2x/tiles/education/icon21.png","assets/728x392/@2x/tiles/education/icon22.png","assets/728x392/@2x/tiles/education/icon23.png","assets/728x392/@2x/tiles/education/icon24.png","assets/728x392/@2x/tiles/education/icon25.png","assets/728x392/@2x/tiles/education/icon26.png","assets/728x392/@2x/tiles/education/icon27.png","assets/728x392/@2x/tiles/education/icon28.png","assets/728x392/@2x/tiles/education/icon29.png","assets/728x392/@2x/tiles/education/icon3.png","assets/728x392/@2x/tiles/education/icon30.png","assets/728x392/@2x/tiles/education/icon31.png","assets/728x392/@2x/tiles/education/icon32.png","assets/728x392/@2x/tiles/education/icon4.png","assets/728x392/@2x/tiles/education/icon5.png","assets/728x392/@2x/tiles/education/icon6.png","assets/728x392/@2x/tiles/education/icon7.png","assets/728x392/@2x/tiles/education/icon8.png","assets/728x392/@2x/tiles/education/icon9.png","assets/728x392/@2x/tiles/pokeman/icon1.png","assets/728x392/@2x/tiles/pokeman/icon10.png","assets/728x392/@2x/tiles/pokeman/icon11.png","assets/728x392/@2x/tiles/pokeman/icon12.png","assets/728x392/@2x/tiles/pokeman/icon13.png","assets/728x392/@2x/tiles/pokeman/icon14.png","assets/728x392/@2x/tiles/pokeman/icon15.png","assets/728x392/@2x/tiles/pokeman/icon16.png","assets/728x392/@2x/tiles/pokeman/icon17.png","assets/728x392/@2x/tiles/pokeman/icon18.png","assets/728x392/@2x/tiles/pokeman/icon19.png","assets/728x392/@2x/tiles/pokeman/icon2.png","assets/728x392/@2x/tiles/pokeman/icon20.png","assets/728x392/@2x/tiles/pokeman/icon21.png","assets/728x392/@2x/tiles/pokeman/icon22.png","assets/728x392/@2x/tiles/pokeman/icon23.png","assets/728x392/@2x/tiles/pokeman/icon24.png","assets/728x392/@2x/tiles/pokeman/icon25.png","assets/728x392/@2x/tiles/pokeman/icon26.png","assets/728x392/@2x/tiles/pokeman/icon27.png","assets/728x392/@2x/tiles/pokeman/icon28.png","assets/728x392/@2x/tiles/pokeman/icon29.png","assets/728x392/@2x/tiles/pokeman/icon3.png","assets/728x392/@2x/tiles/pokeman/icon30.png","assets/728x392/@2x/tiles/pokeman/icon31.png","assets/728x392/@2x/tiles/pokeman/icon32.png","assets/728x392/@2x/tiles/pokeman/icon33.png","assets/728x392/@2x/tiles/pokeman/icon34.png","assets/728x392/@2x/tiles/pokeman/icon35.png","assets/728x392/@2x/tiles/pokeman/icon36.png","assets/728x392/@2x/tiles/pokeman/icon37.png","assets/728x392/@2x/tiles/pokeman/icon38.png","assets/728x392/@2x/tiles/pokeman/icon39.png","assets/728x392/@2x/tiles/pokeman/icon4.png","assets/728x392/@2x/tiles/pokeman/icon40.png","assets/728x392/@2x/tiles/pokeman/icon41.png","assets/728x392/@2x/tiles/pokeman/icon42.png","assets/728x392/@2x/tiles/pokeman/icon43.png","assets/728x392/@2x/tiles/pokeman/icon44.png","assets/728x392/@2x/tiles/pokeman/icon45.png","assets/728x392/@2x/tiles/pokeman/icon46.png","assets/728x392/@2x/tiles/pokeman/icon47.png","assets/728x392/@2x/tiles/pokeman/icon48.png","assets/728x392/@2x/tiles/pokeman/icon49.png","assets/728x392/@2x/tiles/pokeman/icon5.png","assets/728x392/@2x/tiles/pokeman/icon50.png","assets/728x392/@2x/tiles/pokeman/icon51.png","assets/728x392/@2x/tiles/pokeman/icon52.png","assets/728x392/@2x/tiles/pokeman/icon53.png","assets/728x392/@2x/tiles/pokeman/icon54.png","assets/728x392/@2x/tiles/pokeman/icon55.png","assets/728x392/@2x/tiles/pokeman/icon56.png","assets/728x392/@2x/tiles/pokeman/icon57.png","assets/728x392/@2x/tiles/pokeman/icon58.png","assets/728x392/@2x/tiles/pokeman/icon59.png","assets/728x392/@2x/tiles/pokeman/icon6.png","assets/728x392/@2x/tiles/pokeman/icon60.png","assets/728x392/@2x/tiles/pokeman/icon61.png","assets/728x392/@2x/tiles/pokeman/icon62.png","assets/728x392/@2x/tiles/pokeman/icon63.png","assets/728x392/@2x/tiles/pokeman/icon64.png","assets/728x392/@2x/tiles/pokeman/icon65.png","assets/728x392/@2x/tiles/pokeman/icon66.png","assets/728x392/@2x/tiles/pokeman/icon67.png","assets/728x392/@2x/tiles/pokeman/icon68.png","assets/728x392/@2x/tiles/pokeman/icon69.png","assets/728x392/@2x/tiles/pokeman/icon7.png","assets/728x392/@2x/tiles/pokeman/icon70.png","assets/728x392/@2x/tiles/pokeman/icon71.png","assets/728x392/@2x/tiles/pokeman/icon72.png","assets/728x392/@2x/tiles/pokeman/icon73.png","assets/728x392/@2x/tiles/pokeman/icon74.png","assets/728x392/@2x/tiles/pokeman/icon75.png","assets/728x392/@2x/tiles/pokeman/icon76.png","assets/728x392/@2x/tiles/pokeman/icon77.png","assets/728x392/@2x/tiles/pokeman/icon78.png","assets/728x392/@2x/tiles/pokeman/icon79.png","assets/728x392/@2x/tiles/pokeman/icon8.png","assets/728x392/@2x/tiles/pokeman/icon80.png","assets/728x392/@2x/tiles/pokeman/icon81.png","assets/728x392/@2x/tiles/pokeman/icon82.png","assets/728x392/@2x/tiles/pokeman/icon83.png","assets/728x392/@2x/tiles/pokeman/icon84.png","assets/728x392/@2x/tiles/pokeman/icon85.png","assets/728x392/@2x/tiles/pokeman/icon86.png","assets/728x392/@2x/tiles/pokeman/icon87.png","assets/728x392/@2x/tiles/pokeman/icon88.png","assets/728x392/@2x/tiles/pokeman/icon89.png","assets/728x392/@2x/tiles/pokeman/icon9.png","assets/728x392/@2x/tiles/pokeman/icon90.png","assets/728x392/@2x/tiles/pokeman/icon91.png","assets/728x392/@2x/tiles/pokeman/icon92.png","assets/728x392/@2x/tiles/pokeman/icon93.png","assets/728x392/@2x/tiles/pokeman/icon94.png","assets/728x392/@2x/tiles/pokeman/icon95.png","assets/728x392/@2x/tiles/pokeman/icon96.png","assets/728x392/@2x/tiles/pokeman/icon97.png","assets/728x392/@2x/tiles/pokeman/icon98.png","assets/728x392/@2x/tiles/pokeman/icon99.png","assets/728x392/@2x/tiles/random/icon1.png","assets/728x392/@2x/tiles/random/icon10.png","assets/728x392/@2x/tiles/random/icon11.png","assets/728x392/@2x/tiles/random/icon12.png","assets/728x392/@2x/tiles/random/icon13.png","assets/728x392/@2x/tiles/random/icon14.png","assets/728x392/@2x/tiles/random/icon15.png","assets/728x392/@2x/tiles/random/icon16.png","assets/728x392/@2x/tiles/random/icon17.png","assets/728x392/@2x/tiles/random/icon18.png","assets/728x392/@2x/tiles/random/icon19.png","assets/728x392/@2x/tiles/random/icon2.png","assets/728x392/@2x/tiles/random/icon20.png","assets/728x392/@2x/tiles/random/icon21.png","assets/728x392/@2x/tiles/random/icon22.png","assets/728x392/@2x/tiles/random/icon23.png","assets/728x392/@2x/tiles/random/icon24.png","assets/728x392/@2x/tiles/random/icon25.png","assets/728x392/@2x/tiles/random/icon26.png","assets/728x392/@2x/tiles/random/icon27.png","assets/728x392/@2x/tiles/random/icon28.png","assets/728x392/@2x/tiles/random/icon29.png","assets/728x392/@2x/tiles/random/icon3.png","assets/728x392/@2x/tiles/random/icon30.png","assets/728x392/@2x/tiles/random/icon31.png","assets/728x392/@2x/tiles/random/icon32.png","assets/728x392/@2x/tiles/random/icon33.png","assets/728x392/@2x/tiles/random/icon34.png","assets/728x392/@2x/tiles/random/icon35.png","assets/728x392/@2x/tiles/random/icon36.png","assets/728x392/@2x/tiles/random/icon37.png","assets/728x392/@2x/tiles/random/icon38.png","assets/728x392/@2x/tiles/random/icon39.png","assets/728x392/@2x/tiles/random/icon4.png","assets/728x392/@2x/tiles/random/icon40.png","assets/728x392/@2x/tiles/random/icon41.png","assets/728x392/@2x/tiles/random/icon42.png","assets/728x392/@2x/tiles/random/icon43.png","assets/728x392/@2x/tiles/random/icon44.png","assets/728x392/@2x/tiles/random/icon45.png","assets/728x392/@2x/tiles/random/icon46.png","assets/728x392/@2x/tiles/random/icon47.png","assets/728x392/@2x/tiles/random/icon48.png","assets/728x392/@2x/tiles/random/icon49.png","assets/728x392/@2x/tiles/random/icon5.png","assets/728x392/@2x/tiles/random/icon50.png","assets/728x392/@2x/tiles/random/icon51.png","assets/728x392/@2x/tiles/random/icon52.png","assets/728x392/@2x/tiles/random/icon53.png","assets/728x392/@2x/tiles/random/icon54.png","assets/728x392/@2x/tiles/random/icon55.png","assets/728x392/@2x/tiles/random/icon56.png","assets/728x392/@2x/tiles/random/icon57.png","assets/728x392/@2x/tiles/random/icon58.png","assets/728x392/@2x/tiles/random/icon59.png","assets/728x392/@2x/tiles/random/icon6.png","assets/728x392/@2x/tiles/random/icon60.png","assets/728x392/@2x/tiles/random/icon61.png","assets/728x392/@2x/tiles/random/icon62.png","assets/728x392/@2x/tiles/random/icon63.png","assets/728x392/@2x/tiles/random/icon64.png","assets/728x392/@2x/tiles/random/icon65.png","assets/728x392/@2x/tiles/random/icon66.png","assets/728x392/@2x/tiles/random/icon67.png","assets/728x392/@2x/tiles/random/icon68.png","assets/728x392/@2x/tiles/random/icon69.png","assets/728x392/@2x/tiles/random/icon7.png","assets/728x392/@2x/tiles/random/icon70.png","assets/728x392/@2x/tiles/random/icon71.png","assets/728x392/@2x/tiles/random/icon72.png","assets/728x392/@2x/tiles/random/icon73.png","assets/728x392/@2x/tiles/random/icon74.png","assets/728x392/@2x/tiles/random/icon75.png","assets/728x392/@2x/tiles/random/icon76.png","assets/728x392/@2x/tiles/random/icon77.png","assets/728x392/@2x/tiles/random/icon78.png","assets/728x392/@2x/tiles/random/icon8.png","assets/728x392/@2x/tiles/random/icon9.png","assets/728x392/@2x/tiles/social/icon1.png","assets/728x392/@2x/tiles/social/icon10.png","assets/728x392/@2x/tiles/social/icon11.png","assets/728x392/@2x/tiles/social/icon12.png","assets/728x392/@2x/tiles/social/icon13.png","assets/728x392/@2x/tiles/social/icon14.png","assets/728x392/@2x/tiles/social/icon15.png","assets/728x392/@2x/tiles/social/icon16.png","assets/728x392/@2x/tiles/social/icon17.png","assets/728x392/@2x/tiles/social/icon18.png","assets/728x392/@2x/tiles/social/icon19.png","assets/728x392/@2x/tiles/social/icon2.png","assets/728x392/@2x/tiles/social/icon20.png","assets/728x392/@2x/tiles/social/icon21.png","assets/728x392/@2x/tiles/social/icon22.png","assets/728x392/@2x/tiles/social/icon23.png","assets/728x392/@2x/tiles/social/icon24.png","assets/728x392/@2x/tiles/social/icon25.png","assets/728x392/@2x/tiles/social/icon26.png","assets/728x392/@2x/tiles/social/icon27.png","assets/728x392/@2x/tiles/social/icon28.png","assets/728x392/@2x/tiles/social/icon29.png","assets/728x392/@2x/tiles/social/icon3.png","assets/728x392/@2x/tiles/social/icon30.png","assets/728x392/@2x/tiles/social/icon4.png","assets/728x392/@2x/tiles/social/icon5.png","assets/728x392/@2x/tiles/social/icon6.png","assets/728x392/@2x/tiles/social/icon7.png","assets/728x392/@2x/tiles/social/icon8.png","assets/728x392/@2x/tiles/social/icon9.png",""];
CompileTimeClassList.__meta__ = { obj : { classLists : [["null,true,matchit.core.components.ComponentModel","matchit.components.categories.CategoriesModel"],["null,true,matchit.core.components.ComponentView","matchit.components.backgrounds.BackgroundsView,matchit.components.categories.CategoriesView,matchit.components.menu.MenuView,matchit.components.preloader.PreloaderView,matchit.components.quickmenu.QuickMenuView,matchit.components.tiles.TilesView"],["null,true,matchit.core.components.ComponentController","matchit.components.backgrounds.BackgroundsController,matchit.components.categories.CategoriesController,matchit.components.menu.MenuController,matchit.components.preloader.PreloaderController,matchit.components.quickmenu.QuickMenuController,matchit.components.tiles.TilesController"]]}};
IWaudSound.__meta__ = { obj : { 'interface' : null}};
Waud.PROBABLY = "probably";
Waud.MAYBE = "maybe";
Waud.version = "0.8.2";
Waud.useWebAudio = true;
Waud.defaults = { autoplay : false, autostop : true, loop : false, preload : true, webaudio : true, volume : 1, playbackRate : 1};
Waud.preferredSampleRate = 44100;
Waud.isMuted = false;
Waud._playbackRate = 1;
WaudFocusManager.FOCUS_STATE = "focus";
WaudFocusManager.BLUR_STATE = "blur";
WaudFocusManager.ON_FOCUS = "onfocus";
WaudFocusManager.ON_BLUR = "onblur";
WaudFocusManager.PAGE_SHOW = "pageshow";
WaudFocusManager.PAGE_HIDE = "pagehide";
WaudFocusManager.WINDOW = "window";
WaudFocusManager.DOCUMENT = "document";
haxe_IMap.__meta__ = { obj : { 'interface' : null}};
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
matchit_core_components_ComponentController.__meta__ = { fields : { model : { type : ["matchit.model.Model"], inject : null}}};
matchit_components_backgrounds_BackgroundsController.__meta__ = { fields : { view : { type : ["matchit.components.backgrounds.BackgroundsView"], inject : null}}};
matchit_core_components_ComponentView.__meta__ = { fields : { loader : { type : ["matchit.core.loader.AssetLoader"], inject : null}, stageProperties : { type : ["matchit.core.utils.StageProperties"], inject : null}}};
matchit_components_categories_CategoriesController.__meta__ = { fields : { view : { type : ["matchit.components.categories.CategoriesView"], inject : null}, componentModel : { type : ["matchit.components.categories.CategoriesModel"], inject : null}}};
matchit_core_components_ComponentModel.__meta__ = { fields : { model : { type : ["matchit.model.Model"], inject : null}}};
matchit_components_categories_CategoriesView.GAP = 15;
matchit_components_menu_MenuController.__meta__ = { fields : { view : { type : ["matchit.components.menu.MenuView"], inject : null}}};
matchit_components_menu_MenuView.GAP = 15;
matchit_components_preloader_PreloaderController.__meta__ = { fields : { view : { type : ["matchit.components.preloader.PreloaderView"], inject : null}}};
matchit_components_quickmenu_QuickMenuController.__meta__ = { fields : { view : { type : ["matchit.components.quickmenu.QuickMenuView"], inject : null}}};
matchit_components_quickmenu_QuickMenuView.GAP = 5;
matchit_components_tiles_TilesController.__meta__ = { fields : { view : { type : ["matchit.components.tiles.TilesView"], inject : null}}};
matchit_components_tiles_TilesView.GAP = 15;
matchit_controller_Controller.__meta__ = { fields : { model : { type : ["matchit.model.Model"], inject : null}, view : { type : ["matchit.view.View"], inject : null}, stageProperties : { type : ["matchit.core.utils.StageProperties"], inject : null}}};
matchit_view_View.__meta__ = { fields : { loader : { type : ["matchit.core.loader.AssetLoader"], inject : null}}};
minject_point_InjectionPoint.__meta__ = { obj : { 'interface' : null}};
motion_actuators_IGenericActuator.__meta__ = { obj : { 'interface' : null}};
motion_actuators_SimpleActuator.actuators = [];
motion_actuators_SimpleActuator.actuatorsLength = 0;
motion_actuators_SimpleActuator.addedEvent = false;
motion_easing_IEasing.__meta__ = { obj : { 'interface' : null}};
motion_Actuate.defaultActuator = motion_actuators_SimpleActuator;
motion_Actuate.defaultEase = motion_easing_Expo.get_easeOut();
motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
motion_IComponentPath.__meta__ = { obj : { 'interface' : null}};
matchit_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=matchit.dev.js.map