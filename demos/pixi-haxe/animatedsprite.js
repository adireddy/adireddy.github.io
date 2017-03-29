// Generated by Haxe 3.4.2
(function ($hx_exports) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Perf = $hx_exports["Perf"] = function(pos,offset) {
	if(offset == null) {
		offset = 0;
	}
	if(pos == null) {
		pos = "TR";
	}
	this._perfObj = window.performance;
	if(Reflect.field(this._perfObj,"memory") != null) {
		this._memoryObj = Reflect.field(this._perfObj,"memory");
	}
	this._memCheck = this._perfObj != null && this._memoryObj != null && this._memoryObj.totalJSHeapSize > 0;
	this._pos = pos;
	this._offset = offset;
	this.currentFps = 60;
	this.currentMs = 0;
	this.currentMem = "0";
	this.lowFps = 60;
	this.avgFps = 60;
	this._measureCount = 0;
	this._totalFps = 0;
	this._time = 0;
	this._ticks = 0;
	this._fpsMin = 60;
	this._fpsMax = 60;
	this._startTime = this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null ? this._perfObj.now() : new Date().getTime();
	this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	this._createFpsDom();
	this._createMsDom();
	if(this._memCheck) {
		this._createMemoryDom();
	}
	if(($_=window,$bind($_,$_.requestAnimationFrame)) != null) {
		this.RAF = ($_=window,$bind($_,$_.requestAnimationFrame));
	} else if(window.mozRequestAnimationFrame != null) {
		this.RAF = window.mozRequestAnimationFrame;
	} else if(window.webkitRequestAnimationFrame != null) {
		this.RAF = window.webkitRequestAnimationFrame;
	} else if(window.msRequestAnimationFrame != null) {
		this.RAF = window.msRequestAnimationFrame;
	}
	if(($_=window,$bind($_,$_.cancelAnimationFrame)) != null) {
		this.CAF = ($_=window,$bind($_,$_.cancelAnimationFrame));
	} else if(window.mozCancelAnimationFrame != null) {
		this.CAF = window.mozCancelAnimationFrame;
	} else if(window.webkitCancelAnimationFrame != null) {
		this.CAF = window.webkitCancelAnimationFrame;
	} else if(window.msCancelAnimationFrame != null) {
		this.CAF = window.msCancelAnimationFrame;
	}
	if(this.RAF != null) {
		this._raf = this.RAF.apply(window,[$bind(this,this._tick)]);
	}
};
Perf.prototype = {
	_tick: function(val) {
		var time = this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null ? this._perfObj.now() : new Date().getTime();
		this._ticks++;
		if(this._raf != null && time > this._prevTime + Perf.MEASUREMENT_INTERVAL) {
			this.currentMs = Math.round(time - this._startTime);
			this.ms.innerHTML = "MS: " + this.currentMs;
			this.currentFps = Math.round(this._ticks * 1000 / (time - this._prevTime));
			if(this.currentFps > 0 && val > Perf.DELAY_TIME) {
				this._measureCount++;
				this._totalFps += this.currentFps;
				this.lowFps = this._fpsMin = Math.min(this._fpsMin,this.currentFps);
				this._fpsMax = Math.max(this._fpsMax,this.currentFps);
				this.avgFps = Math.round(this._totalFps / this._measureCount);
			}
			this.fps.innerHTML = "FPS: " + this.currentFps + " (" + this._fpsMin + "-" + this._fpsMax + ")";
			if(this.currentFps >= 30) {
				this.fps.style.backgroundColor = Perf.FPS_BG_CLR;
			} else if(this.currentFps >= 15) {
				this.fps.style.backgroundColor = Perf.FPS_WARN_BG_CLR;
			} else {
				this.fps.style.backgroundColor = Perf.FPS_PROB_BG_CLR;
			}
			this._prevTime = time;
			this._ticks = 0;
			if(this._memCheck) {
				this.currentMem = this._getFormattedSize(this._memoryObj.usedJSHeapSize,2);
				this.memory.innerHTML = "MEM: " + this.currentMem;
			}
		}
		this._startTime = time;
		if(this._raf != null) {
			this._raf = this.RAF.apply(window,[$bind(this,this._tick)]);
		}
	}
	,_createDiv: function(id,top) {
		if(top == null) {
			top = 0;
		}
		var div = window.document.createElement("div");
		div.id = id;
		div.className = id;
		div.style.position = "absolute";
		var _g = this._pos;
		switch(_g) {
		case "BL":
			div.style.left = this._offset + "px";
			div.style.bottom = (this._memCheck ? 48 : 32) - top + "px";
			break;
		case "BR":
			div.style.right = this._offset + "px";
			div.style.bottom = (this._memCheck ? 48 : 32) - top + "px";
			break;
		case "TL":
			div.style.left = this._offset + "px";
			div.style.top = top + "px";
			break;
		case "TR":
			div.style.right = this._offset + "px";
			div.style.top = top + "px";
			break;
		}
		div.style.width = "80px";
		div.style.height = "12px";
		div.style.lineHeight = "12px";
		div.style.padding = "2px";
		div.style.fontFamily = Perf.FONT_FAMILY;
		div.style.fontSize = "9px";
		div.style.fontWeight = "bold";
		div.style.textAlign = "center";
		window.document.body.appendChild(div);
		return div;
	}
	,_createFpsDom: function() {
		this.fps = this._createDiv("fps");
		this.fps.style.backgroundColor = Perf.FPS_BG_CLR;
		this.fps.style.zIndex = "995";
		this.fps.style.color = Perf.FPS_TXT_CLR;
		this.fps.innerHTML = "FPS: 0";
	}
	,_createMsDom: function() {
		this.ms = this._createDiv("ms",16);
		this.ms.style.backgroundColor = Perf.MS_BG_CLR;
		this.ms.style.zIndex = "996";
		this.ms.style.color = Perf.MS_TXT_CLR;
		this.ms.innerHTML = "MS: 0";
	}
	,_createMemoryDom: function() {
		this.memory = this._createDiv("memory",32);
		this.memory.style.backgroundColor = Perf.MEM_BG_CLR;
		this.memory.style.color = Perf.MEM_TXT_CLR;
		this.memory.style.zIndex = "997";
		this.memory.innerHTML = "MEM: 0";
	}
	,_getFormattedSize: function(bytes,frac) {
		if(frac == null) {
			frac = 0;
		}
		var sizes = ["Bytes","KB","MB","GB","TB"];
		if(bytes == 0) {
			return "0";
		}
		var precision = Math.pow(10,frac);
		var i = Math.floor(Math.log(bytes) / Math.log(1024));
		return Math.round(bytes * precision / Math.pow(1024,i)) / precision + " " + sizes[i];
	}
	,addInfo: function(val) {
		this.info = this._createDiv("info",this._memCheck ? 48 : 32);
		this.info.style.backgroundColor = Perf.INFO_BG_CLR;
		this.info.style.color = Perf.INFO_TXT_CLR;
		this.info.style.zIndex = "998";
		this.info.innerHTML = val;
	}
};
var Reflect = function() { };
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
var Std = function() { };
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var pixi_plugins_app_Application = function() {
	this._animationFrameId = null;
	this.pixelRatio = 1;
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
	this.position = "static";
};
pixi_plugins_app_Application.prototype = {
	start: function(rendererType,parentDom,canvasElement) {
		if(rendererType == null) {
			rendererType = "auto";
		}
		if(canvasElement == null) {
			this.canvas = window.document.createElement("canvas");
			this.canvas.style.width = this.width + "px";
			this.canvas.style.height = this.height + "px";
			this.canvas.style.position = this.position;
		} else {
			this.canvas = canvasElement;
		}
		if(this.autoResize) {
			window.onresize = $bind(this,this._onWindowResize);
		}
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
		renderingOptions.roundPixels = this.roundPixels;
		if(rendererType == null) {
			this.app = new PIXI.Application(this.width,this.height,renderingOptions);
		} else if(rendererType == "canvas") {
			this.app = new PIXI.Application(this.width,this.height,renderingOptions,true);
		} else {
			this.app = new PIXI.Application(this.width,this.height,renderingOptions);
		}
		this.stage = this.app.stage;
		this.renderer = this.app.renderer;
		if(parentDom == null) {
			window.document.body.appendChild(this.app.view);
		} else {
			parentDom.appendChild(this.app.view);
		}
		this.app.ticker.add($bind(this,this._onRequestAnimationFrame));
		this.addStats();
	}
	,_onWindowResize: function(event) {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.app.renderer.resize(this.width,this.height);
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		if(this.onResize != null) {
			this.onResize();
		}
	}
	,_onRequestAnimationFrame: function() {
		if(this.onUpdate != null) {
			this.onUpdate(this.app.ticker.deltaTime);
		}
	}
	,addStats: function() {
		if(window.Perf != null) {
			new Perf().addInfo(["UNKNOWN","WEBGL","CANVAS"][this.app.renderer.type] + " - " + this.pixelRatio);
		}
	}
};
var animatedsprite_Main = function() {
	pixi_plugins_app_Application.call(this);
	this._init();
};
animatedsprite_Main.main = function() {
	new animatedsprite_Main();
};
animatedsprite_Main.__super__ = pixi_plugins_app_Application;
animatedsprite_Main.prototype = $extend(pixi_plugins_app_Application.prototype,{
	_init: function() {
		this.position = "fixed";
		this.backgroundColor = 16777215;
		pixi_plugins_app_Application.prototype.start.call(this,"auto");
		var mcloader = new PIXI.loaders.Loader();
		mcloader.add("mc","assets/movieclip/SpriteSheet.json");
		mcloader.load($bind(this,this._onLoaded));
	}
	,_onLoaded: function() {
		var explosionTextures = [];
		var texture;
		var _g = 0;
		while(_g < 26) {
			var i = _g++;
			texture = PIXI.Texture.fromFrame("Explosion_Sequence_A " + (i + 1) + ".png");
			explosionTextures.push(texture);
		}
		var explosion;
		var _g1 = 0;
		while(_g1 < 80) {
			var i1 = _g1++;
			explosion = new PIXI.extras.AnimatedSprite(explosionTextures);
			var tmp = Math.random();
			explosion.position.x = tmp * window.innerWidth;
			var tmp1 = Math.random();
			explosion.position.y = tmp1 * window.innerHeight;
			explosion.anchor.set(0.5,0.5);
			explosion.rotation = Math.random() * Math.PI;
			var tmp2 = Math.random() * 0.5;
			explosion.scale.x = explosion.scale.y = 0.75 + tmp2;
			explosion.gotoAndPlay(Std.random(27));
			explosion.animationSpeed = 0.8;
			this.stage.addChild(explosion);
		}
	}
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Perf.MEASUREMENT_INTERVAL = 1000;
Perf.FONT_FAMILY = "Helvetica,Arial";
Perf.FPS_BG_CLR = "#00FF00";
Perf.FPS_WARN_BG_CLR = "#FF8000";
Perf.FPS_PROB_BG_CLR = "#FF0000";
Perf.MS_BG_CLR = "#FFFF00";
Perf.MEM_BG_CLR = "#086A87";
Perf.INFO_BG_CLR = "#00FFFF";
Perf.FPS_TXT_CLR = "#000000";
Perf.MS_TXT_CLR = "#000000";
Perf.MEM_TXT_CLR = "#FFFFFF";
Perf.INFO_TXT_CLR = "#000000";
Perf.DELAY_TIME = 4000;
animatedsprite_Main.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this);

//# sourceMappingURL=animatedsprite.js.map