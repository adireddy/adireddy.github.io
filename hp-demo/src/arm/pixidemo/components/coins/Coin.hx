package arm.pixidemo.components.coins;

import pixi.display.MovieClip;
import pixi.textures.Texture;

class Coin extends MovieClip {

	public var speedX(default, default):Float;
	public var speedY(default, default):Float;
	public var scaleMultiplier(default, default):Float;
	public var gravity(default, default):Float;

	public function new(textures:Array<Texture>) {
		super(textures);
	}
}
