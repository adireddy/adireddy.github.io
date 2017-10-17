package arm.pixidemo.components.skeleton;

import pixi.spine.Spine;
import pixi.resources.Loader;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class SkeletonView extends GameComponentView {

	var _spine:Spine;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_spine = new Spine(Loader.SCALE_URL + "spine/images/dragonBonesData.json");
		_spine.state.setAnimationByName(0, "flying", true);

		gameContainer.addChild(_spine);
		_spine.x = 500 + StageProperties.screenX;
		_spine.y = 700 + StageProperties.screenY;
	}

	public function hide() {
		gameContainer.removeChild(_spine);
		_spine = null;
	}
}