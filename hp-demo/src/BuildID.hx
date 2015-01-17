import haxe.macro.Expr;
import haxe.macro.Context;
import haxe.crypto.Md5;
import haxe.Timer.stamp;
import Math.random;

class BuildID {

	public static function uid():String {
		return Md5.encode(Std.string(stamp() * random()));
	}

	macro public static function get() {
		return macro $v{ uid() };
	}

}