package arm.pixidemo.components.sprites;

import pixi.Pixi;
import pixi.display.Sprite;
import pixi.resources.Loader;
import pixi.textures.Texture;
import pixi.widgets.Button;
import pixi.widgets.Label;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class SpritesView extends GameComponentView {

	var _sprites:Array<Sprite>;
	var _buttons:Array<Button>;
	var _uniqueSprites:Int;
	var _cachedSprites:Int;
	var _uniqueSpriteResources:Array<String>;
	var _cachedTexture:Texture;

	var _spriteContainer:DisplayObjectContainer;
	var _uiContainer:DisplayObjectContainer;
	var _quantityLabel:Label;

	var _isScale:Bool;
	var _isRotation:Bool;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_cachedTexture = Texture.fromImage(Loader.SCALE_URL + "spriteperformance/images/sprite1.png");
		_sprites = [];
		_buttons = [];
		_uniqueSprites = 0;
		_cachedSprites = 0;

		_spriteContainer = new DisplayObjectContainer();
		_uiContainer = new DisplayObjectContainer();

		_addButton("Reset", 0, 0, 100, 30, _reset);
		_addButton("Scale", 100, 0, 100, 30, _scale);
		_addButton("Rotation", 200, 0, 100, 30, _rotation);
		_addButton("1 unique", 0, 30, 100, 30, _addUniqueSprites, 1);
		_addButton("10 unique", 100, 30, 100, 30, _addUniqueSprites, 10);
		_addButton("100 unique", 200, 30, 100, 30, _addUniqueSprites, 100);
		_addButton("100 cached", 0, 60, 100, 30, _addCachedSprites, 100);
		_addButton("500 cached", 100, 60, 100, 30, _addCachedSprites, 500);
		_addButton("1000 cached", 200, 60, 100, 30, _addCachedSprites, 1000);

		_quantityLabel = new Label("", 300, 44);
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
		if (_uniqueSpriteResources == null) {
			_quantityLabel.setText(_uniqueSprites + " unique" + "\n" + _cachedSprites + " cached");
		}
		else {
			_quantityLabel.setText("Loading... unique" + "\n" + _cachedSprites + " cached");
		}
	}

	function _reset() {
		for (i in 0 ... _sprites.length) {
			_spriteContainer.removeChild(_sprites[i]);
		}

		_sprites = [];
		_isScale = false;
		_isRotation = false;
		_uniqueSprites = 0;
		_cachedSprites = 0;
		_updateQuanityLabel();
	}

	function _scale() {
		_isScale = !_isScale;
	}

	function _rotation() {
		_isRotation = !_isRotation;
	}

	function _addUniqueSprites(count:Int) {
		if (_uniqueSpriteResources == null) {
			_uniqueSpriteResources = [];

			for (i in 0 ... count) {
				_uniqueSpriteResources.push(Loader.SCALE_URL + "spriteperformance/images/sprite1.png?r=" + Math.random());
			}
			Loader.loadAssetsPack(_uniqueSpriteResources);
			Loader.assetsPackLoadComplete.add(_onUniqueSpritesLoaded);
			_updateQuanityLabel();
		}
	}

	function _onUniqueSpritesLoaded() {
		for (i in 0 ... _uniqueSpriteResources.length) {
			var texture:Texture = Texture.fromImage(_uniqueSpriteResources[i], false, Pixi.scaleModes.DEFAULT);
			var sprite:Sprite = new Sprite(texture);
			_spriteContainer.addChild(sprite);
			sprite.x = Std.random(Std.int(StageProperties.screenWidth));
			sprite.y = Std.random(Std.int(StageProperties.screenHeight));
			sprite.anchor.set(0.5, 0.5);
			_sprites.push(sprite);
			_applyScale(sprite);
		}

		_uniqueSprites += _uniqueSpriteResources.length;
		_uniqueSpriteResources = null;
		_updateQuanityLabel();
	}

	function _addCachedSprites(count:Int) {
		for (i in 0 ... count) {
			var sprite:Sprite = new Sprite(_cachedTexture);
			_spriteContainer.addChild(sprite);
			sprite.x = Std.random(Std.int(StageProperties.screenWidth));
			sprite.y = Std.random(Std.int(StageProperties.screenHeight));
			sprite.anchor.set(0.5, 0.5);
			_sprites.push(sprite);
			_applyScale(sprite);
		}

		_cachedSprites += count;
		_updateQuanityLabel();
	}

	public function update(elapsedTime:Float) {
		if (_isScale || _isRotation) {
			for (i in 0 ... _sprites.length) {
				var sprite:DisplayObjectContainer = _sprites[i];

				if (_isScale) {
					if (sprite.scale.x < 2) {
						sprite.scale.x += Math.random() / 50 + 0.01;
						sprite.scale.y += Math.random() / 50 + 0.01;
					}
				}

				if (_isRotation) {
					sprite.rotation += Math.random() / 50 + 0.01;
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
		gameContainer.removeChild(_spriteContainer);
		gameContainer.removeChild(_uiContainer);
		_spriteContainer = null;
		_uiContainer = null;
		_quantityLabel = null;
		_buttons = null;
		_sprites = null;
		_uniqueSpriteResources = null;
		_uniqueSprites = null;
		_cachedSprites = null;
		_cachedTexture = null;
	}

	public function resize() {
		_uiContainer.x = (StageProperties.screenWidth - 300) / 2;
		_uiContainer.y = 20;
	}
}