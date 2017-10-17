package arm.pixidemo.components.coins;

import pixi.resources.Loader;
import pixi.text.Text;
import pixi.widgets.Label;
import pixi.widgets.Button;
import pixi.textures.Texture;
import arm.pixidemo.view.StageProperties;
import pixi.display.Sprite;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class CoinsView extends GameComponentView {

	var _coinsContainer:DisplayObjectContainer;
	var _uiContainer:DisplayObjectContainer;

	var _coins:Array<Coin>;
	var _animations:Object<Dynamic>;
	var _bigWin:Sprite;
	var _tickerBackground:Sprite;
	var _quantityLabel:Label;
	var _tickerLabel:Text;

	var _buttons:Array<Button>;

	var _ySpeed:Float;
	var _emitterWidth:Float;
	var _xSpeedRange:Object<Float>;
	var _scaleRange:Object<Float>;
	var _gravityRange:Object<Float>;

	var _started:Bool;
	var _bigWinScaleIsGrow:Bool;
	var _bigWinScale:Float;
	var _numberOfCoins:Int;
	var _countUpTarget:Int;
	var _countUpValue:Float;
	var _isCountingUp:Bool;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_coinsContainer = new DisplayObjectContainer();
		_uiContainer = new DisplayObjectContainer();

		_animations = new Object();
		_animations.set("name", "Coin");
		_animations.set("frames", 55);

		_started = false;
		_bigWinScaleIsGrow = true;
		_bigWinScale = 1 / StageProperties.pixelRatio;
		_countUpTarget = 10000;
		_countUpValue = 0;
		_isCountingUp = true;
		_numberOfCoins = 0;
		_coins = [];
		_buttons = [];

		_ySpeed = _settings.getSetting("COIN_SHOWER_Y_SPEED");
		_emitterWidth = _settings.getSetting("COIN_SHOWER_EMIT_WIDTH");

		_xSpeedRange = new Object();
		_xSpeedRange.set("min", _settings.getSetting("COIN_SHOWER_MIN_SPEED"));
		_xSpeedRange.set("max", _settings.getSetting("COIN_SHOWER_MAX_SPEED"));

		_scaleRange = new Object();
		_scaleRange.set("min", _settings.getSetting("COIN_SHOWER_MIN_SCALE"));
		_scaleRange.set("max", _settings.getSetting("COIN_SHOWER_MAX_SCALE"));

		_gravityRange = new Object();
		_gravityRange.set("min", _settings.getSetting("COIN_SHOWER_MIN_GRAVITY"));
		_gravityRange.set("max", _settings.getSetting("COIN_SHOWER_MAX_GRAVITY"));

		_addButton("Start", 0, 0, 100, 30, _start);
		_addButton("Add 100", 100, 0, 100, 30, _addCoins, 100);
		_addButton("Reset", 200, 0, 100, 30, _reset);

		_quantityLabel = new Label("Quantity: 0", 300, 30);
		_quantityLabel.y = 30;

		_bigWin = new Sprite(Texture.fromImage(Loader.SCALE_URL + "bigwin/images/BigWin.png"));
		_applyScale(_bigWin);
		_bigWin.anchor.set(0.5, 0.5);
		_tickerBackground = new Sprite(Texture.fromImage(Loader.SCALE_URL + "tickerbackground/images/TickerBackground.png"));
		_applyScale(_tickerBackground);

		var style:TextStyle = {};
		style.font = "50px Arial";
		style.fill = "#000000";

		_tickerLabel = new Text("", style);
		_tickerLabel.anchor.set(0.5, 0.5);

		_uiContainer.addChild(_quantityLabel);
		gameContainer.addChild(_uiContainer);
		gameContainer.addChild(_coinsContainer);
		gameContainer.addChild(_tickerBackground);
		gameContainer.addChild(_tickerLabel);
		gameContainer.addChild(_bigWin);
		_updateCountUp();
		resize();
	}

	function _addCoins(count:Int) {
		if (!_started) _start();
		else _numberOfCoins += count;
	}

	function _start() {
		_started = true;
		_addCoins(100);
	}

	function _addCoin() {
		var textures:Array<Texture> = [];

		for (i in 1 ... _animations.get("frames")) {
			var frame:String = "" + i;
			while (frame.length < 4) frame = "0" + frame;
			textures.push(Texture.fromFrame(_animations.get("name") + "_" + frame + ".png"));
		}

		var coin:Coin = new Coin(textures);
		coin.anchor.set(0.5, 0.5);
		_resetCoin(coin);
		_coins.push(coin);
		_coinsContainer.addChild(coin);
		_applyScale(coin);
	}

	function _resetCoin(coin:Coin) {
		var xPos = (StageProperties.screenWidth - _emitterWidth) / 2;
		xPos += Math.random() * _emitterWidth;

		coin.speedY = _ySpeed;
		coin.speedX = _getRandomRange(_xSpeedRange);
		coin.scaleMultiplier = _getRandomRange(_scaleRange);
		coin.gravity = _getRandomRange(_gravityRange);
		coin.x = xPos;
		coin.y = StageProperties.screenHeight;
		var scale = Math.random() * 0.25 + 0.5;
		coin.scale.set(scale, scale);
		coin.gotoAndPlay(Math.ceil(Math.random() * _animations.get("frames")));
	}

	function _updateCountUp() {
		var format = {
			addTrailingZeros: true,
			splitThousands: true
		};

		//var currencyID:Int = Core.sessionProperties.getCurrencyId();
		//var formattedValue = Core.currencyFormatter.formatValue(_countUpValue, currencyID, format);
		_tickerLabel.setText("" + Math.round(_countUpValue));

		if (_isCountingUp) _countUpValue += 1.23;
		else _countUpValue -= 1.23;

		if (_countUpValue > _countUpTarget || _countUpValue <= 0) _isCountingUp = !_isCountingUp;
	}

	function _updateBigWin() {
		_bigWinScale += (_bigWinScaleIsGrow) ? 0.025 : -0.025;
		_bigWin.scale.set(_bigWinScale, _bigWinScale);
		if (_bigWinScale > 1 || _bigWinScale < 0.5) _bigWinScaleIsGrow = !_bigWinScaleIsGrow;
	}

	function _updateCoin() {
		var i = _coins.length - 1;
		while (i >= 0) {
			var coin = _coins[i];
			coin.scale.x += coin.scaleMultiplier;
			coin.scale.y += coin.scaleMultiplier;
			coin.x += coin.speedX;
			coin.y += coin.speedY;
			coin.speedY += coin.gravity;

			if (coin.y > StageProperties.screenHeight) {
				_resetCoin(coin);
			}
			i--;
		}
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

	function _getRandomRange(range:Object<Float>):Float {
		return Math.random() * (range.get("max") - range.get("min")) + range.get("min");
	}

	function _reset() {
		for (i in 0 ... _coins.length) _coinsContainer.removeChild(_coins[i]);

		_started = false;
		_numberOfCoins = 0;
		_countUpValue = 0;
		_isCountingUp = true;
		_coins = [];
		_quantityLabel.setText("Coins: " + _coins.length);
		_applyScale(_bigWin);
		_bigWinScale = 1 / StageProperties.pixelRatio;
		_updateCountUp();
	}

	public function hide() {
		_reset();

		for (i in 0 ... _buttons.length) {
			var button:Button = _buttons[i];
			button.disable();
			_uiContainer.removeChild(button);
			_buttons[i] = null;
		}
		_uiContainer.removeChild(_quantityLabel);
		gameContainer.removeChild(_coinsContainer);
		gameContainer.removeChild(_uiContainer);
		gameContainer.removeChild(_tickerBackground);
		gameContainer.removeChild(_tickerLabel);
		gameContainer.removeChild(_bigWin);
		_bigWin = null;
		_tickerBackground = null;
		_tickerLabel = null;
		_coinsContainer = null;
		_uiContainer = null;
		_quantityLabel = null;
		_buttons = null;
		_coins = null;
	}

	public function update(elapsedTime:Float) {
		if (_started) {
			_updateCountUp();
			_updateBigWin();
			_updateCoin();

			if (_coins.length < _numberOfCoins) _addCoin();
			_quantityLabel.setText("Coins: " + _coins.length);
		}
	}

	public function resize() {
		_uiContainer.x = (StageProperties.screenWidth - 300) / 2;
		_uiContainer.y = 20;

		_bigWin.x = StageProperties.screenX + _layout.getLayout("BIG_WIN").x;
		_bigWin.y = StageProperties.screenY + _layout.getLayout("BIG_WIN").y;

		_tickerBackground.x = StageProperties.screenX + _layout.getLayout("TICKER_BACKGROUND").x;
		_tickerBackground.y = StageProperties.screenY + _layout.getLayout("TICKER_BACKGROUND").y;

		_tickerLabel.x = _tickerBackground.x + _tickerBackground.width / 2;
		_tickerLabel.y = _tickerBackground.y + _tickerBackground.height / 2;
	}
}