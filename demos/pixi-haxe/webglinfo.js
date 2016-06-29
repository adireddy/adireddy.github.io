(function (console) { "use strict";
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var js_Boot = function() { };
js_Boot.__name__ = true;
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
var samples_webglinfo_Main = function() {
	this.contextName = "";
	this.log("WebGL Support: " + Std.string(this.detectWebGL()));
	this.displayWebGLProperties();
};
samples_webglinfo_Main.__name__ = true;
samples_webglinfo_Main.main = function() {
	new samples_webglinfo_Main();
};
samples_webglinfo_Main.prototype = {
	detectWebGL: function() {
		var ctx = Reflect.field(window,"WebGLRenderingContext");
		if(ctx != null) {
			var canvas;
			var _this = window.document;
			canvas = _this.createElement("canvas");
			var supportedContextNames = ["webgl","experimental-webgl","moz-webgl"];
			var gl;
			var _g = 0;
			while(_g < supportedContextNames.length) {
				var context = supportedContextNames[_g];
				++_g;
				try {
					gl = canvas.getContext(context,{ depth : true, stencil : true, failIfMajorPerformanceCaveat : true});
					if(gl != null && gl.getParameter != null) {
						this.contextName = context;
						return true;
					}
				} catch( e ) {
				}
			}
			return false;
		}
		return false;
	}
	,displayWebGLProperties: function() {
		if(this.contextName != "") {
			var gl = ((function($this) {
				var $r;
				var _this = window.document;
				$r = _this.createElement("canvas");
				return $r;
			}(this))).getContext(this.contextName);
			this.log("WebGL Version: " + gl.getParameter(gl.VERSION));
			this.log("Shading Language Version: " + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
			this.log("WebGL Vendor: " + gl.getParameter(gl.VENDOR));
			this.log("WebGL Renderer: " + gl.getParameter(gl.RENDERER));
			var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
			if(dbgRenderInfo != null) {
				this.log("Renderer: " + gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL));
				this.log("Vendor: " + gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL));
			}
			this.log("Antialias Support: " + gl.getContextAttributes().antialias);
			this.log("Drawing Buffer: " + gl.drawingBufferWidth + "x" + gl.drawingBufferHeight);
			this.log("Max Texture Size: " + gl.getParameter(gl.MAX_TEXTURE_SIZE));
		}
	}
	,log: function(msg) {
		window.document.writeln(msg + "<br/>");
	}
};
String.__name__ = true;
Array.__name__ = true;
samples_webglinfo_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=webglinfo.js.map