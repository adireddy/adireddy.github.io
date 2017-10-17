package arm.pixidemo.components.spritesheets;

import pixi.display.MovieClip;
import pixi.display.Sprite;
import pixi.textures.Texture;
import pixi.widgets.Button;
import pixi.widgets.Label;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class SpritessheetsView extends GameComponentView {

	var _movieclips:Array<MovieClip>;
	var _buttons:Array<Button>;

	var _mcContainer:DisplayObjectContainer;
	var _uiContainer:DisplayObjectContainer;
	var _quantityLabel:Label;

	var _isScale:Bool;
	var _isRotation:Bool;

	var _animations:Object<Dynamic>;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_movieclips = [];
		_buttons = [];

		_animations = new Object();
		_animations.set("name", "Phoenix1");
		_animations.set("frames", 77);

		_mcContainer = new DisplayObjectContainer();
		_uiContainer = new DisplayObjectContainer();

		_addButton("Reset", 0, 30, 80, 30, _reset);
		//_addButton("Scale", 100, 30, 100, 30, _scale);
		//_addButton("Rotation", 200, 30, 100, 30, _rotation);
		_addButton("Add 1", 80, 30, 80, 30, _addSprites, 1);
		_addButton("Add 5", 160, 30, 80, 30, _addSprites, 5);
		_addButton("Add 10", 240, 30, 80, 30, _addSprites, 10);

		_quantityLabel = new Label("", 320, 24);
		_quantityLabel.y = 60;
		_uiContainer.addChild(_quantityLabel);
		resize();

		_updateQuanityLabel();
		gameContainer.addChild(_mcContainer);
		gameContainer.addChild(_uiContainer);
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

	function _updateQuanityLabel() {
		_quantityLabel.setText("Count " + _movieclips.length);
	}

	function _reset() {
		for (i in 0 ... _movieclips.length) {
			_mcContainer.removeChild(_movieclips[i]);
		}

		_movieclips = [];
		_isScale = false;
		_isRotation = false;
		_updateQuanityLabel();
	}

	function _scale() {
		_isScale = !_isScale;
	}

	function _rotation() {
		_isRotation = !_isRotation;
	}

	function _addSprites(count:Int) {
		for (i in 0 ... count) {
			var textures:Array<Texture> = [];
			for (i in 1 ... _animations.get("frames")) {
				var frame:String = "" + i;
				while (frame.length < 4) frame = "0" + frame;
				textures.push(Texture.fromFrame(_animations.get("name") + "_" + frame + ".png"));
			}

			var mc:MovieClip = new MovieClip(textures);
			mc.x = Std.random(Std.int(StageProperties.screenWidth));
			mc.y = Std.random(Std.int(StageProperties.screenHeight));
			mc.anchor.set(0.5, 0.5);
			mc.gotoAndPlay(1);
			_movieclips.push(mc);
			_mcContainer.addChild(mc);
			_applyScale(mc);
		}
		_updateQuanityLabel();
	}

	public function update(elapsedTime:Float) {
		if (_isScale || _isRotation) {
			for (i in 0 ... _movieclips.length) {
				var mc:DisplayObjectContainer = _movieclips[i];

				if (_isScale) {
					if (mc.scale.x < 2) {
						mc.scale.x += Math.random() / 50 + 0.01;
						mc.scale.y += Math.random() / 50 + 0.01;
					}
				}

				if (_isRotation) {
					mc.rotation += Math.random() / 50 + 0.01;
				}
			}
		}
	}

	public function hide() {
		_reset();

		for (i in 0 ... _buttons.length) {
			var button:Button = _buttons[i];
			button.disable();
			_uiContainer.removeChild(button);
			_buttons[i] = null;
		}

		_isScale = false;
		_isRotation = false;
		_uiContainer.removeChild(_quantityLabel);
		gameContainer.removeChild(_mcContainer);
		gameContainer.removeChild(_uiContainer);
		_mcContainer = null;
		_uiContainer = null;
		_quantityLabel = null;
		_buttons = null;
		_movieclips = null;
	}

	public function resize() {
		_uiContainer.x = (StageProperties.screenWidth - 320) / 2;
		_uiContainer.y = 20;
	}
}