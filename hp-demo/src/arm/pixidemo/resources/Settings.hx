package arm.pixidemo.resources;

class Settings implements Dynamic<String> {

	static var _instance:Settings;

	public static inline function getInstance():Settings {
		return (_instance == null) ? _instance = new Settings() : _instance;
	}

	public function getSetting(value:String):Dynamic {
		return Reflect.field(Settings, value);
	}

	function new() {

	}
}