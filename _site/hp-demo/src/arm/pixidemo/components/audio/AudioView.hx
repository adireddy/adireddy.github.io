package arm.pixidemo.components.audio;

import howler.Howl;
import pixi.widgets.Button;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class AudioView extends GameComponentView {

	var _buttons:Array<Button>;
	var _uiContainer:DisplayObjectContainer;
	var _bgSound:Howl;
	var _sound:Howl;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_uiContainer = new DisplayObjectContainer();
		gameContainer.addChild(_uiContainer);
		_buttons = [];
		_bgSound = _sounds.getSound("bg");
		_bgSound.loop(true);
		_addButton("BG SOUND", 0, 0, 90, 30, _playBGSound);
		for (i in 1 ... 5) {
			_addButton("SOUND " + i, (i * 90), 0, 90, 30, _playSound, i);
		}
		_addButton("RESET", 450, 0, 60, 30, _stopAll);

		resize();
	}

	function _playBGSound() {
		_bgSound.play();
	}

	function _playSound(id:Int) {
		if (_sound != null) _sound.stop();
		_sound = _sounds.getSound("sound" + id);
		_sound.play();
	}

	function _stopAll() {
		_bgSound.stop();
		_sound.stop();
	}

	function _addButton(label:String, x:Float, y:Float, width:Float, height:Float, callback:Dynamic, ?data:Dynamic) {
		var button = new Button(label, width, height, data);
		button.x = x;
		button.y = y;
		button.action.add(callback);
		button.enable();
		_buttons.push(button);
		_uiContainer.addChild(button);
	}

	public function hide() {
		for (i in 0 ... _buttons.length) {
			var button:Button = _buttons[i];
			_uiContainer.removeChild(button);
			_buttons[i] = null;
		}
		_buttons = null;
		gameContainer.removeChild(_uiContainer);
		_uiContainer = null;
		if (_bgSound != null) _bgSound.stop();
		if (_sound != null) _sound.stop();
		_bgSound = null;
		_sound = null;
	}

	public function resize() {
		_uiContainer.x = (StageProperties.screenWidth - 510) / 2;
		_uiContainer.y = (StageProperties.screenHeight - 30) / 2;
		trace(_uiContainer.width, _uiContainer.height);
	}
}