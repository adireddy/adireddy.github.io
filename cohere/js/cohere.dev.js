(function (console, $hx_exports) { "use strict";
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
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
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
var JConsole = function() { };
$hxClasses["JConsole"] = JConsole;
JConsole.__name__ = ["JConsole"];
JConsole.info = function(msg) {
	console.info(msg);
};
JConsole.error = function(msg) {
	console.error(msg);
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
	,__class__: List
};
Math.__name__ = ["Math"];
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
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
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
var Utils = function() { };
$hxClasses["Utils"] = Utils;
Utils.__name__ = ["Utils"];
Utils.isiOS = function() {
	return new EReg("(iPad|iPhone|iPod)","i").match(window.navigator.userAgent);
};
var Waud = $hx_exports.Waud = function() { };
$hxClasses["Waud"] = Waud;
Waud.__name__ = ["Waud"];
Waud.init = function() {
	Waud.audioContext = Waud.createAudioContext();
	Waud.checkAudioContext(Waud.sampleRate);
	Waud.webAudioAPI = false;
	Waud.defaults = new WaudDefaults();
	Waud.defaults.autoplay = false;
	Waud.defaults.formats = [];
	Waud.defaults.loop = false;
	Waud.defaults.preload = "metadata";
	Waud.defaults.volume = 1;
	Waud.defaults.document = window.document;
	Waud.sounds = new haxe_ds_StringMap();
	Waud.types = new haxe_ds_StringMap();
	Waud.types.set("mp3","audio/mpeg");
	Waud.types.set("ogg","audio/ogg");
	Waud.types.set("wav","audio/wav");
	Waud.types.set("aac","audio/aac");
	Waud.types.set("m4a","audio/x-m4a");
	if(Waud.iOS) window.document.addEventListener("touchend",Waud.unlockAudio,true);
	window.addEventListener("unload",Waud.destroyContext,true);
};
Waud.mute = function() {
	var $it0 = Waud.sounds.iterator();
	while( $it0.hasNext() ) {
		var sound = $it0.next();
		sound.mute();
	}
};
Waud.unmute = function() {
	var $it0 = Waud.sounds.iterator();
	while( $it0.hasNext() ) {
		var sound = $it0.next();
		sound.unmute();
	}
};
Waud.destroyContext = function() {
	if(Waud.audioContext != null) {
		if(Waud.audioContext.close != null) Waud.audioContext.close();
		Waud.audioContext = null;
	}
};
Waud.suspendContext = function() {
	if(Waud.audioContext != null) {
		if(Waud.audioContext.suspend != null) Waud.audioContext.suspend();
	}
};
Waud.resumeContext = function() {
	if(Waud.audioContext != null) {
		if(Waud.audioContext.resume != null) Waud.audioContext.resume();
	}
};
Waud.getSupportString = function() {
	var support = "OGG: " + Waud.audioElement.canPlayType("audio/ogg; codecs=\"vorbis\"");
	support += ", WAV: " + Waud.audioElement.canPlayType("audio/wav; codecs=\"1\"");
	support += ", MP3: " + Waud.audioElement.canPlayType("audio/mpeg;");
	support += ", AAC: " + Waud.audioElement.canPlayType("audio/aac;");
	support += ", M4A: " + Waud.audioElement.canPlayType("audio/x-m4a;");
	return support;
};
Waud.createAudioContext = function() {
	if(Waud.audioContext == null) try {
		if(Waud.ac != null) Waud.audioContext = Type.createInstance(Waud.ac,[]);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		Waud.audioContext = null;
	}
	return Waud.audioContext;
};
Waud.checkAudioContext = function(sampleRate) {
	if(Waud.audioContext != null && Waud.audioContext.sampleRate != sampleRate) {
		Waud.destroyContext();
		Waud.audioContext = Waud.createAudioContext();
	}
};
Waud.unlockAudio = function() {
	if(Waud.unlocked || Waud.audioContext == null) return;
	var bfr = Waud.audioContext.createBuffer(1,1,Waud.sampleRate);
	var src = Waud.audioContext.createBufferSource();
	src.buffer = bfr;
	src.connect(Waud.audioContext.destination);
	if(src.noteOn != null) src.noteOn(0); else src.start(0);
	haxe_Timer.delay(function() {
		if(src.playbackState == src.PLAYING_STATE || src.playbackState == src.FINISHED_STATE) {
			Waud.unlocked = true;
			if(Waud.touchUnlock != null) Waud.touchUnlock();
			window.document.removeEventListener("touchend",Waud.unlockAudio,true);
		}
	},1);
};
Waud.isSupported = function() {
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null;
};
Waud.isOGGSupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/ogg; codecs=\"vorbis\"");
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isWAVSupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/wav; codecs=\"1\"");
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isMP3Supported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/mpeg;");
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isAACSupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/aac;");
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
Waud.isM4ASupported = function() {
	var canPlay = Waud.audioElement.canPlayType("audio/x-m4a;");
	return ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null && canPlay != null && (canPlay == "probably" || canPlay == "maybe");
};
var WaudDefaults = function() {
};
$hxClasses["WaudDefaults"] = WaudDefaults;
WaudDefaults.__name__ = ["WaudDefaults"];
WaudDefaults.prototype = {
	__class__: WaudDefaults
};
var WaudSound = $hx_exports.WaudSound = function(src,options) {
	var _g = this;
	if(Waud.defaults == null) {
		console.log("Initialise Waud using Waud.init() before loading sounds");
		return;
	}
	if(options == null) options = { };
	if(options.document != null) this.doc = options.document; else this.doc = Waud.defaults.document;
	this.pid = 0;
	this.events = [];
	this.supported = ($_=Waud.audioElement,$bind($_,$_.canPlayType)) != null;
	if(options.autoplay != null) options.autoplay = options.autoplay; else options.autoplay = Waud.defaults.autoplay;
	if(options.formats != null) options.formats = options.formats; else options.formats = Waud.defaults.formats;
	if(options.loop != null) options.loop = options.loop; else options.loop = Waud.defaults.loop;
	if(options.preload != null) options.preload = options.preload; else options.preload = Waud.defaults.preload;
	if(options.volume != null && options.volume >= 0 && options.volume <= 1) options.volume = options.volume; else options.volume = Waud.defaults.volume;
	if(this.supported && src != null && src != "") {
		var _this = window.document;
		this.sound = _this.createElement("audio");
		this.sound.crossOrigin = "anonymous";
		if(Waud.webAudioAPI && Waud.audioContext != null) {
			if(Waud.audioContext != null) {
				this.source = Waud.audioContext.createMediaElementSource(this.sound);
				(js_Boot.__cast(this.source , MediaElementAudioSourceNode)).connect(Waud.audioContext.destination);
			}
		}
		if(options.formats.length > 0) {
			var _g1 = 0;
			var _g11 = options.formats;
			while(_g1 < _g11.length) {
				var format = _g11[_g1];
				++_g1;
				this.addSource(src + "." + format);
			}
		} else this.addSource(src);
		if(options.loop) this.sound.loop = true;
		if(options.autoplay) this.sound.autoplay = true;
		this.sound.volume = options.volume;
		if(Std.string(options.preload) == "true") this.sound.preload = "auto"; else if(Std.string(options.preload) == "false") this.sound.preload = "none"; else this.sound.preload = "metadata";
		if(options.onload != null) this.sound.onloadeddata = function() {
			options.onload(_g);
		};
		if(options.onend != null) this.sound.onended = function() {
			options.onend(_g);
		};
		if(options.onerror != null) this.sound.onerror = function() {
			options.onerror(_g);
		};
		Waud.sounds.set(src,this);
		this.sound.load();
	}
};
$hxClasses["WaudSound"] = WaudSound;
WaudSound.__name__ = ["WaudSound"];
WaudSound.prototype = {
	addSource: function(src) {
		var _this = window.document;
		this.source = _this.createElement("source");
		this.source.src = src;
		if((function($this) {
			var $r;
			var key = $this.getExt(src);
			$r = Waud.types.get(key);
			return $r;
		}(this)) != null) {
			var key1 = this.getExt(src);
			this.source.type = Waud.types.get(key1);
		}
		this.sound.appendChild(this.source);
		return this.source;
	}
	,getExt: function(filename) {
		return filename.split(".").pop();
	}
	,set_volume: function(val) {
		if(val >= 0 && val <= 1) this.sound.volume = val;
		return this.volume = val;
	}
	,mute: function() {
		this.sound.muted = true;
	}
	,unmute: function() {
		this.sound.muted = false;
	}
	,loop: function() {
		this.sound.loop = true;
	}
	,unloop: function() {
		this.sound.loop = false;
	}
	,play: function() {
		this.sound.play();
	}
	,stop: function() {
		this.sound.pause();
		this.sound.currentTime = 0;
	}
	,__class__: WaudSound
	,__properties__: {set_volume:"set_volume"}
};
var pixi_plugins_app_Application = function() {
	this._lastTime = new Date();
	this.pixelRatio = 1;
	this.set_skipFrame(false);
	this.autoResize = true;
	this.transparent = false;
	this.antialias = false;
	this.forceFXAA = false;
	this.roundPixels = false;
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
	,start: function(rendererType,parentDom) {
		if(rendererType == null) rendererType = "auto";
		var _this = window.document;
		this.canvas = _this.createElement("canvas");
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		this.canvas.style.position = "absolute";
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
		if(rendererType == "auto") this.renderer = PIXI.autoDetectRenderer(this.width,this.height,renderingOptions); else if(rendererType == "canvas") this.renderer = new PIXI.CanvasRenderer(this.width,this.height,renderingOptions); else this.renderer = new PIXI.WebGLRenderer(this.width,this.height,renderingOptions);
		if(this.roundPixels) this.renderer.roundPixels = true;
		window.document.body.appendChild(this.renderer.view);
		if(this.autoResize) window.onresize = $bind(this,this._onWindowResize);
		window.requestAnimationFrame($bind(this,this._onRequestAnimationFrame));
		this._lastTime = new Date();
		this._addStats();
	}
	,_onWindowResize: function(event) {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer.resize(this.width,this.height);
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		if(this.onResize != null) this.onResize();
	}
	,_onRequestAnimationFrame: function() {
		this._frameCount++;
		if(this._frameCount == (60 / this.fps | 0)) {
			this._frameCount = 0;
			this._calculateElapsedTime();
			if(this.onUpdate != null) this.onUpdate(this._elapsedTime);
			this.renderer.render(this.stage);
		}
		window.requestAnimationFrame($bind(this,this._onRequestAnimationFrame));
	}
	,_calculateElapsedTime: function() {
		this._currentTime = new Date();
		this._elapsedTime = this._currentTime.getTime() - this._lastTime.getTime();
		this._lastTime = this._currentTime;
	}
	,_addStats: function() {
	}
	,__class__: pixi_plugins_app_Application
	,__properties__: {set_fps:"set_fps",set_skipFrame:"set_skipFrame"}
};
var arm_cohere_Main = function() {
	pixi_plugins_app_Application.call(this);
	this._stageProperties = new arm_cohere_core_utils_StageProperties();
	this._stageProperties.actualPixelRatio = window.devicePixelRatio;
	this._stageProperties.pixelRatio = arm_cohere_core_utils_BrowserUtils.getPixelRatio();
	this._stageProperties.screenWidth = window.innerWidth;
	this._stageProperties.screenHeight = window.innerHeight;
	if(this._stageProperties.screenWidth > this._stageProperties.screenHeight) this._stageProperties.orientation = "LANDSCAPE"; else this._stageProperties.orientation = "PORTRAIT";
	arm_cohere_Main.resize = new msignal_Signal0();
	arm_cohere_Main.update = new msignal_Signal1(Float);
	this.pixelRatio = this._stageProperties.pixelRatio;
	this.backgroundColor = 16777215;
	this.roundPixels = true;
	this.onUpdate = $bind(this,this._onUpdate);
	this.onResize = $bind(this,this._onResize);
	this.transparent = true;
	PIXI.RESOLUTION = this._stageProperties.pixelRatio;
	pixi_plugins_app_Application.prototype.start.call(this);
	this._setupApplication();
};
$hxClasses["arm.cohere.Main"] = arm_cohere_Main;
arm_cohere_Main.__name__ = ["arm","cohere","Main"];
arm_cohere_Main.main = function() {
	Waud.init();
	new arm_cohere_Main();
};
arm_cohere_Main.__super__ = pixi_plugins_app_Application;
arm_cohere_Main.prototype = $extend(pixi_plugins_app_Application.prototype,{
	_setupApplication: function() {
		this.stage.interactive = true;
		this._model = new arm_cohere_model_Model();
		this._model.updateFps.add($bind(this,this._onUpdateFps));
		this._view = new arm_cohere_view_View(this.stage);
		this._controller = new arm_cohere_controller_Controller();
		var injector = new minject_Injector();
		injector.mapValue(arm_cohere_core_utils_StageProperties,this._stageProperties);
		injector.mapValue(arm_cohere_model_Model,this._model);
		injector.mapValue(arm_cohere_view_View,this._view);
		injector.injectInto(this._controller);
		this._controller.init();
	}
	,_onUpdateFps: function(val) {
		if(val > 0) this.set_fps(val);
	}
	,_onUpdate: function(time) {
		arm_cohere_Main.update.dispatch(time);
	}
	,_onResize: function() {
		this._stageProperties.screenWidth = window.innerWidth;
		this._stageProperties.screenHeight = window.innerHeight;
		if(this._stageProperties.screenWidth > this._stageProperties.screenHeight) this._stageProperties.orientation = "LANDSCAPE"; else this._stageProperties.orientation = "PORTRAIT";
		arm_cohere_Main.resize.dispatch();
	}
	,__class__: arm_cohere_Main
});
var arm_cohere_core_components_ComponentController = function() {
};
$hxClasses["arm.cohere.core.components.ComponentController"] = arm_cohere_core_components_ComponentController;
arm_cohere_core_components_ComponentController.__name__ = ["arm","cohere","core","components","ComponentController"];
arm_cohere_core_components_ComponentController.prototype = {
	init: function() {
	}
	,setup: function() {
	}
	,reset: function() {
	}
	,__class__: arm_cohere_core_components_ComponentController
};
var arm_cohere_components_bg_BgController = function() {
	arm_cohere_core_components_ComponentController.call(this);
};
$hxClasses["arm.cohere.components.bg.BgController"] = arm_cohere_components_bg_BgController;
arm_cohere_components_bg_BgController.__name__ = ["arm","cohere","components","bg","BgController"];
arm_cohere_components_bg_BgController.__super__ = arm_cohere_core_components_ComponentController;
arm_cohere_components_bg_BgController.prototype = $extend(arm_cohere_core_components_ComponentController.prototype,{
	setup: function() {
		this.view.playBgSound();
	}
	,_onCurrentDemoChange: function(from,to) {
	}
	,__class__: arm_cohere_components_bg_BgController
});
var arm_cohere_core_components_ComponentView = function(mainView,viewName) {
	this.view = mainView;
	this._container = new PIXI.Container();
	this._container.name = viewName + "Container";
	this.componentName = viewName.substring(0,viewName.indexOf("View")).toLowerCase();
	if(arm_cohere_Main.resize != null) arm_cohere_Main.resize.add($bind(this,this.resize));
	if(arm_cohere_Main.update != null) arm_cohere_Main.update.add($bind(this,this.update));
};
$hxClasses["arm.cohere.core.components.ComponentView"] = arm_cohere_core_components_ComponentView;
arm_cohere_core_components_ComponentView.__name__ = ["arm","cohere","core","components","ComponentView"];
arm_cohere_core_components_ComponentView.prototype = {
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
	,resize: function() {
	}
	,destroy: function() {
		this._container.destroy(true);
		this.view.stage.removeChild(this._container);
		this._container = null;
	}
	,update: function(t) {
	}
	,applyIndex: function() {
		if(this.index != null && this.index <= this.view.stage.children.length - 1) this.view.stage.setChildIndex(this._container,this.index); else {
			this.index = this.view.stage.children.length - 1;
			this.view.stage.setChildIndex(this._container,this.index);
		}
	}
	,__class__: arm_cohere_core_components_ComponentView
};
var arm_cohere_components_bg_BgView = function(mainView,viewName) {
	arm_cohere_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["arm.cohere.components.bg.BgView"] = arm_cohere_components_bg_BgView;
arm_cohere_components_bg_BgView.__name__ = ["arm","cohere","components","bg","BgView"];
arm_cohere_components_bg_BgView.__super__ = arm_cohere_core_components_ComponentView;
arm_cohere_components_bg_BgView.prototype = $extend(arm_cohere_core_components_ComponentView.prototype,{
	addAssetsToLoad: function() {
		this.loader.addAudioAsset("sounds_bg","sounds/bg.mp3");
	}
	,playBgSound: function() {
		var _g = this;
		if(arm_cohere_core_utils_BrowserUtils.isiOS()) Waud.touchUnlock = function() {
			_g.loader.playAudio("sounds_bg",true);
		}; else this.loader.playAudio("sounds_bg",true);
	}
	,__class__: arm_cohere_components_bg_BgView
});
var arm_cohere_components_bitmapfont_BitmapfontController = function() {
	arm_cohere_core_components_ComponentController.call(this);
};
$hxClasses["arm.cohere.components.bitmapfont.BitmapfontController"] = arm_cohere_components_bitmapfont_BitmapfontController;
arm_cohere_components_bitmapfont_BitmapfontController.__name__ = ["arm","cohere","components","bitmapfont","BitmapfontController"];
arm_cohere_components_bitmapfont_BitmapfontController.__super__ = arm_cohere_core_components_ComponentController;
arm_cohere_components_bitmapfont_BitmapfontController.prototype = $extend(arm_cohere_core_components_ComponentController.prototype,{
	setup: function() {
		this.model.get_currentDemoChanged().add($bind(this,this._onCurrentDemoChange));
	}
	,_onCurrentDemoChange: function(from,to) {
		if(to == "bitmapfont") this.view.start(); else this.view.end();
	}
	,__class__: arm_cohere_components_bitmapfont_BitmapfontController
});
var arm_cohere_components_bitmapfont_BitmapfontView = function(mainView,viewName) {
	arm_cohere_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["arm.cohere.components.bitmapfont.BitmapfontView"] = arm_cohere_components_bitmapfont_BitmapfontView;
arm_cohere_components_bitmapfont_BitmapfontView.__name__ = ["arm","cohere","components","bitmapfont","BitmapfontView"];
arm_cohere_components_bitmapfont_BitmapfontView.__super__ = arm_cohere_core_components_ComponentView;
arm_cohere_components_bitmapfont_BitmapfontView.prototype = $extend(arm_cohere_core_components_ComponentView.prototype,{
	addAssetsToLoad: function() {
		this.loader.addAsset("fonts_desyrel","fonts/desyrel.xml");
	}
	,start: function() {
		this._bitmapFont = new PIXI.extras.BitmapText("bitmap fonts are\n now supported!",{ font : "60px Desyrel"});
		this._container.addChild(this._bitmapFont);
		this.resize();
	}
	,end: function() {
		this._container.removeChildren();
		this._bitmapFont = null;
	}
	,resize: function() {
		this._container.position.set((this.stageProperties.screenWidth - this._container.width) / 2,(this.stageProperties.screenHeight - this._container.height) / 2);
	}
	,__class__: arm_cohere_components_bitmapfont_BitmapfontView
});
var arm_cohere_components_bunnymark_Bunny = function(texture) {
	PIXI.Sprite.call(this,texture);
};
$hxClasses["arm.cohere.components.bunnymark.Bunny"] = arm_cohere_components_bunnymark_Bunny;
arm_cohere_components_bunnymark_Bunny.__name__ = ["arm","cohere","components","bunnymark","Bunny"];
arm_cohere_components_bunnymark_Bunny.__super__ = PIXI.Sprite;
arm_cohere_components_bunnymark_Bunny.prototype = $extend(PIXI.Sprite.prototype,{
	__class__: arm_cohere_components_bunnymark_Bunny
});
var arm_cohere_components_bunnymark_BunnymarkController = function() {
	arm_cohere_core_components_ComponentController.call(this);
};
$hxClasses["arm.cohere.components.bunnymark.BunnymarkController"] = arm_cohere_components_bunnymark_BunnymarkController;
arm_cohere_components_bunnymark_BunnymarkController.__name__ = ["arm","cohere","components","bunnymark","BunnymarkController"];
arm_cohere_components_bunnymark_BunnymarkController.__super__ = arm_cohere_core_components_ComponentController;
arm_cohere_components_bunnymark_BunnymarkController.prototype = $extend(arm_cohere_core_components_ComponentController.prototype,{
	setup: function() {
		this.model.get_currentDemoChanged().add($bind(this,this._onCurrentDemoChange));
	}
	,_onCurrentDemoChange: function(from,to) {
		if(to == "bunnymark") this.view.start(); else this.view.end();
	}
	,__class__: arm_cohere_components_bunnymark_BunnymarkController
});
var arm_cohere_components_bunnymark_BunnymarkView = function(mainView,viewName) {
	this._count = 0;
	this._gravity = 0.5;
	this._bunnyTextures = [];
	this._bunnys = [];
	arm_cohere_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["arm.cohere.components.bunnymark.BunnymarkView"] = arm_cohere_components_bunnymark_BunnymarkView;
arm_cohere_components_bunnymark_BunnymarkView.__name__ = ["arm","cohere","components","bunnymark","BunnymarkView"];
arm_cohere_components_bunnymark_BunnymarkView.__super__ = arm_cohere_core_components_ComponentView;
arm_cohere_components_bunnymark_BunnymarkView.prototype = $extend(arm_cohere_core_components_ComponentView.prototype,{
	addAssetsToLoad: function() {
		this.loader.addAsset("bunnymark_bunny1","bunnymark/bunny1.png");
		this.loader.addAsset("bunnymark_bunny2","bunnymark/bunny2.png");
		this.loader.addAsset("bunnymark_bunny3","bunnymark/bunny3.png");
		this.loader.addAsset("bunnymark_bunny4","bunnymark/bunny4.png");
		this.loader.addAsset("bunnymark_bunny5","bunnymark/bunny5.png");
		this.loader.addAudioAsset("sounds_sound2","sounds/sound2.wav");
	}
	,start: function() {
		this._maxX = window.innerWidth;
		this._maxY = window.innerHeight;
		this._counter = new PIXI.Text("0 BUNNIES (touch/click to add)",{ fill : "#105CB6", font : "bold 12px Courier"});
		this._container.addChild(this._counter);
		this._bunnyContainer = new PIXI.ParticleContainer();
		this._bunnyContainer.addChild(this._bunnyContainer);
		this._container.addChild(this._bunnyContainer);
		this._bunnyTextures = [this.loader.getTexture("bunnymark_bunny1"),this.loader.getTexture("bunnymark_bunny2"),this.loader.getTexture("bunnymark_bunny3"),this.loader.getTexture("bunnymark_bunny4"),this.loader.getTexture("bunnymark_bunny5")];
		this._bunnyType = 1;
		this._currentTexture = this._bunnyTextures[this._bunnyType];
		window.document.addEventListener("touchstart",$bind(this,this._onTouchStart),true);
		window.document.addEventListener("mousedown",$bind(this,this._onTouchStart),true);
		this.loader.playAudio("sounds_sound2",true);
	}
	,_onTouchStart: function(event) {
		this._bunnyType++;
		this._bunnyType %= 5;
		this._currentTexture = this._bunnyTextures[this._bunnyType];
		if(this._count < 200000) {
			var _g = 0;
			while(_g < 500) {
				var i = _g++;
				var bunny = new arm_cohere_components_bunnymark_Bunny(this._currentTexture);
				bunny.speedX = Math.random() * 5;
				bunny.speedY = Math.random() * 5 - 3;
				bunny.anchor.set(0,1);
				bunny.scale.set(0.5 + Math.random() * 0.5,0.5 + Math.random() * 0.5);
				bunny.rotation = Math.random() - 0.5;
				this._bunnys.push(bunny);
				this._container.addChild(bunny);
				this._count++;
			}
		}
		this._counter.text = this._count + " BUNNIES";
	}
	,update: function(elapsedTime) {
		var _g1 = 0;
		var _g = this._bunnys.length;
		while(_g1 < _g) {
			var i = _g1++;
			var bunny = this._bunnys[i];
			bunny.position.x += bunny.speedX;
			bunny.position.y += bunny.speedY;
			bunny.speedY += this._gravity;
			if(bunny.position.x > this._maxX) {
				bunny.speedX *= -1;
				bunny.position.x = this._maxX;
			} else if(bunny.position.x < 0) {
				bunny.speedX *= -1;
				bunny.position.x = 0;
			}
			if(bunny.position.y > this._maxY) {
				bunny.speedY *= -0.85;
				bunny.position.y = this._maxY;
				if(Math.random() > 0.5) bunny.speedY -= Math.random() * 6;
			} else if(bunny.position.y < 0) {
				bunny.speedY = 0;
				bunny.position.y = 0;
			}
		}
	}
	,resize: function() {
		this._maxX = window.innerWidth;
		this._maxY = window.innerHeight;
	}
	,end: function() {
		this._container.removeChildren();
		this._counter = null;
		this._bunnyContainer = null;
		this._count = 0;
		this._bunnyTextures = [];
		window.document.removeEventListener("touchstart",$bind(this,this._onTouchStart),true);
		window.document.removeEventListener("mousedown",$bind(this,this._onTouchStart),true);
	}
	,__class__: arm_cohere_components_bunnymark_BunnymarkView
});
var arm_cohere_components_menu_MenuController = function() {
	arm_cohere_core_components_ComponentController.call(this);
};
$hxClasses["arm.cohere.components.menu.MenuController"] = arm_cohere_components_menu_MenuController;
arm_cohere_components_menu_MenuController.__name__ = ["arm","cohere","components","menu","MenuController"];
arm_cohere_components_menu_MenuController.__super__ = arm_cohere_core_components_ComponentController;
arm_cohere_components_menu_MenuController.prototype = $extend(arm_cohere_core_components_ComponentController.prototype,{
	setup: function() {
		this.view.setup();
		this.view.demo.add($bind(this,this._onDemoChange));
		this.view.fps.add($bind(this,this._onFpsChange));
	}
	,_onDemoChange: function(val) {
		this.model.set_currentDemo(val.toLowerCase());
	}
	,_onFpsChange: function(val) {
		this.model.set_fps(val);
	}
	,__class__: arm_cohere_components_menu_MenuController
});
var arm_cohere_components_menu_MenuView = function(mainView,viewName) {
	arm_cohere_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["arm.cohere.components.menu.MenuView"] = arm_cohere_components_menu_MenuView;
arm_cohere_components_menu_MenuView.__name__ = ["arm","cohere","components","menu","MenuView"];
arm_cohere_components_menu_MenuView.__super__ = arm_cohere_core_components_ComponentView;
arm_cohere_components_menu_MenuView.prototype = $extend(arm_cohere_core_components_ComponentView.prototype,{
	setup: function() {
		this.demo = new msignal_Signal1(String);
		this.fps = new msignal_Signal1(Int);
		this._data = { demo : "", fps : 60};
		this._menu = new dat.gui.GUI();
		this._demoList = this._menu.add(this._data,"demo",["none","Retina","Bunnymark","Spritesheet","Bitmapfont"]);
		this._demoList.onChange($bind(this,this._changeDemo));
		this._fps = this._menu.add(this._data,"fps",1,60);
		this._fps.onChange($bind(this,this._changeFps));
	}
	,_changeDemo: function(val) {
		this.demo.dispatch(val);
	}
	,_changeFps: function(val) {
		this.fps.dispatch(val);
	}
	,__class__: arm_cohere_components_menu_MenuView
});
var arm_cohere_components_preloader_PreloaderController = function() {
	arm_cohere_core_components_ComponentController.call(this);
};
$hxClasses["arm.cohere.components.preloader.PreloaderController"] = arm_cohere_components_preloader_PreloaderController;
arm_cohere_components_preloader_PreloaderController.__name__ = ["arm","cohere","components","preloader","PreloaderController"];
arm_cohere_components_preloader_PreloaderController.__super__ = arm_cohere_core_components_ComponentController;
arm_cohere_components_preloader_PreloaderController.prototype = $extend(arm_cohere_core_components_ComponentController.prototype,{
	init: function() {
		arm_cohere_core_components_ComponentController.prototype.init.call(this);
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
	,__class__: arm_cohere_components_preloader_PreloaderController
});
var arm_cohere_components_preloader_PreloaderView = function(mainView,viewName) {
	arm_cohere_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["arm.cohere.components.preloader.PreloaderView"] = arm_cohere_components_preloader_PreloaderView;
arm_cohere_components_preloader_PreloaderView.__name__ = ["arm","cohere","components","preloader","PreloaderView"];
arm_cohere_components_preloader_PreloaderView.__super__ = arm_cohere_core_components_ComponentView;
arm_cohere_components_preloader_PreloaderView.prototype = $extend(arm_cohere_core_components_ComponentView.prototype,{
	init: function() {
		arm_cohere_core_components_ComponentView.prototype.init.call(this);
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
		this.resize();
		this.loader.reset();
		this.ready.dispatch();
	}
	,_createLoadingBar: function() {
		this._loadingBarContainer = new PIXI.Container();
		this._container.addChild(this._loadingBarContainer);
		this._loadingBarBG = new PIXI.Graphics();
		this._loadingBarBG.beginFill(14211288);
		this._loadingBarBG.drawRect(0,0,204,26);
		this._loadingBarBG.endFill();
		this._loadingBar = new PIXI.Graphics();
		this._loadingBar.beginFill(16711765);
		this._loadingBar.drawRect(0,0,200,22);
		this._loadingBar.endFill();
		this._loadingBarContainer.addChild(this._loadingBarBG);
		this._loadingBarContainer.addChild(this._loadingBar);
		this._loadingBar.x = this._loadingBar.y = 2;
		this._loadingBar.scale.x = 0.02;
		this._loadingBarContainer.position.set(this._logo.x - this._loadingBarBG.width / 2,this._logo.y + this._logo.height / 2 + 10);
	}
	,reset: function() {
		this._container.removeChild(this._logo);
		this._container.removeChild(this._loadingBarContainer);
		this._loadingBarContainer = null;
		this._logo = null;
	}
	,update: function(elapsed) {
		if(this._loadingBar != null) this._loadingBar.scale.x = this.loader.loadProgress / 100;
	}
	,resize: function() {
		this._container.position.set(this.stageProperties.screenWidth / 2,this.stageProperties.screenHeight / 2 - 25);
	}
	,__class__: arm_cohere_components_preloader_PreloaderView
});
var arm_cohere_components_retina_RetinaController = function() {
	arm_cohere_core_components_ComponentController.call(this);
};
$hxClasses["arm.cohere.components.retina.RetinaController"] = arm_cohere_components_retina_RetinaController;
arm_cohere_components_retina_RetinaController.__name__ = ["arm","cohere","components","retina","RetinaController"];
arm_cohere_components_retina_RetinaController.__super__ = arm_cohere_core_components_ComponentController;
arm_cohere_components_retina_RetinaController.prototype = $extend(arm_cohere_core_components_ComponentController.prototype,{
	setup: function() {
		this.model.get_currentDemoChanged().add($bind(this,this._onCurrentDemoChange));
	}
	,_onCurrentDemoChange: function(from,to) {
		if(to == "retina") this.view.start(); else this.view.end();
	}
	,__class__: arm_cohere_components_retina_RetinaController
});
var arm_cohere_components_retina_RetinaView = function(mainView,viewName) {
	arm_cohere_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["arm.cohere.components.retina.RetinaView"] = arm_cohere_components_retina_RetinaView;
arm_cohere_components_retina_RetinaView.__name__ = ["arm","cohere","components","retina","RetinaView"];
arm_cohere_components_retina_RetinaView.__super__ = arm_cohere_core_components_ComponentView;
arm_cohere_components_retina_RetinaView.prototype = $extend(arm_cohere_core_components_ComponentView.prototype,{
	addAssetsToLoad: function() {
		this.loader.addAsset("retina_img","retina/img.jpg");
	}
	,_getPixelRatio: function() {
		if(window.devicePixelRatio >= 2) return 2; else return 1;
	}
	,start: function() {
		this._img = new PIXI.Sprite(this.loader.getTexture("retina_img"));
		this._img.anchor.set(0.5);
		this._img.name = "img";
		this._img.position.set(window.innerWidth / 2,window.innerHeight / 2);
		this._container.addChild(this._img);
		this._label = new PIXI.Text("Pixel Ratio: " + this._getPixelRatio(),{ fill : "#105CB6", font : "bold 12px Courier"});
		this._container.addChild(this._label);
	}
	,end: function() {
		this._container.removeChildren();
		this._img = null;
		this._label = null;
	}
	,__class__: arm_cohere_components_retina_RetinaView
});
var arm_cohere_components_spritesheet_SpritesheetController = function() {
	arm_cohere_core_components_ComponentController.call(this);
};
$hxClasses["arm.cohere.components.spritesheet.SpritesheetController"] = arm_cohere_components_spritesheet_SpritesheetController;
arm_cohere_components_spritesheet_SpritesheetController.__name__ = ["arm","cohere","components","spritesheet","SpritesheetController"];
arm_cohere_components_spritesheet_SpritesheetController.__super__ = arm_cohere_core_components_ComponentController;
arm_cohere_components_spritesheet_SpritesheetController.prototype = $extend(arm_cohere_core_components_ComponentController.prototype,{
	setup: function() {
		this.model.get_currentDemoChanged().add($bind(this,this._onCurrentDemoChange));
	}
	,_onCurrentDemoChange: function(from,to) {
		if(to == "spritesheet") this.view.start(); else this.view.end();
	}
	,__class__: arm_cohere_components_spritesheet_SpritesheetController
});
var arm_cohere_components_spritesheet_SpritesheetView = function(mainView,viewName) {
	arm_cohere_core_components_ComponentView.call(this,mainView,viewName);
};
$hxClasses["arm.cohere.components.spritesheet.SpritesheetView"] = arm_cohere_components_spritesheet_SpritesheetView;
arm_cohere_components_spritesheet_SpritesheetView.__name__ = ["arm","cohere","components","spritesheet","SpritesheetView"];
arm_cohere_components_spritesheet_SpritesheetView.__super__ = arm_cohere_core_components_ComponentView;
arm_cohere_components_spritesheet_SpritesheetView.prototype = $extend(arm_cohere_core_components_ComponentView.prototype,{
	addAssetsToLoad: function() {
		this.loader.addAsset("spritesheet_fighter","spritesheet/fighter.json");
	}
	,start: function() {
		this._count = 0;
		this._isAdding = false;
		this._fighterTextures = [];
		this._spriteContainer = new PIXI.Container();
		this._container.addChild(this._spriteContainer);
		var _g = 0;
		while(_g < 29) {
			var i = _g++;
			var frame = "" + i;
			if(i < 10) frame = "0" + frame;
			this._fighterTextures.push(this.loader.getTexture("rollSequence00" + frame + ".png"));
		}
		this._counter = new PIXI.Text(this._count + " SPRITES",{ fill : "#0000FF", font : "bold 12px Courier"});
		this._container.addChild(this._counter);
		this._addFighter(window.innerWidth / 2,window.innerHeight / 2);
		window.document.addEventListener("touchstart",$bind(this,this._onTouchStart),true);
		window.document.addEventListener("touchend",$bind(this,this._onTouchEnd),true);
		window.document.addEventListener("mousedown",$bind(this,this._onTouchStart),true);
		window.document.addEventListener("mouseup",$bind(this,this._onTouchEnd),true);
	}
	,_onTouchStart: function(event) {
		this._isAdding = true;
	}
	,_onTouchEnd: function(event) {
		this._isAdding = false;
	}
	,_addFighter: function(x,y) {
		var fighter = new PIXI.extras.MovieClip(this._fighterTextures);
		fighter.anchor.set(0.5);
		fighter.position.set(x,y);
		fighter.play();
		this._spriteContainer.addChild(fighter);
		this._count++;
		this._counter.text = this._count + " SPRITES";
	}
	,update: function(elapsedTime) {
		if(this._isAdding) this._addFighter(Std.random(window.innerWidth),Std.random(window.innerHeight));
	}
	,end: function() {
		this._container.removeChildren();
		this._count = 0;
		this._isAdding = false;
		this._fighterTextures = [];
		this._spriteContainer = null;
		window.document.removeEventListener("touchstart",$bind(this,this._onTouchStart),true);
		window.document.removeEventListener("touchend",$bind(this,this._onTouchEnd),true);
		window.document.removeEventListener("mousedown",$bind(this,this._onTouchStart),true);
		window.document.removeEventListener("mouseup",$bind(this,this._onTouchEnd),true);
	}
	,__class__: arm_cohere_components_spritesheet_SpritesheetView
});
var arm_cohere_controller_Controller = function() {
	this.componentControllers = [];
	this._componentViews = [];
};
$hxClasses["arm.cohere.controller.Controller"] = arm_cohere_controller_Controller;
arm_cohere_controller_Controller.__name__ = ["arm","cohere","controller","Controller"];
arm_cohere_controller_Controller.prototype = {
	init: function() {
		this.model.init();
		this.view.init();
		this.model.addAssets.addOnce($bind(this,this._onAddAssets));
		this._loader = new arm_cohere_core_loader_AssetLoader();
		this._loader.baseUrl = "resources/";
		this._loader.pixelRatio = this.stageProperties.pixelRatio;
		this._setupComponents();
	}
	,_onAddAssets: function() {
		this.view.addAssetsToLoad();
		var _g = 0;
		var _g1 = this._componentViews;
		while(_g < _g1.length) {
			var view = _g1[_g];
			++_g;
			view.addAssetsToLoad();
		}
		this._loader.start($bind(this,this._onPreloadingComplete));
	}
	,_onPreloadingComplete: function() {
		var _g = 0;
		var _g1 = this.componentControllers;
		while(_g < _g1.length) {
			var controller = _g1[_g];
			++_g;
			controller.setup();
		}
		this._componentViews = null;
	}
	,_setupComponents: function() {
		var models = CompileTimeClassList.get("null,true,arm.cohere.core.components.ComponentModel");
		var views = CompileTimeClassList.get("null,true,arm.cohere.core.components.ComponentView");
		var controllers = CompileTimeClassList.get("null,true,arm.cohere.core.components.ComponentController");
		var viewInjector = new minject_Injector();
		viewInjector.mapValue(arm_cohere_core_loader_AssetLoader,this._loader);
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
			var view = _g1[_g];
			++_g;
			view.applyIndex();
		}
	}
	,_setupComponent: function(modelClass,viewClass,controllerClass) {
		var componentInjector = new minject_Injector();
		componentInjector.mapValue(arm_cohere_model_Model,this.model);
		var componentModel = null;
		var componentView = null;
		if(modelClass != null) {
			componentModel = Type.createInstance(modelClass,[]);
			componentInjector.mapValue(modelClass,componentModel);
			var modelInjector = new minject_Injector();
			modelInjector.mapValue(arm_cohere_model_Model,this.model);
			modelInjector.injectInto(componentModel);
			componentModel.init();
		}
		if(viewClass != null) {
			var viewName = Type.getClassName(viewClass).split(".").pop();
			componentView = Type.createInstance(viewClass,[this.view,viewName]);
			componentInjector.mapValue(viewClass,componentView);
			var viewInjector = new minject_Injector();
			viewInjector.mapValue(arm_cohere_core_loader_AssetLoader,this._loader);
			viewInjector.mapValue(arm_cohere_core_utils_StageProperties,this.stageProperties);
			viewInjector.injectInto(componentView);
			componentView.init();
			this._componentViews.push(js_Boot.__cast(componentView , arm_cohere_core_components_ComponentView));
		}
		var componentController = Type.createInstance(controllerClass,[]);
		componentInjector.injectInto(componentController);
		componentController.init();
		this.componentControllers.push(componentController);
	}
	,__class__: arm_cohere_controller_Controller
};
var arm_cohere_core_components_ComponentModel = function() {
};
$hxClasses["arm.cohere.core.components.ComponentModel"] = arm_cohere_core_components_ComponentModel;
arm_cohere_core_components_ComponentModel.__name__ = ["arm","cohere","core","components","ComponentModel"];
arm_cohere_core_components_ComponentModel.prototype = {
	init: function() {
	}
	,reset: function() {
	}
	,__class__: arm_cohere_core_components_ComponentModel
};
var arm_cohere_core_loader_AssetLoader = function() {
	PIXI.loaders.Loader.call(this);
	this.count = 0;
	this.loadProgress = 0;
	this.pixelRatio = 1;
	this._loadCount = 0;
	this._audioCount = 0;
	this._audioKeys = [];
	this._audioAssets = new haxe_ds_StringMap();
	this._audioAssetPaths = new haxe_ds_StringMap();
	arm_cohere_core_loader_MultipackParser.loader = this;
	this["use"](arm_cohere_core_loader_MultipackParser.parse);
};
$hxClasses["arm.cohere.core.loader.AssetLoader"] = arm_cohere_core_loader_AssetLoader;
arm_cohere_core_loader_AssetLoader.__name__ = ["arm","cohere","core","loader","AssetLoader"];
arm_cohere_core_loader_AssetLoader.__super__ = PIXI.loaders.Loader;
arm_cohere_core_loader_AssetLoader.prototype = $extend(PIXI.loaders.Loader.prototype,{
	start: function(onComplete,onProgress) {
		this._onComplete = onComplete;
		this._onProgress = onProgress;
		if(this._audioCount > 0) this._loadAudioAsset(); else this.load(this._onComplete);
	}
	,_loadAudioAsset: function() {
		var id = this._audioKeys.pop();
		var value = new arm_cohere_core_loader_AudioAsset(this.baseUrl + this._audioAssetPaths.get(id),false,false,$bind(this,this._onAudioAssetLoaded),$bind(this,this._onAudioAssetLoadError));
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
	,__class__: arm_cohere_core_loader_AssetLoader
});
var arm_cohere_core_loader_AudioAsset = function(path,autoPlay,loop,loadComplete,loadError) {
	if(loop == null) loop = false;
	if(autoPlay == null) autoPlay = false;
	console.log(path);
	var options = { };
	options.autoplay = autoPlay;
	options.loop = loop;
	if(loadComplete != null) options.onload = loadComplete;
	if(loadError != null) options.onerror = loadError;
	this._snd = new WaudSound(path,options);
};
$hxClasses["arm.cohere.core.loader.AudioAsset"] = arm_cohere_core_loader_AudioAsset;
arm_cohere_core_loader_AudioAsset.__name__ = ["arm","cohere","core","loader","AudioAsset"];
arm_cohere_core_loader_AudioAsset.prototype = {
	play: function(loop,onend) {
		if(loop == null) loop = false;
		this._snd.stop();
		this._snd.play();
		if(loop) this._snd.loop(); else this._snd.unloop();
	}
	,__class__: arm_cohere_core_loader_AudioAsset
};
var arm_cohere_core_loader_MultipackParser = function() { };
$hxClasses["arm.cohere.core.loader.MultipackParser"] = arm_cohere_core_loader_MultipackParser;
arm_cohere_core_loader_MultipackParser.__name__ = ["arm","cohere","core","loader","MultipackParser"];
arm_cohere_core_loader_MultipackParser.parse = function(resource,next) {
	var data = resource.data;
	if(data != null && data.multipack) {
		var textures = data.textures;
		var imgCount = textures.length;
		var imgLoadedCount = 0;
		var resolution = PIXI.utils.getResolutionOfUrl(resource.url);
		var baseURL = resource.url.split(arm_cohere_core_loader_MultipackParser.loader.baseUrl)[1];
		baseURL = baseURL.substring(0,baseURL.lastIndexOf("/") + 1);
		var _g = 0;
		while(_g < textures.length) {
			var texture = [textures[_g]];
			++_g;
			var url = baseURL + texture[0].meta.image;
			arm_cohere_core_loader_MultipackParser.loader.add(texture[0].meta.image,url,{ loadType : 2, crossOrigin : resource.crossOrigin},(function(texture) {
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
var arm_cohere_core_utils_BrowserUtils = function() { };
$hxClasses["arm.cohere.core.utils.BrowserUtils"] = arm_cohere_core_utils_BrowserUtils;
arm_cohere_core_utils_BrowserUtils.__name__ = ["arm","cohere","core","utils","BrowserUtils"];
arm_cohere_core_utils_BrowserUtils.getPixelRatio = function() {
	var pixelRatio;
	if(window.devicePixelRatio <= 2) pixelRatio = Math.floor(window.devicePixelRatio); else pixelRatio = 2;
	if(arm_cohere_core_utils_BrowserUtils.isiOS() && (window.screen.width == 320 && window.screen.height == 480)) pixelRatio = 1;
	if(pixelRatio < 1) pixelRatio = 1;
	JConsole.info("Pixel Ratio: " + pixelRatio);
	return pixelRatio;
};
arm_cohere_core_utils_BrowserUtils.isiOS = function() {
	return new EReg("(iPad|iPhone|iPod)","i").match(window.navigator.userAgent);
};
var arm_cohere_core_utils_StageProperties = function() {
	this.pixelRatio = 1;
	this.screenWidth = 1024;
	this.screenHeight = 768;
	this.bucketWidth = 1024;
	this.bucketHeight = 768;
	this.screenX = 0;
	this.screenY = 0;
};
$hxClasses["arm.cohere.core.utils.StageProperties"] = arm_cohere_core_utils_StageProperties;
arm_cohere_core_utils_StageProperties.__name__ = ["arm","cohere","core","utils","StageProperties"];
arm_cohere_core_utils_StageProperties.prototype = {
	__class__: arm_cohere_core_utils_StageProperties
};
var bindx_IBindable = function() { };
$hxClasses["bindx.IBindable"] = bindx_IBindable;
bindx_IBindable.__name__ = ["bindx","IBindable"];
var arm_cohere_model_Model = function() {
	this.addAssets = new msignal_Signal0();
	this.updateFps = new msignal_Signal1(Int);
};
$hxClasses["arm.cohere.model.Model"] = arm_cohere_model_Model;
arm_cohere_model_Model.__name__ = ["arm","cohere","model","Model"];
arm_cohere_model_Model.__interfaces__ = [bindx_IBindable];
arm_cohere_model_Model.prototype = {
	get_currentDemoChanged: function() {
		if(this._currentDemoChanged == null) this._currentDemoChanged = new bindx_FieldSignal();
		return this._currentDemoChanged;
	}
	,set_currentDemo: function(value) {
		var __oldValue__ = this.currentDemo;
		if(__oldValue__ == value) return __oldValue__;
		this.currentDemo = value;
		if(this._currentDemoChanged != null) this._currentDemoChanged.dispatch(__oldValue__,value);
		return value;
	}
	,init: function() {
	}
	,set_preloaderReady: function(val) {
		if(val) this.addAssets.dispatch();
		return this.preloaderReady = val;
	}
	,set_fps: function(val) {
		this.updateFps.dispatch(val);
		return this.fps = val;
	}
	,__class__: arm_cohere_model_Model
	,__properties__: {set_currentDemo:"set_currentDemo",get_currentDemoChanged:"get_currentDemoChanged",set_fps:"set_fps",set_preloaderReady:"set_preloaderReady"}
};
var arm_cohere_view_View = function(stage) {
	this.stage = stage;
};
$hxClasses["arm.cohere.view.View"] = arm_cohere_view_View;
arm_cohere_view_View.__name__ = ["arm","cohere","view","View"];
arm_cohere_view_View.prototype = {
	init: function() {
	}
	,addAssetsToLoad: function() {
		this.loader.addAsset("common_button","common/button.png");
	}
	,__class__: arm_cohere_view_View
};
var bindx_Signal = function() {
	this.lock = 0;
	this.listeners = [];
	this.lock = 0;
};
$hxClasses["bindx.Signal"] = bindx_Signal;
bindx_Signal.__name__ = ["bindx","Signal"];
bindx_Signal.prototype = {
	add: function(listener) {
		var pos = HxOverrides.indexOf(this.listeners,listener,0);
		if(this.lock > 0) {
			this.listeners = this.listeners.slice();
			this.lock = 0;
		}
		if(pos > -1) this.listeners.splice(pos,1);
		this.listeners.push(listener);
	}
	,__class__: bindx_Signal
};
var bindx_FieldSignal = function() {
	bindx_Signal.call(this);
};
$hxClasses["bindx.FieldSignal"] = bindx_FieldSignal;
bindx_FieldSignal.__name__ = ["bindx","FieldSignal"];
bindx_FieldSignal.__super__ = bindx_Signal;
bindx_FieldSignal.prototype = $extend(bindx_Signal.prototype,{
	dispatch: function(oldValue,newValue) {
		this.lock++;
		var ls = this.listeners;
		var _g = 0;
		while(_g < ls.length) {
			var l = ls[_g];
			++_g;
			l(oldValue,newValue);
		}
		if(this.lock > 0) this.lock--;
	}
	,__class__: bindx_FieldSignal
});
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
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
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
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
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
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
	,__class__: msignal_Signal
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
	prepend: function(slot) {
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
AssetsList.LIST = ["resources/@1x/.DS_Store","resources/@2x/.DS_Store","resources/sounds/bg.mp3","resources/sounds/loop.mp3","resources/sounds/sound1.wav","resources/sounds/sound2.wav","resources/sounds/sound3.wav","resources/sounds/sound4.wav","resources/@1x/alphamask/bkg.jpg","resources/@1x/alphamask/cells.png","resources/@1x/alphamask/flowerTop.png","resources/@1x/bunnymark/.DS_Store","resources/@1x/bunnymark/bunny1.png","resources/@1x/bunnymark/bunny2.png","resources/@1x/bunnymark/bunny3.png","resources/@1x/bunnymark/bunny4.png","resources/@1x/bunnymark/bunny5.png","resources/@1x/common/button.png","resources/@1x/filters/BGrotate.jpg","resources/@1x/filters/depth_blur_BG.jpg","resources/@1x/filters/depth_blur_dudes.jpg","resources/@1x/filters/depth_blur_moby.jpg","resources/@1x/filters/LightRotate1.png","resources/@1x/filters/LightRotate2.png","resources/@1x/filters/panda.png","resources/@1x/filters/SceneRotate.jpg","resources/@1x/fonts/desyrel.png","resources/@1x/fonts/desyrel.ttf","resources/@1x/fonts/desyrel.xml","resources/@1x/graphics/spinObj_01.png","resources/@1x/graphics/spinObj_02.png","resources/@1x/graphics/spinObj_03.png","resources/@1x/graphics/spinObj_04.png","resources/@1x/graphics/spinObj_05.png","resources/@1x/graphics/spinObj_06.png","resources/@1x/graphics/spinObj_07.png","resources/@1x/graphics/spinObj_08.png","resources/@1x/movieclip/.DS_Store","resources/@1x/movieclip/SpriteSheet.json","resources/@1x/movieclip/SpriteSheet.png","resources/@1x/nape/ball.png","resources/@1x/preloader/logo.png","resources/@1x/rendertexture/spinObj_01.png","resources/@1x/rendertexture/spinObj_02.png","resources/@1x/rendertexture/spinObj_03.png","resources/@1x/rendertexture/spinObj_04.png","resources/@1x/rendertexture/spinObj_05.png","resources/@1x/rendertexture/spinObj_06.png","resources/@1x/rendertexture/spinObj_07.png","resources/@1x/rendertexture/spinObj_08.png","resources/@1x/retina/img.jpg","resources/@1x/rope/snake.png","resources/@1x/spine/.DS_Store","resources/@1x/spine/dragon.atlas","resources/@1x/spine/dragon.json","resources/@1x/spine/dragon.png","resources/@1x/spine/dragon2.png","resources/@1x/spine/goblins.atlas","resources/@1x/spine/goblins.json","resources/@1x/spine/goblins.png","resources/@1x/spine/iP4_BGtile.jpg","resources/@1x/spine/iP4_ground.png","resources/@1x/spine/Pixie.atlas","resources/@1x/spine/Pixie.json","resources/@1x/spine/Pixie.png","resources/@1x/spine/spineboy.atlas","resources/@1x/spine/spineboy.json","resources/@1x/spine/spineboy.png","resources/@1x/spritesheet/.DS_Store","resources/@1x/spritesheet/fighter.json","resources/@1x/spritesheet/fighter.png","resources/@1x/spritesheet/SpriteSheet.json","resources/@1x/spritesheet/SpriteSheet.png","resources/@1x/tiling/p2.jpeg","resources/@2x/preloader/logo.png","resources/@2x/retina/img.jpg",""];
CompileTimeClassList.__meta__ = { obj : { classLists : [["null,true,arm.cohere.core.components.ComponentModel",""],["null,true,arm.cohere.core.components.ComponentView","arm.cohere.components.bg.BgView,arm.cohere.components.bitmapfont.BitmapfontView,arm.cohere.components.bunnymark.BunnymarkView,arm.cohere.components.menu.MenuView,arm.cohere.components.preloader.PreloaderView,arm.cohere.components.retina.RetinaView,arm.cohere.components.spritesheet.SpritesheetView"],["null,true,arm.cohere.core.components.ComponentController","arm.cohere.components.bg.BgController,arm.cohere.components.bitmapfont.BitmapfontController,arm.cohere.components.bunnymark.BunnymarkController,arm.cohere.components.menu.MenuController,arm.cohere.components.preloader.PreloaderController,arm.cohere.components.retina.RetinaController,arm.cohere.components.spritesheet.SpritesheetController"]]}};
Waud.sampleRate = 44100;
Waud.ac = Reflect.field(window,"AudioContext") != null?Reflect.field(window,"AudioContext"):Reflect.field(window,"webkitAudioContext");
Waud.audioElement = (function($this) {
	var $r;
	var _this = window.document;
	$r = _this.createElement("audio");
	return $r;
}(this));
Waud.iOS = Utils.isiOS();
Waud.unlocked = false;
arm_cohere_core_components_ComponentController.__meta__ = { fields : { model : { type : ["arm.cohere.model.Model"], inject : null}}};
arm_cohere_components_bg_BgController.__meta__ = { fields : { view : { type : ["arm.cohere.components.bg.BgView"], inject : null}}};
arm_cohere_core_components_ComponentView.__meta__ = { obj : { SuppressWarnings : ["checkstyle:Dynamic"]}, fields : { loader : { type : ["arm.cohere.core.loader.AssetLoader"], inject : null}, stageProperties : { type : ["arm.cohere.core.utils.StageProperties"], inject : null}}};
arm_cohere_components_bitmapfont_BitmapfontController.__meta__ = { fields : { view : { type : ["arm.cohere.components.bitmapfont.BitmapfontView"], inject : null}}};
arm_cohere_components_bunnymark_BunnymarkController.__meta__ = { fields : { view : { type : ["arm.cohere.components.bunnymark.BunnymarkView"], inject : null}}};
arm_cohere_components_menu_MenuController.__meta__ = { fields : { view : { type : ["arm.cohere.components.menu.MenuView"], inject : null}}};
arm_cohere_components_preloader_PreloaderController.__meta__ = { fields : { view : { type : ["arm.cohere.components.preloader.PreloaderView"], inject : null}}};
arm_cohere_components_retina_RetinaController.__meta__ = { fields : { view : { type : ["arm.cohere.components.retina.RetinaView"], inject : null}}};
arm_cohere_components_spritesheet_SpritesheetController.__meta__ = { fields : { view : { type : ["arm.cohere.components.spritesheet.SpritesheetView"], inject : null}}};
arm_cohere_controller_Controller.__meta__ = { fields : { model : { type : ["arm.cohere.model.Model"], inject : null}, view : { type : ["arm.cohere.view.View"], inject : null}, stageProperties : { type : ["arm.cohere.core.utils.StageProperties"], inject : null}}};
arm_cohere_core_components_ComponentModel.__meta__ = { fields : { model : { type : ["arm.cohere.model.Model"], inject : null}}};
bindx_IBindable.__meta__ = { obj : { 'interface' : null}};
arm_cohere_model_Model.__meta__ = { fields : { _currentDemoChanged : { BindSignal : ["currentDemo",true]}}};
arm_cohere_view_View.__meta__ = { fields : { loader : { type : ["arm.cohere.core.loader.AssetLoader"], inject : null}}};
haxe_IMap.__meta__ = { obj : { 'interface' : null}};
js_Boot.__toStr = {}.toString;
minject_point_InjectionPoint.__meta__ = { obj : { 'interface' : null}};
arm_cohere_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=cohere.dev.js.map