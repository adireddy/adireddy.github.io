package arm.pixidemo.view;

import arm.mvc.view.View;
import pixi.display.DisplayObjectContainer;

import pixi.display.Stage;

class DemoView extends View {

	public var gameStage(default, default):Stage;
	public var gameContainer(default, default):DisplayObjectContainer;

	public function new(stage, ?container) {
		super(stage, container);
		gameStage = cast(stage, Stage);
		gameContainer = cast(container, DisplayObjectContainer);
	}

	override function get_stage():Stage {
		return cast(stage, Stage);
	}

	override function get_container():DisplayObjectContainer {
		return cast(container, DisplayObjectContainer);
	}
}