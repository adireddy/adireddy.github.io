package arm.pixidemo.components;

import arm.pixidemo.view.StageProperties;
import pixi.display.DisplayObject;
import arm.pixidemo.resources.Sounds;
import arm.mvc.components.ComponentView;
import pixi.display.Stage;
import pixi.display.DisplayObjectContainer;

import arm.pixidemo.resources.Settings;
import arm.pixidemo.resources.Layout;
import arm.pixidemo.resources.Messages;

class GameComponentView extends ComponentView {

	public var gameStage(default, default):Stage;
	public var gameContainer(default, default):DisplayObjectContainer;

	var _messages:Messages;
	var _layout:Layout;
	var _settings:Settings;
	var _sounds:Sounds;

	public function new(stage, ?container) {
		super(stage, container);

		gameStage = cast(stage, Stage);
		if (container != null) gameContainer = cast(container, DisplayObjectContainer);

		_messages = Messages.getInstance();
		_layout = Layout.getInstance();
		_settings = Settings.getInstance();
		_sounds = Sounds.getInstance();
	}

	override function get_stage():Stage {
		return cast(stage, Stage);
	}

	override function get_container():DisplayObjectContainer {
		return cast(container, DisplayObjectContainer);
	}

	function _applyScale(item:DisplayObject) {
		item.scale.set(1 / StageProperties.pixelRatio, 1 / StageProperties.pixelRatio);
	}
}