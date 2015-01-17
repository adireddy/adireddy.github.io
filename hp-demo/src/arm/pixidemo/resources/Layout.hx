package arm.pixidemo.resources;

class Layout implements Dynamic<String> {

	static var _instance:Layout;

	public static inline function getInstance():Layout {
		return (_instance == null) ? _instance = new Layout() : _instance;
	}

	public function getLayout(value:String):Dynamic {
		return Reflect.field(Layout, value);
	}

	function new() {

	}
}