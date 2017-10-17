package arm.pixidemo.resources;

class Messages implements Dynamic<String> {

	static var _instance:Messages;

	public static inline function getInstance():Messages {
		return (_instance == null) ? _instance = new Messages() : _instance;
	}

	public function getMessage(value:String, ?substitite:Dynamic):String {
		var msg:String = Reflect.field(Messages, value);
		if (substitite != null) msg = StringCore.substitute(msg, substitite);
		return msg;
	}

	function new() {

	}
}