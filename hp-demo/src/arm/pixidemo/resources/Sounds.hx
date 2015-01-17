package arm.pixidemo.resources;

import howler.Howl;

class Sounds implements Dynamic<Howl> {

	static var _instance:Sounds;

	public static inline function getInstance():Sounds {
		return (_instance == null) ? _instance = new Sounds() : _instance;
	}

	public function getSound(value:String):Howl {
		return Reflect.field(Sounds, value);
	}

	function new() {

	}
}