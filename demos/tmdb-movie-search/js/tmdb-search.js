(function (console, $global) { "use strict";
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var CompileTime = function() { };
$hxClasses["CompileTime"] = CompileTime;
CompileTime.__name__ = ["CompileTime"];
var CompileTimeClassList = function() { };
$hxClasses["CompileTimeClassList"] = CompileTimeClassList;
CompileTimeClassList.__name__ = ["CompileTimeClassList"];
CompileTimeClassList.get = function(id) {
	if(CompileTimeClassList.lists == null) CompileTimeClassList.initialise();
	return CompileTimeClassList.lists.get(id);
};
CompileTimeClassList.getTyped = function(id,type) {
	return CompileTimeClassList.get(id);
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
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
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
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
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
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
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
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
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
var bindx_Bind = function() { };
$hxClasses["bindx.Bind"] = bindx_Bind;
bindx_Bind.__name__ = ["bindx","Bind"];
var bindx_Signal = function() {
	this.lock = 0;
	this.listeners = [];
	this.lock = 0;
};
$hxClasses["bindx.Signal"] = bindx_Signal;
bindx_Signal.__name__ = ["bindx","Signal"];
bindx_Signal.prototype = {
	removeAll: function() {
		this.listeners = [];
		this.lock = 0;
	}
	,indexOf: function(listener) {
		return HxOverrides.indexOf(this.listeners,listener,0);
	}
	,add: function(listener) {
		var pos = HxOverrides.indexOf(this.listeners,listener,0);
		if(this.lock > 0) {
			this.listeners = this.listeners.slice();
			this.lock = 0;
		}
		if(pos > -1) this.listeners.splice(pos,1);
		this.listeners.push(listener);
	}
	,remove: function(listener) {
		var pos = HxOverrides.indexOf(this.listeners,listener,0);
		if(pos > -1) {
			if(this.lock > 0) {
				this.listeners = this.listeners.slice();
				this.lock = 0;
			}
			this.listeners.splice(pos,1);
		}
	}
	,checkLock: function() {
		if(this.lock > 0) {
			this.listeners = this.listeners.slice();
			this.lock = 0;
		}
	}
	,__class__: bindx_Signal
};
var bindx_MethodSignal = function() {
	bindx_Signal.call(this);
};
$hxClasses["bindx.MethodSignal"] = bindx_MethodSignal;
bindx_MethodSignal.__name__ = ["bindx","MethodSignal"];
bindx_MethodSignal.__super__ = bindx_Signal;
bindx_MethodSignal.prototype = $extend(bindx_Signal.prototype,{
	dispatch: function() {
		this.lock++;
		var _g = 0;
		var _g1 = this.listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l();
		}
		if(this.lock > 0) this.lock--;
	}
	,__class__: bindx_MethodSignal
});
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
var bindx_SignalTools = function() { };
$hxClasses["bindx.SignalTools"] = bindx_SignalTools;
bindx_SignalTools.__name__ = ["bindx","SignalTools"];
bindx_SignalTools.unbindAll = function(bindable) {
	var meta = haxe_rtti_Meta.getFields(bindable == null?null:js_Boot.getClass(bindable));
	if(meta != null) {
		var _g = 0;
		var _g1 = Reflect.fields(meta);
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			var data = Reflect.field(meta,m);
			if(Object.prototype.hasOwnProperty.call(data,"BindSignal")) {
				var signal = Reflect.field(bindable,m);
				if(signal != null) {
					signal.listeners = [];
					signal.lock = 0;
					var args = Reflect.field(data,"BindSignal");
					var lazy = args[1];
					if(lazy) bindable[m] = null;
				}
			}
		}
	}
};
bindx_SignalTools.bindAll = function(bindable,callback,force) {
	if(force == null) force = true;
	var listeners = new haxe_ds_ObjectMap();
	var signals = bindx_SignalTools.getSignals(bindable,force);
	var $it0 = signals.keys();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		var name1 = [name];
		var signal;
		signal = __map_reserved[name1[0]] != null?signals.getReserved(name1[0]):signals.h[name1[0]];
		if(js_Boot.__instanceof(signal,bindx_FieldSignal)) {
			var listener = (function(name1) {
				return function(from,to) {
					callback(name1[0],from,to);
				};
			})(name1);
			listeners.set(signal,listener);
			signal.add(listener);
		} else {
			var listener1 = (function(name1) {
				return function() {
					callback(name1[0],null,null);
				};
			})(name1);
			listeners.set(signal,listener1);
			signal.add(listener1);
		}
	}
	return function() {
		var $it1 = listeners.keys();
		while( $it1.hasNext() ) {
			var signal1 = $it1.next();
			var listener2 = listeners.h[signal1.__id__];
			if(js_Boot.__instanceof(signal1,bindx_FieldSignal)) signal1.remove(listener2); else signal1.remove(listener2);
		}
	};
};
bindx_SignalTools.getSignals = function(bindable,force) {
	if(force == null) force = true;
	var signals = new haxe_ds_StringMap();
	var meta = haxe_rtti_Meta.getFields(bindable == null?null:js_Boot.getClass(bindable));
	if(meta != null) {
		var _g = 0;
		var _g1 = Reflect.fields(meta);
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			var data = Reflect.field(meta,m);
			if(Object.prototype.hasOwnProperty.call(data,"BindSignal")) {
				var args = Reflect.field(data,"BindSignal");
				var signal = Reflect.field(bindable,m);
				if(signal == null && force) {
					var lazy = args[1];
					if(lazy) signal = Reflect.getProperty(bindable,HxOverrides.substr(m,1,null));
				}
				if(signal != null) {
					var name = args[0];
					if(__map_reserved[name] != null) signals.setReserved(name,signal); else signals.h[name] = signal;
				}
			}
		}
	}
	return signals;
};
var bindx_IBindable = function() { };
$hxClasses["bindx.IBindable"] = bindx_IBindable;
bindx_IBindable.__name__ = ["bindx","IBindable"];
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
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
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
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
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
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
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
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var keys = this.arrayKeys();
		var _g1 = 0;
		var _g = keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			var k = keys[i];
			if(k == null) s.b += "null"; else s.b += "" + k;
			s.b += " => ";
			s.add(Std.string(__map_reserved[k] != null?this.getReserved(k):this.h[k]));
			if(i < keys.length) s.b += ", ";
		}
		s.b += "}";
		return s.b;
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
	,remove: function(k) {
		var key = Type.getClassName(k);
		return this.map.remove(key);
	}
	,keys: function() {
		return (function($this) {
			var $r;
			var _this;
			{
				var _g = [];
				var $it0 = $this.map.keys();
				while( $it0.hasNext() ) {
					var k = $it0.next();
					_g.push(Type.resolveClass(k));
				}
				_this = _g;
			}
			$r = HxOverrides.iter(_this);
			return $r;
		}(this));
	}
	,iterator: function() {
		return this.map.iterator();
	}
	,toString: function() {
		return this.map.toString();
	}
	,getKey: function(k) {
		return Type.getClassName(k);
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
	,setInjector: function(injector) {
		this.injector = injector;
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
	,mapClass: function(whenAskedFor,instantiateClass,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectClassResult(instantiateClass));
		return config;
	}
	,mapSingleton: function(whenAskedFor,named) {
		if(named == null) named = "";
		return this.mapSingletonOf(whenAskedFor,whenAskedFor,named);
	}
	,mapSingletonOf: function(whenAskedFor,useSingletonOf,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectSingletonResult(useSingletonOf));
		return config;
	}
	,mapRule: function(whenAskedFor,useRule,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectOtherRuleResult(useRule));
		return useRule;
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
	,construct: function(theClass) {
		var injecteeDescription;
		if(this.injecteeDescriptions.exists(theClass)) injecteeDescription = this.injecteeDescriptions.get(theClass); else injecteeDescription = this.getInjectionPoints(theClass);
		var injectionPoint = injecteeDescription.ctor;
		return injectionPoint.applyInjection(theClass,this);
	}
	,instantiate: function(theClass) {
		var instance = this.construct(theClass);
		this.injectInto(instance);
		return instance;
	}
	,unmap: function(theClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(theClass,named);
		if(mapping == null) throw new js__$Boot_HaxeError("Error while removing an injector mapping: No mapping defined for class " + this.getClassName(theClass) + ", named \"" + named + "\"");
		mapping.setResult(null);
	}
	,hasMapping: function(forClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(forClass,named);
		if(mapping == null) return false;
		return mapping.hasResponse(this);
	}
	,getInstance: function(ofClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(ofClass,named);
		if(mapping == null || !mapping.hasResponse(this)) throw new js__$Boot_HaxeError("Error while getting mapping response: No mapping defined for class " + this.getClassName(ofClass) + ", named \"" + named + "\"");
		return mapping.getResponse(this);
	}
	,createChildInjector: function() {
		var injector = new minject_Injector();
		injector.set_parentInjector(this);
		return injector;
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
	,set_parentInjector: function(value) {
		if(this.parentInjector != null && value == null) this.attendedToInjectees = new minject_InjecteeSet();
		this.parentInjector = value;
		if(this.parentInjector != null) this.attendedToInjectees = this.parentInjector.attendedToInjectees;
		return this.parentInjector;
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
	,__properties__: {set_parentInjector:"set_parentInjector"}
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
	,remove: function(value) {
		Reflect.deleteField(value,"__injected__");
	}
	,'delete': function(value) {
		this.remove(value);
	}
	,iterator: function() {
		return HxOverrides.iter([]);
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
var minject_result_InjectClassResult = function(responseType) {
	minject_result_InjectionResult.call(this);
	this.responseType = responseType;
};
$hxClasses["minject.result.InjectClassResult"] = minject_result_InjectClassResult;
minject_result_InjectClassResult.__name__ = ["minject","result","InjectClassResult"];
minject_result_InjectClassResult.__super__ = minject_result_InjectionResult;
minject_result_InjectClassResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		return injector.instantiate(this.responseType);
	}
	,toString: function() {
		return "class " + Type.getClassName(this.responseType);
	}
	,__class__: minject_result_InjectClassResult
});
var minject_result_InjectOtherRuleResult = function(rule) {
	minject_result_InjectionResult.call(this);
	this.rule = rule;
};
$hxClasses["minject.result.InjectOtherRuleResult"] = minject_result_InjectOtherRuleResult;
minject_result_InjectOtherRuleResult.__name__ = ["minject","result","InjectOtherRuleResult"];
minject_result_InjectOtherRuleResult.__super__ = minject_result_InjectionResult;
minject_result_InjectOtherRuleResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		return this.rule.getResponse(injector);
	}
	,toString: function() {
		return this.rule.toString();
	}
	,__class__: minject_result_InjectOtherRuleResult
});
var minject_result_InjectSingletonResult = function(responseType) {
	minject_result_InjectionResult.call(this);
	this.responseType = responseType;
};
$hxClasses["minject.result.InjectSingletonResult"] = minject_result_InjectSingletonResult;
minject_result_InjectSingletonResult.__name__ = ["minject","result","InjectSingletonResult"];
minject_result_InjectSingletonResult.__super__ = minject_result_InjectionResult;
minject_result_InjectSingletonResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		if(this.response == null) {
			this.response = this.createResponse(injector);
			injector.injectInto(this.response);
		}
		return this.response;
	}
	,createResponse: function(injector) {
		return injector.construct(this.responseType);
	}
	,toString: function() {
		return "singleton " + Type.getClassName(this.responseType);
	}
	,__class__: minject_result_InjectSingletonResult
});
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
	,append: function(slot) {
		if(slot == null) return this;
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		if(this.tail == msignal_SlotList.NIL) return new msignal_SlotList(slot).prepend(this.head);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
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
	,contains: function(listener) {
		if(!this.nonEmpty) return false;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return true;
			p = p.tail;
		}
		return false;
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
var org_tmdb_Main = function() {
	this._model = new org_tmdb_model_Model();
	this._view = new org_tmdb_view_View();
	this._controller = new org_tmdb_controller_Controller();
	var injector = new minject_Injector();
	injector.mapValue(org_tmdb_model_Model,this._model);
	injector.mapValue(org_tmdb_view_View,this._view);
	injector.injectInto(this._controller);
	this._controller.init();
};
$hxClasses["org.tmdb.Main"] = org_tmdb_Main;
org_tmdb_Main.__name__ = ["org","tmdb","Main"];
org_tmdb_Main.main = function() {
	new org_tmdb_Main();
};
org_tmdb_Main.prototype = {
	__class__: org_tmdb_Main
};
var org_tmdb_components_IComponentController = function() { };
$hxClasses["org.tmdb.components.IComponentController"] = org_tmdb_components_IComponentController;
org_tmdb_components_IComponentController.__name__ = ["org","tmdb","components","IComponentController"];
org_tmdb_components_IComponentController.prototype = {
	__class__: org_tmdb_components_IComponentController
};
var org_tmdb_components_IComponentModel = function() { };
$hxClasses["org.tmdb.components.IComponentModel"] = org_tmdb_components_IComponentModel;
org_tmdb_components_IComponentModel.__name__ = ["org","tmdb","components","IComponentModel"];
org_tmdb_components_IComponentModel.prototype = {
	__class__: org_tmdb_components_IComponentModel
};
var org_tmdb_components_IComponentView = function() { };
$hxClasses["org.tmdb.components.IComponentView"] = org_tmdb_components_IComponentView;
org_tmdb_components_IComponentView.__name__ = ["org","tmdb","components","IComponentView"];
org_tmdb_components_IComponentView.prototype = {
	__class__: org_tmdb_components_IComponentView
};
var org_tmdb_components_moviedetails_MovieDetailsController = function() {
};
$hxClasses["org.tmdb.components.moviedetails.MovieDetailsController"] = org_tmdb_components_moviedetails_MovieDetailsController;
org_tmdb_components_moviedetails_MovieDetailsController.__name__ = ["org","tmdb","components","moviedetails","MovieDetailsController"];
org_tmdb_components_moviedetails_MovieDetailsController.__interfaces__ = [org_tmdb_components_IComponentController];
org_tmdb_components_moviedetails_MovieDetailsController.prototype = {
	init: function() {
		this.model.get_searchStringChanged().add($bind(this,this._hideMovieDetails));
		this.model.get_selectedMovieChanged().add($bind(this,this._getMovieDetails));
	}
	,_hideMovieDetails: function(oldString,newString) {
		if(newString != null) this.view.hideMovieDetails();
	}
	,_getMovieDetails: function(oldMovie,newMovie) {
		if(newMovie > -1) theMovieDb.movies.getById({ id : newMovie},$bind(this,this._onMovieDetailsSuccess),$bind(this,this._onError));
	}
	,_onMovieDetailsSuccess: function(response) {
		this.componentModel.processMovieDetails(response);
		this.view.showMovieDetails(this.componentModel.posterPath,this.componentModel.title,this.componentModel.releaseDate,this.componentModel.overview,this.componentModel.rating);
	}
	,_onError: function(response) {
		window.console.warn(response);
	}
	,reset: function() {
		this.componentModel.reset();
		this.view.reset();
	}
	,__class__: org_tmdb_components_moviedetails_MovieDetailsController
};
var org_tmdb_components_moviedetails_MovieDetailsModel = function() {
};
$hxClasses["org.tmdb.components.moviedetails.MovieDetailsModel"] = org_tmdb_components_moviedetails_MovieDetailsModel;
org_tmdb_components_moviedetails_MovieDetailsModel.__name__ = ["org","tmdb","components","moviedetails","MovieDetailsModel"];
org_tmdb_components_moviedetails_MovieDetailsModel.__interfaces__ = [org_tmdb_components_IComponentModel];
org_tmdb_components_moviedetails_MovieDetailsModel.prototype = {
	init: function() {
		this.title = "";
		this.overview = "";
		this.releaseDate = "";
		this.rating = 0;
		this.posterPath = null;
	}
	,processMovieDetails: function(response) {
		var res = JSON.parse(response);
		this.title = res.original_title;
		this.overview = res.overview;
		this.releaseDate = org_tmdb_utils_FormatUtils.formatDate(res.release_date);
		this.rating = res.vote_average;
		if(res.poster_path != null) this.posterPath = theMovieDb.common.images_uri + "w300" + res.poster_path;
	}
	,reset: function() {
		this.init();
	}
	,__class__: org_tmdb_components_moviedetails_MovieDetailsModel
};
var org_tmdb_components_moviedetails_MovieDetailsView = function() {
	this._movieElement = window.document.getElementById("movie");
};
$hxClasses["org.tmdb.components.moviedetails.MovieDetailsView"] = org_tmdb_components_moviedetails_MovieDetailsView;
org_tmdb_components_moviedetails_MovieDetailsView.__name__ = ["org","tmdb","components","moviedetails","MovieDetailsView"];
org_tmdb_components_moviedetails_MovieDetailsView.__interfaces__ = [org_tmdb_components_IComponentView];
org_tmdb_components_moviedetails_MovieDetailsView.prototype = {
	showMovieDetails: function(posterPath,title,releaseDate,overview,rating) {
		if(posterPath != null) (js_Boot.__cast(window.document.getElementById("moviePoster") , HTMLImageElement)).src = posterPath;
		window.document.getElementById("movieName").innerText = title;
		window.document.getElementById("releaseDate").innerHTML = "<i class='fa fa-calendar'> </i> " + releaseDate;
		window.document.getElementById("movieDescription").innerText = overview;
		window.document.getElementById("movieRating").innerHTML = "<i class='fa fa-star'> </i> " + rating;
		this._movieElement.style.position = "relative";
		this._movieElement.style.visibility = "visible";
	}
	,hideMovieDetails: function() {
		this._movieElement.style.visibility = "hidden";
		(js_Boot.__cast(window.document.getElementById("moviePoster") , HTMLImageElement)).src = "";
		window.document.getElementById("movieDescription").innerText = "";
		this._movieElement.style.position = "absolute";
	}
	,reset: function() {
		this.hideMovieDetails();
	}
	,__class__: org_tmdb_components_moviedetails_MovieDetailsView
};
var org_tmdb_components_search_SearchController = function() {
};
$hxClasses["org.tmdb.components.search.SearchController"] = org_tmdb_components_search_SearchController;
org_tmdb_components_search_SearchController.__name__ = ["org","tmdb","components","search","SearchController"];
org_tmdb_components_search_SearchController.__interfaces__ = [org_tmdb_components_IComponentController];
org_tmdb_components_search_SearchController.prototype = {
	init: function() {
		this.view.getMovieDetails.add($bind(this,this._onGetMovieDetails));
		this.view.search.add($bind(this,this._onSearch));
	}
	,_onGetMovieDetails: function(val) {
		this.model.reset();
		this.model.set_selectedMovie(Std.parseInt(val));
		this.view.clearResults();
	}
	,_onSearch: function(val) {
		this.model.set_searchString(val);
		theMovieDb.search.getMovie({ query : val},$bind(this,this._onSearchSuccess),$bind(this,this._onError));
	}
	,_onSearchSuccess: function(response) {
		this.componentModel.processSearchResults(response);
		this.view.clearResults();
		this.view.hideProgress();
		var $it0 = this.componentModel.movies.iterator();
		while( $it0.hasNext() ) {
			var movie = $it0.next();
			this.view.addMovie(movie.id,movie.original_title,movie.release_date);
		}
	}
	,_onError: function(response) {
		window.console.warn(response);
	}
	,reset: function() {
		this.componentModel.reset();
		this.view.reset();
	}
	,__class__: org_tmdb_components_search_SearchController
};
var org_tmdb_components_search_SearchModel = function() {
};
$hxClasses["org.tmdb.components.search.SearchModel"] = org_tmdb_components_search_SearchModel;
org_tmdb_components_search_SearchModel.__name__ = ["org","tmdb","components","search","SearchModel"];
org_tmdb_components_search_SearchModel.__interfaces__ = [org_tmdb_components_IComponentModel];
org_tmdb_components_search_SearchModel.prototype = {
	init: function() {
		this.movies = new haxe_ds_IntMap();
	}
	,processSearchResults: function(response) {
		var res = JSON.parse(response);
		var _g = 0;
		var _g1 = Reflect.fields(res.results);
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			var movie = Reflect.field(res.results,m);
			this.movies.h[movie.id] = movie;
		}
	}
	,reset: function() {
		this.movies = null;
	}
	,__class__: org_tmdb_components_search_SearchModel
};
var org_tmdb_components_search_SearchView = function() {
	this.search = new msignal_Signal1(String);
	this.getMovieDetails = new msignal_Signal1(String);
	this._progressElement = window.document.getElementById("progress");
	this._searchElement = window.document.getElementById("search");
	this._resultsElement = window.document.getElementById("results");
	this._searchString = "";
	this._searchElement.onkeyup = $bind(this,this._search);
};
$hxClasses["org.tmdb.components.search.SearchView"] = org_tmdb_components_search_SearchView;
org_tmdb_components_search_SearchView.__name__ = ["org","tmdb","components","search","SearchView"];
org_tmdb_components_search_SearchView.__interfaces__ = [org_tmdb_components_IComponentView];
org_tmdb_components_search_SearchView.prototype = {
	_search: function() {
		if(this._delay != null) this._delay.stop();
		this._searchString = StringTools.trim(this._searchElement.value);
		if(this._searchString != "") {
			this.showProgress();
			this._delay = haxe_Timer.delay($bind(this,this._delaySearch),1000);
		}
	}
	,_delaySearch: function() {
		this.search.dispatch(this._searchString);
	}
	,_onSelect: function(evt) {
		this._searchElement.value = evt.target.innerText.split(" (")[0];
		this.getMovieDetails.dispatch(evt.target.id);
	}
	,addMovie: function(id,title,release) {
		var movie;
		var _this = window.document;
		movie = _this.createElement("a");
		movie.className = "item";
		movie.id = "" + id;
		movie.innerText = title + " (" + release + ")";
		movie.onclick = $bind(this,this._onSelect);
		this._resultsElement.appendChild(movie);
	}
	,clearResults: function() {
		this._resultsElement.innerHTML = "";
	}
	,showProgress: function() {
		this._progressElement.style.visibility = "visible";
	}
	,hideProgress: function() {
		this._progressElement.style.visibility = "hidden";
	}
	,reset: function() {
		this._searchString = "";
		this._searchElement.value = "";
		this._progressElement.style.visibility = "hidden";
	}
	,__class__: org_tmdb_components_search_SearchView
};
var org_tmdb_controller_Controller = function() {
	0;
};
$hxClasses["org.tmdb.controller.Controller"] = org_tmdb_controller_Controller;
org_tmdb_controller_Controller.__name__ = ["org","tmdb","controller","Controller"];
org_tmdb_controller_Controller.prototype = {
	init: function() {
		theMovieDb.common.api_key = "e50938fa4e13e8b1b31c287c1b820574";
		this.model.init();
		this.view.init();
		this._setupComponents();
	}
	,_setupComponents: function() {
		var models = CompileTimeClassList.get("null,true,org.tmdb.components.IComponentModel");
		var views = CompileTimeClassList.get("null,true,org.tmdb.components.IComponentView");
		var controllers = CompileTimeClassList.get("null,true,org.tmdb.components.IComponentController");
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
	}
	,_setupComponent: function(modelClass,viewClass,controllerClass) {
		var componentInjector = new minject_Injector();
		componentInjector.mapValue(org_tmdb_model_Model,this.model);
		var componentModel = null;
		var componentView = null;
		if(modelClass != null) {
			componentModel = Type.createInstance(modelClass,[]);
			componentInjector.mapValue(modelClass,componentModel);
			var modelInjector = new minject_Injector();
			modelInjector.mapValue(org_tmdb_model_Model,this.model);
			modelInjector.injectInto(componentModel);
			componentModel.init();
		}
		if(viewClass != null) {
			var viewName = Type.getClassName(viewClass).split(".").pop();
			componentView = Type.createInstance(viewClass,[this.view,viewName]);
			componentInjector.mapValue(viewClass,componentView);
		}
		var componentController = Type.createInstance(controllerClass,[]);
		componentInjector.injectInto(componentController);
		componentController.init();
	}
	,reset: function() {
		this.model.reset();
		this.view.reset();
	}
	,__class__: org_tmdb_controller_Controller
};
var org_tmdb_model_Model = function() {
};
$hxClasses["org.tmdb.model.Model"] = org_tmdb_model_Model;
org_tmdb_model_Model.__name__ = ["org","tmdb","model","Model"];
org_tmdb_model_Model.__interfaces__ = [bindx_IBindable];
org_tmdb_model_Model.prototype = {
	get_selectedMovieChanged: function() {
		if(this._selectedMovieChanged == null) this._selectedMovieChanged = new bindx_FieldSignal();
		return this._selectedMovieChanged;
	}
	,set_selectedMovie: function(value) {
		var __oldValue__ = this.selectedMovie;
		if(__oldValue__ == value) return __oldValue__;
		this.selectedMovie = value;
		if(this._selectedMovieChanged != null) this._selectedMovieChanged.dispatch(__oldValue__,value);
		return value;
	}
	,get_searchStringChanged: function() {
		if(this._searchStringChanged == null) this._searchStringChanged = new bindx_FieldSignal();
		return this._searchStringChanged;
	}
	,set_searchString: function(value) {
		var __oldValue__ = this.searchString;
		if(__oldValue__ == value) return __oldValue__;
		this.searchString = value;
		if(this._searchStringChanged != null) this._searchStringChanged.dispatch(__oldValue__,value);
		return value;
	}
	,init: function() {
		this.set_searchString(null);
		this.set_selectedMovie(-1);
	}
	,reset: function() {
		this.init();
	}
	,__class__: org_tmdb_model_Model
	,__properties__: {set_searchString:"set_searchString",get_searchStringChanged:"get_searchStringChanged",set_selectedMovie:"set_selectedMovie",get_selectedMovieChanged:"get_selectedMovieChanged"}
};
var org_tmdb_utils_FormatUtils = function() { };
$hxClasses["org.tmdb.utils.FormatUtils"] = org_tmdb_utils_FormatUtils;
org_tmdb_utils_FormatUtils.__name__ = ["org","tmdb","utils","FormatUtils"];
org_tmdb_utils_FormatUtils.formatDate = function(dt) {
	var dt1 = dt.split("-");
	var d = new Date(Std.parseInt(dt1[0]),Std.parseInt(dt1[1]),Std.parseInt(dt1[2]),0,0,0);
	var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	return d.getDate() + " " + months[d.getMonth() - 1] + " " + d.getFullYear();
};
var org_tmdb_view_View = function() {
};
$hxClasses["org.tmdb.view.View"] = org_tmdb_view_View;
org_tmdb_view_View.__name__ = ["org","tmdb","view","View"];
org_tmdb_view_View.prototype = {
	init: function() {
	}
	,reset: function() {
	}
	,__class__: org_tmdb_view_View
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
CompileTimeClassList.__meta__ = { obj : { classLists : [["null,true,org.tmdb.components.IComponentModel","org.tmdb.components.moviedetails.MovieDetailsModel,org.tmdb.components.search.SearchModel"],["null,true,org.tmdb.components.IComponentView","org.tmdb.components.moviedetails.MovieDetailsView,org.tmdb.components.search.SearchView"],["null,true,org.tmdb.components.IComponentController","org.tmdb.components.moviedetails.MovieDetailsController,org.tmdb.components.search.SearchController"]]}};
bindx_SignalTools.BIND_SIGNAL_META = "BindSignal";
bindx_SignalTools.SIGNAL_POSTFIX = "Changed";
bindx_IBindable.__meta__ = { obj : { 'interface' : null}};
haxe_IMap.__meta__ = { obj : { 'interface' : null}};
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
minject_point_InjectionPoint.__meta__ = { obj : { 'interface' : null}};
org_tmdb_components_IComponentController.__meta__ = { obj : { 'interface' : null}};
org_tmdb_components_IComponentModel.__meta__ = { obj : { 'interface' : null}};
org_tmdb_components_IComponentView.__meta__ = { obj : { 'interface' : null}};
org_tmdb_components_moviedetails_MovieDetailsController.__meta__ = { fields : { model : { type : ["org.tmdb.model.Model"], inject : null}, componentModel : { type : ["org.tmdb.components.moviedetails.MovieDetailsModel"], inject : null}, view : { type : ["org.tmdb.components.moviedetails.MovieDetailsView"], inject : null}}};
org_tmdb_components_moviedetails_MovieDetailsModel.__meta__ = { fields : { model : { type : ["org.tmdb.model.Model"], inject : null}}};
org_tmdb_components_moviedetails_MovieDetailsModel.POSTER_SIZE = "w300";
org_tmdb_components_search_SearchController.__meta__ = { fields : { model : { type : ["org.tmdb.model.Model"], inject : null}, componentModel : { type : ["org.tmdb.components.search.SearchModel"], inject : null}, view : { type : ["org.tmdb.components.search.SearchView"], inject : null}}};
org_tmdb_components_search_SearchModel.__meta__ = { fields : { model : { type : ["org.tmdb.model.Model"], inject : null}}};
org_tmdb_controller_Controller.__meta__ = { fields : { model : { type : ["org.tmdb.model.Model"], inject : null}, view : { type : ["org.tmdb.view.View"], inject : null}}};
org_tmdb_model_Model.__meta__ = { fields : { _selectedMovieChanged : { BindSignal : ["selectedMovie",true]}, _searchStringChanged : { BindSignal : ["searchString",true]}}};
org_tmdb_model_Model.API_KEY = "e50938fa4e13e8b1b31c287c1b820574";
org_tmdb_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=tmdb-search.js.map