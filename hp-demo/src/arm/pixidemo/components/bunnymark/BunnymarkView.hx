package arm.pixidemo.components.bunnymark;

import pixi.resources.Loader;
import pixi.textures.Texture;
import pixi.widgets.Button;
import pixi.widgets.Label;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class BunnymarkView extends GameComponentView {

	var _sprites:Array<Bunny>;
	var _buttons:Array<Button>;
	var _bunnyTexture:Texture;

	var _spriteContainer:DisplayObjectContainer;
	var _uiContainer:DisplayObjectContainer;
	var _quantityLabel:Label;

	var _isScale:Bool;
	var _isRotation:Bool;

	var _maxX:Float;
	var _maxY:Float;
	var _minX:Float;
	var _minY:Float;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_bunnyTexture = Texture.fromImage(Loader.SCALE_URL + "bunnys/images/bunny.png");
		_sprites = [];
		_buttons = [];

		_spriteContainer = new DisplayObjectContainer();
		_uiContainer = new DisplayObjectContainer();

		_addButton("Reset", 0, 0, 100, 30, _reset);
		_addButton("Scale", 100, 0, 100, 30, _scale);
		_addButton("Rotation", 200, 0, 100, 30, _rotation);
		_addButton("Add 10", 0, 30, 100, 30, _addBunnys, 10);
		_addButton("Add 100", 100, 30, 100, 30, _addBunnys, 100);
		_addButton("Add 500", 200, 30, 100, 30, _addBunnys, 500);
		_addButton("Add 1000", 0, 60, 100, 30, _addBunnys, 1000);
		_addButton("Add 5000", 100, 60, 100, 30, _addBunnys, 5000);
		_addButton("Add 10000", 200, 60, 100, 30, _addBunnys, 10000);

		_quantityLabel = new Label("", 300, 24);
		_quantityLabel.y = 90;
		_uiContainer.addChild(_quantityLabel);
		resize();

		_updateQuanityLabel();
		gameContainer.addChild(_spriteContainer);
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
		_quantityLabel.setText("Quantity: " + _sprites.length);
	}

	function _reset() {
		for (i in 0 ... _sprites.length) {
			_spriteContainer.removeChild(_sprites[i]);
		}

		_sprites = [];
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

	function _addBunnys(count:Int) {
		for (i in 0 ... count) {
			var bunny:Bunny = new Bunny(_bunnyTexture);
			_spriteContainer.addChild(bunny);
			bunny.x = Std.random(Std.int(StageProperties.screenWidth));
			bunny.y = Std.random(Std.int(StageProperties.screenHeight));
			bunny.anchor.set(0.5, 0.5);
			bunny.speedX = Math.random() * 16 + 2;
			bunny.speedY = (Math.random() * 16) - 10;
			bunny.rotationSpeed = Math.random() / 50 + 0.01;
			bunny.scaleSpeed = Math.random() / 50 + 0.01;
			_sprites.push(bunny);
			_applyScale(bunny);
		}
		_updateQuanityLabel();
	}

	public function update(elapsedTime:Float) {
		for (i in 0 ... _sprites.length) {
			var bunny:Bunny = _sprites[i];
			bunny.position.x += bunny.speedX;
			bunny.position.y += bunny.speedY;
			bunny.speedY += 4.75;

			if (bunny.position.x > _maxX) {
				bunny.speedX *= -1;
				bunny.position.x = _maxX;
			}
			else if (bunny.position.x < _minX) {
				bunny.speedX *= -1;
				bunny.position.x = _minX;
			}

			if (bunny.position.y > _maxY) {
				bunny.speedY *= -0.90;
				bunny.position.y = _maxY;
				if (Math.random() > 0.5) bunny.speedY -= Math.random() * 6;
			}
			else if (bunny.position.y < _minY) {
				bunny.speedY = 0;
				bunny.position.y = this._minY;
			}

			if (_isScale) {
				bunny.scale.x += bunny.scaleSpeed;
				bunny.scale.y += bunny.scaleSpeed;
				if (bunny.scale.x > 2) bunny.scaleSpeed = -bunny.scaleSpeed;
				else if (bunny.scale.x < 0.01) bunny.scaleSpeed = -bunny.scaleSpeed;
			}

			if (_isRotation) bunny.rotation += bunny.rotationSpeed;
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
		gameContainer.removeChild(_spriteContainer);
		gameContainer.removeChild(_uiContainer);
		_spriteContainer = null;
		_uiContainer = null;
		_quantityLabel = null;
		_buttons = null;
		_sprites = null;
		_bunnyTexture = null;
	}

	public function resize() {
		_minX = _minY = 0;
		_maxX = StageProperties.screenWidth;
		_maxY = StageProperties.screenHeight;
		_uiContainer.x = (StageProperties.screenWidth - 300) / 2;
		_uiContainer.y = StageProperties.screenY + 20;
		trace(_uiContainer.width);
	}
}