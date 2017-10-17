package arm.pixidemo.components.bunnymark;

import pixi.textures.Texture;
import pixi.display.Sprite;

class Bunny extends Sprite {

	public var speedX(default, default):Float;
	public var speedY(default, default):Float;
	public var scaleSpeed(default, default):Float;
	public var rotationSpeed(default, default):Float;

	public function new(texture:Texture) {
		super(texture);
	}
}
