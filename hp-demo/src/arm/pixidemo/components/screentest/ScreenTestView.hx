package arm.pixidemo.components.screentest;

import pixi.display.Sprite;
import pixi.resources.Loader;
import pixi.textures.Texture;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class ScreenTestView extends GameComponentView {

	var _screenTest:Sprite;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		var texture:Texture = Texture.fromImage(Loader.SCALE_URL + "screentest/images/ScreenTest.png");
		_screenTest = new Sprite(texture);
		gameContainer.addChild(_screenTest);
		resize();
		_applyScale(_screenTest);
	}

	public function hide() {
		gameContainer.removeChild(_screenTest);
		_screenTest = null;
	}

	public function resize() {
		_screenTest.x = StageProperties.screenX;
		_screenTest.y = StageProperties.screenY;
	}
}