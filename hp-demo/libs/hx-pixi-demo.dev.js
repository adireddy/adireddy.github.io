(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
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
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
};
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
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
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
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
IMap.prototype = {
	__class__: IMap
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
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
	return js.Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
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
var StringCore = function() { };
$hxClasses["StringCore"] = StringCore;
StringCore.__name__ = ["StringCore"];
StringCore.substitute = function(source,values) {
	var _g1 = 0;
	var _g = values.length;
	while(_g1 < _g) {
		var i = _g1++;
		source = source.split("{" + i + "}").join(values[i]);
	}
	return source;
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
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
		throw "Too many arguments";
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumConstructor = function(e) {
	return e[0];
};
Type.enumParameters = function(e) {
	return e.slice(2);
};
var XmlType = $hxClasses["XmlType"] = { __ename__ : ["XmlType"], __constructs__ : [] };
var Xml = function() { };
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
var arm = {};
arm.mvc = {};
arm.mvc.Application = function() {
};
$hxClasses["arm.mvc.Application"] = arm.mvc.Application;
arm.mvc.Application.__name__ = ["arm","mvc","Application"];
arm.mvc.Application.prototype = {
	__class__: arm.mvc.Application
};
arm.mvc.comms = {};
arm.mvc.comms.CommsController = function() {
};
$hxClasses["arm.mvc.comms.CommsController"] = arm.mvc.comms.CommsController;
arm.mvc.comms.CommsController.__name__ = ["arm","mvc","comms","CommsController"];
arm.mvc.comms.CommsController.prototype = {
	__class__: arm.mvc.comms.CommsController
};
arm.mvc.controller = {};
arm.mvc.controller.IController = function() { };
$hxClasses["arm.mvc.controller.IController"] = arm.mvc.controller.IController;
arm.mvc.controller.IController.__name__ = ["arm","mvc","controller","IController"];
arm.mvc.controller.Controller = function(m,v,c) {
	this.model = m;
	this.view = v;
	this.comms = c;
	this._addNotificationListeners();
	this._addViewListeners();
	this._setupComponents();
};
$hxClasses["arm.mvc.controller.Controller"] = arm.mvc.controller.Controller;
arm.mvc.controller.Controller.__name__ = ["arm","mvc","controller","Controller"];
arm.mvc.controller.Controller.__interfaces__ = [arm.mvc.controller.IController];
arm.mvc.controller.Controller.prototype = {
	_addNotificationListeners: function() {
	}
	,_addViewListeners: function() {
	}
	,_setupComponents: function() {
	}
	,__class__: arm.mvc.controller.Controller
};
arm.mvc.components = {};
arm.mvc.components.ComponentController = function(m,v,c,mm) {
	arm.mvc.controller.Controller.call(this,m,v,c);
	this.mainModel = mm;
};
$hxClasses["arm.mvc.components.ComponentController"] = arm.mvc.components.ComponentController;
arm.mvc.components.ComponentController.__name__ = ["arm","mvc","components","ComponentController"];
arm.mvc.components.ComponentController.__super__ = arm.mvc.controller.Controller;
arm.mvc.components.ComponentController.prototype = $extend(arm.mvc.controller.Controller.prototype,{
	_addNotificationListeners: function() {
		arm.mvc.controller.Controller.prototype._addNotificationListeners.call(this);
		arm.mvc.notifications.ViewStateNotification.preload.addOnce($bind(this,this._preload));
		arm.mvc.notifications.ViewStateNotification.create.addOnce($bind(this,this._create));
		arm.mvc.notifications.ViewStateNotification.update.add($bind(this,this._update));
		arm.mvc.notifications.ViewStateNotification.resize.add($bind(this,this._resize));
	}
	,_preload: function() {
	}
	,_create: function() {
	}
	,_update: function(elapsedTime) {
	}
	,_resize: function() {
	}
	,__class__: arm.mvc.components.ComponentController
});
arm.mvc.model = {};
arm.mvc.model.IModel = function() { };
$hxClasses["arm.mvc.model.IModel"] = arm.mvc.model.IModel;
arm.mvc.model.IModel.__name__ = ["arm","mvc","model","IModel"];
arm.mvc.model.Model = function() {
	this.reset();
};
$hxClasses["arm.mvc.model.Model"] = arm.mvc.model.Model;
arm.mvc.model.Model.__name__ = ["arm","mvc","model","Model"];
arm.mvc.model.Model.__interfaces__ = [arm.mvc.model.IModel];
arm.mvc.model.Model.prototype = {
	reset: function() {
	}
	,__class__: arm.mvc.model.Model
};
arm.mvc.components.ComponentModel = function() { };
$hxClasses["arm.mvc.components.ComponentModel"] = arm.mvc.components.ComponentModel;
arm.mvc.components.ComponentModel.__name__ = ["arm","mvc","components","ComponentModel"];
arm.mvc.components.ComponentModel.__super__ = arm.mvc.model.Model;
arm.mvc.components.ComponentModel.prototype = $extend(arm.mvc.model.Model.prototype,{
	__class__: arm.mvc.components.ComponentModel
});
arm.mvc.view = {};
arm.mvc.view.IView = function() { };
$hxClasses["arm.mvc.view.IView"] = arm.mvc.view.IView;
arm.mvc.view.IView.__name__ = ["arm","mvc","view","IView"];
arm.mvc.view.View = function(stage,container) {
	this.set_stage(stage);
	this.set_container(container);
};
$hxClasses["arm.mvc.view.View"] = arm.mvc.view.View;
arm.mvc.view.View.__name__ = ["arm","mvc","view","View"];
arm.mvc.view.View.__interfaces__ = [arm.mvc.view.IView];
arm.mvc.view.View.prototype = {
	set_stage: function(stage) {
		return this.stage = stage;
	}
	,set_container: function(container) {
		return this.container = container;
	}
	,__class__: arm.mvc.view.View
	,__properties__: {set_container:"set_container",set_stage:"set_stage"}
};
arm.mvc.components.ComponentView = function(stage,container) {
	arm.mvc.view.View.call(this,stage,container);
};
$hxClasses["arm.mvc.components.ComponentView"] = arm.mvc.components.ComponentView;
arm.mvc.components.ComponentView.__name__ = ["arm","mvc","components","ComponentView"];
arm.mvc.components.ComponentView.__super__ = arm.mvc.view.View;
arm.mvc.components.ComponentView.prototype = $extend(arm.mvc.view.View.prototype,{
	__class__: arm.mvc.components.ComponentView
});
var msignal = {};
msignal.Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal.SlotList.NIL;
	this.priorityBased = false;
};
$hxClasses["msignal.Signal"] = msignal.Signal;
msignal.Signal.__name__ = ["msignal","Signal"];
msignal.Signal.prototype = {
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
		if(existingSlot.once != once) throw "You cannot addOnce() then add() the same listener without removing the relationship first.";
		return false;
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,__class__: msignal.Signal
};
msignal.Signal0 = function() {
	msignal.Signal.call(this);
};
$hxClasses["msignal.Signal0"] = msignal.Signal0;
msignal.Signal0.__name__ = ["msignal","Signal0"];
msignal.Signal0.__super__ = msignal.Signal;
msignal.Signal0.prototype = $extend(msignal.Signal.prototype,{
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
		return new msignal.Slot0(this,listener,once,priority);
	}
	,__class__: msignal.Signal0
});
msignal.SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) {
		if(msignal.SlotList.NIL != null) throw "Parameters head and tail are null. Use the NIL element instead.";
		this.nonEmpty = false;
	} else if(head == null) throw "Parameter head cannot be null."; else {
		this.head = head;
		if(tail == null) this.tail = msignal.SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
$hxClasses["msignal.SlotList"] = msignal.SlotList;
msignal.SlotList.__name__ = ["msignal","SlotList"];
msignal.SlotList.prototype = {
	prepend: function(slot) {
		return new msignal.SlotList(slot,this);
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal.SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal.SlotList(slot);
		return wholeClone;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal.SlotList(current.head);
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
	,__class__: msignal.SlotList
};
msignal.Signal1 = function(type) {
	msignal.Signal.call(this,[type]);
};
$hxClasses["msignal.Signal1"] = msignal.Signal1;
msignal.Signal1.__name__ = ["msignal","Signal1"];
msignal.Signal1.__super__ = msignal.Signal;
msignal.Signal1.prototype = $extend(msignal.Signal.prototype,{
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
		return new msignal.Slot1(this,listener,once,priority);
	}
	,__class__: msignal.Signal1
});
arm.mvc.notifications = {};
arm.mvc.notifications.ViewStateNotification = function() { };
$hxClasses["arm.mvc.notifications.ViewStateNotification"] = arm.mvc.notifications.ViewStateNotification;
arm.mvc.notifications.ViewStateNotification.__name__ = ["arm","mvc","notifications","ViewStateNotification"];
arm.pixidemo = {};
arm.pixidemo.Demo = function() {
	arm.mvc.Application.call(this);
	mconsole.Console.start();
	this._skipFrame = false;
	this._setStageProperties();
	this._setAssetFolders();
	this._setupApplication();
	this._showStats();
	this._setupMVCS();
	this._loadBucketSizes();
};
$hxClasses["arm.pixidemo.Demo"] = arm.pixidemo.Demo;
arm.pixidemo.Demo.__name__ = ["arm","pixidemo","Demo"];
arm.pixidemo.Demo.main = function() {
	new arm.pixidemo.Demo();
	haxe.Log.trace("info",{ fileName : "Demo.hx", lineNumber : 214, className : "arm.pixidemo.Demo", methodName : "main", customParams : ["Build ID: ","603e1f9303e6b6c4a7210b0e74fcf0c1"]});
};
arm.pixidemo.Demo.__super__ = arm.mvc.Application;
arm.pixidemo.Demo.prototype = $extend(arm.mvc.Application.prototype,{
	_setStageProperties: function() {
		arm.pixidemo.view.StageProperties.actualPixelRatio = window.devicePixelRatio;
		arm.pixidemo.view.StageProperties.pixelRatio = arm.pixidemo.core.utils.BrowserUtils.getPixelRatio();
		arm.pixidemo.view.StageProperties.screenWidth = window.innerWidth;
		arm.pixidemo.view.StageProperties.screenHeight = window.innerHeight;
		if(arm.pixidemo.view.StageProperties.screenWidth > arm.pixidemo.view.StageProperties.screenHeight) arm.pixidemo.view.StageProperties.orientation = "LANDSCAPE"; else arm.pixidemo.view.StageProperties.orientation = "PORTRAIT";
	}
	,_setAssetFolders: function() {
		this._localeFolder = "en";
		this._scaleFolder = "scale-" + arm.pixidemo.view.StageProperties.pixelRatio;
		pixi.resources.Loader.BASE_URL = "assets/" + this._localeFolder + "/";
	}
	,_setupApplication: function() {
		this._canvas = window.document.getElementById("game");
		this._canvas.style.width = arm.pixidemo.view.StageProperties.screenWidth + "px";
		this._canvas.style.height = arm.pixidemo.view.StageProperties.screenHeight + "px";
		this._game = new PIXI.Stage(16777215);
		this._gameContainer = new PIXI.DisplayObjectContainer();
		this._game.addChild(this._gameContainer);
		var renderingOptions = { };
		renderingOptions.view = this._canvas;
		renderingOptions.resolution = arm.pixidemo.view.StageProperties.pixelRatio;
		this._renderer = PIXI.autoDetectRenderer(arm.pixidemo.view.StageProperties.screenWidth,arm.pixidemo.view.StageProperties.screenHeight,renderingOptions);
		window.document.body.appendChild(this._renderer.view);
		window.onresize = $bind(this,this._onResize);
		window.requestAnimationFrame($bind(this,this._update));
		this._lastTime = new Date();
	}
	,_setupMVCS: function() {
		this.view = new arm.pixidemo.view.DemoView(this._game,this._gameContainer);
		this.comms = new arm.pixidemo.comms.DemoCommsController();
		this.model = new arm.pixidemo.model.DemoModel();
		this.controller = new arm.pixidemo.controller.DemoController(this.model,this.view,this.comms);
	}
	,_showStats: function() {
		var _container = window.document.createElement("div");
		window.document.body.appendChild(_container);
		this._stats = new Stats();
		this._stats.domElement.style.position = "absolute";
		this._stats.domElement.style.top = "6px";
		this._stats.domElement.style.right = "6px";
		_container.appendChild(this._stats.domElement);
		this._stats.begin();
	}
	,_loadBucketSizes: function() {
		pixi.resources.Loader.loadJson("bucket_sizes.json");
		pixi.resources.Loader.jsonLoadComplete.addOnce($bind(this,this._onBucketSizesLoaded));
	}
	,_onBucketSizesLoaded: function(json) {
		var buckets = json;
		var bucketSizes;
		if(arm.pixidemo.view.StageProperties.orientation == "LANDSCAPE") bucketSizes = buckets.landscape; else bucketSizes = buckets.portrait;
		var closestBucket = bucketSizes[0];
		var _g1 = 0;
		var _g = bucketSizes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var bucket = bucketSizes[i];
			if(bucket.height <= arm.pixidemo.view.StageProperties.screenHeight) closestBucket = bucket;
		}
		arm.pixidemo.view.StageProperties.bucketWidth = closestBucket.width;
		arm.pixidemo.view.StageProperties.bucketHeight = closestBucket.height;
		this._updateScreenValues();
		this._bucketFolder = Math.max(arm.pixidemo.view.StageProperties.bucketWidth,arm.pixidemo.view.StageProperties.bucketHeight) + "x" + Math.min(arm.pixidemo.view.StageProperties.bucketWidth,arm.pixidemo.view.StageProperties.bucketHeight);
		this._baseFolder = "assets/" + this._localeFolder + "/" + this._bucketFolder + "/" + this._scaleFolder + "/";
		pixi.resources.Loader.BUCKET_URL = pixi.resources.Loader.BASE_URL + this._bucketFolder + "/";
		pixi.resources.Loader.SCALE_URL = pixi.resources.Loader.BUCKET_URL + this._scaleFolder + "/";
		pixi.resources.Loader.loadJson("settings.json");
		pixi.resources.Loader.jsonLoadComplete.addOnce($bind(this,this._onLocaleSettingsLoaded));
	}
	,_onLocaleSettingsLoaded: function(json) {
		var _g = 0;
		var _g1 = Reflect.fields(json);
		while(_g < _g1.length) {
			var n = _g1[_g];
			++_g;
			Reflect.setField(arm.pixidemo.resources.Settings,n,Reflect.field(json,n));
		}
		pixi.resources.Loader.loadJson("settings.json",true);
		pixi.resources.Loader.jsonLoadComplete.addOnce($bind(this,this._onBucketSettingsLoaded));
	}
	,_onBucketSettingsLoaded: function(json) {
		var _g = 0;
		var _g1 = Reflect.fields(json);
		while(_g < _g1.length) {
			var n = _g1[_g];
			++_g;
			Reflect.setField(arm.pixidemo.resources.Settings,n,Reflect.field(json,n));
		}
		pixi.resources.Loader.loadJson("messages.json");
		pixi.resources.Loader.jsonLoadComplete.addOnce($bind(this,this._onLocaleMessagesLoaded));
	}
	,_onLocaleMessagesLoaded: function(json) {
		var _g = 0;
		var _g1 = Reflect.fields(json);
		while(_g < _g1.length) {
			var n = _g1[_g];
			++_g;
			Reflect.setField(arm.pixidemo.resources.Messages,n,Reflect.field(json,n));
		}
		pixi.resources.Loader.loadJson("messages.json",true);
		pixi.resources.Loader.jsonLoadComplete.addOnce($bind(this,this._onBucketMessagesLoaded));
	}
	,_onBucketMessagesLoaded: function(json) {
		var _g = 0;
		var _g1 = Reflect.fields(json);
		while(_g < _g1.length) {
			var n = _g1[_g];
			++_g;
			Reflect.setField(arm.pixidemo.resources.Messages,n,Reflect.field(json,n));
		}
		pixi.resources.Loader.loadJson("layout.json",true);
		pixi.resources.Loader.jsonLoadComplete.addOnce($bind(this,this._onBucketLayoutLoaded));
	}
	,_onBucketLayoutLoaded: function(json) {
		var _g = 0;
		var _g1 = Reflect.fields(json);
		while(_g < _g1.length) {
			var n = _g1[_g];
			++_g;
			Reflect.setField(arm.pixidemo.resources.Layout,n,Reflect.field(json,n));
		}
		arm.mvc.notifications.ViewStateNotification.preloader.dispatch();
	}
	,_updateScreenValues: function() {
		arm.pixidemo.view.StageProperties.screenX = (arm.pixidemo.view.StageProperties.screenWidth - arm.pixidemo.view.StageProperties.bucketWidth) / 2;
		arm.pixidemo.view.StageProperties.screenY = (arm.pixidemo.view.StageProperties.screenHeight - arm.pixidemo.view.StageProperties.bucketHeight) / 2;
		var horizontalOverlap = arm.pixidemo.view.StageProperties.screenWidth > arm.pixidemo.view.StageProperties.bucketWidth;
		var verticalOverlap = arm.pixidemo.view.StageProperties.screenHeight > arm.pixidemo.view.StageProperties.bucketHeight;
		if(horizontalOverlap && verticalOverlap) arm.pixidemo.view.StageProperties.bucketOverlapType = "BUCKET_OVERLAP_FULL"; else if(horizontalOverlap) arm.pixidemo.view.StageProperties.bucketOverlapType = "BUCKET_OVERLAP_HORIZONTAL"; else if(verticalOverlap) arm.pixidemo.view.StageProperties.bucketOverlapType = "BUCKET_OVERLAP_VERTICAL";
	}
	,_update: function() {
		if(this._skipFrame) this._skipFrame = false; else {
			this._renderer.render(this._game);
			this._skipFrame = true;
			this._currentTime = new Date();
			arm.mvc.notifications.ViewStateNotification.update.dispatch(this._currentTime.getTime() - this._lastTime.getTime());
			this._lastTime = this._currentTime;
		}
		window.requestAnimationFrame($bind(this,this._update));
		this._stats.update();
	}
	,_onResize: function(event) {
		arm.pixidemo.view.StageProperties.screenWidth = window.innerWidth;
		arm.pixidemo.view.StageProperties.screenHeight = window.innerHeight;
		this._renderer.resize(arm.pixidemo.view.StageProperties.screenWidth,arm.pixidemo.view.StageProperties.screenHeight);
		this._canvas.style.width = arm.pixidemo.view.StageProperties.screenWidth + "px";
		this._canvas.style.height = arm.pixidemo.view.StageProperties.screenHeight + "px";
		this._updateScreenValues();
		arm.mvc.notifications.ViewStateNotification.resize.dispatch();
	}
	,__class__: arm.pixidemo.Demo
});
arm.pixidemo.comms = {};
arm.pixidemo.comms.DemoCommsController = function() {
	mcover.coverage.MCoverage.getLogger().logStatement(0);
	arm.mvc.comms.CommsController.call(this);
};
$hxClasses["arm.pixidemo.comms.DemoCommsController"] = arm.pixidemo.comms.DemoCommsController;
arm.pixidemo.comms.DemoCommsController.__name__ = ["arm","pixidemo","comms","DemoCommsController"];
arm.pixidemo.comms.DemoCommsController.__super__ = arm.mvc.comms.CommsController;
arm.pixidemo.comms.DemoCommsController.prototype = $extend(arm.mvc.comms.CommsController.prototype,{
	__class__: arm.pixidemo.comms.DemoCommsController
});
arm.pixidemo.components = {};
arm.pixidemo.components.GameComponentController = function(m,v,c,mm) {
	mcover.coverage.MCoverage.getLogger().logStatement(1);
	arm.mvc.components.ComponentController.call(this,m,v,c,mm);
	if(mcover.coverage.MCoverage.getLogger().logBranch(0,this.mainModel != null)) this.gameMainModel = js.Boot.__cast(this.mainModel , arm.pixidemo.model.DemoModel);
	if(mcover.coverage.MCoverage.getLogger().logBranch(1,this.comms != null)) this.gameComms = js.Boot.__cast(this.comms , arm.pixidemo.comms.DemoCommsController);
};
$hxClasses["arm.pixidemo.components.GameComponentController"] = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.GameComponentController.__name__ = ["arm","pixidemo","components","GameComponentController"];
arm.pixidemo.components.GameComponentController.__super__ = arm.mvc.components.ComponentController;
arm.pixidemo.components.GameComponentController.prototype = $extend(arm.mvc.components.ComponentController.prototype,{
	__class__: arm.pixidemo.components.GameComponentController
});
arm.pixidemo.components.GameComponentView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(9);
	arm.mvc.components.ComponentView.call(this,stage,container);
	this.gameStage = js.Boot.__cast(stage , PIXI.Stage);
	if(mcover.coverage.MCoverage.getLogger().logBranch(6,container != null)) this.gameContainer = js.Boot.__cast(container , PIXI.DisplayObjectContainer);
	mcover.coverage.MCoverage.getLogger().logStatement(23);
	if(mcover.coverage.MCoverage.getLogger().logBranch(10,arm.pixidemo.resources.Messages._instance == null)) this._messages = arm.pixidemo.resources.Messages._instance = new arm.pixidemo.resources.Messages(); else this._messages = arm.pixidemo.resources.Messages._instance;
	mcover.coverage.MCoverage.getLogger().logStatement(26);
	if(mcover.coverage.MCoverage.getLogger().logBranch(12,arm.pixidemo.resources.Layout._instance == null)) this._layout = arm.pixidemo.resources.Layout._instance = new arm.pixidemo.resources.Layout(); else this._layout = arm.pixidemo.resources.Layout._instance;
	mcover.coverage.MCoverage.getLogger().logStatement(29);
	if(mcover.coverage.MCoverage.getLogger().logBranch(13,arm.pixidemo.resources.Settings._instance == null)) this._settings = arm.pixidemo.resources.Settings._instance = new arm.pixidemo.resources.Settings(); else this._settings = arm.pixidemo.resources.Settings._instance;
	mcover.coverage.MCoverage.getLogger().logStatement(32);
	if(mcover.coverage.MCoverage.getLogger().logBranch(14,arm.pixidemo.resources.Sounds._instance == null)) this._sounds = arm.pixidemo.resources.Sounds._instance = new arm.pixidemo.resources.Sounds(); else this._sounds = arm.pixidemo.resources.Sounds._instance;
};
$hxClasses["arm.pixidemo.components.GameComponentView"] = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.GameComponentView.__name__ = ["arm","pixidemo","components","GameComponentView"];
arm.pixidemo.components.GameComponentView.__super__ = arm.mvc.components.ComponentView;
arm.pixidemo.components.GameComponentView.prototype = $extend(arm.mvc.components.ComponentView.prototype,{
	_applyScale: function(item) {
		mcover.coverage.MCoverage.getLogger().logStatement(12);
		item.scale.set(1 / arm.pixidemo.view.StageProperties.pixelRatio,1 / arm.pixidemo.view.StageProperties.pixelRatio);
	}
	,__class__: arm.pixidemo.components.GameComponentView
});
arm.pixidemo.components.audio = {};
arm.pixidemo.components.audio.AudioController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 9;
	mcover.coverage.MCoverage.getLogger().logStatement(2);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.audio.AudioView);
};
$hxClasses["arm.pixidemo.components.audio.AudioController"] = arm.pixidemo.components.audio.AudioController;
arm.pixidemo.components.audio.AudioController.__name__ = ["arm","pixidemo","components","audio","AudioController"];
arm.pixidemo.components.audio.AudioController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.audio.AudioController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(3);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(4);
		if(mcover.coverage.MCoverage.getLogger().logBranch(2,this._showing)) this._view.resize();
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(6);
		if(mcover.coverage.MCoverage.getLogger().logBranch(3,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(5);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(8);
		if(mcover.coverage.MCoverage.getLogger().logBranch(5,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(7);
			if(mcover.coverage.MCoverage.getLogger().logBranch(4,!this._showing)) this._view.show();
			this._showing = true;
		}
	}
	,__class__: arm.pixidemo.components.audio.AudioController
});
arm.pixidemo.components.audio.AudioView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(13);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.audio.AudioView"] = arm.pixidemo.components.audio.AudioView;
arm.pixidemo.components.audio.AudioView.__name__ = ["arm","pixidemo","components","audio","AudioView"];
arm.pixidemo.components.audio.AudioView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.audio.AudioView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(15);
		this._uiContainer = new PIXI.DisplayObjectContainer();
		this.gameContainer.addChild(this._uiContainer);
		this._buttons = [];
		this._bgSound = this._sounds.getSound("bg");
		this._bgSound.loop(true);
		this._addButton("BG SOUND",0,0,90,30,$bind(this,this._playBGSound));
		var _g = 1;
		while(_g < 5) {
			var i = _g++;
			mcover.coverage.MCoverage.getLogger().logStatement(14);
			this._addButton("SOUND " + i,i * 90,0,90,30,$bind(this,this._playSound),i);
		}
		this._addButton("RESET",450,0,60,30,$bind(this,this._stopAll));
		this.resize();
	}
	,_playBGSound: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(16);
		this._bgSound.play();
	}
	,_playSound: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(17);
		if(mcover.coverage.MCoverage.getLogger().logBranch(7,this._sound != null)) this._sound.stop();
		this._sound = this._sounds.getSound("sound" + id);
		this._sound.play();
	}
	,_stopAll: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(18);
		this._bgSound.stop();
		this._sound.stop();
	}
	,_addButton: function(label,x,y,width,height,callback,data) {
		mcover.coverage.MCoverage.getLogger().logStatement(19);
		var button = new pixi.widgets.Button(label,width,height,data);
		button.x = x;
		button.y = y;
		button.action.add(callback);
		button.enable();
		this._buttons.push(button);
		this._uiContainer.addChild(button);
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(21);
		var _g1 = 0;
		var _g = this._buttons.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(20);
			var button = this._buttons[i];
			this._uiContainer.removeChild(button);
			this._buttons[i] = null;
		}
		this._buttons = null;
		this.gameContainer.removeChild(this._uiContainer);
		this._uiContainer = null;
		if(mcover.coverage.MCoverage.getLogger().logBranch(8,this._bgSound != null)) this._bgSound.stop();
		if(mcover.coverage.MCoverage.getLogger().logBranch(9,this._sound != null)) this._sound.stop();
		this._bgSound = null;
		this._sound = null;
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(22);
		this._uiContainer.x = (arm.pixidemo.view.StageProperties.screenWidth - 510) / 2;
		this._uiContainer.y = (arm.pixidemo.view.StageProperties.screenHeight - 30) / 2;
		haxe.Log.trace(this._uiContainer.width,{ fileName : "AudioView.hx", lineNumber : 77, className : "arm.pixidemo.components.audio.AudioView", methodName : "resize", customParams : [this._uiContainer.height]});
	}
	,__class__: arm.pixidemo.components.audio.AudioView
});
arm.pixidemo.components.bunnymark = {};
arm.pixidemo.components.bunnymark.Bunny = function(texture) {
	mcover.coverage.MCoverage.getLogger().logStatement(36);
	PIXI.Sprite.call(this,texture);
};
$hxClasses["arm.pixidemo.components.bunnymark.Bunny"] = arm.pixidemo.components.bunnymark.Bunny;
arm.pixidemo.components.bunnymark.Bunny.__name__ = ["arm","pixidemo","components","bunnymark","Bunny"];
arm.pixidemo.components.bunnymark.Bunny.__super__ = PIXI.Sprite;
arm.pixidemo.components.bunnymark.Bunny.prototype = $extend(PIXI.Sprite.prototype,{
	__class__: arm.pixidemo.components.bunnymark.Bunny
});
arm.pixidemo.components.bunnymark.BunnymarkController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 5;
	mcover.coverage.MCoverage.getLogger().logStatement(37);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.bunnymark.BunnymarkView);
};
$hxClasses["arm.pixidemo.components.bunnymark.BunnymarkController"] = arm.pixidemo.components.bunnymark.BunnymarkController;
arm.pixidemo.components.bunnymark.BunnymarkController.__name__ = ["arm","pixidemo","components","bunnymark","BunnymarkController"];
arm.pixidemo.components.bunnymark.BunnymarkController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.bunnymark.BunnymarkController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_update: function(elapsedTime) {
		mcover.coverage.MCoverage.getLogger().logStatement(38);
		if(mcover.coverage.MCoverage.getLogger().logBranch(15,this._showing)) this._view.update(elapsedTime);
	}
	,_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(39);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(40);
		if(mcover.coverage.MCoverage.getLogger().logBranch(16,this._showing)) this._view.resize();
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(42);
		if(mcover.coverage.MCoverage.getLogger().logBranch(17,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(41);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(44);
		if(mcover.coverage.MCoverage.getLogger().logBranch(19,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(43);
			if(mcover.coverage.MCoverage.getLogger().logBranch(18,!this._showing)) this._view.show();
			this._showing = true;
		}
	}
	,__class__: arm.pixidemo.components.bunnymark.BunnymarkController
});
arm.pixidemo.components.bunnymark.BunnymarkView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(45);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.bunnymark.BunnymarkView"] = arm.pixidemo.components.bunnymark.BunnymarkView;
arm.pixidemo.components.bunnymark.BunnymarkView.__name__ = ["arm","pixidemo","components","bunnymark","BunnymarkView"];
arm.pixidemo.components.bunnymark.BunnymarkView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.bunnymark.BunnymarkView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(46);
		this._bunnyTexture = PIXI.Texture.fromImage(pixi.resources.Loader.SCALE_URL + "bunnys/images/bunny.png");
		this._sprites = [];
		this._buttons = [];
		this._spriteContainer = new PIXI.DisplayObjectContainer();
		this._uiContainer = new PIXI.DisplayObjectContainer();
		this._addButton("Reset",0,0,100,30,$bind(this,this._reset));
		this._addButton("Scale",100,0,100,30,$bind(this,this._scale));
		this._addButton("Rotation",200,0,100,30,$bind(this,this._rotation));
		this._addButton("Add 10",0,30,100,30,$bind(this,this._addBunnys),10);
		this._addButton("Add 100",100,30,100,30,$bind(this,this._addBunnys),100);
		this._addButton("Add 500",200,30,100,30,$bind(this,this._addBunnys),500);
		this._addButton("Add 1000",0,60,100,30,$bind(this,this._addBunnys),1000);
		this._addButton("Add 5000",100,60,100,30,$bind(this,this._addBunnys),5000);
		this._addButton("Add 10000",200,60,100,30,$bind(this,this._addBunnys),10000);
		this._quantityLabel = new pixi.widgets.Label("",300,24);
		this._quantityLabel.y = 90;
		this._uiContainer.addChild(this._quantityLabel);
		this.resize();
		this._updateQuanityLabel();
		this.gameContainer.addChild(this._spriteContainer);
		this.gameContainer.addChild(this._uiContainer);
	}
	,_addButton: function(label,x,y,width,height,callback,data) {
		mcover.coverage.MCoverage.getLogger().logStatement(47);
		var button = new pixi.widgets.Button(label,width,height,data);
		button.x = x;
		button.y = y;
		button.action.add(callback);
		button.enable();
		this._buttons.push(button);
		this._uiContainer.addChild(button);
	}
	,_updateQuanityLabel: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(48);
		this._quantityLabel.setText("Quantity: " + this._sprites.length);
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(50);
		var _g1 = 0;
		var _g = this._sprites.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(49);
			this._spriteContainer.removeChild(this._sprites[i]);
		}
		this._sprites = [];
		this._isScale = false;
		this._isRotation = false;
		this._updateQuanityLabel();
	}
	,_scale: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(51);
		this._isScale = !this._isScale;
	}
	,_rotation: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(52);
		this._isRotation = !this._isRotation;
	}
	,_addBunnys: function(count) {
		mcover.coverage.MCoverage.getLogger().logStatement(54);
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			mcover.coverage.MCoverage.getLogger().logStatement(53);
			var bunny = new arm.pixidemo.components.bunnymark.Bunny(this._bunnyTexture);
			this._spriteContainer.addChild(bunny);
			bunny.x = Std.random(arm.pixidemo.view.StageProperties.screenWidth | 0);
			bunny.y = Std.random(arm.pixidemo.view.StageProperties.screenHeight | 0);
			bunny.anchor.set(0.5,0.5);
			bunny.speedX = Math.random() * 16 + 2;
			bunny.speedY = Math.random() * 16 - 10;
			bunny.rotationSpeed = Math.random() / 50 + 0.01;
			bunny.scaleSpeed = Math.random() / 50 + 0.01;
			this._sprites.push(bunny);
			this._applyScale(bunny);
		}
		this._updateQuanityLabel();
	}
	,update: function(elapsedTime) {
		mcover.coverage.MCoverage.getLogger().logStatement(61);
		var _g1 = 0;
		var _g = this._sprites.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(60);
			var bunny = this._sprites[i];
			bunny.position.x += bunny.speedX;
			bunny.position.y += bunny.speedY;
			bunny.speedY += 4.75;
			if(mcover.coverage.MCoverage.getLogger().logBranch(21,bunny.position.x > this._maxX)) {
				mcover.coverage.MCoverage.getLogger().logStatement(55);
				bunny.speedX *= -1;
				bunny.position.x = this._maxX;
			} else if(mcover.coverage.MCoverage.getLogger().logBranch(20,bunny.position.x < this._minX)) {
				mcover.coverage.MCoverage.getLogger().logStatement(56);
				bunny.speedX *= -1;
				bunny.position.x = this._minX;
			}
			if(mcover.coverage.MCoverage.getLogger().logBranch(24,bunny.position.y > this._maxY)) {
				mcover.coverage.MCoverage.getLogger().logStatement(57);
				bunny.speedY *= -0.90;
				bunny.position.y = this._maxY;
				if(mcover.coverage.MCoverage.getLogger().logBranch(22,Math.random() > 0.5)) bunny.speedY -= Math.random() * 6;
			} else if(mcover.coverage.MCoverage.getLogger().logBranch(23,bunny.position.y < this._minY)) {
				mcover.coverage.MCoverage.getLogger().logStatement(58);
				bunny.speedY = 0;
				bunny.position.y = this._minY;
			}
			if(mcover.coverage.MCoverage.getLogger().logBranch(27,this._isScale)) {
				mcover.coverage.MCoverage.getLogger().logStatement(59);
				bunny.scale.x += bunny.scaleSpeed;
				bunny.scale.y += bunny.scaleSpeed;
				if(mcover.coverage.MCoverage.getLogger().logBranch(26,bunny.scale.x > 2)) bunny.scaleSpeed = -bunny.scaleSpeed; else if(mcover.coverage.MCoverage.getLogger().logBranch(25,bunny.scale.x < 0.01)) bunny.scaleSpeed = -bunny.scaleSpeed;
			}
			if(mcover.coverage.MCoverage.getLogger().logBranch(28,this._isRotation)) bunny.rotation += bunny.rotationSpeed;
		}
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(63);
		this._reset();
		var _g1 = 0;
		var _g = this._buttons.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(62);
			var button = this._buttons[i];
			button.disable();
			this._uiContainer.removeChild(button);
			this._buttons[i] = null;
		}
		this._isScale = false;
		this._isRotation = false;
		this._uiContainer.removeChild(this._quantityLabel);
		this.gameContainer.removeChild(this._spriteContainer);
		this.gameContainer.removeChild(this._uiContainer);
		this._spriteContainer = null;
		this._uiContainer = null;
		this._quantityLabel = null;
		this._buttons = null;
		this._sprites = null;
		this._bunnyTexture = null;
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(64);
		this._minX = this._minY = 0;
		this._maxX = arm.pixidemo.view.StageProperties.screenWidth;
		this._maxY = arm.pixidemo.view.StageProperties.screenHeight;
		this._uiContainer.x = (arm.pixidemo.view.StageProperties.screenWidth - 300) / 2;
		this._uiContainer.y = arm.pixidemo.view.StageProperties.screenY + 20;
		haxe.Log.trace(this._uiContainer.width,{ fileName : "BunnymarkView.hx", lineNumber : 177, className : "arm.pixidemo.components.bunnymark.BunnymarkView", methodName : "resize"});
	}
	,__class__: arm.pixidemo.components.bunnymark.BunnymarkView
});
arm.pixidemo.components.coins = {};
arm.pixidemo.components.coins.Coin = function(textures) {
	mcover.coverage.MCoverage.getLogger().logStatement(65);
	PIXI.MovieClip.call(this,textures);
};
$hxClasses["arm.pixidemo.components.coins.Coin"] = arm.pixidemo.components.coins.Coin;
arm.pixidemo.components.coins.Coin.__name__ = ["arm","pixidemo","components","coins","Coin"];
arm.pixidemo.components.coins.Coin.__super__ = PIXI.MovieClip;
arm.pixidemo.components.coins.Coin.prototype = $extend(PIXI.MovieClip.prototype,{
	__class__: arm.pixidemo.components.coins.Coin
});
arm.pixidemo.components.coins.CoinsController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 7;
	mcover.coverage.MCoverage.getLogger().logStatement(66);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.coins.CoinsView);
};
$hxClasses["arm.pixidemo.components.coins.CoinsController"] = arm.pixidemo.components.coins.CoinsController;
arm.pixidemo.components.coins.CoinsController.__name__ = ["arm","pixidemo","components","coins","CoinsController"];
arm.pixidemo.components.coins.CoinsController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.coins.CoinsController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(67);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(68);
		if(mcover.coverage.MCoverage.getLogger().logBranch(29,this._showing)) this._view.resize();
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(70);
		if(mcover.coverage.MCoverage.getLogger().logBranch(30,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(69);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(72);
		if(mcover.coverage.MCoverage.getLogger().logBranch(32,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(71);
			if(mcover.coverage.MCoverage.getLogger().logBranch(31,!this._showing)) this._view.show();
			this._showing = true;
		}
	}
	,_update: function(elapsedTime) {
		mcover.coverage.MCoverage.getLogger().logStatement(73);
		if(mcover.coverage.MCoverage.getLogger().logBranch(33,this._showing)) this._view.update(elapsedTime);
	}
	,__class__: arm.pixidemo.components.coins.CoinsController
});
arm.pixidemo.components.coins.CoinsView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(74);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.coins.CoinsView"] = arm.pixidemo.components.coins.CoinsView;
arm.pixidemo.components.coins.CoinsView.__name__ = ["arm","pixidemo","components","coins","CoinsView"];
arm.pixidemo.components.coins.CoinsView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.coins.CoinsView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(75);
		this._coinsContainer = new PIXI.DisplayObjectContainer();
		this._uiContainer = new PIXI.DisplayObjectContainer();
		this._animations = { };
		this._animations.name = "Coin";
		this._animations.frames = 55;
		this._started = false;
		this._bigWinScaleIsGrow = true;
		this._bigWinScale = 1 / arm.pixidemo.view.StageProperties.pixelRatio;
		this._countUpTarget = 10000;
		this._countUpValue = 0;
		this._isCountingUp = true;
		this._numberOfCoins = 0;
		this._coins = [];
		this._buttons = [];
		this._ySpeed = this._settings.getSetting("COIN_SHOWER_Y_SPEED");
		this._emitterWidth = this._settings.getSetting("COIN_SHOWER_EMIT_WIDTH");
		this._xSpeedRange = { };
		var value = this._settings.getSetting("COIN_SHOWER_MIN_SPEED");
		this._xSpeedRange.min = value;
		var value1 = this._settings.getSetting("COIN_SHOWER_MAX_SPEED");
		this._xSpeedRange.max = value1;
		this._scaleRange = { };
		var value2 = this._settings.getSetting("COIN_SHOWER_MIN_SCALE");
		this._scaleRange.min = value2;
		var value3 = this._settings.getSetting("COIN_SHOWER_MAX_SCALE");
		this._scaleRange.max = value3;
		this._gravityRange = { };
		var value4 = this._settings.getSetting("COIN_SHOWER_MIN_GRAVITY");
		this._gravityRange.min = value4;
		var value5 = this._settings.getSetting("COIN_SHOWER_MAX_GRAVITY");
		this._gravityRange.max = value5;
		this._addButton("Start",0,0,100,30,$bind(this,this._start));
		this._addButton("Add 100",100,0,100,30,$bind(this,this._addCoins),100);
		this._addButton("Reset",200,0,100,30,$bind(this,this._reset));
		this._quantityLabel = new pixi.widgets.Label("Quantity: 0",300,30);
		this._quantityLabel.y = 30;
		this._bigWin = new PIXI.Sprite(PIXI.Texture.fromImage(pixi.resources.Loader.SCALE_URL + "bigwin/images/BigWin.png"));
		this._applyScale(this._bigWin);
		this._bigWin.anchor.set(0.5,0.5);
		this._tickerBackground = new PIXI.Sprite(PIXI.Texture.fromImage(pixi.resources.Loader.SCALE_URL + "tickerbackground/images/TickerBackground.png"));
		this._applyScale(this._tickerBackground);
		var style = { };
		style.font = "50px Arial";
		style.fill = "#000000";
		this._tickerLabel = new PIXI.Text("",style);
		this._tickerLabel.anchor.set(0.5,0.5);
		this._uiContainer.addChild(this._quantityLabel);
		this.gameContainer.addChild(this._uiContainer);
		this.gameContainer.addChild(this._coinsContainer);
		this.gameContainer.addChild(this._tickerBackground);
		this.gameContainer.addChild(this._tickerLabel);
		this.gameContainer.addChild(this._bigWin);
		this._updateCountUp();
		this.resize();
	}
	,_addCoins: function(count) {
		mcover.coverage.MCoverage.getLogger().logStatement(76);
		if(mcover.coverage.MCoverage.getLogger().logBranch(34,!this._started)) this._start(); else this._numberOfCoins += count;
	}
	,_start: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(77);
		this._started = true;
		this._addCoins(100);
	}
	,_addCoin: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(79);
		var textures = [];
		var _g1 = 1;
		var _g = Reflect.field(this._animations,"frames");
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(78);
			var frame = "" + i;
			while(mcover.coverage.MCoverage.getLogger().logBranch(35,frame.length < 4)) frame = "0" + frame;
			textures.push(PIXI.Texture.fromFrame(Std.string(Reflect.field(this._animations,"name")) + "_" + frame + ".png"));
		}
		var coin = new arm.pixidemo.components.coins.Coin(textures);
		coin.anchor.set(0.5,0.5);
		this._resetCoin(coin);
		this._coins.push(coin);
		this._coinsContainer.addChild(coin);
		this._applyScale(coin);
	}
	,_resetCoin: function(coin) {
		mcover.coverage.MCoverage.getLogger().logStatement(80);
		var xPos = (arm.pixidemo.view.StageProperties.screenWidth - this._emitterWidth) / 2;
		xPos += Math.random() * this._emitterWidth;
		coin.speedY = this._ySpeed;
		coin.speedX = this._getRandomRange(this._xSpeedRange);
		coin.scaleMultiplier = this._getRandomRange(this._scaleRange);
		coin.gravity = this._getRandomRange(this._gravityRange);
		coin.x = xPos;
		coin.y = arm.pixidemo.view.StageProperties.screenHeight;
		var scale = Math.random() * 0.25 + 0.5;
		coin.scale.set(scale,scale);
		coin.gotoAndPlay(Math.ceil(Math.random() * Reflect.field(this._animations,"frames")));
	}
	,_updateCountUp: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(81);
		var format_addTrailingZeros = true;
		var format_splitThousands = true;
		this._tickerLabel.setText("" + Math.round(this._countUpValue));
		if(mcover.coverage.MCoverage.getLogger().logBranch(36,this._isCountingUp)) this._countUpValue += 1.23; else this._countUpValue -= 1.23;
		if(mcover.coverage.MCoverage.getLogger().logBranch(39,mcover.coverage.MCoverage.getLogger().logBranch(37,this._countUpValue > this._countUpTarget) || mcover.coverage.MCoverage.getLogger().logBranch(38,this._countUpValue <= 0))) this._isCountingUp = !this._isCountingUp;
	}
	,_updateBigWin: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(82);
		if(mcover.coverage.MCoverage.getLogger().logBranch(40,this._bigWinScaleIsGrow)) this._bigWinScale += 0.025; else this._bigWinScale += -0.025;
		this._bigWin.scale.set(this._bigWinScale,this._bigWinScale);
		if(mcover.coverage.MCoverage.getLogger().logBranch(43,mcover.coverage.MCoverage.getLogger().logBranch(41,this._bigWinScale > 1) || mcover.coverage.MCoverage.getLogger().logBranch(42,this._bigWinScale < 0.5))) this._bigWinScaleIsGrow = !this._bigWinScaleIsGrow;
	}
	,_updateCoin: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(85);
		var i = this._coins.length - 1;
		while(mcover.coverage.MCoverage.getLogger().logBranch(45,i >= 0)) {
			mcover.coverage.MCoverage.getLogger().logStatement(84);
			var coin = this._coins[i];
			coin.scale.x += coin.scaleMultiplier;
			coin.scale.y += coin.scaleMultiplier;
			coin.x += coin.speedX;
			coin.y += coin.speedY;
			coin.speedY += coin.gravity;
			if(mcover.coverage.MCoverage.getLogger().logBranch(44,coin.y > arm.pixidemo.view.StageProperties.screenHeight)) {
				mcover.coverage.MCoverage.getLogger().logStatement(83);
				this._resetCoin(coin);
			}
			i--;
		}
	}
	,_addButton: function(label,x,y,width,height,callback,data) {
		mcover.coverage.MCoverage.getLogger().logStatement(86);
		var button = new pixi.widgets.Button(label,width,height,data);
		button.x = x;
		button.y = y;
		button.action.add(callback);
		button.enable();
		this._buttons.push(button);
		this._uiContainer.addChild(button);
	}
	,_getRandomRange: function(range) {
		mcover.coverage.MCoverage.getLogger().logStatement(87);
		return Math.random() * (Reflect.field(range,"max") - Reflect.field(range,"min")) + Reflect.field(range,"min");
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(88);
		var _g1 = 0;
		var _g = this._coins.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._coinsContainer.removeChild(this._coins[i]);
		}
		this._started = false;
		this._numberOfCoins = 0;
		this._countUpValue = 0;
		this._isCountingUp = true;
		this._coins = [];
		this._quantityLabel.setText("Coins: " + this._coins.length);
		this._applyScale(this._bigWin);
		this._bigWinScale = 1 / arm.pixidemo.view.StageProperties.pixelRatio;
		this._updateCountUp();
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(90);
		this._reset();
		var _g1 = 0;
		var _g = this._buttons.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(89);
			var button = this._buttons[i];
			button.disable();
			this._uiContainer.removeChild(button);
			this._buttons[i] = null;
		}
		this._uiContainer.removeChild(this._quantityLabel);
		this.gameContainer.removeChild(this._coinsContainer);
		this.gameContainer.removeChild(this._uiContainer);
		this.gameContainer.removeChild(this._tickerBackground);
		this.gameContainer.removeChild(this._tickerLabel);
		this.gameContainer.removeChild(this._bigWin);
		this._bigWin = null;
		this._tickerBackground = null;
		this._tickerLabel = null;
		this._coinsContainer = null;
		this._uiContainer = null;
		this._quantityLabel = null;
		this._buttons = null;
		this._coins = null;
	}
	,update: function(elapsedTime) {
		mcover.coverage.MCoverage.getLogger().logStatement(92);
		if(mcover.coverage.MCoverage.getLogger().logBranch(47,this._started)) {
			mcover.coverage.MCoverage.getLogger().logStatement(91);
			this._updateCountUp();
			this._updateBigWin();
			this._updateCoin();
			if(mcover.coverage.MCoverage.getLogger().logBranch(46,this._coins.length < this._numberOfCoins)) this._addCoin();
			this._quantityLabel.setText("Coins: " + this._coins.length);
		}
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(93);
		this._uiContainer.x = (arm.pixidemo.view.StageProperties.screenWidth - 300) / 2;
		this._uiContainer.y = 20;
		this._bigWin.x = arm.pixidemo.view.StageProperties.screenX + this._layout.getLayout("BIG_WIN").x;
		this._bigWin.y = arm.pixidemo.view.StageProperties.screenY + this._layout.getLayout("BIG_WIN").y;
		this._tickerBackground.x = arm.pixidemo.view.StageProperties.screenX + this._layout.getLayout("TICKER_BACKGROUND").x;
		this._tickerBackground.y = arm.pixidemo.view.StageProperties.screenY + this._layout.getLayout("TICKER_BACKGROUND").y;
		this._tickerLabel.x = this._tickerBackground.x + this._tickerBackground.width / 2;
		this._tickerLabel.y = this._tickerBackground.y + this._tickerBackground.height / 2;
	}
	,__class__: arm.pixidemo.components.coins.CoinsView
});
arm.pixidemo.components.livevideo = {};
arm.pixidemo.components.livevideo.LiveVideoController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 16;
	mcover.coverage.MCoverage.getLogger().logStatement(95);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.livevideo.LiveVideoView);
};
$hxClasses["arm.pixidemo.components.livevideo.LiveVideoController"] = arm.pixidemo.components.livevideo.LiveVideoController;
arm.pixidemo.components.livevideo.LiveVideoController.__name__ = ["arm","pixidemo","components","livevideo","LiveVideoController"];
arm.pixidemo.components.livevideo.LiveVideoController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.livevideo.LiveVideoController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(96);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(98);
		if(mcover.coverage.MCoverage.getLogger().logBranch(48,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(97);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(101);
		if(mcover.coverage.MCoverage.getLogger().logBranch(51,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(99);
			if(mcover.coverage.MCoverage.getLogger().logBranch(49,!this._showing)) this._view.show();
			this._showing = true;
		} else if(mcover.coverage.MCoverage.getLogger().logBranch(50,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(100);
			this._view.hide();
			this._showing = false;
		}
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(102);
		if(mcover.coverage.MCoverage.getLogger().logBranch(52,this._showing)) this._view.resize();
	}
	,__class__: arm.pixidemo.components.livevideo.LiveVideoController
});
arm.pixidemo.components.livevideo.LiveVideoView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(103);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.livevideo.LiveVideoView"] = arm.pixidemo.components.livevideo.LiveVideoView;
arm.pixidemo.components.livevideo.LiveVideoView.__name__ = ["arm","pixidemo","components","livevideo","LiveVideoView"];
arm.pixidemo.components.livevideo.LiveVideoView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.livevideo.LiveVideoView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(104);
		this._videoContainer = window.document.createElement("div");
		window.document.body.appendChild(this._videoContainer);
		var _this = window.document;
		this._videoElement = _this.createElement("video");
		this._videoElement.src = "http://10.194.193.247:1935/live/myStream/playlist.m3u8";
		this._videoElement.style.position = "absolute";
		this._videoElement.style.top = "100px";
		this._videoElement.style.right = "220px";
		this._videoElement.width = 640;
		this._videoElement.height = 480;
		this._videoElement.autoplay = true;
		this._videoContainer.appendChild(this._videoElement);
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(105);
		this._videoContainer.remove();
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(106);
	}
	,__class__: arm.pixidemo.components.livevideo.LiveVideoView
});
arm.pixidemo.components.localisation = {};
arm.pixidemo.components.localisation.LocalisationController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 3;
	mcover.coverage.MCoverage.getLogger().logStatement(107);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.localisation.LocalisationView);
};
$hxClasses["arm.pixidemo.components.localisation.LocalisationController"] = arm.pixidemo.components.localisation.LocalisationController;
arm.pixidemo.components.localisation.LocalisationController.__name__ = ["arm","pixidemo","components","localisation","LocalisationController"];
arm.pixidemo.components.localisation.LocalisationController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.localisation.LocalisationController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(108);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(109);
		if(mcover.coverage.MCoverage.getLogger().logBranch(53,this._showing)) this._view.resize();
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(111);
		if(mcover.coverage.MCoverage.getLogger().logBranch(54,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(110);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(114);
		if(mcover.coverage.MCoverage.getLogger().logBranch(57,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(112);
			if(mcover.coverage.MCoverage.getLogger().logBranch(55,!this._showing)) this._view.show();
			this._showing = true;
		} else if(mcover.coverage.MCoverage.getLogger().logBranch(56,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(113);
			this._view.hide();
			this._showing = false;
		}
	}
	,__class__: arm.pixidemo.components.localisation.LocalisationController
});
arm.pixidemo.components.localisation.LocalisationView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(115);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.localisation.LocalisationView"] = arm.pixidemo.components.localisation.LocalisationView;
arm.pixidemo.components.localisation.LocalisationView.__name__ = ["arm","pixidemo","components","localisation","LocalisationView"];
arm.pixidemo.components.localisation.LocalisationView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.localisation.LocalisationView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(116);
		this._container = new PIXI.DisplayObjectContainer();
		var sharedMessage = this._messages.getMessage("SHARED_MESSAGE");
		var bucketMessage = this._messages.getMessage("BUCKET_MESSAGE");
		var dynamicMessage = this._messages.getMessage("DYNAMIC_MESSAGE",["SUBSTITUTION"]);
		var sharedTextLayout = this._layout.getLayout("SHARED_MESSAGE_TEXT");
		var sharedTextStyle = { };
		sharedTextStyle.font = sharedTextLayout.size + "px " + sharedTextLayout.font;
		sharedTextStyle.fill = sharedTextLayout.color;
		this._sharedTextField = new PIXI.Text(sharedMessage,sharedTextStyle);
		var bucketTextLayout = this._layout.getLayout("BUCKET_MESSAGE_TEXT");
		var bucketTextStyle = { };
		bucketTextStyle.font = bucketTextLayout.size + "px " + bucketTextLayout.font;
		bucketTextStyle.fill = bucketTextLayout.color;
		this._bucketTextField = new PIXI.Text(bucketMessage,bucketTextStyle);
		var dynamicTextLayout = this._layout.getLayout("DYNAMIC_MESSAGE_TEXT");
		var dynamicTextStyle = { };
		dynamicTextStyle.font = dynamicTextLayout.size + "px " + dynamicTextLayout.font;
		dynamicTextStyle.fill = dynamicTextLayout.color;
		this._dynamicTextField = new PIXI.Text(dynamicMessage,dynamicTextStyle);
		this._sharedTextField.anchor.set(0.5,0.5);
		this._bucketTextField.anchor.set(0.5,0.5);
		this._dynamicTextField.anchor.set(0.5,0.5);
		this._bucketTextField.y = 40;
		this._dynamicTextField.y = 80;
		var texture = PIXI.Texture.fromImage(pixi.resources.Loader.SCALE_URL + "localisation/images/flag.png");
		this._flag = new PIXI.Sprite(texture);
		this._flag.anchor.x = 0.5;
		this._flag.y = this._dynamicTextField.y + 30;
		this._applyScale(this._flag);
		this._container.addChild(this._sharedTextField);
		this._container.addChild(this._bucketTextField);
		this._container.addChild(this._dynamicTextField);
		this._container.addChild(this._flag);
		this.gameContainer.addChild(this._container);
		this.resize();
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(117);
		this.gameContainer.removeChild(this._container);
		this._container.removeChild(this._flag);
		this._container.removeChild(this._sharedTextField);
		this._container.removeChild(this._bucketTextField);
		this._container.removeChild(this._dynamicTextField);
		this._container = null;
		this._flag = null;
		this._sharedTextField = null;
		this._bucketTextField = null;
		this._dynamicTextField = null;
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(118);
		this._container.x = arm.pixidemo.view.StageProperties.screenWidth / 2;
		this._container.y = (arm.pixidemo.view.StageProperties.screenHeight - this._container.height) / 2;
	}
	,__class__: arm.pixidemo.components.localisation.LocalisationView
});
arm.pixidemo.components.menu = {};
arm.pixidemo.components.menu.MenuController = function(m,v,c,mainModel) {
	mcover.coverage.MCoverage.getLogger().logStatement(119);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.menu.MenuView);
};
$hxClasses["arm.pixidemo.components.menu.MenuController"] = arm.pixidemo.components.menu.MenuController;
arm.pixidemo.components.menu.MenuController.__name__ = ["arm","pixidemo","components","menu","MenuController"];
arm.pixidemo.components.menu.MenuController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.menu.MenuController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_create: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(120);
		this._view.create();
	}
	,__class__: arm.pixidemo.components.menu.MenuController
});
arm.pixidemo.components.menu.MenuView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(121);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
	this._menuItems = ["Reset","Screen Test","Screen Guide","Localisation","Sprites","Bunnys","Sprite Sheets","Coin Shower","Typekit","Audio","Currency Format","Server Request","Console Bridge","Reels","Skeleton Animation","Video","Live Video","Physics"];
};
$hxClasses["arm.pixidemo.components.menu.MenuView"] = arm.pixidemo.components.menu.MenuView;
arm.pixidemo.components.menu.MenuView.__name__ = ["arm","pixidemo","components","menu","MenuView"];
arm.pixidemo.components.menu.MenuView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.menu.MenuView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	create: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(123);
		this._menu = new pixi.widgets.menu.PopoutMenu(180,40);
		var _menuItem;
		var _g1 = 0;
		var _g = this._menuItems.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(122);
			_menuItem = this._menu.addItem(this._menuItems[i],i);
			_menuItem.action.add($bind(this,this._menuClick));
		}
		this.gameStage.addChild(this._menu);
		var menuID = js.Browser.getLocalStorage().getItem("menuID");
		if(mcover.coverage.MCoverage.getLogger().logBranch(58,menuID != null)) this._menuClick(Std.parseInt(menuID));
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(124);
		this._menu.hide();
	}
	,_menuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(127);
		if(mcover.coverage.MCoverage.getLogger().logBranch(59,id > 0)) {
			mcover.coverage.MCoverage.getLogger().logStatement(125);
			js.Browser.getLocalStorage().setItem("menuID","" + id);
			arm.pixidemo.notifications.internal.MenuNotification.click.dispatch(id);
		} else {
			mcover.coverage.MCoverage.getLogger().logStatement(126);
			arm.pixidemo.notifications.internal.MenuNotification.reset.dispatch();
		}
		if(mcover.coverage.MCoverage.getLogger().logBranch(60,id > 0)) this.hide();
	}
	,__class__: arm.pixidemo.components.menu.MenuView
});
arm.pixidemo.components.physics = {};
arm.pixidemo.components.physics.PhysicsController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 17;
	mcover.coverage.MCoverage.getLogger().logStatement(128);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.physics.PhysicsView);
};
$hxClasses["arm.pixidemo.components.physics.PhysicsController"] = arm.pixidemo.components.physics.PhysicsController;
arm.pixidemo.components.physics.PhysicsController.__name__ = ["arm","pixidemo","components","physics","PhysicsController"];
arm.pixidemo.components.physics.PhysicsController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.physics.PhysicsController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(129);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_update: function(elapsedTime) {
		mcover.coverage.MCoverage.getLogger().logStatement(130);
		if(mcover.coverage.MCoverage.getLogger().logBranch(61,this._showing)) this._view.update(elapsedTime);
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(132);
		if(mcover.coverage.MCoverage.getLogger().logBranch(62,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(131);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(135);
		if(mcover.coverage.MCoverage.getLogger().logBranch(65,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(133);
			if(mcover.coverage.MCoverage.getLogger().logBranch(63,!this._showing)) this._view.show();
			this._showing = true;
		} else if(mcover.coverage.MCoverage.getLogger().logBranch(64,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(134);
			this._view.hide();
			this._showing = false;
		}
	}
	,__class__: arm.pixidemo.components.physics.PhysicsController
});
arm.pixidemo.components.physics.PhysicsView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(136);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.physics.PhysicsView"] = arm.pixidemo.components.physics.PhysicsView;
arm.pixidemo.components.physics.PhysicsView.__name__ = ["arm","pixidemo","components","physics","PhysicsView"];
arm.pixidemo.components.physics.PhysicsView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.physics.PhysicsView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(137);
		this._p2World = new p2.World({ gravity : [0,0]});
		var boxShape = new p2.Rectangle(2,1);
		this._boxBody = new p2.Body({ mass : 1, position : [0,2], angularVelocity : 1});
		this._boxBody.addShape(boxShape);
		this._p2World.addBody(this._boxBody);
		var planeShape = new p2.Plane();
		var planeBody = new p2.Body({ position : [0,-1]});
		planeBody.addShape(planeShape);
		this._p2World.addBody(planeBody);
		var zoom = 100;
		this._p2container = new PIXI.DisplayObjectContainer();
		this.gameStage.addChild(this._p2container);
		this._p2container.position.x = arm.pixidemo.view.StageProperties.screenWidth / 2;
		this._p2container.position.y = arm.pixidemo.view.StageProperties.screenHeight / 2;
		this._p2container.scale.x = zoom;
		this._p2container.scale.y = -zoom;
		this._p2graphics = new PIXI.Graphics();
		this._p2graphics.beginFill(16711680);
		this._p2graphics.drawRect(-boxShape.width / 2,-boxShape.height / 2,boxShape.width,boxShape.height);
		this._p2container.addChild(this._p2graphics);
		this._circleShape = new p2.Circle(1);
		this._circleBody = new p2.Body({ mass : 1});
		this._circleBody.damping = 0;
		this._circleBody.addShape(this._circleShape);
		this._p2World.addBody(this._circleBody);
		this._p2Circle = new PIXI.Graphics();
		this._p2Circle.beginFill(13158);
		this._p2Circle.drawCircle(0,0,this._circleShape.radius);
		this._p2container.addChild(this._p2Circle);
	}
	,update: function(elapsedTime) {
		mcover.coverage.MCoverage.getLogger().logStatement(138);
		this._p2World.step(0.0166666666666666664);
		this._p2graphics.position.x = this._boxBody.position[0];
		this._p2graphics.position.y = this._boxBody.position[1];
		this._p2graphics.rotation = this._boxBody.angle;
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(139);
		this.gameStage.removeChild(this._p2container);
		this._p2container = null;
	}
	,__class__: arm.pixidemo.components.physics.PhysicsView
});
arm.pixidemo.components.preloader = {};
arm.pixidemo.components.preloader.PreloaderController = function(m,v,c,mainModel) {
	mcover.coverage.MCoverage.getLogger().logStatement(140);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.preloader.PreloaderView);
};
$hxClasses["arm.pixidemo.components.preloader.PreloaderController"] = arm.pixidemo.components.preloader.PreloaderController;
arm.pixidemo.components.preloader.PreloaderController.__name__ = ["arm","pixidemo","components","preloader","PreloaderController"];
arm.pixidemo.components.preloader.PreloaderController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.preloader.PreloaderController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(141);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.mvc.notifications.ViewStateNotification.preloader.addOnce($bind(this,this._showPreloader));
	}
	,_showPreloader: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(142);
		this._view.showPreloader();
	}
	,__class__: arm.pixidemo.components.preloader.PreloaderController
});
arm.pixidemo.components.preloader.PreloaderView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(143);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
	this._loadCount = 0;
	this._assetsPack = [];
	this._spriteSheetsPack = [];
	this._soundsPack = [];
};
$hxClasses["arm.pixidemo.components.preloader.PreloaderView"] = arm.pixidemo.components.preloader.PreloaderView;
arm.pixidemo.components.preloader.PreloaderView.__name__ = ["arm","pixidemo","components","preloader","PreloaderView"];
arm.pixidemo.components.preloader.PreloaderView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.preloader.PreloaderView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	showPreloader: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(144);
		this._createBackground();
		this._container = new PIXI.DisplayObjectContainer();
		this.gameContainer.addChild(this._container);
		this._createLoadingBar();
		this._prepareSoundAssets();
		this._preloadAssets();
	}
	,_createBackground: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(145);
		this._background = new PIXI.Graphics();
		this._background.beginFill(2187531);
		this._background.drawRect(0,0,arm.pixidemo.view.StageProperties.screenWidth,arm.pixidemo.view.StageProperties.screenHeight);
		this._background.endFill();
		this.gameContainer.addChild(this._background);
	}
	,_createLoadingBar: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(146);
		this._loadingBarBG = new PIXI.Graphics();
		this._loadingBarBG.beginFill(16777215);
		this._loadingBarBG.drawRect(0,0,204,34);
		this._loadingBarBG.endFill();
		this._loadingBar = new PIXI.Graphics();
		this._loadingBar.beginFill(559657);
		this._loadingBar.drawRect(0,0,200,30);
		this._loadingBar.endFill();
		this._container.addChild(this._loadingBarBG);
		this._container.addChild(this._loadingBar);
		this._loadingBar.x = this._loadingBar.y = 2;
		this._container.x = (arm.pixidemo.view.StageProperties.screenWidth - this._loadingBar.width) / 2;
		this._container.y = (arm.pixidemo.view.StageProperties.screenHeight - this._loadingBar.height) / 2;
		this._loadingText = new PIXI.Text("LOADING",{ font : "24px futura-pt", fill : "#FFFFFF"});
		this._loadingText.anchor.set(0.5,0.5);
		this.gameContainer.addChild(this._loadingText);
		this._loadingText.x = arm.pixidemo.view.StageProperties.screenWidth / 2 + 2;
		this._loadingText.y = arm.pixidemo.view.StageProperties.screenHeight / 2 - 30;
		this._loadingBar.scale.x = 0.02;
		this._titleText = new PIXI.Text("haxe pixi demo",{ font : "60px grafolita-script", fill : "#FFFFFF"});
		this._titleText.anchor.set(0.5,0.5);
		this.gameContainer.addChild(this._titleText);
		this._titleText.x = arm.pixidemo.view.StageProperties.screenWidth / 2;
		this._titleText.y = arm.pixidemo.view.StageProperties.screenY + 50;
	}
	,_prepareSoundAssets: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(147);
		this._addSoundAsset("bg",pixi.resources.Loader.BASE_URL + "sounds/loop.mp3");
		this._addSoundAsset("sound1",pixi.resources.Loader.BASE_URL + "sounds/sound1.wav");
		this._addSoundAsset("sound2",pixi.resources.Loader.BASE_URL + "sounds/sound2.wav");
		this._addSoundAsset("sound3",pixi.resources.Loader.BASE_URL + "sounds/sound3.wav");
		this._addSoundAsset("sound4",pixi.resources.Loader.BASE_URL + "sounds/sound4.wav");
		this._addSoundAsset("spin",pixi.resources.Loader.BASE_URL + "sounds/spin.mp3");
	}
	,_addSoundAsset: function(id,url) {
		mcover.coverage.MCoverage.getLogger().logStatement(148);
		var snd = { };
		snd.id = id;
		snd.url = url;
		this._soundsPack.push(snd);
	}
	,_preloadAssets: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(149);
		this._assetsPack = [pixi.resources.Loader.SCALE_URL + "spriteperformance/images/sprite1.png",pixi.resources.Loader.SCALE_URL + "bunnys/images/bunny.png",pixi.resources.Loader.SCALE_URL + "bigwin/images/BigWin.png",pixi.resources.Loader.SCALE_URL + "screentest/images/ScreenTest.png",pixi.resources.Loader.SCALE_URL + "particles/images/particle.png",pixi.resources.Loader.SCALE_URL + "tickerbackground/images/TickerBackground.png",pixi.resources.Loader.SCALE_URL + "localisation/images/flag.png","assets/fonts/desyrel.xml"];
		this._spriteSheetsPack = [pixi.resources.Loader.SCALE_URL + "spritesheets/images/Phoenix1.json",pixi.resources.Loader.SCALE_URL + "reels/images/icons.json",pixi.resources.Loader.SCALE_URL + "reels/images/icons-blur.json",pixi.resources.Loader.SCALE_URL + "coin/images/Coin.json",pixi.resources.Loader.SCALE_URL + "spine/images/dragonBones.json",pixi.resources.Loader.SCALE_URL + "spine/images/dragonBonesData.json"];
		this._totalAssetCount = this._assetsPack.length + this._soundsPack.length + this._spriteSheetsPack.length;
		pixi.resources.Loader.loadSoundsPack(this._soundsPack);
		pixi.resources.Loader.soundLoadComplete.add($bind(this,this._onAssetsProgress));
		pixi.resources.Loader.loadAssetsPack(this._assetsPack);
		pixi.resources.Loader.assetsProgress.add($bind(this,this._onAssetsProgress));
		pixi.resources.Loader.loadSpriteSheetsPack(this._spriteSheetsPack);
		pixi.resources.Loader.spriteSheetLoadComplete.add($bind(this,this._onAssetsProgress));
	}
	,_onAssetsProgress: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(150);
		this._loadCount++;
		this._loadingBar.scale.x = this._loadCount / this._totalAssetCount;
		if(mcover.coverage.MCoverage.getLogger().logBranch(66,this._loadCount == this._totalAssetCount)) this._destroy();
	}
	,_destroy: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(151);
		arm.mvc.notifications.ViewStateNotification.create.dispatch();
		this._container.removeChild(this._loadingBarBG);
		this._container.removeChild(this._loadingBar);
		this.gameContainer.removeChild(this._background);
		this.gameContainer.removeChild(this._container);
		this.gameContainer.removeChild(this._loadingText);
		this.gameContainer.removeChild(this._titleText);
		this._background = null;
		this._container = null;
		this._assetsPack = null;
		this._soundsPack = null;
		this._loadingText = null;
		this._titleText = null;
		this._loadingBarBG = null;
		this._loadingBar = null;
	}
	,__class__: arm.pixidemo.components.preloader.PreloaderView
});
arm.pixidemo.components.reels = {};
arm.pixidemo.components.reels.ReelsController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 13;
	mcover.coverage.MCoverage.getLogger().logStatement(152);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.reels.ReelsView);
};
$hxClasses["arm.pixidemo.components.reels.ReelsController"] = arm.pixidemo.components.reels.ReelsController;
arm.pixidemo.components.reels.ReelsController.__name__ = ["arm","pixidemo","components","reels","ReelsController"];
arm.pixidemo.components.reels.ReelsController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.reels.ReelsController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(153);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(154);
		if(mcover.coverage.MCoverage.getLogger().logBranch(67,this._showing)) this._view.resize();
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(156);
		if(mcover.coverage.MCoverage.getLogger().logBranch(68,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(155);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(158);
		if(mcover.coverage.MCoverage.getLogger().logBranch(70,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(157);
			if(mcover.coverage.MCoverage.getLogger().logBranch(69,!this._showing)) this._view.show();
			this._showing = true;
		}
	}
	,__class__: arm.pixidemo.components.reels.ReelsController
});
arm.pixidemo.components.reels.ReelsView = function(stage,container) {
	this._reelMaps = [[6,1,8,10,6,4,9,0,7,3,2,8,5,6,7,0,9,4,8,3,6,5,8,2,7,11,9,3,7,4,9,5,6,1,9,8,6,2,9,11],[8,4,7,1,5,11,6,1,8,2,7,11,6,5,8,3,9,0,6,5,8,11,6,4,7,5,4,9,3,11,6,2,3,7,4,5,8,4,9,10],[9,1,11,2,9,11,5,2,8,10,4,7,3,9,11,4,3,6,12,7,9,2,6,0,7,1,8,3,5,6,12,2,7,0,8,1,10,3,11,5],[7,4,8,10,7,1,8,0,7,4,1,9,12,2,9,12,7,1,6,0,8,3,12,5,6,0,9,3,6,12,8,2,6,5,9,6,10,9,4,2],[6,12,5,1,7,0,9,5,8,10,9,3,5,6,0,8,2,5,8,3,6,5,8,1,6,10,7,3,8,4,12,2,8,4,9,1,8,12,9,4]];
	this._reelIconCount = 20;
	this._reelCount = 5;
	mcover.coverage.MCoverage.getLogger().logStatement(159);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.reels.ReelsView"] = arm.pixidemo.components.reels.ReelsView;
arm.pixidemo.components.reels.ReelsView.__name__ = ["arm","pixidemo","components","reels","ReelsView"];
arm.pixidemo.components.reels.ReelsView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.reels.ReelsView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(160);
		this._reelsContainer = new PIXI.DisplayObjectContainer();
		this.gameContainer.addChild(this._reelsContainer);
		this._iconLayout = this._layout.getLayout("ICON");
		this._reelsLayout = this._layout.getLayout("REELS");
		this._reelHeight = this._reelIconCount * this._iconLayout.height;
		this._reels = [];
		this._icons = [];
		this._blurIcons = [];
		this._createMask();
		this._createReels();
		this._addButton("SPIN ",0,0,100,30,$bind(this,this.spinReels));
		this._reelsContainer.x = this._mask.x = (arm.pixidemo.view.StageProperties.screenWidth - (this._iconLayout.width + this._reelsLayout.spacing) * this._reelCount) / 2;
		this._reelsContainer.y = this._mask.y = (arm.pixidemo.view.StageProperties.screenHeight - this._iconLayout.height * 3) / 2;
		this._spinSound = this._sounds.getSound("spin");
	}
	,_createMask: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(161);
		this._mask = new PIXI.Graphics();
		this.gameContainer.addChild(this._mask);
		this._mask.lineStyle(0);
		this._mask.beginFill(0);
		this._mask.drawRect(0,0,(this._iconLayout.width + this._reelsLayout.spacing) * this._reelCount,this._iconLayout.height * 3);
		this._mask.endFill();
		this._reelsContainer.mask = this._mask;
	}
	,_createReels: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(163);
		var reel;
		var _g1 = 0;
		var _g = this._reelCount;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(162);
			reel = new PIXI.SpriteBatch();
			this._reels.push(reel);
			this._reelsContainer.addChild(reel);
			reel.x = i * (this._iconLayout.width + this._reelsLayout.spacing);
			reel.y = -this._reelHeight + this._iconLayout.height * 3;
			this._createIcons(reel,i);
		}
	}
	,_createIcons: function(reel,reelNo) {
		mcover.coverage.MCoverage.getLogger().logStatement(165);
		var icon;
		var blurIcon;
		this._icons[reelNo] = [];
		this._blurIcons[reelNo] = [];
		var _g1 = 0;
		var _g = this._reelIconCount;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(164);
			icon = PIXI.Sprite.fromFrame("icon" + (this._reelMaps[reelNo][i] + 1));
			icon.y = i * this._iconLayout.height;
			this._icons[reelNo][i] = icon;
			blurIcon = PIXI.Sprite.fromFrame("icon-blur" + (this._reelMaps[reelNo][i] + 1));
			blurIcon.y = i * this._iconLayout.height;
			blurIcon.visible = false;
			this._blurIcons[reelNo][i] = blurIcon;
			reel.addChild(blurIcon);
			reel.addChild(icon);
			this._applyScale(icon);
			this._applyScale(blurIcon);
		}
	}
	,spinReels: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(167);
		var reel;
		var tdelay = 0;
		var _g1 = 0;
		var _g = this._reelCount;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(166);
			reel = js.Boot.__cast(this._reels[i] , PIXI.SpriteBatch);
			reel.y = -this._reelHeight + this._iconLayout.height * 3;
			motion.Actuate.tween(reel,0.3,{ y : reel.y - 40}).onComplete($bind(this,this._startSpinning),[reel,i]).delay(tdelay).ease(motion.easing.Linear.get_easeNone());
			tdelay += 0.07;
		}
		this._spinSound.play();
	}
	,_startSpinning: function(reel,reelNo) {
		mcover.coverage.MCoverage.getLogger().logStatement(168);
		motion.Actuate.tween(reel,2,{ y : 0}).onComplete($bind(this,this._reelSpinComplete),[reel,reelNo]).ease(motion.easing.Linear.get_easeNone());
	}
	,_reelSpinComplete: function(reel,reelNo) {
		mcover.coverage.MCoverage.getLogger().logStatement(169);
		motion.Actuate.tween(reel,0.5,{ y : -this._iconLayout.height}).onComplete($bind(this,this._resetReels),[reelNo]);
	}
	,_resetReels: function(reelNo) {
		mcover.coverage.MCoverage.getLogger().logStatement(172);
		this._reelMaps[reelNo][this._reelIconCount - 1] = this._reelMaps[reelNo][3];
		this._reelMaps[reelNo][this._reelIconCount - 2] = this._reelMaps[reelNo][2];
		this._reelMaps[reelNo][this._reelIconCount - 3] = this._reelMaps[reelNo][1];
		if(mcover.coverage.MCoverage.getLogger().logBranch(71,reelNo == this._reelCount - 1)) {
			mcover.coverage.MCoverage.getLogger().logStatement(171);
			var _g = 0;
			var _g1 = this._reels;
			while(_g < _g1.length) {
				var reel = _g1[_g];
				++_g;
				mcover.coverage.MCoverage.getLogger().logStatement(170);
				this._reelsContainer.removeChild(reel);
			}
			this._reels = [];
			this._icons = [];
			this._blurIcons = [];
			this._createReels();
		}
	}
	,_addButton: function(label,x,y,width,height,callback,data) {
		mcover.coverage.MCoverage.getLogger().logStatement(177);
		this._spinBtn = new pixi.widgets.Button(label,width,height,data);
		this._spinBtn.action.add(callback);
		this._spinBtn.enable();
		this._spinBtn.x = (arm.pixidemo.view.StageProperties.screenWidth - 100) / 2;
		this._spinBtn.y = arm.pixidemo.view.StageProperties.screenY + 60;
		this.gameContainer.addChild(this._spinBtn);
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(178);
		this.gameContainer.removeChild(this._spinBtn);
		this.gameContainer.removeChild(this._reelsContainer);
		this._reelsContainer = null;
		this._spinBtn = null;
		this._mask = null;
		this._reels = null;
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(179);
		this._reelsContainer.x = this._mask.x = (arm.pixidemo.view.StageProperties.screenWidth - (this._iconLayout.width + this._reelsLayout.spacing) * this._reelCount) / 2;
		this._reelsContainer.y = this._mask.y = (arm.pixidemo.view.StageProperties.screenHeight - this._iconLayout.height * 3) / 2;
		this._spinBtn.x = (arm.pixidemo.view.StageProperties.screenWidth - 100) / 2;
		this._spinBtn.y = arm.pixidemo.view.StageProperties.screenY + 60;
	}
	,__class__: arm.pixidemo.components.reels.ReelsView
});
arm.pixidemo.components.screenguide = {};
arm.pixidemo.components.screenguide.ScreenGuideController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 2;
	mcover.coverage.MCoverage.getLogger().logStatement(180);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.screenguide.ScreenGuideView);
};
$hxClasses["arm.pixidemo.components.screenguide.ScreenGuideController"] = arm.pixidemo.components.screenguide.ScreenGuideController;
arm.pixidemo.components.screenguide.ScreenGuideController.__name__ = ["arm","pixidemo","components","screenguide","ScreenGuideController"];
arm.pixidemo.components.screenguide.ScreenGuideController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.screenguide.ScreenGuideController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(181);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(183);
		if(mcover.coverage.MCoverage.getLogger().logBranch(72,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(182);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(185);
		if(mcover.coverage.MCoverage.getLogger().logBranch(74,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(184);
			if(mcover.coverage.MCoverage.getLogger().logBranch(73,!this._showing)) this._view.show();
			this._showing = true;
		} else this._reset();
	}
	,_create: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(186);
		this._view.show();
		this._showing = true;
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(187);
		if(mcover.coverage.MCoverage.getLogger().logBranch(75,this._showing)) this._view.resize();
	}
	,__class__: arm.pixidemo.components.screenguide.ScreenGuideController
});
arm.pixidemo.components.screenguide.ScreenGuideView = function(stage,container) {
	this.PADDING = 2;
	mcover.coverage.MCoverage.getLogger().logStatement(188);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.screenguide.ScreenGuideView"] = arm.pixidemo.components.screenguide.ScreenGuideView;
arm.pixidemo.components.screenguide.ScreenGuideView.__name__ = ["arm","pixidemo","components","screenguide","ScreenGuideView"];
arm.pixidemo.components.screenguide.ScreenGuideView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.screenguide.ScreenGuideView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(189);
		this._labels = [];
		this._crosses = [];
		var screenSizeMessage = "Screen size - width:" + arm.pixidemo.view.StageProperties.screenWidth + " height:" + arm.pixidemo.view.StageProperties.screenHeight;
		var bucketSizeMessage = "Bucket size - width:" + arm.pixidemo.view.StageProperties.bucketWidth + " height:" + arm.pixidemo.view.StageProperties.bucketHeight;
		var pixelRatioMessage = "Pixel Ratio - used:" + arm.pixidemo.view.StageProperties.pixelRatio + " actual:" + arm.pixidemo.view.StageProperties.actualPixelRatio;
		this._labelContainer = new PIXI.DisplayObjectContainer();
		this._screenSizeLabel = this._addLabel(screenSizeMessage,0,0,300,30);
		this._addLabel(bucketSizeMessage,0,30,300,30);
		this._addLabel(pixelRatioMessage,0,60,300,30);
		this.gameContainer.addChild(this._labelContainer);
		this._labelContainer.x = (arm.pixidemo.view.StageProperties.screenWidth - 300) / 2;
		this._labelContainer.y = (arm.pixidemo.view.StageProperties.screenHeight - 300) / 2;
		this._screenCrossTopLeft = this._addCross(16711935,this.PADDING,this.PADDING);
		this._screenCrossTopRight = this._addCross(16711935,arm.pixidemo.view.StageProperties.screenWidth - this.PADDING,this.PADDING);
		this._screenCrossBottomLeft = this._addCross(16711935,2,arm.pixidemo.view.StageProperties.screenHeight - this.PADDING);
		this._screenCrossBottomRight = this._addCross(16711935,arm.pixidemo.view.StageProperties.screenWidth - this.PADDING,arm.pixidemo.view.StageProperties.screenHeight - this.PADDING);
		this._bucketCrossTopLeft = this._addCross(3040510,arm.pixidemo.view.StageProperties.screenX,arm.pixidemo.view.StageProperties.screenY);
		this._bucketCrossTopRight = this._addCross(3040510,arm.pixidemo.view.StageProperties.screenX + arm.pixidemo.view.StageProperties.bucketWidth,arm.pixidemo.view.StageProperties.screenY);
		this._bucketCrossBottomRight = this._addCross(3040510,arm.pixidemo.view.StageProperties.screenX + arm.pixidemo.view.StageProperties.bucketWidth,arm.pixidemo.view.StageProperties.screenY + arm.pixidemo.view.StageProperties.bucketHeight);
		this._bucketCrossBottomLeft = this._addCross(3040510,arm.pixidemo.view.StageProperties.screenX,arm.pixidemo.view.StageProperties.screenY + arm.pixidemo.view.StageProperties.bucketHeight);
	}
	,_addCross: function(colour,x,y) {
		mcover.coverage.MCoverage.getLogger().logStatement(190);
		var thickness = 6;
		var size = 50;
		var graphics = new PIXI.Graphics();
		graphics.beginFill(colour);
		graphics.drawRect(-(thickness / 2),-(size / 2),thickness,size);
		graphics.drawRect(-(size / 2),-(thickness / 2),size,thickness);
		graphics.endFill();
		var container = new PIXI.DisplayObjectContainer();
		container.addChild(graphics);
		container.x = x;
		container.y = y;
		this._crosses.push(container);
		this.gameContainer.addChild(container);
		return container;
	}
	,_addLabel: function(message,x,y,width,height) {
		mcover.coverage.MCoverage.getLogger().logStatement(191);
		var label = new pixi.widgets.Label(message,width,height);
		label.x = x;
		label.y = y;
		this._labels.push(label);
		this._labelContainer.addChild(label);
		return label;
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(192);
		var screenX = arm.pixidemo.view.StageProperties.screenX;
		var screenY = arm.pixidemo.view.StageProperties.screenY;
		var screenWidth = arm.pixidemo.view.StageProperties.screenWidth;
		var screenHeight = arm.pixidemo.view.StageProperties.screenHeight;
		this._bucketCrossTopLeft.x = screenX;
		this._bucketCrossTopLeft.y = screenY;
		this._bucketCrossTopRight.x = arm.pixidemo.view.StageProperties.screenX + arm.pixidemo.view.StageProperties.bucketWidth;
		this._bucketCrossTopRight.y = screenY;
		this._bucketCrossBottomRight.x = arm.pixidemo.view.StageProperties.screenX + arm.pixidemo.view.StageProperties.bucketWidth;
		this._bucketCrossBottomRight.y = arm.pixidemo.view.StageProperties.screenY + arm.pixidemo.view.StageProperties.bucketHeight;
		this._bucketCrossBottomLeft.x = screenX;
		this._bucketCrossBottomLeft.y = arm.pixidemo.view.StageProperties.screenY + arm.pixidemo.view.StageProperties.bucketHeight;
		this._screenCrossTopRight.x = screenWidth;
		this._screenCrossBottomLeft.y = screenHeight;
		this._screenCrossBottomRight.x = screenWidth;
		this._screenCrossBottomRight.y = screenHeight;
		this._labelContainer.x = (arm.pixidemo.view.StageProperties.screenWidth - 300) / 2;
		this._labelContainer.y = (arm.pixidemo.view.StageProperties.screenHeight - 300) / 2;
		var screenSizeMessage = "Screen size - width:" + arm.pixidemo.view.StageProperties.screenWidth + " height:" + arm.pixidemo.view.StageProperties.screenHeight;
		this._screenSizeLabel.setText(screenSizeMessage);
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(195);
		var _g1 = 0;
		var _g = this._labels.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(193);
			var label = this._labels[i];
			this._labelContainer.removeChild(label);
			label = null;
		}
		var _g11 = 0;
		var _g2 = this._crosses.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			mcover.coverage.MCoverage.getLogger().logStatement(194);
			var cross = this._crosses[i1];
			this.gameContainer.removeChild(cross);
			cross = null;
		}
		this._screenSizeLabel = null;
		this._crosses = null;
		this._labels = null;
	}
	,__class__: arm.pixidemo.components.screenguide.ScreenGuideView
});
arm.pixidemo.components.screentest = {};
arm.pixidemo.components.screentest.ScreenTestController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 1;
	mcover.coverage.MCoverage.getLogger().logStatement(196);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.screentest.ScreenTestView);
};
$hxClasses["arm.pixidemo.components.screentest.ScreenTestController"] = arm.pixidemo.components.screentest.ScreenTestController;
arm.pixidemo.components.screentest.ScreenTestController.__name__ = ["arm","pixidemo","components","screentest","ScreenTestController"];
arm.pixidemo.components.screentest.ScreenTestController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.screentest.ScreenTestController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(197);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(198);
		if(mcover.coverage.MCoverage.getLogger().logBranch(76,this._showing)) this._view.resize();
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(200);
		if(mcover.coverage.MCoverage.getLogger().logBranch(77,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(199);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(202);
		if(mcover.coverage.MCoverage.getLogger().logBranch(79,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(201);
			if(mcover.coverage.MCoverage.getLogger().logBranch(78,!this._showing)) this._view.show();
			this._showing = true;
		}
	}
	,__class__: arm.pixidemo.components.screentest.ScreenTestController
});
arm.pixidemo.components.screentest.ScreenTestView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(203);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.screentest.ScreenTestView"] = arm.pixidemo.components.screentest.ScreenTestView;
arm.pixidemo.components.screentest.ScreenTestView.__name__ = ["arm","pixidemo","components","screentest","ScreenTestView"];
arm.pixidemo.components.screentest.ScreenTestView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.screentest.ScreenTestView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(204);
		var texture = PIXI.Texture.fromImage(pixi.resources.Loader.SCALE_URL + "screentest/images/ScreenTest.png");
		this._screenTest = new PIXI.Sprite(texture);
		this.gameContainer.addChild(this._screenTest);
		this.resize();
		this._applyScale(this._screenTest);
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(205);
		this.gameContainer.removeChild(this._screenTest);
		this._screenTest = null;
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(206);
		this._screenTest.x = arm.pixidemo.view.StageProperties.screenX;
		this._screenTest.y = arm.pixidemo.view.StageProperties.screenY;
	}
	,__class__: arm.pixidemo.components.screentest.ScreenTestView
});
arm.pixidemo.components.skeleton = {};
arm.pixidemo.components.skeleton.SkeletonController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 14;
	mcover.coverage.MCoverage.getLogger().logStatement(207);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.skeleton.SkeletonView);
};
$hxClasses["arm.pixidemo.components.skeleton.SkeletonController"] = arm.pixidemo.components.skeleton.SkeletonController;
arm.pixidemo.components.skeleton.SkeletonController.__name__ = ["arm","pixidemo","components","skeleton","SkeletonController"];
arm.pixidemo.components.skeleton.SkeletonController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.skeleton.SkeletonController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(208);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(210);
		if(mcover.coverage.MCoverage.getLogger().logBranch(80,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(209);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(212);
		if(mcover.coverage.MCoverage.getLogger().logBranch(82,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(211);
			if(mcover.coverage.MCoverage.getLogger().logBranch(81,!this._showing)) this._view.show();
			this._showing = true;
		}
	}
	,__class__: arm.pixidemo.components.skeleton.SkeletonController
});
arm.pixidemo.components.skeleton.SkeletonView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(213);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.skeleton.SkeletonView"] = arm.pixidemo.components.skeleton.SkeletonView;
arm.pixidemo.components.skeleton.SkeletonView.__name__ = ["arm","pixidemo","components","skeleton","SkeletonView"];
arm.pixidemo.components.skeleton.SkeletonView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.skeleton.SkeletonView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(214);
		this._spine = new PIXI.Spine(pixi.resources.Loader.SCALE_URL + "spine/images/dragonBonesData.json");
		this._spine.state.setAnimationByName(0,"flying",true);
		this.gameContainer.addChild(this._spine);
		this._spine.x = 500 + arm.pixidemo.view.StageProperties.screenX;
		this._spine.y = 700 + arm.pixidemo.view.StageProperties.screenY;
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(215);
		this.gameContainer.removeChild(this._spine);
		this._spine = null;
	}
	,__class__: arm.pixidemo.components.skeleton.SkeletonView
});
arm.pixidemo.components.sprites = {};
arm.pixidemo.components.sprites.SpritesController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 4;
	mcover.coverage.MCoverage.getLogger().logStatement(216);
	arm.mvc.components.ComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.sprites.SpritesView);
};
$hxClasses["arm.pixidemo.components.sprites.SpritesController"] = arm.pixidemo.components.sprites.SpritesController;
arm.pixidemo.components.sprites.SpritesController.__name__ = ["arm","pixidemo","components","sprites","SpritesController"];
arm.pixidemo.components.sprites.SpritesController.__super__ = arm.mvc.components.ComponentController;
arm.pixidemo.components.sprites.SpritesController.prototype = $extend(arm.mvc.components.ComponentController.prototype,{
	_update: function(elapsedTime) {
		mcover.coverage.MCoverage.getLogger().logStatement(217);
		if(mcover.coverage.MCoverage.getLogger().logBranch(83,this._showing)) this._view.update(elapsedTime);
	}
	,_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(218);
		arm.mvc.components.ComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(219);
		if(mcover.coverage.MCoverage.getLogger().logBranch(84,this._showing)) this._view.resize();
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(221);
		if(mcover.coverage.MCoverage.getLogger().logBranch(85,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(220);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(223);
		if(mcover.coverage.MCoverage.getLogger().logBranch(87,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(222);
			if(mcover.coverage.MCoverage.getLogger().logBranch(86,!this._showing)) this._view.show();
			this._showing = true;
		}
	}
	,__class__: arm.pixidemo.components.sprites.SpritesController
});
arm.pixidemo.components.sprites.SpritesView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(224);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.sprites.SpritesView"] = arm.pixidemo.components.sprites.SpritesView;
arm.pixidemo.components.sprites.SpritesView.__name__ = ["arm","pixidemo","components","sprites","SpritesView"];
arm.pixidemo.components.sprites.SpritesView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.sprites.SpritesView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(225);
		this._cachedTexture = PIXI.Texture.fromImage(pixi.resources.Loader.SCALE_URL + "spriteperformance/images/sprite1.png");
		this._sprites = [];
		this._buttons = [];
		this._uniqueSprites = 0;
		this._cachedSprites = 0;
		this._spriteContainer = new PIXI.DisplayObjectContainer();
		this._uiContainer = new PIXI.DisplayObjectContainer();
		this._addButton("Reset",0,0,100,30,$bind(this,this._reset));
		this._addButton("Scale",100,0,100,30,$bind(this,this._scale));
		this._addButton("Rotation",200,0,100,30,$bind(this,this._rotation));
		this._addButton("1 unique",0,30,100,30,$bind(this,this._addUniqueSprites),1);
		this._addButton("10 unique",100,30,100,30,$bind(this,this._addUniqueSprites),10);
		this._addButton("100 unique",200,30,100,30,$bind(this,this._addUniqueSprites),100);
		this._addButton("100 cached",0,60,100,30,$bind(this,this._addCachedSprites),100);
		this._addButton("500 cached",100,60,100,30,$bind(this,this._addCachedSprites),500);
		this._addButton("1000 cached",200,60,100,30,$bind(this,this._addCachedSprites),1000);
		this._quantityLabel = new pixi.widgets.Label("",300,44);
		this._quantityLabel.y = 90;
		this._uiContainer.addChild(this._quantityLabel);
		this.resize();
		this._updateQuanityLabel();
		this.gameContainer.addChild(this._spriteContainer);
		this.gameContainer.addChild(this._uiContainer);
	}
	,_addButton: function(label,x,y,width,height,callback,data) {
		mcover.coverage.MCoverage.getLogger().logStatement(226);
		var button = new pixi.widgets.Button(label,width,height,data);
		button.x = x;
		button.y = y;
		button.action.add(callback);
		button.enable();
		this._buttons.push(button);
		this._uiContainer.addChild(button);
	}
	,_updateQuanityLabel: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(229);
		if(mcover.coverage.MCoverage.getLogger().logBranch(88,this._uniqueSpriteResources == null)) {
			mcover.coverage.MCoverage.getLogger().logStatement(227);
			this._quantityLabel.setText(this._uniqueSprites + " unique" + "\n" + this._cachedSprites + " cached");
		} else {
			mcover.coverage.MCoverage.getLogger().logStatement(228);
			this._quantityLabel.setText("Loading... unique" + "\n" + this._cachedSprites + " cached");
		}
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(231);
		var _g1 = 0;
		var _g = this._sprites.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(230);
			this._spriteContainer.removeChild(this._sprites[i]);
		}
		this._sprites = [];
		this._isScale = false;
		this._isRotation = false;
		this._uniqueSprites = 0;
		this._cachedSprites = 0;
		this._updateQuanityLabel();
	}
	,_scale: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(232);
		this._isScale = !this._isScale;
	}
	,_rotation: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(233);
		this._isRotation = !this._isRotation;
	}
	,_addUniqueSprites: function(count) {
		mcover.coverage.MCoverage.getLogger().logStatement(236);
		if(mcover.coverage.MCoverage.getLogger().logBranch(89,this._uniqueSpriteResources == null)) {
			mcover.coverage.MCoverage.getLogger().logStatement(235);
			this._uniqueSpriteResources = [];
			var _g = 0;
			while(_g < count) {
				var i = _g++;
				mcover.coverage.MCoverage.getLogger().logStatement(234);
				this._uniqueSpriteResources.push(pixi.resources.Loader.SCALE_URL + "spriteperformance/images/sprite1.png?r=" + Math.random());
			}
			pixi.resources.Loader.loadAssetsPack(this._uniqueSpriteResources);
			pixi.resources.Loader.assetsPackLoadComplete.add($bind(this,this._onUniqueSpritesLoaded));
			this._updateQuanityLabel();
		}
	}
	,_onUniqueSpritesLoaded: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(238);
		var _g1 = 0;
		var _g = this._uniqueSpriteResources.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(237);
			var texture = PIXI.Texture.fromImage(this._uniqueSpriteResources[i],false,PIXI.scaleModes.DEFAULT);
			var sprite = new PIXI.Sprite(texture);
			this._spriteContainer.addChild(sprite);
			sprite.x = Std.random(arm.pixidemo.view.StageProperties.screenWidth | 0);
			sprite.y = Std.random(arm.pixidemo.view.StageProperties.screenHeight | 0);
			sprite.anchor.set(0.5,0.5);
			this._sprites.push(sprite);
			this._applyScale(sprite);
		}
		this._uniqueSprites += this._uniqueSpriteResources.length;
		this._uniqueSpriteResources = null;
		this._updateQuanityLabel();
	}
	,_addCachedSprites: function(count) {
		mcover.coverage.MCoverage.getLogger().logStatement(240);
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			mcover.coverage.MCoverage.getLogger().logStatement(239);
			var sprite = new PIXI.Sprite(this._cachedTexture);
			this._spriteContainer.addChild(sprite);
			sprite.x = Std.random(arm.pixidemo.view.StageProperties.screenWidth | 0);
			sprite.y = Std.random(arm.pixidemo.view.StageProperties.screenHeight | 0);
			sprite.anchor.set(0.5,0.5);
			this._sprites.push(sprite);
			this._applyScale(sprite);
		}
		this._cachedSprites += count;
		this._updateQuanityLabel();
	}
	,update: function(elapsedTime) {
		mcover.coverage.MCoverage.getLogger().logStatement(246);
		if(mcover.coverage.MCoverage.getLogger().logBranch(95,mcover.coverage.MCoverage.getLogger().logBranch(90,this._isScale) || mcover.coverage.MCoverage.getLogger().logBranch(91,this._isRotation))) {
			mcover.coverage.MCoverage.getLogger().logStatement(245);
			var _g1 = 0;
			var _g = this._sprites.length;
			while(_g1 < _g) {
				var i = _g1++;
				mcover.coverage.MCoverage.getLogger().logStatement(244);
				var sprite = this._sprites[i];
				if(mcover.coverage.MCoverage.getLogger().logBranch(93,this._isScale)) {
					mcover.coverage.MCoverage.getLogger().logStatement(242);
					if(mcover.coverage.MCoverage.getLogger().logBranch(92,sprite.scale.x < 2)) {
						mcover.coverage.MCoverage.getLogger().logStatement(241);
						sprite.scale.x += Math.random() / 50 + 0.01;
						sprite.scale.y += Math.random() / 50 + 0.01;
					}
				}
				if(mcover.coverage.MCoverage.getLogger().logBranch(94,this._isRotation)) {
					mcover.coverage.MCoverage.getLogger().logStatement(243);
					sprite.rotation += Math.random() / 50 + 0.01;
				}
			}
		}
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(248);
		this._reset();
		var _g1 = 0;
		var _g = this._buttons.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(247);
			var button = this._buttons[i];
			button.disable();
			this._uiContainer.removeChild(button);
			this._buttons[i] = null;
		}
		this._isScale = false;
		this._isRotation = false;
		this._uiContainer.removeChild(this._quantityLabel);
		this.gameContainer.removeChild(this._spriteContainer);
		this.gameContainer.removeChild(this._uiContainer);
		this._spriteContainer = null;
		this._uiContainer = null;
		this._quantityLabel = null;
		this._buttons = null;
		this._sprites = null;
		this._uniqueSpriteResources = null;
		this._uniqueSprites = null;
		this._cachedSprites = null;
		this._cachedTexture = null;
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(249);
		this._uiContainer.x = (arm.pixidemo.view.StageProperties.screenWidth - 300) / 2;
		this._uiContainer.y = 20;
	}
	,__class__: arm.pixidemo.components.sprites.SpritesView
});
arm.pixidemo.components.spritesheets = {};
arm.pixidemo.components.spritesheets.SpritessheetsController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 6;
	mcover.coverage.MCoverage.getLogger().logStatement(250);
	arm.mvc.components.ComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.spritesheets.SpritessheetsView);
};
$hxClasses["arm.pixidemo.components.spritesheets.SpritessheetsController"] = arm.pixidemo.components.spritesheets.SpritessheetsController;
arm.pixidemo.components.spritesheets.SpritessheetsController.__name__ = ["arm","pixidemo","components","spritesheets","SpritessheetsController"];
arm.pixidemo.components.spritesheets.SpritessheetsController.__super__ = arm.mvc.components.ComponentController;
arm.pixidemo.components.spritesheets.SpritessheetsController.prototype = $extend(arm.mvc.components.ComponentController.prototype,{
	_update: function(elapsedTime) {
		mcover.coverage.MCoverage.getLogger().logStatement(251);
		if(mcover.coverage.MCoverage.getLogger().logBranch(96,this._showing)) this._view.update(elapsedTime);
	}
	,_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(252);
		arm.mvc.components.ComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(253);
		if(mcover.coverage.MCoverage.getLogger().logBranch(97,this._showing)) this._view.resize();
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(255);
		if(mcover.coverage.MCoverage.getLogger().logBranch(98,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(254);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(257);
		if(mcover.coverage.MCoverage.getLogger().logBranch(100,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(256);
			if(mcover.coverage.MCoverage.getLogger().logBranch(99,!this._showing)) this._view.show();
			this._showing = true;
		}
	}
	,__class__: arm.pixidemo.components.spritesheets.SpritessheetsController
});
arm.pixidemo.components.spritesheets.SpritessheetsView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(258);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.spritesheets.SpritessheetsView"] = arm.pixidemo.components.spritesheets.SpritessheetsView;
arm.pixidemo.components.spritesheets.SpritessheetsView.__name__ = ["arm","pixidemo","components","spritesheets","SpritessheetsView"];
arm.pixidemo.components.spritesheets.SpritessheetsView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.spritesheets.SpritessheetsView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(259);
		this._movieclips = [];
		this._buttons = [];
		this._animations = { };
		this._animations.name = "Phoenix1";
		this._animations.frames = 77;
		this._mcContainer = new PIXI.DisplayObjectContainer();
		this._uiContainer = new PIXI.DisplayObjectContainer();
		this._addButton("Reset",0,30,80,30,$bind(this,this._reset));
		this._addButton("Add 1",80,30,80,30,$bind(this,this._addSprites),1);
		this._addButton("Add 5",160,30,80,30,$bind(this,this._addSprites),5);
		this._addButton("Add 10",240,30,80,30,$bind(this,this._addSprites),10);
		this._quantityLabel = new pixi.widgets.Label("",320,24);
		this._quantityLabel.y = 60;
		this._uiContainer.addChild(this._quantityLabel);
		this.resize();
		this._updateQuanityLabel();
		this.gameContainer.addChild(this._mcContainer);
		this.gameContainer.addChild(this._uiContainer);
	}
	,_addButton: function(label,x,y,width,height,callback,data) {
		mcover.coverage.MCoverage.getLogger().logStatement(260);
		var button = new pixi.widgets.Button(label,width,height,data);
		button.x = x;
		button.y = y;
		button.action.add(callback);
		button.enable();
		this._buttons.push(button);
		this._uiContainer.addChild(button);
	}
	,_updateQuanityLabel: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(261);
		this._quantityLabel.setText("Count " + this._movieclips.length);
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(263);
		var _g1 = 0;
		var _g = this._movieclips.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(262);
			this._mcContainer.removeChild(this._movieclips[i]);
		}
		this._movieclips = [];
		this._isScale = false;
		this._isRotation = false;
		this._updateQuanityLabel();
	}
	,_addSprites: function(count) {
		mcover.coverage.MCoverage.getLogger().logStatement(268);
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			mcover.coverage.MCoverage.getLogger().logStatement(267);
			var textures = [];
			var _g2 = 1;
			var _g1 = Reflect.field(this._animations,"frames");
			while(_g2 < _g1) {
				var i1 = _g2++;
				mcover.coverage.MCoverage.getLogger().logStatement(266);
				var frame = "" + i1;
				while(mcover.coverage.MCoverage.getLogger().logBranch(101,frame.length < 4)) frame = "0" + frame;
				textures.push(PIXI.Texture.fromFrame(Std.string(Reflect.field(this._animations,"name")) + "_" + frame + ".png"));
			}
			var mc = new PIXI.MovieClip(textures);
			mc.x = Std.random(arm.pixidemo.view.StageProperties.screenWidth | 0);
			mc.y = Std.random(arm.pixidemo.view.StageProperties.screenHeight | 0);
			mc.anchor.set(0.5,0.5);
			mc.gotoAndPlay(1);
			this._movieclips.push(mc);
			this._mcContainer.addChild(mc);
			this._applyScale(mc);
		}
		this._updateQuanityLabel();
	}
	,update: function(elapsedTime) {
		mcover.coverage.MCoverage.getLogger().logStatement(274);
		if(mcover.coverage.MCoverage.getLogger().logBranch(107,mcover.coverage.MCoverage.getLogger().logBranch(102,this._isScale) || mcover.coverage.MCoverage.getLogger().logBranch(103,this._isRotation))) {
			mcover.coverage.MCoverage.getLogger().logStatement(273);
			var _g1 = 0;
			var _g = this._movieclips.length;
			while(_g1 < _g) {
				var i = _g1++;
				mcover.coverage.MCoverage.getLogger().logStatement(272);
				var mc = this._movieclips[i];
				if(mcover.coverage.MCoverage.getLogger().logBranch(105,this._isScale)) {
					mcover.coverage.MCoverage.getLogger().logStatement(270);
					if(mcover.coverage.MCoverage.getLogger().logBranch(104,mc.scale.x < 2)) {
						mcover.coverage.MCoverage.getLogger().logStatement(269);
						mc.scale.x += Math.random() / 50 + 0.01;
						mc.scale.y += Math.random() / 50 + 0.01;
					}
				}
				if(mcover.coverage.MCoverage.getLogger().logBranch(106,this._isRotation)) {
					mcover.coverage.MCoverage.getLogger().logStatement(271);
					mc.rotation += Math.random() / 50 + 0.01;
				}
			}
		}
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(276);
		this._reset();
		var _g1 = 0;
		var _g = this._buttons.length;
		while(_g1 < _g) {
			var i = _g1++;
			mcover.coverage.MCoverage.getLogger().logStatement(275);
			var button = this._buttons[i];
			button.disable();
			this._uiContainer.removeChild(button);
			this._buttons[i] = null;
		}
		this._isScale = false;
		this._isRotation = false;
		this._uiContainer.removeChild(this._quantityLabel);
		this.gameContainer.removeChild(this._mcContainer);
		this.gameContainer.removeChild(this._uiContainer);
		this._mcContainer = null;
		this._uiContainer = null;
		this._quantityLabel = null;
		this._buttons = null;
		this._movieclips = null;
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(277);
		this._uiContainer.x = (arm.pixidemo.view.StageProperties.screenWidth - 320) / 2;
		this._uiContainer.y = 20;
	}
	,__class__: arm.pixidemo.components.spritesheets.SpritessheetsView
});
arm.pixidemo.components.typekit = {};
arm.pixidemo.components.typekit.TypekitController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 8;
	mcover.coverage.MCoverage.getLogger().logStatement(278);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.typekit.TypekitView);
};
$hxClasses["arm.pixidemo.components.typekit.TypekitController"] = arm.pixidemo.components.typekit.TypekitController;
arm.pixidemo.components.typekit.TypekitController.__name__ = ["arm","pixidemo","components","typekit","TypekitController"];
arm.pixidemo.components.typekit.TypekitController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.typekit.TypekitController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(279);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(280);
		if(mcover.coverage.MCoverage.getLogger().logBranch(108,this._showing)) this._view.resize();
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(282);
		if(mcover.coverage.MCoverage.getLogger().logBranch(109,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(281);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(285);
		if(mcover.coverage.MCoverage.getLogger().logBranch(112,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(283);
			if(mcover.coverage.MCoverage.getLogger().logBranch(110,!this._showing)) this._view.show();
			this._showing = true;
		} else if(mcover.coverage.MCoverage.getLogger().logBranch(111,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(284);
			this._view.hide();
			this._showing = false;
		}
	}
	,__class__: arm.pixidemo.components.typekit.TypekitController
});
arm.pixidemo.components.typekit.TypekitView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(286);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.typekit.TypekitView"] = arm.pixidemo.components.typekit.TypekitView;
arm.pixidemo.components.typekit.TypekitView.__name__ = ["arm","pixidemo","components","typekit","TypekitView"];
arm.pixidemo.components.typekit.TypekitView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.typekit.TypekitView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(287);
		this._fonts = [];
		this._uiContainer = new PIXI.DisplayObjectContainer();
		this._yPosition = 0;
		this._addFont("futura-pt","#0000FF");
		this._addFont("grafolita-script","#9A2EFE");
		this._addFont("salsbury","#FF0000");
		this._addFont("bree","#0040FF");
		this._addFont("dederon-sans-web","#0B6138");
		this._bitmapText = new PIXI.BitmapText("bitmap font",{ font : "60px Desyrel", align : "left"});
		this._bitmapText.x = -this._bitmapText.width / 2;
		this._bitmapText.y = 200;
		this._uiContainer.addChild(this._bitmapText);
		this.gameContainer.addChild(this._uiContainer);
		this.resize();
	}
	,_addFont: function(name,color) {
		mcover.coverage.MCoverage.getLogger().logStatement(288);
		var style = { };
		style.font = "30px " + name;
		style.fill = color;
		var fontText = new PIXI.Text(name + " - Typekit Font ",style);
		fontText.anchor.set(0.5,0.5);
		fontText.y = this._yPosition;
		this._fonts.push(fontText);
		this._yPosition += 45;
		this._uiContainer.addChild(fontText);
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(289);
		var _g1 = 0;
		var _g = this._fonts.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._uiContainer.removeChild(this._fonts[i]);
		}
		this._uiContainer.removeChild(this._bitmapText);
		this.gameContainer.removeChild(this._uiContainer);
		this._fonts = [];
		this._yPosition = 0;
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(290);
		this._uiContainer.x = arm.pixidemo.view.StageProperties.screenWidth / 2;
		this._uiContainer.y = (arm.pixidemo.view.StageProperties.screenHeight - this._uiContainer.height) / 2;
	}
	,__class__: arm.pixidemo.components.typekit.TypekitView
});
arm.pixidemo.components.video = {};
arm.pixidemo.components.video.VideoController = function(m,v,c,mainModel) {
	this._showing = false;
	this._id = 15;
	mcover.coverage.MCoverage.getLogger().logStatement(291);
	arm.pixidemo.components.GameComponentController.call(this,m,v,c,mainModel);
	this._view = js.Boot.__cast(v , arm.pixidemo.components.video.VideoView);
};
$hxClasses["arm.pixidemo.components.video.VideoController"] = arm.pixidemo.components.video.VideoController;
arm.pixidemo.components.video.VideoController.__name__ = ["arm","pixidemo","components","video","VideoController"];
arm.pixidemo.components.video.VideoController.__super__ = arm.pixidemo.components.GameComponentController;
arm.pixidemo.components.video.VideoController.prototype = $extend(arm.pixidemo.components.GameComponentController.prototype,{
	_addNotificationListeners: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(292);
		arm.pixidemo.components.GameComponentController.prototype._addNotificationListeners.call(this);
		arm.pixidemo.notifications.internal.MenuNotification.click.add($bind(this,this._onMenuClick));
		arm.pixidemo.notifications.internal.MenuNotification.reset.add($bind(this,this._reset));
	}
	,_reset: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(294);
		if(mcover.coverage.MCoverage.getLogger().logBranch(113,this._showing)) {
			mcover.coverage.MCoverage.getLogger().logStatement(293);
			this._view.hide();
			this._showing = false;
		}
	}
	,_onMenuClick: function(id) {
		mcover.coverage.MCoverage.getLogger().logStatement(296);
		if(mcover.coverage.MCoverage.getLogger().logBranch(115,id == this._id)) {
			mcover.coverage.MCoverage.getLogger().logStatement(295);
			if(mcover.coverage.MCoverage.getLogger().logBranch(114,!this._showing)) this._view.show();
			this._showing = true;
		} else this._reset();
	}
	,_resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(297);
		if(mcover.coverage.MCoverage.getLogger().logBranch(116,this._showing)) this._view.resize();
	}
	,__class__: arm.pixidemo.components.video.VideoController
});
arm.pixidemo.components.video.VideoView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(298);
	arm.pixidemo.components.GameComponentView.call(this,stage,container);
};
$hxClasses["arm.pixidemo.components.video.VideoView"] = arm.pixidemo.components.video.VideoView;
arm.pixidemo.components.video.VideoView.__name__ = ["arm","pixidemo","components","video","VideoView"];
arm.pixidemo.components.video.VideoView.__super__ = arm.pixidemo.components.GameComponentView;
arm.pixidemo.components.video.VideoView.prototype = $extend(arm.pixidemo.components.GameComponentView.prototype,{
	show: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(299);
		this._vidTexture = PIXI.VideoTexture.fromUrl("assets/testVideo.mp4");
		this._vidSprite = new PIXI.Sprite(this._vidTexture);
		this._vidSprite.anchor.set(0.5,0.5);
		this.gameContainer.addChild(this._vidSprite);
		this.resize();
	}
	,hide: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(300);
		this._vidTexture.destroy();
		this.gameContainer.removeChild(this._vidSprite);
	}
	,resize: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(301);
		this._vidSprite.x = arm.pixidemo.view.StageProperties.screenWidth / 2;
		this._vidSprite.y = arm.pixidemo.view.StageProperties.screenHeight / 2;
	}
	,__class__: arm.pixidemo.components.video.VideoView
});
arm.pixidemo.controller = {};
arm.pixidemo.controller.DemoController = function(m,v,c) {
	mcover.coverage.MCoverage.getLogger().logStatement(302);
	this._view = js.Boot.__cast(v , arm.pixidemo.view.DemoView);
	arm.mvc.controller.Controller.call(this,m,v,c);
};
$hxClasses["arm.pixidemo.controller.DemoController"] = arm.pixidemo.controller.DemoController;
arm.pixidemo.controller.DemoController.__name__ = ["arm","pixidemo","controller","DemoController"];
arm.pixidemo.controller.DemoController.__super__ = arm.mvc.controller.Controller;
arm.pixidemo.controller.DemoController.prototype = $extend(arm.mvc.controller.Controller.prototype,{
	_getMainModel: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(303);
		return js.Boot.__cast(this.model , arm.pixidemo.model.DemoModel);
	}
	,_setupComponents: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(304);
		this._setupMenuComponent();
		this._setupScreenGuideComponent();
		this._setupScreenTestComponent();
		this._setupSpritesComponent();
		this._setupLocalisationComponent();
		this._setupBunnymarkComponent();
		this._setupCoinsComponent();
		this._setupTypekitComponent();
		this._setupReelsComponent();
		this._setupAudioComponent();
		this._setupSpritesheetsComponent();
		this._setupSkeletonComponent();
		this._setupVideoComponent();
		this._setupLiveVideoComponent();
		this._setupPhysicsComponent();
		this._setupPreloaderComponent();
	}
	,_setupLiveVideoComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(305);
		var liveVideoView = new arm.pixidemo.components.livevideo.LiveVideoView(this._view.gameStage,this._view.gameContainer);
		var liveVideoController = new arm.pixidemo.components.livevideo.LiveVideoController(null,liveVideoView,this.comms,this._getMainModel());
	}
	,_setupVideoComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(306);
		var videoView = new arm.pixidemo.components.video.VideoView(this._view.gameStage,this._view.gameContainer);
		var videoController = new arm.pixidemo.components.video.VideoController(null,videoView,this.comms,this._getMainModel());
	}
	,_setupPhysicsComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(307);
		var physicsView = new arm.pixidemo.components.physics.PhysicsView(this._view.gameStage,this._view.gameContainer);
		var physicsController = new arm.pixidemo.components.physics.PhysicsController(null,physicsView,this.comms,this._getMainModel());
	}
	,_setupSkeletonComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(308);
		var skeletonView = new arm.pixidemo.components.skeleton.SkeletonView(this._view.gameStage,this._view.gameContainer);
		var skeletonController = new arm.pixidemo.components.skeleton.SkeletonController(null,skeletonView,this.comms,this._getMainModel());
	}
	,_setupSpritesheetsComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(309);
		var spritessheetsView = new arm.pixidemo.components.spritesheets.SpritessheetsView(this._view.gameStage,this._view.gameContainer);
		var spritessheetsController = new arm.pixidemo.components.spritesheets.SpritessheetsController(null,spritessheetsView,this.comms,this._getMainModel());
	}
	,_setupReelsComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(310);
		var reelsView = new arm.pixidemo.components.reels.ReelsView(this._view.gameStage,this._view.gameContainer);
		var reelsController = new arm.pixidemo.components.reels.ReelsController(null,reelsView,this.comms,this._getMainModel());
	}
	,_setupAudioComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(311);
		var audioView = new arm.pixidemo.components.audio.AudioView(this._view.gameStage,this._view.gameContainer);
		var audioController = new arm.pixidemo.components.audio.AudioController(null,audioView,this.comms,this._getMainModel());
	}
	,_setupTypekitComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(312);
		var typekitView = new arm.pixidemo.components.typekit.TypekitView(this._view.gameStage,this._view.gameContainer);
		var typekitController = new arm.pixidemo.components.typekit.TypekitController(null,typekitView,this.comms,this._getMainModel());
	}
	,_setupCoinsComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(313);
		var coinsView = new arm.pixidemo.components.coins.CoinsView(this._view.gameStage,this._view.gameContainer);
		var coinsController = new arm.pixidemo.components.coins.CoinsController(null,coinsView,this.comms,this._getMainModel());
	}
	,_setupBunnymarkComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(314);
		var bunnymarkView = new arm.pixidemo.components.bunnymark.BunnymarkView(this._view.gameStage,this._view.gameContainer);
		var bunnymarkController = new arm.pixidemo.components.bunnymark.BunnymarkController(null,bunnymarkView,this.comms,this._getMainModel());
	}
	,_setupLocalisationComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(315);
		var localisationView = new arm.pixidemo.components.localisation.LocalisationView(this._view.gameStage,this._view.gameContainer);
		var localisationController = new arm.pixidemo.components.localisation.LocalisationController(null,localisationView,this.comms,this._getMainModel());
	}
	,_setupSpritesComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(316);
		var spritesView = new arm.pixidemo.components.sprites.SpritesView(this._view.gameStage,this._view.gameContainer);
		var spritesController = new arm.pixidemo.components.sprites.SpritesController(null,spritesView,this.comms,this._getMainModel());
	}
	,_setupScreenTestComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(317);
		var screenTestView = new arm.pixidemo.components.screentest.ScreenTestView(this._view.gameStage,this._view.gameContainer);
		var screenTestController = new arm.pixidemo.components.screentest.ScreenTestController(null,screenTestView,this.comms,this._getMainModel());
	}
	,_setupMenuComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(318);
		var menuView = new arm.pixidemo.components.menu.MenuView(this._view.gameStage,this._view.gameContainer);
		var menuController = new arm.pixidemo.components.menu.MenuController(null,menuView,this.comms,this._getMainModel());
	}
	,_setupScreenGuideComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(319);
		var screenGuideView = new arm.pixidemo.components.screenguide.ScreenGuideView(this._view.gameStage,this._view.gameContainer);
		var screenGuideController = new arm.pixidemo.components.screenguide.ScreenGuideController(null,screenGuideView,this.comms,this._getMainModel());
	}
	,_setupPreloaderComponent: function() {
		mcover.coverage.MCoverage.getLogger().logStatement(320);
		var preloaderView = new arm.pixidemo.components.preloader.PreloaderView(this._view.gameStage,this._view.gameContainer);
		var preloaderController = new arm.pixidemo.components.preloader.PreloaderController(null,preloaderView,this.comms,this._getMainModel());
	}
	,__class__: arm.pixidemo.controller.DemoController
});
arm.pixidemo.core = {};
arm.pixidemo.core.utils = {};
arm.pixidemo.core.utils.BrowserUtils = function() { };
$hxClasses["arm.pixidemo.core.utils.BrowserUtils"] = arm.pixidemo.core.utils.BrowserUtils;
arm.pixidemo.core.utils.BrowserUtils.__name__ = ["arm","pixidemo","core","utils","BrowserUtils"];
arm.pixidemo.core.utils.BrowserUtils.getPixelRatio = function() {
	mcover.coverage.MCoverage.getLogger().logStatement(326);
	var pixelRatio;
	if(mcover.coverage.MCoverage.getLogger().logBranch(117,window.devicePixelRatio <= 2)) pixelRatio = Math.floor(window.devicePixelRatio); else pixelRatio = 2;
	var iOS = new EReg("(iPad|iPhone|iPod)","i");
	if(mcover.coverage.MCoverage.getLogger().logBranch(119,iOS.match(window.navigator.userAgent))) {
		mcover.coverage.MCoverage.getLogger().logStatement(325);
		if(mcover.coverage.MCoverage.getLogger().logBranch(118,window.screen.width == 320 && window.screen.height == 480)) {
			mcover.coverage.MCoverage.getLogger().logStatement(324);
			pixelRatio = 1;
		}
	}
	return pixelRatio;
};
arm.pixidemo.model = {};
arm.pixidemo.model.DemoModel = function() {
	mcover.coverage.MCoverage.getLogger().logStatement(35);
	arm.mvc.model.Model.call(this);
};
$hxClasses["arm.pixidemo.model.DemoModel"] = arm.pixidemo.model.DemoModel;
arm.pixidemo.model.DemoModel.__name__ = ["arm","pixidemo","model","DemoModel"];
arm.pixidemo.model.DemoModel.__super__ = arm.mvc.model.Model;
arm.pixidemo.model.DemoModel.prototype = $extend(arm.mvc.model.Model.prototype,{
	__class__: arm.pixidemo.model.DemoModel
});
arm.pixidemo.notifications = {};
arm.pixidemo.notifications.internal = {};
arm.pixidemo.notifications.internal.MenuNotification = function() { };
$hxClasses["arm.pixidemo.notifications.internal.MenuNotification"] = arm.pixidemo.notifications.internal.MenuNotification;
arm.pixidemo.notifications.internal.MenuNotification.__name__ = ["arm","pixidemo","notifications","internal","MenuNotification"];
arm.pixidemo.resources = {};
arm.pixidemo.resources.Layout = function() {
	mcover.coverage.MCoverage.getLogger().logStatement(28);
};
$hxClasses["arm.pixidemo.resources.Layout"] = arm.pixidemo.resources.Layout;
arm.pixidemo.resources.Layout.__name__ = ["arm","pixidemo","resources","Layout"];
arm.pixidemo.resources.Layout.prototype = {
	getLayout: function(value) {
		mcover.coverage.MCoverage.getLogger().logStatement(27);
		return Reflect.field(arm.pixidemo.resources.Layout,value);
	}
	,__class__: arm.pixidemo.resources.Layout
};
arm.pixidemo.resources.Messages = function() {
	mcover.coverage.MCoverage.getLogger().logStatement(25);
};
$hxClasses["arm.pixidemo.resources.Messages"] = arm.pixidemo.resources.Messages;
arm.pixidemo.resources.Messages.__name__ = ["arm","pixidemo","resources","Messages"];
arm.pixidemo.resources.Messages.prototype = {
	getMessage: function(value,substitite) {
		mcover.coverage.MCoverage.getLogger().logStatement(24);
		var msg = Reflect.field(arm.pixidemo.resources.Messages,value);
		if(mcover.coverage.MCoverage.getLogger().logBranch(11,substitite != null)) msg = StringCore.substitute(msg,substitite);
		return msg;
	}
	,__class__: arm.pixidemo.resources.Messages
};
arm.pixidemo.resources.Settings = function() {
	mcover.coverage.MCoverage.getLogger().logStatement(31);
};
$hxClasses["arm.pixidemo.resources.Settings"] = arm.pixidemo.resources.Settings;
arm.pixidemo.resources.Settings.__name__ = ["arm","pixidemo","resources","Settings"];
arm.pixidemo.resources.Settings.prototype = {
	getSetting: function(value) {
		mcover.coverage.MCoverage.getLogger().logStatement(30);
		return Reflect.field(arm.pixidemo.resources.Settings,value);
	}
	,__class__: arm.pixidemo.resources.Settings
};
arm.pixidemo.resources.Sounds = function() {
	mcover.coverage.MCoverage.getLogger().logStatement(34);
};
$hxClasses["arm.pixidemo.resources.Sounds"] = arm.pixidemo.resources.Sounds;
arm.pixidemo.resources.Sounds.__name__ = ["arm","pixidemo","resources","Sounds"];
arm.pixidemo.resources.Sounds.prototype = {
	getSound: function(value) {
		mcover.coverage.MCoverage.getLogger().logStatement(33);
		return Reflect.field(arm.pixidemo.resources.Sounds,value);
	}
	,__class__: arm.pixidemo.resources.Sounds
};
arm.pixidemo.view = {};
arm.pixidemo.view.DemoView = function(stage,container) {
	mcover.coverage.MCoverage.getLogger().logStatement(321);
	arm.mvc.view.View.call(this,stage,container);
	this.gameStage = js.Boot.__cast(stage , PIXI.Stage);
	this.gameContainer = js.Boot.__cast(container , PIXI.DisplayObjectContainer);
};
$hxClasses["arm.pixidemo.view.DemoView"] = arm.pixidemo.view.DemoView;
arm.pixidemo.view.DemoView.__name__ = ["arm","pixidemo","view","DemoView"];
arm.pixidemo.view.DemoView.__super__ = arm.mvc.view.View;
arm.pixidemo.view.DemoView.prototype = $extend(arm.mvc.view.View.prototype,{
	__class__: arm.pixidemo.view.DemoView
});
arm.pixidemo.view.StageProperties = function() { };
$hxClasses["arm.pixidemo.view.StageProperties"] = arm.pixidemo.view.StageProperties;
arm.pixidemo.view.StageProperties.__name__ = ["arm","pixidemo","view","StageProperties"];
var haxe = {};
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe.CallStack.exceptionStack = function() {
	return [];
};
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Serializer = function() { };
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.prototype = {
	serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(Math.isNaN(v2)) this.buf.b += "k"; else if(!Math.isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var $it0 = v3.iterator();
					while( $it0.hasNext() ) {
						var i1 = $it0.next();
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(HxOverrides.dateStr(d));
					break;
				case haxe.ds.StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it1 = v4.keys();
					while( $it1.hasNext() ) {
						var k = $it1.next();
						this.serializeString(k);
						this.serialize(v4.get(k));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it2 = v5.keys();
					while( $it2.hasNext() ) {
						var k1 = $it2.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.get(k1));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it3 = v6.keys();
					while( $it3.hasNext() ) {
						var k2 = $it3.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe.io.Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe.Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(this.useCache && this.serializeRef(v)) return;
				this.buf.b += "o";
				this.serializeFields(v);
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw "Cannot serialize function";
				break;
			default:
				throw "Cannot serialize " + Std.string(v);
			}
		}
	}
	,__class__: haxe.Serializer
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.Unserializer = function() { };
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0;
	var _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe.Unserializer.prototype = {
	get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c1 = this.buf.charCodeAt(this.pos);
				if(c1 == 104) {
					this.pos++;
					break;
				}
				if(c1 == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw "Invalid reference";
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw "Invalid string reference";
			return this.scache[n2];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw "Enum not found " + name1;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw "Enum not found " + name2;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw "Unknown enum index " + name2 + "@" + index;
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe.ds.IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c2 = this.get(this.pos++);
			while(c2 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c2 = this.get(this.pos++);
			}
			if(c2 != 104) throw "Invalid IntMap format";
			return h1;
		case 77:
			var h2 = new haxe.ds.ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			var s3 = HxOverrides.substr(this.buf,this.pos,19);
			d = HxOverrides.strDate(s3);
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c21 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c21 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c22 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c22 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c22 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw "Class not found " + name3;
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw "Invalid custom data";
			return o2;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,__class__: haxe.Unserializer
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,__class__: haxe.io.Bytes
};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,keys: function() {
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
	,__class__: haxe.ds.IntMap
};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
};
haxe.io.Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
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
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
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
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Browser = function() { };
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
js.Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		return null;
	}
};
var mconsole = {};
mconsole.PrinterBase = function() {
	this.printPosition = true;
	this.printLineNumbers = true;
};
$hxClasses["mconsole.PrinterBase"] = mconsole.PrinterBase;
mconsole.PrinterBase.__name__ = ["mconsole","PrinterBase"];
mconsole.PrinterBase.prototype = {
	print: function(level,params,indent,pos) {
		params = params.slice();
		var _g1 = 0;
		var _g = params.length;
		while(_g1 < _g) {
			var i = _g1++;
			params[i] = Std.string(params[i]);
		}
		var message = params.join(", ");
		var nextPosition = "@ " + pos.className + "." + pos.methodName;
		var nextLineNumber;
		if(pos.lineNumber == null) nextLineNumber = "null"; else nextLineNumber = "" + pos.lineNumber;
		var lineColumn = "";
		var emptyLineColumn = "";
		if(this.printPosition) {
			if(nextPosition != this.position) this.printLine(mconsole.ConsoleColor.none,nextPosition,pos);
		}
		if(this.printLineNumbers) {
			emptyLineColumn = StringTools.lpad(""," ",5);
			if(nextPosition != this.position || nextLineNumber != this.lineNumber) lineColumn = StringTools.lpad(nextLineNumber," ",4) + " "; else lineColumn = emptyLineColumn;
		}
		this.position = nextPosition;
		this.lineNumber = nextLineNumber;
		var color;
		switch(level[1]) {
		case 0:
			color = mconsole.ConsoleColor.white;
			break;
		case 1:
			color = mconsole.ConsoleColor.blue;
			break;
		case 2:
			color = mconsole.ConsoleColor.green;
			break;
		case 3:
			color = mconsole.ConsoleColor.yellow;
			break;
		case 4:
			color = mconsole.ConsoleColor.red;
			break;
		}
		var indent1 = StringTools.lpad(""," ",indent * 2);
		message = lineColumn + indent1 + message;
		message = message.split("\n").join("\n" + emptyLineColumn + indent1);
		this.printLine(color,message,pos);
	}
	,printLine: function(color,line,pos) {
		throw "method not implemented in ConsolePrinterBase";
	}
	,__class__: mconsole.PrinterBase
};
mconsole.Printer = function() { };
$hxClasses["mconsole.Printer"] = mconsole.Printer;
mconsole.Printer.__name__ = ["mconsole","Printer"];
mconsole.Printer.prototype = {
	__class__: mconsole.Printer
};
mconsole.ConsoleView = function() {
	mconsole.PrinterBase.call(this);
	this.atBottom = true;
	this.projectHome = "/haxe/hp-demo/";
	var document = window.document;
	this.element = document.createElement("pre");
	this.element.id = "console";
	var style = document.createElement("style");
	this.element.appendChild(style);
	var rules = document.createTextNode("#console {\n\tfont-family:monospace;\n\tbackground-color:#002B36;\n\tbackground-color:rgba(0%,16.9%,21.2%,0.95);\n\tpadding:8px;\n\theight:600px;\n\tmax-height:600px;\n\toverflow-y:scroll;\n\tposition:absolute;\n\tleft:0px;\n\ttop:0px;\n\tright:0px;\n\tmargin:0px;\n\tz-index:10000;\n}\n#console a { text-decoration:none; }\n#console a:hover div { background-color:#063642 }\n#console a div span { display:none; float:right; color:white; }\n#console a:hover div span { display:block; }");
	style.type = "text/css";
	if(style.styleSheet) style.styleSheet.cssText = rules.nodeValue; else style.appendChild(rules);
	var me = this;
	this.element.onscroll = function(e) {
		me.updateScroll();
	};
};
$hxClasses["mconsole.ConsoleView"] = mconsole.ConsoleView;
mconsole.ConsoleView.__name__ = ["mconsole","ConsoleView"];
mconsole.ConsoleView.__interfaces__ = [mconsole.Printer];
mconsole.ConsoleView.__super__ = mconsole.PrinterBase;
mconsole.ConsoleView.prototype = $extend(mconsole.PrinterBase.prototype,{
	updateScroll: function() {
		this.atBottom = this.element.scrollTop - (this.element.scrollHeight - this.element.clientHeight) == 0;
	}
	,printLine: function(color,line,pos) {
		var style;
		switch(color[1]) {
		case 0:
			style = "#839496";
			break;
		case 1:
			style = "#ffffff";
			break;
		case 2:
			style = "#248bd2";
			break;
		case 3:
			style = "#859900";
			break;
		case 4:
			style = "#b58900";
			break;
		case 5:
			style = "#dc322f";
			break;
		}
		var file = pos.fileName + ":" + pos.lineNumber;
		var fileName = pos.className.split(".").join("/") + ".hx";
		var link = "";
		this.element.innerHTML = this.element.innerHTML + "<a" + link + "><div style='color:" + style + "'>" + line + "<span>" + file + "</span></div></a>";
		if(this.atBottom) this.element.scrollTop = this.element.scrollHeight;
	}
	,__class__: mconsole.ConsoleView
});
mconsole.Console = function() { };
$hxClasses["mconsole.Console"] = mconsole.Console;
mconsole.Console.__name__ = ["mconsole","Console"];
mconsole.Console.start = function() {
	if(mconsole.Console.running) return;
	mconsole.Console.running = true;
	mconsole.Console.previousTrace = haxe.Log.trace;
	haxe.Log.trace = mconsole.Console.haxeTrace;
	if(mconsole.Console.hasConsole) {
	} else {
	}
};
mconsole.Console.haxeTrace = function(value,pos) {
	var params = pos.customParams;
	if(params == null) params = []; else pos.customParams = null;
	var level;
	switch(value) {
	case "log":
		level = mconsole.LogLevel.log;
		break;
	case "warn":
		level = mconsole.LogLevel.warn;
		break;
	case "info":
		level = mconsole.LogLevel.info;
		break;
	case "debug":
		level = mconsole.LogLevel.debug;
		break;
	case "error":
		level = mconsole.LogLevel.error;
		break;
	default:
		params.unshift(value);
		level = mconsole.LogLevel.log;
	}
	if(mconsole.Console.hasConsole) mconsole.Console.callConsole(Std.string(level),params);
	mconsole.Console.print(level,params,pos);
};
mconsole.Console.print = function(level,params,pos) {
	var _g = 0;
	var _g1 = mconsole.Console.printers;
	while(_g < _g1.length) {
		var printer = _g1[_g];
		++_g;
		printer.print(level,params,mconsole.Console.groupDepth,pos);
	}
};
mconsole.Console.detectConsole = function() {
	if(console != null && console[mconsole.Console.dirxml] == null) mconsole.Console.dirxml = "log";
	return console != undefined && console.log != undefined && console.warn != undefined;
};
mconsole.Console.callConsole = function(method,params) {
	if(console[method] != null) {
		if(method == "log" && js.Boot.__instanceof(params[0],Xml)) method = mconsole.Console.dirxml;
		if(console[method].apply != null) console[method].apply(console,mconsole.Console.toConsoleValues(params)); else if(Function.prototype.bind != null) Function.prototype.bind.call(console[method],console).apply(console,mconsole.Console.toConsoleValues(params));
	}
};
mconsole.Console.toConsoleValues = function(params) {
	var _g1 = 0;
	var _g = params.length;
	while(_g1 < _g) {
		var i = _g1++;
		params[i] = mconsole.Console.toConsoleValue(params[i]);
	}
	return params;
};
mconsole.Console.toConsoleValue = function(value) {
	var typeClass = Type.getClass(value);
	var typeName;
	if(typeClass == null) typeName = ""; else typeName = Type.getClassName(typeClass);
	if(typeName == "Xml") {
		var parser = new DOMParser();
		return parser.parseFromString(value.toString(),"text/xml").firstChild;
	} else if(typeName == "Map" || typeName == "StringMap" || typeName == "IntMap") {
		var $native = { };
		var map = value;
		var $it0 = map.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			Reflect.setField($native,Std.string(key),mconsole.Console.toConsoleValue(map.get(key)));
		}
		return $native;
	} else {
		{
			var _g = Type["typeof"](value);
			switch(_g[1]) {
			case 7:
				var e = _g[2];
				var native1 = [];
				var name = Type.getEnumName(e) + "." + Type.enumConstructor(value);
				var params = Type.enumParameters(value);
				if(params.length > 0) {
					native1.push(name + "(");
					var _g2 = 0;
					var _g1 = params.length;
					while(_g2 < _g1) {
						var i = _g2++;
						native1.push(mconsole.Console.toConsoleValue(params[i]));
					}
					native1.push(")");
				} else return [name];
				return native1;
			default:
			}
		}
		if(typeName == "Array" || typeName == "List" || typeName == "haxe.FastList") {
			var native2 = [];
			var iterable = value;
			var $it1 = $iterator(iterable)();
			while( $it1.hasNext() ) {
				var i1 = $it1.next();
				native2.push(mconsole.Console.toConsoleValue(i1));
			}
			return native2;
		}
	}
	return value;
};
mconsole.LogLevel = $hxClasses["mconsole.LogLevel"] = { __ename__ : ["mconsole","LogLevel"], __constructs__ : ["log","info","debug","warn","error"] };
mconsole.LogLevel.log = ["log",0];
mconsole.LogLevel.log.toString = $estr;
mconsole.LogLevel.log.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.info = ["info",1];
mconsole.LogLevel.info.toString = $estr;
mconsole.LogLevel.info.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.debug = ["debug",2];
mconsole.LogLevel.debug.toString = $estr;
mconsole.LogLevel.debug.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.warn = ["warn",3];
mconsole.LogLevel.warn.toString = $estr;
mconsole.LogLevel.warn.__enum__ = mconsole.LogLevel;
mconsole.LogLevel.error = ["error",4];
mconsole.LogLevel.error.toString = $estr;
mconsole.LogLevel.error.__enum__ = mconsole.LogLevel;
mconsole.ConsoleColor = $hxClasses["mconsole.ConsoleColor"] = { __ename__ : ["mconsole","ConsoleColor"], __constructs__ : ["none","white","blue","green","yellow","red"] };
mconsole.ConsoleColor.none = ["none",0];
mconsole.ConsoleColor.none.toString = $estr;
mconsole.ConsoleColor.none.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.white = ["white",1];
mconsole.ConsoleColor.white.toString = $estr;
mconsole.ConsoleColor.white.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.blue = ["blue",2];
mconsole.ConsoleColor.blue.toString = $estr;
mconsole.ConsoleColor.blue.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.green = ["green",3];
mconsole.ConsoleColor.green.toString = $estr;
mconsole.ConsoleColor.green.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.yellow = ["yellow",4];
mconsole.ConsoleColor.yellow.toString = $estr;
mconsole.ConsoleColor.yellow.__enum__ = mconsole.ConsoleColor;
mconsole.ConsoleColor.red = ["red",5];
mconsole.ConsoleColor.red.toString = $estr;
mconsole.ConsoleColor.red.__enum__ = mconsole.ConsoleColor;
var mcover = {};
mcover.Exception = function(message,cause,info) {
	this.type = this.here({ fileName : "Exception.hx", lineNumber : 72, className : "mcover.Exception", methodName : "new"}).className;
	this.message = message;
	this.cause = cause;
	this.info = info;
	if(cause != null) {
		this.causeExceptionStack = haxe.CallStack.exceptionStack();
		this.causeCallStack = haxe.CallStack.callStack();
	}
};
$hxClasses["mcover.Exception"] = mcover.Exception;
mcover.Exception.__name__ = ["mcover","Exception"];
mcover.Exception.prototype = {
	toString: function() {
		var str = this.type + ": " + this.message;
		if(this.info != null) str += " at " + this.info.className + "#" + this.info.methodName + " (" + this.info.lineNumber + ")";
		if(this.cause != null) str += "\n\t Caused by: " + Std.string(this.cause);
		return str;
	}
	,here: function(info) {
		return info;
	}
	,__class__: mcover.Exception
};
mcover.coverage = {};
mcover.coverage.CoverageLogger = function() { };
$hxClasses["mcover.coverage.CoverageLogger"] = mcover.coverage.CoverageLogger;
mcover.coverage.CoverageLogger.__name__ = ["mcover","coverage","CoverageLogger"];
mcover.coverage.CoverageLogger.prototype = {
	__class__: mcover.coverage.CoverageLogger
};
mcover.coverage.CoverageLoggerImpl = function() {
	this.allStatementResultsById = new haxe.ds.IntMap();
	this.allBranchResultsById = new haxe.ds.IntMap();
	this.filteredResultsMap = new haxe.ds.StringMap();
	this.clients = [];
};
$hxClasses["mcover.coverage.CoverageLoggerImpl"] = mcover.coverage.CoverageLoggerImpl;
mcover.coverage.CoverageLoggerImpl.__name__ = ["mcover","coverage","CoverageLoggerImpl"];
mcover.coverage.CoverageLoggerImpl.__interfaces__ = [mcover.coverage.CoverageLogger];
mcover.coverage.CoverageLoggerImpl.prototype = {
	logStatement: function(id) {
		this.updateStatementMap(this.allStatementResultsById,id);
		if(this.currentFilteredResults != null) this.updateStatementMap(this.currentFilteredResults.statementResultsById,id);
	}
	,updateStatementMap: function(map,id) {
		var count = 1;
		if(map.exists(id)) count = map.get(id) + 1;
		map.set(id,count);
	}
	,logBranch: function(id,value,compareValue) {
		var bool = false;
		if(compareValue != null) bool = value == compareValue; else bool = value;
		this.updateBranchMap(this.allBranchResultsById,id,bool);
		if(this.currentFilteredResults != null) this.updateBranchMap(this.currentFilteredResults.branchResultsById,id,bool);
		return value;
	}
	,updateBranchMap: function(map,id,value) {
		var r = null;
		if(map.exists(id)) r = map.get(id); else {
			r = { id : id, trueCount : 0, falseCount : 0, total : 0};
			map.set(id,r);
		}
		if(value) r.trueCount++; else r.falseCount++;
		r.total++;
	}
	,__class__: mcover.coverage.CoverageLoggerImpl
};
mcover.coverage.CoverageReportClient = function() { };
$hxClasses["mcover.coverage.CoverageReportClient"] = mcover.coverage.CoverageReportClient;
mcover.coverage.CoverageReportClient.__name__ = ["mcover","coverage","CoverageReportClient"];
mcover.coverage.MCoverage = function() { };
$hxClasses["mcover.coverage.MCoverage"] = mcover.coverage.MCoverage;
mcover.coverage.MCoverage.__name__ = ["mcover","coverage","MCoverage"];
mcover.coverage.MCoverage.getLogger = function() {
	if(mcover.coverage.MCoverage.logger == null) mcover.coverage.MCoverage.logger = new mcover.coverage.CoverageLoggerImpl();
	return mcover.coverage.MCoverage.logger;
};
mcover.coverage.data = {};
mcover.coverage.data.AbstractNode = function() {
};
$hxClasses["mcover.coverage.data.AbstractNode"] = mcover.coverage.data.AbstractNode;
mcover.coverage.data.AbstractNode.__name__ = ["mcover","coverage","data","AbstractNode"];
mcover.coverage.data.AbstractNode.prototype = {
	getResults: function(cache) {
		if(cache == null) cache = true;
		if(this.resultCache == null || !cache) this.resultCache = this.emptyResult();
		return this.resultCache;
	}
	,getPercentage: function() {
		var r = this.getResults();
		try {
			var count = r.bt + r.bf + r.sc + r.mc;
			var total = 2 * r.b + r.s + r.m;
			if(count == 0 || total == 0) return 0;
			return Math.round(count / total * 10000) / 100;
		} catch( e ) {
		}
		return 0;
	}
	,getClasses: function() {
		return [];
	}
	,lookupBranch: function(path) {
		return null;
	}
	,lookupStatement: function(path) {
		return null;
	}
	,getMissingBranches: function() {
		return [];
	}
	,getMissingStatements: function() {
		return [];
	}
	,emptyResult: function() {
		return { lc : 0, lp : 0, l : 0, sc : 0, s : 0, bt : 0, bf : 0, bc : 0, b : 0, mc : 0, m : 0, cc : 0, c : 0, fc : 0, f : 0, pc : 0, p : 0};
	}
	,hxSerialize: function(s) {
		s.serialize(this.id);
		s.serialize(this.name);
	}
	,hxUnserialize: function(s) {
		this.id = s.unserialize();
		this.name = s.unserialize();
	}
	,__class__: mcover.coverage.data.AbstractNode
};
mcover.coverage.data.AbstractBlock = function() {
	mcover.coverage.data.AbstractNode.call(this);
	this.lines = [];
};
$hxClasses["mcover.coverage.data.AbstractBlock"] = mcover.coverage.data.AbstractBlock;
mcover.coverage.data.AbstractBlock.__name__ = ["mcover","coverage","data","AbstractBlock"];
mcover.coverage.data.AbstractBlock.__super__ = mcover.coverage.data.AbstractNode;
mcover.coverage.data.AbstractBlock.prototype = $extend(mcover.coverage.data.AbstractNode.prototype,{
	isCovered: function() {
		return false;
	}
	,toString: function() {
		return this.qualifiedClassName + "#" + this.toLocalString();
	}
	,toLocalString: function() {
		return this.methodName + " | " + this.location;
	}
	,hxSerialize: function(s) {
		mcover.coverage.data.AbstractNode.prototype.hxSerialize.call(this,s);
		s.serialize(this.file);
		s.serialize(this.packageName);
		s.serialize(this.className);
		s.serialize(this.qualifiedClassName);
		s.serialize(this.methodName);
		s.serialize(this.min);
		s.serialize(this.max);
		s.serialize(this.location);
		s.serialize(this.lookup);
		s.serialize(this.lines);
	}
	,hxUnserialize: function(s) {
		mcover.coverage.data.AbstractNode.prototype.hxUnserialize.call(this,s);
		this.file = s.unserialize();
		this.packageName = s.unserialize();
		this.className = s.unserialize();
		this.qualifiedClassName = s.unserialize();
		this.methodName = s.unserialize();
		this.min = s.unserialize();
		this.max = s.unserialize();
		this.location = s.unserialize();
		this.lookup = s.unserialize();
		this.lines = s.unserialize();
	}
	,__class__: mcover.coverage.data.AbstractBlock
});
mcover.coverage.data.AbstractNodeList = function() {
	mcover.coverage.data.AbstractNode.call(this);
	this.itemCount = 0;
	this.itemsById = new haxe.ds.IntMap();
	this.items = new haxe.ds.StringMap();
};
$hxClasses["mcover.coverage.data.AbstractNodeList"] = mcover.coverage.data.AbstractNodeList;
mcover.coverage.data.AbstractNodeList.__name__ = ["mcover","coverage","data","AbstractNodeList"];
mcover.coverage.data.AbstractNodeList.__super__ = mcover.coverage.data.AbstractNode;
mcover.coverage.data.AbstractNodeList.prototype = $extend(mcover.coverage.data.AbstractNode.prototype,{
	getItemByName: function(name,cls) {
		if(!this.items.exists(name)) {
			var item = Type.createInstance(cls,[]);
			item.id = this.itemCount++;
			item.name = name;
			this.items.set(name,item.id);
			this.itemsById.set(item.id,item);
		}
		return this.itemsById.get(this.items.get(name));
	}
	,lookupBranch: function(path) {
		var itemId = path.shift();
		if(itemId == null || !this.itemsById.exists(itemId)) return null;
		return this.itemsById.get(itemId).lookupBranch(path);
	}
	,lookupStatement: function(path) {
		var itemId = path.shift();
		if(itemId == null || !this.itemsById.exists(itemId)) return null;
		return this.itemsById.get(itemId).lookupStatement(path);
	}
	,getMissingBranches: function() {
		var a = [];
		var $it0 = this.itemsById.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			var tmp = node.getMissingBranches();
			a = a.concat(tmp);
		}
		a.sort(mcover.coverage.data.DataUtil.sortOnBlockName);
		return a;
	}
	,getMissingStatements: function() {
		var a = [];
		var $it0 = this.itemsById.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			var tmp = node.getMissingStatements();
			a = a.concat(tmp);
		}
		a.sort(mcover.coverage.data.DataUtil.sortOnBlockName);
		return a;
	}
	,getClasses: function() {
		var a = [];
		var $it0 = this.itemsById.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			var tmp = node.getClasses();
			a = a.concat(tmp);
		}
		return a;
	}
	,getResults: function(cache) {
		if(cache == null) cache = true;
		if(this.resultCache == null || !cache) {
			this.resultCache = this.emptyResult();
			var $it0 = this.itemsById.iterator();
			while( $it0.hasNext() ) {
				var node = $it0.next();
				var tmp = node.getResults(cache);
				this.resultCache = this.appendResults(this.resultCache,tmp);
			}
		}
		return this.resultCache;
	}
	,appendResults: function(to,from) {
		to.sc += from.sc;
		to.s += from.s;
		to.bt += from.bt;
		to.bf += from.bf;
		to.bc += from.bc;
		to.b += from.b;
		to.mc += from.mc;
		to.m += from.m;
		to.cc += from.cc;
		to.c += from.c;
		to.fc += from.fc;
		to.f += from.f;
		to.pc += from.pc;
		to.p += from.p;
		to.lc += from.lc;
		to.lp += from.lp;
		to.l += from.l;
		return to;
	}
	,hxSerialize: function(s) {
		mcover.coverage.data.AbstractNode.prototype.hxSerialize.call(this,s);
		s.serialize(this.itemsById);
		s.serialize(this.items);
		s.serialize(this.itemCount);
	}
	,hxUnserialize: function(s) {
		mcover.coverage.data.AbstractNode.prototype.hxUnserialize.call(this,s);
		this.itemsById = s.unserialize();
		this.items = s.unserialize();
		this.itemCount = s.unserialize();
	}
	,__class__: mcover.coverage.data.AbstractNodeList
});
mcover.coverage.data.Branch = function() {
	mcover.coverage.data.AbstractBlock.call(this);
	this.trueCount = 0;
	this.falseCount = 0;
};
$hxClasses["mcover.coverage.data.Branch"] = mcover.coverage.data.Branch;
mcover.coverage.data.Branch.__name__ = ["mcover","coverage","data","Branch"];
mcover.coverage.data.Branch.__super__ = mcover.coverage.data.AbstractBlock;
mcover.coverage.data.Branch.prototype = $extend(mcover.coverage.data.AbstractBlock.prototype,{
	get_totalCount: function() {
		return this.trueCount + this.falseCount;
	}
	,isCovered: function() {
		return this.trueCount > 0 && this.falseCount > 0;
	}
	,isPartiallyCovered: function() {
		return !this.isCovered() && (this.trueCount > 0 || this.falseCount > 0);
	}
	,toLocalString: function() {
		var s = mcover.coverage.data.AbstractBlock.prototype.toLocalString.call(this);
		if(!this.isCovered()) {
			s += " | ";
			if(this.trueCount == 0) s += "t";
			if(this.trueCount == 0 && this.falseCount == 0) s += ",";
			if(this.falseCount == 0) s += "f";
		}
		return s;
	}
	,hxSerialize: function(s) {
		mcover.coverage.data.AbstractBlock.prototype.hxSerialize.call(this,s);
		s.serialize(this.trueCount);
		s.serialize(this.falseCount);
	}
	,hxUnserialize: function(s) {
		mcover.coverage.data.AbstractBlock.prototype.hxUnserialize.call(this,s);
		this.trueCount = s.unserialize();
		this.falseCount = s.unserialize();
	}
	,__class__: mcover.coverage.data.Branch
	,__properties__: {get_totalCount:"get_totalCount"}
});
mcover.coverage.data.Clazz = function() {
	mcover.coverage.data.AbstractNodeList.call(this);
};
$hxClasses["mcover.coverage.data.Clazz"] = mcover.coverage.data.Clazz;
mcover.coverage.data.Clazz.__name__ = ["mcover","coverage","data","Clazz"];
mcover.coverage.data.Clazz.__super__ = mcover.coverage.data.AbstractNodeList;
mcover.coverage.data.Clazz.prototype = $extend(mcover.coverage.data.AbstractNodeList.prototype,{
	getMethods: function() {
		var a = [];
		var $it0 = this.itemsById.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			if(Type.getClass(item) == mcover.coverage.data.Method) a.push(js.Boot.__cast(item , mcover.coverage.data.Method));
		}
		return a;
	}
	,appendResults: function(to,from) {
		to = mcover.coverage.data.AbstractNodeList.prototype.appendResults.call(this,to,from);
		if(from.sc > 0) to.mc += 1; else to.mc += 0;
		to.m += 1;
		return to;
	}
	,__class__: mcover.coverage.data.Clazz
});
mcover.coverage.data.Coverage = function() {
	mcover.coverage.data.AbstractNodeList.call(this);
	this.statements = new haxe.ds.IntMap();
	this.branches = new haxe.ds.IntMap();
	this.statementResultsById = new haxe.ds.IntMap();
	this.branchResultsById = new haxe.ds.IntMap();
};
$hxClasses["mcover.coverage.data.Coverage"] = mcover.coverage.data.Coverage;
mcover.coverage.data.Coverage.__name__ = ["mcover","coverage","data","Coverage"];
mcover.coverage.data.Coverage.__super__ = mcover.coverage.data.AbstractNodeList;
mcover.coverage.data.Coverage.prototype = $extend(mcover.coverage.data.AbstractNodeList.prototype,{
	setStatementResultsMap: function(map) {
		this.statementResultsById = map;
	}
	,setBranchResultsMap: function(map) {
		this.branchResultsById = map;
	}
	,addStatement: function(block) {
		this.verifyBlockData(block);
		if(this.statements.exists(block.id)) throw new mcover.Exception("Statement already exists: " + block.id + " " + block.toString(),null,{ fileName : "Coverage.hx", lineNumber : 78, className : "mcover.coverage.data.Coverage", methodName : "addStatement"});
		var packg;
		packg = js.Boot.__cast(this.getItemByName(block.packageName,mcover.coverage.data.Package) , mcover.coverage.data.Package);
		var file;
		file = js.Boot.__cast(packg.getItemByName(block.file,mcover.coverage.data.File) , mcover.coverage.data.File);
		var clazz;
		clazz = js.Boot.__cast(file.getItemByName(block.qualifiedClassName,mcover.coverage.data.Clazz) , mcover.coverage.data.Clazz);
		var method;
		method = js.Boot.__cast(clazz.getItemByName(block.methodName,mcover.coverage.data.Method) , mcover.coverage.data.Method);
		method.addStatement(block);
		block.lookup = [packg.id,file.id,clazz.id,method.id,block.id];
		this.statements.set(block.id,block.lookup.concat([]));
	}
	,addBranch: function(block) {
		this.verifyBlockData(block);
		if(this.branches.exists(block.id)) throw new mcover.Exception("Branch already exists: " + block.id + " " + block.toString(),null,{ fileName : "Coverage.hx", lineNumber : 94, className : "mcover.coverage.data.Coverage", methodName : "addBranch"});
		var packg;
		packg = js.Boot.__cast(this.getItemByName(block.packageName,mcover.coverage.data.Package) , mcover.coverage.data.Package);
		var file;
		file = js.Boot.__cast(packg.getItemByName(block.file,mcover.coverage.data.File) , mcover.coverage.data.File);
		var clazz;
		clazz = js.Boot.__cast(file.getItemByName(block.qualifiedClassName,mcover.coverage.data.Clazz) , mcover.coverage.data.Clazz);
		var method;
		method = js.Boot.__cast(clazz.getItemByName(block.methodName,mcover.coverage.data.Method) , mcover.coverage.data.Method);
		method.addBranch(block);
		block.lookup = [packg.id,file.id,clazz.id,method.id,block.id];
		this.branches.set(block.id,block.lookup.concat([]));
	}
	,verifyBlockData: function(block) {
		if(block.id == null) throw new mcover.Exception("id cannot be null",null,{ fileName : "Coverage.hx", lineNumber : 109, className : "mcover.coverage.data.Coverage", methodName : "verifyBlockData"});
		if(block.packageName == null) throw new mcover.Exception("packageName cannot be null",null,{ fileName : "Coverage.hx", lineNumber : 110, className : "mcover.coverage.data.Coverage", methodName : "verifyBlockData"});
		if(block.file == null) throw new mcover.Exception("file cannot be null",null,{ fileName : "Coverage.hx", lineNumber : 111, className : "mcover.coverage.data.Coverage", methodName : "verifyBlockData"});
		if(block.qualifiedClassName == null) throw new mcover.Exception("qualifiedClassName cannot be null",null,{ fileName : "Coverage.hx", lineNumber : 112, className : "mcover.coverage.data.Coverage", methodName : "verifyBlockData"});
		if(block.methodName == null) throw new mcover.Exception("methodName cannot be null",null,{ fileName : "Coverage.hx", lineNumber : 113, className : "mcover.coverage.data.Coverage", methodName : "verifyBlockData"});
	}
	,getBranchById: function(id) {
		if(!this.branches.exists(id)) throw new mcover.Exception("Branch does not exist: " + id,null,{ fileName : "Coverage.hx", lineNumber : 118, className : "mcover.coverage.data.Coverage", methodName : "getBranchById"});
		var lookup = this.branches.get(id).concat([]);
		return this.lookupBranch(lookup);
	}
	,getStatementById: function(id) {
		if(!this.statements.exists(id)) throw new mcover.Exception("Statement does not exist: " + id,null,{ fileName : "Coverage.hx", lineNumber : 127, className : "mcover.coverage.data.Coverage", methodName : "getStatementById"});
		var lookup = this.statements.get(id).concat([]);
		return this.lookupStatement(lookup);
	}
	,getMissingBranches: function() {
		var a = mcover.coverage.data.AbstractNodeList.prototype.getMissingBranches.call(this);
		a.sort(mcover.coverage.data.DataUtil.sortOnBlockName);
		return a;
	}
	,getMissingStatements: function() {
		var a = mcover.coverage.data.AbstractNodeList.prototype.getMissingStatements.call(this);
		a.sort(mcover.coverage.data.DataUtil.sortOnBlockName);
		return a;
	}
	,getClasses: function() {
		var a = mcover.coverage.data.AbstractNodeList.prototype.getClasses.call(this);
		a.sort(mcover.coverage.data.DataUtil.sortOnNodeName);
		return a;
	}
	,getClassByName: function(name) {
		var index = name.lastIndexOf(".");
		var packageName;
		if(index > 1) packageName = HxOverrides.substr(name,0,index); else packageName = "";
		if(!this.items.exists(packageName)) return null;
		var pckgId = this.items.get(packageName);
		var pckg;
		pckg = js.Boot.__cast(this.itemsById.get(pckgId) , mcover.coverage.data.Package);
		var classes = pckg.getClasses();
		var _g = 0;
		while(_g < classes.length) {
			var cls = classes[_g];
			++_g;
			if(cls.name == name) return cls;
		}
		return null;
	}
	,getPackages: function() {
		var a = [];
		var $it0 = this.itemsById.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			a.push(js.Boot.__cast(item , mcover.coverage.data.Package));
		}
		a.sort(mcover.coverage.data.DataUtil.sortOnNodeName);
		return a;
	}
	,getResults: function(cache) {
		if(cache == null) cache = true;
		if(this.resultCache == null || !cache) {
			var $it0 = this.statements.iterator();
			while( $it0.hasNext() ) {
				var lookup = $it0.next();
				var statement = this.lookupStatement(lookup.concat([]));
				if(this.statementResultsById.exists(statement.id)) statement.count = this.statementResultsById.get(statement.id); else statement.count = 0;
			}
			var $it1 = this.branches.iterator();
			while( $it1.hasNext() ) {
				var lookup1 = $it1.next();
				var branch = this.lookupBranch(lookup1.concat([]));
				if(this.branchResultsById.exists(branch.id)) {
					var result = this.branchResultsById.get(branch.id);
					branch.trueCount = result.trueCount;
					branch.falseCount = result.falseCount;
				} else {
					branch.trueCount = 0;
					branch.falseCount = 0;
				}
			}
			mcover.coverage.data.AbstractNodeList.prototype.getResults.call(this,cache);
		}
		return this.resultCache;
	}
	,appendResults: function(to,from) {
		to = mcover.coverage.data.AbstractNodeList.prototype.appendResults.call(this,to,from);
		if(from.sc > 0) to.pc += 1; else to.pc += 0;
		to.p += 1;
		return to;
	}
	,hxSerialize: function(s) {
		mcover.coverage.data.AbstractNodeList.prototype.hxSerialize.call(this,s);
		s.serialize(this.statements);
		s.serialize(this.branches);
		s.serialize(this.statementResultsById);
		s.serialize(this.branchResultsById);
	}
	,hxUnserialize: function(s) {
		mcover.coverage.data.AbstractNodeList.prototype.hxUnserialize.call(this,s);
		this.statements = s.unserialize();
		this.branches = s.unserialize();
		this.statementResultsById = s.unserialize();
		this.branchResultsById = s.unserialize();
	}
	,__class__: mcover.coverage.data.Coverage
});
mcover.coverage.data.DataUtil = function() { };
$hxClasses["mcover.coverage.data.DataUtil"] = mcover.coverage.data.DataUtil;
mcover.coverage.data.DataUtil.__name__ = ["mcover","coverage","data","DataUtil"];
mcover.coverage.data.DataUtil.sortOnNodeName = function(a,b) {
	var nodeA = a.name.toLowerCase();
	var nodeB = b.name.toLowerCase();
	if(nodeA < nodeB) return -1;
	if(nodeA > nodeB) return 1;
	return 0;
};
mcover.coverage.data.DataUtil.sortOnBlockName = function(a,b) {
	var blockA = a.toString().toLowerCase();
	var blockB = b.toString().toLowerCase();
	if(blockA < blockB) return -1;
	if(blockA > blockB) return 1;
	return 0;
};
mcover.coverage.data.File = function() {
	mcover.coverage.data.AbstractNodeList.call(this);
};
$hxClasses["mcover.coverage.data.File"] = mcover.coverage.data.File;
mcover.coverage.data.File.__name__ = ["mcover","coverage","data","File"];
mcover.coverage.data.File.__super__ = mcover.coverage.data.AbstractNodeList;
mcover.coverage.data.File.prototype = $extend(mcover.coverage.data.AbstractNodeList.prototype,{
	getClasses: function() {
		var a = [];
		var $it0 = this.itemsById.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			if(Type.getClass(item) == mcover.coverage.data.Clazz) a.push(js.Boot.__cast(item , mcover.coverage.data.Clazz));
		}
		return a;
	}
	,appendResults: function(to,from) {
		to = mcover.coverage.data.AbstractNodeList.prototype.appendResults.call(this,to,from);
		if(from.sc > 0) to.cc += 1; else to.cc += 0;
		to.c += 1;
		return to;
	}
	,__class__: mcover.coverage.data.File
});
mcover.coverage.data.Method = function() {
	mcover.coverage.data.AbstractNode.call(this);
	this.statementsById = new haxe.ds.IntMap();
	this.branchesById = new haxe.ds.IntMap();
};
$hxClasses["mcover.coverage.data.Method"] = mcover.coverage.data.Method;
mcover.coverage.data.Method.__name__ = ["mcover","coverage","data","Method"];
mcover.coverage.data.Method.__super__ = mcover.coverage.data.AbstractNode;
mcover.coverage.data.Method.prototype = $extend(mcover.coverage.data.AbstractNode.prototype,{
	addStatement: function(value) {
		this.statementsById.set(value.id,value);
	}
	,addBranch: function(value) {
		this.branchesById.set(value.id,value);
	}
	,getStatementById: function(id) {
		if(this.statementsById.exists(id)) return this.statementsById.get(id);
		return null;
	}
	,getBranchById: function(id) {
		if(this.branchesById.exists(id)) return this.branchesById.get(id);
		return null;
	}
	,lookupBranch: function(path) {
		var itemId = path.shift();
		if(itemId == null || !this.branchesById.exists(itemId)) return null;
		return this.branchesById.get(itemId);
	}
	,lookupStatement: function(path) {
		var itemId = path.shift();
		if(itemId == null || !this.statementsById.exists(itemId)) return null;
		return this.statementsById.get(itemId);
	}
	,getMissingBranches: function() {
		var a = [];
		var $it0 = this.branchesById.iterator();
		while( $it0.hasNext() ) {
			var branch = $it0.next();
			if(!branch.isCovered()) a.push(branch);
		}
		return a;
	}
	,getMissingStatements: function() {
		var a = [];
		var $it0 = this.statementsById.iterator();
		while( $it0.hasNext() ) {
			var statement = $it0.next();
			if(!statement.isCovered()) a.push(statement);
		}
		return a;
	}
	,getResults: function(cache) {
		if(cache == null) cache = true;
		if(this.resultCache == null || !cache) {
			this.resultCache = this.emptyResult();
			var covered;
			var $it0 = this.statementsById.iterator();
			while( $it0.hasNext() ) {
				var statement = $it0.next();
				covered = statement.count > 0;
				if(covered) this.resultCache.sc += 1; else this.resultCache.sc += 0;
				this.resultCache.s += 1;
				var _g = 0;
				var _g1 = statement.lines;
				while(_g < _g1.length) {
					var line = _g1[_g];
					++_g;
					if(covered) this.resultCache.lc += 1; else this.resultCache.lc += 0;
					this.resultCache.l += 1;
				}
			}
			var $it1 = this.branchesById.iterator();
			while( $it1.hasNext() ) {
				var branch = $it1.next();
				covered = branch.isCovered();
				if(branch.trueCount > 0) this.resultCache.bt += 1; else this.resultCache.bt += 0;
				if(branch.falseCount > 0) this.resultCache.bf += 1; else this.resultCache.bf += 0;
				if(covered) this.resultCache.bc += 1; else this.resultCache.bc += 0;
				this.resultCache.b += 1;
				var partiallyCovered = branch.isPartiallyCovered();
				var _g2 = 0;
				var _g11 = branch.lines;
				while(_g2 < _g11.length) {
					var line1 = _g11[_g2];
					++_g2;
					if(covered) this.resultCache.lc += 1; else if(partiallyCovered) this.resultCache.lp += 1;
					this.resultCache.l += 1;
				}
			}
		}
		return this.resultCache;
	}
	,hxSerialize: function(s) {
		mcover.coverage.data.AbstractNode.prototype.hxSerialize.call(this,s);
		s.serialize(this.statementsById);
		s.serialize(this.branchesById);
	}
	,hxUnserialize: function(s) {
		mcover.coverage.data.AbstractNode.prototype.hxUnserialize.call(this,s);
		this.statementsById = s.unserialize();
		this.branchesById = s.unserialize();
	}
	,__class__: mcover.coverage.data.Method
});
mcover.coverage.data.Package = function() {
	mcover.coverage.data.AbstractNodeList.call(this);
};
$hxClasses["mcover.coverage.data.Package"] = mcover.coverage.data.Package;
mcover.coverage.data.Package.__name__ = ["mcover","coverage","data","Package"];
mcover.coverage.data.Package.__super__ = mcover.coverage.data.AbstractNodeList;
mcover.coverage.data.Package.prototype = $extend(mcover.coverage.data.AbstractNodeList.prototype,{
	getFiles: function() {
		var a = [];
		var $it0 = this.itemsById.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			if(Type.getClass(item) == mcover.coverage.data.File) a.push(js.Boot.__cast(item , mcover.coverage.data.File));
		}
		return a;
	}
	,appendResults: function(to,from) {
		to = mcover.coverage.data.AbstractNodeList.prototype.appendResults.call(this,to,from);
		if(from.sc > 0) to.fc += 1; else to.fc += 0;
		to.f += 1;
		return to;
	}
	,__class__: mcover.coverage.data.Package
});
mcover.coverage.data.Statement = function() {
	mcover.coverage.data.AbstractBlock.call(this);
	this.count = 0;
};
$hxClasses["mcover.coverage.data.Statement"] = mcover.coverage.data.Statement;
mcover.coverage.data.Statement.__name__ = ["mcover","coverage","data","Statement"];
mcover.coverage.data.Statement.__super__ = mcover.coverage.data.AbstractBlock;
mcover.coverage.data.Statement.prototype = $extend(mcover.coverage.data.AbstractBlock.prototype,{
	isCovered: function() {
		return this.count > 0;
	}
	,hxSerialize: function(s) {
		mcover.coverage.data.AbstractBlock.prototype.hxSerialize.call(this,s);
		s.serialize(this.count);
	}
	,hxUnserialize: function(s) {
		mcover.coverage.data.AbstractBlock.prototype.hxUnserialize.call(this,s);
		this.count = s.unserialize();
	}
	,__class__: mcover.coverage.data.Statement
});
var motion = {};
motion.actuators = {};
motion.actuators.IGenericActuator = function() { };
$hxClasses["motion.actuators.IGenericActuator"] = motion.actuators.IGenericActuator;
motion.actuators.IGenericActuator.__name__ = ["motion","actuators","IGenericActuator"];
motion.actuators.IGenericActuator.prototype = {
	__class__: motion.actuators.IGenericActuator
};
motion.actuators.GenericActuator = function(target,duration,properties) {
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
	this._ease = motion.Actuate.defaultEase;
};
$hxClasses["motion.actuators.GenericActuator"] = motion.actuators.GenericActuator;
motion.actuators.GenericActuator.__name__ = ["motion","actuators","GenericActuator"];
motion.actuators.GenericActuator.__interfaces__ = [motion.actuators.IGenericActuator];
motion.actuators.GenericActuator.prototype = {
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
		return method.apply(method,params);
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
		motion.Actuate.unload(this);
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
	,__class__: motion.actuators.GenericActuator
};
motion.actuators.SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = new Array();
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = haxe.Timer.stamp();
	motion.actuators.GenericActuator.call(this,target,duration,properties);
	if(!motion.actuators.SimpleActuator.addedEvent) {
		motion.actuators.SimpleActuator.addedEvent = true;
		motion.actuators.SimpleActuator.timer = new haxe.Timer(33);
		motion.actuators.SimpleActuator.timer.run = motion.actuators.SimpleActuator.stage_onEnterFrame;
	}
};
$hxClasses["motion.actuators.SimpleActuator"] = motion.actuators.SimpleActuator;
motion.actuators.SimpleActuator.__name__ = ["motion","actuators","SimpleActuator"];
motion.actuators.SimpleActuator.stage_onEnterFrame = function() {
	var currentTime = haxe.Timer.stamp();
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g1 = 0;
	var _g = motion.actuators.SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		var i = _g1++;
		actuator = motion.actuators.SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime > actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			motion.actuators.SimpleActuator.actuators.splice(j,1);
			--motion.actuators.SimpleActuator.actuatorsLength;
		}
	}
};
motion.actuators.SimpleActuator.__super__ = motion.actuators.GenericActuator;
motion.actuators.SimpleActuator.prototype = $extend(motion.actuators.GenericActuator.prototype,{
	setField_motion_actuators_SimpleActuator_T: function(target,propertyName,value) {
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
				details = new motion.actuators.PropertyDetails(this.target,i,start,this.getField(this.properties,i) - start,isField);
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
		motion.actuators.SimpleActuator.actuators.push(this);
		++motion.actuators.SimpleActuator.actuatorsLength;
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
			motion.actuators.GenericActuator.prototype.pause.call(this);
			this.pauseTime = haxe.Timer.stamp();
		}
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += (haxe.Timer.stamp() - this.pauseTime) / 1000;
			motion.actuators.GenericActuator.prototype.resume.call(this);
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
	,__class__: motion.actuators.SimpleActuator
});
motion.easing = {};
motion.easing.Expo = function() { };
$hxClasses["motion.easing.Expo"] = motion.easing.Expo;
motion.easing.Expo.__name__ = ["motion","easing","Expo"];
motion.easing.Expo.__properties__ = {get_easeOut:"get_easeOut"}
motion.easing.Expo.get_easeOut = function() {
	return new motion.easing.ExpoEaseOut();
};
motion.easing.IEasing = function() { };
$hxClasses["motion.easing.IEasing"] = motion.easing.IEasing;
motion.easing.IEasing.__name__ = ["motion","easing","IEasing"];
motion.easing.IEasing.prototype = {
	__class__: motion.easing.IEasing
};
motion.easing.ExpoEaseOut = function() {
};
$hxClasses["motion.easing.ExpoEaseOut"] = motion.easing.ExpoEaseOut;
motion.easing.ExpoEaseOut.__name__ = ["motion","easing","ExpoEaseOut"];
motion.easing.ExpoEaseOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.ExpoEaseOut.prototype = {
	calculate: function(k) {
		if(k == 1) return 1; else return 1 - Math.pow(2,-10 * k);
	}
	,__class__: motion.easing.ExpoEaseOut
};
motion.Actuate = function() { };
$hxClasses["motion.Actuate"] = motion.Actuate;
motion.Actuate.__name__ = ["motion","Actuate"];
motion.Actuate.apply = function(target,properties,customActuator) {
	motion.Actuate.stop(target,properties);
	if(customActuator == null) customActuator = motion.Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion.Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!(motion.Actuate.targetLibraries.h.__keys__[target.__id__] != null) && allowCreation) motion.Actuate.targetLibraries.set(target,new Array());
	return motion.Actuate.targetLibraries.h[target.__id__];
};
motion.Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js.Boot.__instanceof(target,motion.actuators.IGenericActuator)) {
			var actuator = target;
			actuator.stop(null,complete,sendEvent);
		} else {
			var library = motion.Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					Reflect.setField(temp,properties,null);
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1;
					_g1 = js.Boot.__cast(properties , Array);
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
motion.Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = motion.Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion.Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = motion.Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return motion.Actuate.apply(target,properties,customActuator);
	}
	return null;
};
motion.Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion.Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion.Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion.Actuate.targetLibraries.h[target.__id__].length == 0) motion.Actuate.targetLibraries.remove(target);
	}
};
motion.IComponentPath = function() { };
$hxClasses["motion.IComponentPath"] = motion.IComponentPath;
motion.IComponentPath.__name__ = ["motion","IComponentPath"];
motion.IComponentPath.prototype = {
	__class__: motion.IComponentPath
};
motion.actuators.MethodActuator = function(target,duration,properties) {
	this.currentParameters = new Array();
	this.tweenProperties = { };
	motion.actuators.SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = new Array();
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(this.properties.start[i]);
	}
};
$hxClasses["motion.actuators.MethodActuator"] = motion.actuators.MethodActuator;
motion.actuators.MethodActuator.__name__ = ["motion","actuators","MethodActuator"];
motion.actuators.MethodActuator.__super__ = motion.actuators.SimpleActuator;
motion.actuators.MethodActuator.prototype = $extend(motion.actuators.SimpleActuator.prototype,{
	apply: function() {
		this.callMethod(this.target,this.properties.end);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(this.initialized) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
		motion.actuators.SimpleActuator.prototype.complete.call(this,sendEvent);
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
				details = new motion.actuators.PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion.actuators.SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
	}
	,__class__: motion.actuators.MethodActuator
});
motion.actuators.MotionPathActuator = function(target,duration,properties) {
	motion.actuators.SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["motion.actuators.MotionPathActuator"] = motion.actuators.MotionPathActuator;
motion.actuators.MotionPathActuator.__name__ = ["motion","actuators","MotionPathActuator"];
motion.actuators.MotionPathActuator.__super__ = motion.actuators.SimpleActuator;
motion.actuators.MotionPathActuator.prototype = $extend(motion.actuators.SimpleActuator.prototype,{
	setField_motion_actuators_MotionPathActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) Reflect.setField(this.target,propertyName,(js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath)).get_end()); else Reflect.setProperty(this.target,propertyName,(js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath)).get_end());
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
			path = js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					path.start = Reflect.getProperty(this.target,propertyName);
				}
				details = new motion.actuators.PropertyPathDetails(this.target,propertyName,path,isField);
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
					if(details1.isField) Reflect.setField(details1.target,details1.propertyName,(js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details1.target,details1.propertyName,(js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing));
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
						if(details2.isField) Reflect.setField(details2.target,details2.propertyName,(js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details2.target,details2.propertyName,(js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing));
					} else if(details2.isField) Reflect.setField(details2.target,details2.propertyName,Math.round((js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing))); else Reflect.setProperty(details2.target,details2.propertyName,Math.round((js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing)));
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
	,__class__: motion.actuators.MotionPathActuator
});
motion.actuators.PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
$hxClasses["motion.actuators.PropertyDetails"] = motion.actuators.PropertyDetails;
motion.actuators.PropertyDetails.__name__ = ["motion","actuators","PropertyDetails"];
motion.actuators.PropertyDetails.prototype = {
	__class__: motion.actuators.PropertyDetails
};
motion.actuators.PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	motion.actuators.PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
$hxClasses["motion.actuators.PropertyPathDetails"] = motion.actuators.PropertyPathDetails;
motion.actuators.PropertyPathDetails.__name__ = ["motion","actuators","PropertyPathDetails"];
motion.actuators.PropertyPathDetails.__super__ = motion.actuators.PropertyDetails;
motion.actuators.PropertyPathDetails.prototype = $extend(motion.actuators.PropertyDetails.prototype,{
	__class__: motion.actuators.PropertyPathDetails
});
motion.easing.Cubic = function() { };
$hxClasses["motion.easing.Cubic"] = motion.easing.Cubic;
motion.easing.Cubic.__name__ = ["motion","easing","Cubic"];
motion.easing.Cubic.__properties__ = {get_easeInOut:"get_easeInOut"}
motion.easing.Cubic.get_easeInOut = function() {
	return new motion.easing.CubicEaseInOut();
};
motion.easing.CubicEaseInOut = function() {
};
$hxClasses["motion.easing.CubicEaseInOut"] = motion.easing.CubicEaseInOut;
motion.easing.CubicEaseInOut.__name__ = ["motion","easing","CubicEaseInOut"];
motion.easing.CubicEaseInOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.CubicEaseInOut.prototype = {
	calculate: function(k) {
		if((k /= 0.5) < 1) return 0.5 * k * k * k; else return 0.5 * ((k -= 2) * k * k + 2);
	}
	,__class__: motion.easing.CubicEaseInOut
};
motion.easing.Linear = function() { };
$hxClasses["motion.easing.Linear"] = motion.easing.Linear;
motion.easing.Linear.__name__ = ["motion","easing","Linear"];
motion.easing.Linear.__properties__ = {get_easeNone:"get_easeNone"}
motion.easing.Linear.get_easeNone = function() {
	return new motion.easing.LinearEaseNone();
};
motion.easing.LinearEaseNone = function() {
};
$hxClasses["motion.easing.LinearEaseNone"] = motion.easing.LinearEaseNone;
motion.easing.LinearEaseNone.__name__ = ["motion","easing","LinearEaseNone"];
motion.easing.LinearEaseNone.__interfaces__ = [motion.easing.IEasing];
motion.easing.LinearEaseNone.prototype = {
	calculate: function(k) {
		return k;
	}
	,__class__: motion.easing.LinearEaseNone
};
msignal.Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
$hxClasses["msignal.Slot"] = msignal.Slot;
msignal.Slot.__name__ = ["msignal","Slot"];
msignal.Slot.prototype = {
	remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		if(value == null) throw "listener cannot be null";
		return this.listener = value;
	}
	,__class__: msignal.Slot
	,__properties__: {set_listener:"set_listener"}
};
msignal.Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot0"] = msignal.Slot0;
msignal.Slot0.__name__ = ["msignal","Slot0"];
msignal.Slot0.__super__ = msignal.Slot;
msignal.Slot0.prototype = $extend(msignal.Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
	,__class__: msignal.Slot0
});
msignal.Slot1 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot1"] = msignal.Slot1;
msignal.Slot1.__name__ = ["msignal","Slot1"];
msignal.Slot1.__super__ = msignal.Slot;
msignal.Slot1.prototype = $extend(msignal.Slot.prototype,{
	execute: function(value1) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param != null) value1 = this.param;
		this.listener(value1);
	}
	,__class__: msignal.Slot1
});
var pixi = {};
pixi.renderers = {};
pixi.renderers.IRenderer = function() { };
$hxClasses["pixi.renderers.IRenderer"] = pixi.renderers.IRenderer;
pixi.renderers.IRenderer.__name__ = ["pixi","renderers","IRenderer"];
pixi.resources = {};
pixi.resources.Loader = function() { };
$hxClasses["pixi.resources.Loader"] = pixi.resources.Loader;
pixi.resources.Loader.__name__ = ["pixi","resources","Loader"];
pixi.resources.Loader.loadAssetsPack = function(urls) {
	var assetLoader = new PIXI.AssetLoader(urls);
	assetLoader.onComplete = function() {
		haxe.Timer.delay(function() {
			pixi.resources.Loader.assetsPackLoadComplete.dispatch();
		},20);
	};
	assetLoader.onProgress = function(loader) {
		haxe.Timer.delay(function() {
			pixi.resources.Loader.assetsProgress.dispatch();
		},20);
	};
	assetLoader.load();
};
pixi.resources.Loader.loadSpriteSheetsPack = function(urls) {
	var _g = 0;
	while(_g < urls.length) {
		var url = urls[_g];
		++_g;
		pixi.resources.Loader.loadSpriteSheet(url);
	}
};
pixi.resources.Loader.loadSpriteSheet = function(url) {
	var spriteSheetLoader = new PIXI.SpriteSheetLoader(url);
	spriteSheetLoader.on("loaded",function() {
		var json = spriteSheetLoader.json;
		if(json.multipack) {
			var textures = json.textures;
			var imgCount = textures.length;
			var imgLoadedCount = 0;
			var _g = 0;
			while(_g < textures.length) {
				var texture = textures[_g];
				++_g;
				var textureUrl = spriteSheetLoader.baseUrl + texture.meta.image;
				var image = new PIXI.ImageLoader(textureUrl);
				var frameData = texture.frames;
				image.addEventListener("loaded",function() {
					if(imgLoadedCount == imgCount - 1) pixi.resources.Loader.spriteSheetLoadComplete.dispatch(); else imgLoadedCount++;
				});
				image.load();
				var _g1 = 0;
				var _g2 = Reflect.fields(frameData);
				while(_g1 < _g2.length) {
					var n = _g2[_g1];
					++_g1;
					var frameData1 = Reflect.field(frameData,n);
					var rect = frameData1.frame;
					if(rect != null) {
						var textureSize = new PIXI.Rectangle(rect.x,rect.y,rect.w,rect.h);
						var crop = textureSize.clone();
						var trim = null;
						if(frameData1.trimmed) {
							var actualSize = frameData1.sourceSize;
							var realSize = frameData1.spriteSourceSize;
							trim = new PIXI.Rectangle(realSize.x,realSize.y,actualSize.w,actualSize.h);
						}
						var txt = new PIXI.Texture(image.texture.baseTexture,textureSize,crop,trim);
						PIXI.Texture.addTextureToCache(txt,n);
					}
				}
			}
		} else pixi.resources.Loader.spriteSheetLoadComplete.dispatch();
	});
	spriteSheetLoader.load();
};
pixi.resources.Loader.loadJson = function(url,bucket,scale) {
	if(scale == null) scale = false;
	if(bucket == null) bucket = false;
	var fullURL = pixi.resources.Loader.BASE_URL + url;
	if(bucket) fullURL = pixi.resources.Loader.BUCKET_URL + url;
	if(scale) fullURL = pixi.resources.Loader.SCALE_URL + url;
	var jsonLoader = new PIXI.JsonLoader(fullURL);
	jsonLoader.on("loaded",function() {
		pixi.resources.Loader.jsonLoadComplete.dispatch(jsonLoader.json);
	});
	jsonLoader.load();
};
pixi.resources.Loader.loadSoundsPack = function(sounds) {
	var _g = 0;
	while(_g < sounds.length) {
		var soundObj = sounds[_g];
		++_g;
		var options = { };
		options.urls = [Reflect.field(soundObj,"url")];
		options.autoplay = false;
		options.onload = function() {
			pixi.resources.Loader.soundLoadComplete.dispatch();
		};
		Reflect.setField(arm.pixidemo.resources.Sounds,Reflect.field(soundObj,"id"),new window.Howl(options));
	}
};
pixi.widgets = {};
pixi.widgets.Button = function(label,width,height,data,fontSize) {
	PIXI.DisplayObjectContainer.call(this);
	this.action = new msignal.Signal1(Dynamic);
	this._data = data;
	this._setupBackground(width,height);
	this._setupLabel(width,height,fontSize);
	this.setText(label);
};
$hxClasses["pixi.widgets.Button"] = pixi.widgets.Button;
pixi.widgets.Button.__name__ = ["pixi","widgets","Button"];
pixi.widgets.Button.__super__ = PIXI.DisplayObjectContainer;
pixi.widgets.Button.prototype = $extend(PIXI.DisplayObjectContainer.prototype,{
	_setupBackground: function(width,height) {
		this._rect = new PIXI.Rectangle(0,0,width,height);
		this._background = new PIXI.Graphics();
		this._background.hitArea = this._rect;
		this._redraw(2187531);
		this.addChild(this._background);
		this._background.interactive = true;
		this._background.mouseover = $bind(this,this._onMouseOver);
		this._background.mouseout = $bind(this,this._onMouseOut);
		this._background.mousedown = $bind(this,this._onMouseDown);
		this._background.mouseup = $bind(this,this._onMouseUp);
		this._background.mouseupoutside = $bind(this,this._onMouseUpOutside);
		this._background.touchstart = $bind(this,this._onTouchStart);
		this._background.touchend = $bind(this,this._onTouchEnd);
		this._background.touchendoutside = $bind(this,this._onTouchEndOutside);
	}
	,_setupLabel: function(width,height,fontSize) {
		var size;
		if(fontSize != null) size = fontSize; else size = 16;
		var style = { };
		style.font = size + "px Arial";
		style.fill = "#FFFFFF";
		this._label = new PIXI.Text("",style);
		this._label.anchor.set(0.5,0.5);
		this._label.x = width / 2;
		this._label.y = height / 2;
		this.addChild(this._label);
	}
	,_redraw: function(colour) {
		var border = 1;
		this._background.clear();
		this._background.beginFill(13158);
		this._background.drawRect(this._rect.x,this._rect.y,this._rect.width,this._rect.height);
		this._background.endFill();
		this._background.beginFill(colour);
		this._background.drawRect(this._rect.x + border / 2,this._rect.y + border / 2,this._rect.width - border,this._rect.height - border);
		this._background.endFill();
	}
	,setText: function(label) {
		this._label.setText(label);
	}
	,_onMouseDown: function(data) {
		if(this._enabled) this._redraw(13158);
	}
	,_onMouseUp: function(data) {
		if(this._enabled) {
			this.action.dispatch(this._data);
			this._redraw(2187531);
		}
	}
	,_onMouseUpOutside: function(data) {
		if(this._enabled) this._redraw(2187531);
	}
	,_onMouseOver: function(data) {
		if(this._enabled) this._redraw(13158);
	}
	,_onMouseOut: function(data) {
		if(this._enabled) this._redraw(2187531);
	}
	,_onTouchEndOutside: function(data) {
		if(this._enabled) this._redraw(2187531);
	}
	,_onTouchEnd: function(data) {
		if(this._enabled) {
			this._redraw(2187531);
			this.action.dispatch(this._data);
		}
	}
	,_onTouchStart: function(data) {
		if(this._enabled) this._redraw(13158);
	}
	,enable: function() {
		this._enabled = true;
	}
	,disable: function() {
		this._redraw(2187531);
		this._enabled = false;
	}
	,__class__: pixi.widgets.Button
});
pixi.widgets.Label = function(label,width,height,style) {
	PIXI.DisplayObjectContainer.call(this);
	if(style != null) this._style = style; else this._style = { font : 16 + "px Arial", fill : "#333333", align : "center"};
	this._setupBackground(width,height);
	this._setupLabel(width,height);
	this.setText(label);
};
$hxClasses["pixi.widgets.Label"] = pixi.widgets.Label;
pixi.widgets.Label.__name__ = ["pixi","widgets","Label"];
pixi.widgets.Label.__super__ = PIXI.DisplayObjectContainer;
pixi.widgets.Label.prototype = $extend(PIXI.DisplayObjectContainer.prototype,{
	_setupBackground: function(width,height) {
		this._rect = new PIXI.Rectangle(0,0,width,height);
		this._background = new PIXI.Graphics();
		this._background.beginFill(3355443);
		this._background.drawRect(this._rect.x,this._rect.y,this._rect.width,this._rect.height);
		this._background.endFill();
		this._background.beginFill(16777215);
		this._background.drawRect(this._rect.x + 1,this._rect.y + 1,this._rect.width - 2,this._rect.height - 2);
		this._background.endFill();
		this.addChild(this._background);
	}
	,_setupLabel: function(width,height) {
		this._label = new PIXI.Text("",this._style);
		this._label.anchor.x = 0.5;
		this._label.x = width / 2;
		this._label.y = 4;
		this.addChild(this._label);
	}
	,setText: function(label) {
		this._label.setText(label);
	}
	,__class__: pixi.widgets.Label
});
pixi.widgets.menu = {};
pixi.widgets.menu.Menu = function(itemWidth,itemHeight) {
	PIXI.DisplayObjectContainer.call(this);
	this._itemWidth = itemWidth;
	this._itemHeight = itemHeight;
	this._menuItems = [];
	this.interactive = true;
};
$hxClasses["pixi.widgets.menu.Menu"] = pixi.widgets.menu.Menu;
pixi.widgets.menu.Menu.__name__ = ["pixi","widgets","menu","Menu"];
pixi.widgets.menu.Menu.__super__ = PIXI.DisplayObjectContainer;
pixi.widgets.menu.Menu.prototype = $extend(PIXI.DisplayObjectContainer.prototype,{
	addItem: function(label,data) {
		var menuItem = new pixi.widgets.menu.MenuItem(label,this._itemWidth,this._itemHeight,data);
		menuItem.y = this._itemHeight * this._menuItems.length;
		this.addChild(menuItem);
		this._menuItems.push(menuItem);
		this._height = this._itemHeight * this._menuItems.length;
		if(this._height > arm.pixidemo.view.StageProperties.screenHeight) {
			this.touchstart = $bind(this,this._onTouchStart);
			this.touchend = $bind(this,this._onTouchEnd);
			this.mousedown = $bind(this,this._onMouseDown);
			this.mouseup = $bind(this,this._onMouseUp);
		}
		return menuItem;
	}
	,_onTouchStart: function(data) {
		this._lastPosition = data.getLocalPosition(this.parent).y;
		this.touchmove = $bind(this,this._onTouchMove);
	}
	,_onTouchMove: function(data) {
		var point = data.getLocalPosition(this.parent);
		var distance = this._lastPosition - point.y;
		if(this._dragging || (distance < -5 || distance > 5)) {
			this.disableMenuItems();
			this._move(this._lastPosition - point.y);
			this._dragging = true;
			this._lastPosition = point.y;
		}
	}
	,_onTouchEnd: function(data) {
		this.touchmove = null;
		this._dragging = false;
		haxe.Timer.delay($bind(this,this.enableMenuItems),100);
	}
	,_onMouseDown: function(data) {
		this._lastPosition = data.getLocalPosition(this.parent).y;
		this.mousemove = $bind(this,this._onMouseMove);
	}
	,_onMouseUp: function(data) {
		this.mousemove = null;
		this._dragging = false;
		this.enableMenuItems();
	}
	,_onMouseMove: function(data) {
		var point = data.getLocalPosition(this.parent);
		var distance = this._lastPosition - point.y;
		if(this._dragging || (distance < -5 || distance > 5)) {
			this.disableMenuItems();
			this._move(this._lastPosition - point.y);
			this._dragging = true;
			this._lastPosition = point.y;
		}
	}
	,disableMenuItems: function() {
		var _g1 = 0;
		var _g = this._menuItems.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._menuItems[i].disable();
		}
	}
	,enableMenuItems: function() {
		var _g1 = 0;
		var _g = this._menuItems.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._menuItems[i].enable();
		}
	}
	,_move: function(distance) {
		this.y -= distance;
		if(this.y > 0) this.y = 0; else if(this.y < -(this._height - arm.pixidemo.view.StageProperties.screenHeight)) this.y = -(this._height - arm.pixidemo.view.StageProperties.screenHeight);
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
	}
	,getItems: function() {
		return this._menuItems;
	}
	,__class__: pixi.widgets.menu.Menu
});
pixi.widgets.menu.MenuItem = function(label,width,height,data) {
	PIXI.DisplayObjectContainer.call(this);
	this._button = new pixi.widgets.Button(label,width,height,data);
	this.action = this._button.action;
	this.addChild(this._button);
};
$hxClasses["pixi.widgets.menu.MenuItem"] = pixi.widgets.menu.MenuItem;
pixi.widgets.menu.MenuItem.__name__ = ["pixi","widgets","menu","MenuItem"];
pixi.widgets.menu.MenuItem.__super__ = PIXI.DisplayObjectContainer;
pixi.widgets.menu.MenuItem.prototype = $extend(PIXI.DisplayObjectContainer.prototype,{
	enable: function() {
		this._button.enable();
	}
	,disable: function() {
		this._button.disable();
	}
	,__class__: pixi.widgets.menu.MenuItem
});
pixi.widgets.menu.PopoutMenu = function(itemWidth,itemHeight) {
	PIXI.DisplayObjectContainer.call(this);
	this._container = new PIXI.DisplayObjectContainer();
	this._itemWidth = itemWidth;
	this._itemHeight = itemHeight;
	this._state = "STATE_HIDE";
	this._setupOpenButton();
	this._setupMenu(itemWidth,itemHeight);
	this.addChild(this._container);
};
$hxClasses["pixi.widgets.menu.PopoutMenu"] = pixi.widgets.menu.PopoutMenu;
pixi.widgets.menu.PopoutMenu.__name__ = ["pixi","widgets","menu","PopoutMenu"];
pixi.widgets.menu.PopoutMenu.__super__ = PIXI.DisplayObjectContainer;
pixi.widgets.menu.PopoutMenu.prototype = $extend(PIXI.DisplayObjectContainer.prototype,{
	_setupOpenButton: function() {
		var buttonRect = new PIXI.Rectangle(0,0,15,60);
		var hitRect = new PIXI.Rectangle(0,0,15,60);
		this._openButton = new PIXI.Graphics();
		this._openButton.beginFill(2187531);
		this._openButton.drawRect(buttonRect.x,buttonRect.y,buttonRect.width,buttonRect.height);
		this._openButton.endFill();
		this._openButton.hitArea = hitRect;
		this._openButton.interactive = true;
		this._openButton.touchstart = function(data) {
		};
		this._openButton.touchend = $bind(this,this._toggleShow);
		this._openButton.mouseup = $bind(this,this._toggleShow);
		this._container.addChild(this._openButton);
	}
	,_setupMenu: function(itemWidth,itemHeight) {
		this._menu = new pixi.widgets.menu.Menu(itemWidth,itemHeight);
		this._menu.x = -itemWidth;
		this._container.addChild(this._menu);
	}
	,_toggleShow: function(data) {
		if(this._state == "STATE_SHOW") this.hide(); else this.show();
	}
	,show: function() {
		this._state = "STATE_SHOW";
		motion.Actuate.tween(this._container,0.3,{ x : this._itemWidth}).ease(motion.easing.Cubic.get_easeInOut()).onComplete($bind(this,this._enableMenuItems));
	}
	,hide: function() {
		this._state = "STATE_HIDE";
		motion.Actuate.tween(this._container,0.3,{ x : 0}).ease(motion.easing.Cubic.get_easeInOut()).onComplete($bind(this,this._disableMenuItems));
	}
	,addItem: function(label,data) {
		var menuItem = this._menu.addItem(label,data);
		this._updateOpenButtonPosition();
		return menuItem;
	}
	,_enableMenuItems: function() {
		this._menu.enableMenuItems();
	}
	,_disableMenuItems: function() {
		this._menu.disableMenuItems();
	}
	,_updateOpenButtonPosition: function() {
		var openButtonPosition = Math.floor((this._menu.getItems().length - 1) / 2) * this._itemHeight;
		if(openButtonPosition > arm.pixidemo.view.StageProperties.screenHeight / 2) openButtonPosition = arm.pixidemo.view.StageProperties.screenHeight / 2;
		this._openButton.y = openButtonPosition;
	}
	,__class__: pixi.widgets.menu.PopoutMenu
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
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
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
msignal.SlotList.NIL = new msignal.SlotList(null,null);
arm.mvc.notifications.ViewStateNotification.preloader = new msignal.Signal0();
arm.mvc.notifications.ViewStateNotification.preload = new msignal.Signal0();
arm.mvc.notifications.ViewStateNotification.create = new msignal.Signal0();
arm.mvc.notifications.ViewStateNotification.update = new msignal.Signal1(Float);
arm.mvc.notifications.ViewStateNotification.resize = new msignal.Signal0();
arm.pixidemo.Demo.__meta__ = { obj : { IgnoreCover : null}};
arm.pixidemo.notifications.internal.MenuNotification.click = new msignal.Signal1(Int);
arm.pixidemo.notifications.internal.MenuNotification.reset = new msignal.Signal0();
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
mconsole.Console.defaultPrinter = new mconsole.ConsoleView();
mconsole.Console.printers = [mconsole.Console.defaultPrinter];
mconsole.Console.groupDepth = 0;
mconsole.Console.running = false;
mconsole.Console.dirxml = "dirxml";
mconsole.Console.hasConsole = mconsole.Console.detectConsole();
mcover.coverage.CoverageLoggerImpl.__meta__ = { obj : { IgnoreLogging : null}, fields : { logStatement : { IgnoreCover : null}, updateStatementMap : { IgnoreCover : null}, logBranch : { IgnoreCover : null}, updateBranchMap : { IgnoreCover : null}, _ : { IgnoreCover : null}}};
mcover.coverage.MCoverage.__meta__ = { obj : { IgnoreLogging : null, IgnoreCover : null}, statics : { getLogger : { IgnoreLogging : null, IgnoreCover : null}}};
mcover.coverage.data.AbstractNode.__meta__ = { obj : { IgnoreLogging : null}, fields : { getResults : { IgnoreLogging : null}, getPercentage : { IgnoreLogging : null}, emptyResult : { IgnoreLogging : null}, hxSerialize : { IgnoreLogging : null}, hxUnserialize : { IgnoreLogging : null}, _ : { IgnoreCover : null}}};
mcover.coverage.data.AbstractBlock.__meta__ = { obj : { IgnoreLogging : null}, fields : { hxSerialize : { IgnoreLogging : null}, hxUnserialize : { IgnoreLogging : null}}};
mcover.coverage.data.AbstractNodeList.__meta__ = { obj : { IgnoreLogging : null}, fields : { getResults : { IgnoreLogging : null}, hxSerialize : { IgnoreLogging : null}, hxUnserialize : { IgnoreLogging : null}}};
mcover.coverage.data.Branch.__meta__ = { obj : { IgnoreLogging : null}, fields : { hxSerialize : { IgnoreLogging : null}, hxUnserialize : { IgnoreLogging : null}}};
mcover.coverage.data.Clazz.__meta__ = { obj : { IgnoreLogging : null}};
mcover.coverage.data.Coverage.__meta__ = { obj : { IgnoreLogging : null}, fields : { getResults : { IgnoreLogging : null}, hxSerialize : { IgnoreLogging : null}, hxUnserialize : { IgnoreLogging : null}}};
mcover.coverage.data.DataUtil.__meta__ = { statics : { sortOnNodeName : { IgnoreLogging : null}, sortOnBlockName : { IgnoreLogging : null}}};
mcover.coverage.data.File.__meta__ = { obj : { IgnoreLogging : null}};
mcover.coverage.data.Method.__meta__ = { obj : { IgnoreLogging : null}, fields : { hxSerialize : { IgnoreLogging : null}, hxUnserialize : { IgnoreLogging : null}}};
mcover.coverage.data.Package.__meta__ = { obj : { IgnoreLogging : null}};
mcover.coverage.data.Statement.__meta__ = { obj : { IgnoreLogging : null}, fields : { hxSerialize : { IgnoreLogging : null}, hxUnserialize : { IgnoreLogging : null}}};
motion.actuators.SimpleActuator.actuators = new Array();
motion.actuators.SimpleActuator.actuatorsLength = 0;
motion.actuators.SimpleActuator.addedEvent = false;
motion.Actuate.defaultActuator = motion.actuators.SimpleActuator;
motion.Actuate.defaultEase = motion.easing.Expo.get_easeOut();
motion.Actuate.targetLibraries = new haxe.ds.ObjectMap();
pixi.resources.Loader.BASE_URL = "";
pixi.resources.Loader.BUCKET_URL = "";
pixi.resources.Loader.SCALE_URL = "";
pixi.resources.Loader.assetsPackLoadComplete = new msignal.Signal0();
pixi.resources.Loader.assetsProgress = new msignal.Signal0();
pixi.resources.Loader.soundLoadComplete = new msignal.Signal0();
pixi.resources.Loader.jsonLoadComplete = new msignal.Signal1(String);
pixi.resources.Loader.spriteSheetLoadComplete = new msignal.Signal0();
arm.pixidemo.Demo.main();
})();

//# sourceMappingURL=hx-pixi-demo.dev.js.map