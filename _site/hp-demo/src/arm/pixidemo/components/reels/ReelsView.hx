package arm.pixidemo.components.reels;

import howler.Howl;
import motion.easing.Linear;
import pixi.primitives.Graphics;
import pixi.widgets.Button;
import motion.Actuate;
import pixi.display.SpriteBatch;
import pixi.display.Sprite;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class ReelsView extends GameComponentView {

	var _reelsContainer:DisplayObjectContainer;

	var _mask:Graphics;
	var _reels:Array<SpriteBatch>;
	var _icons:Array<Array<Sprite>>;
	var _blurIcons:Array<Array<Sprite>>;

	var _reelCount:Int = 5;
	var _reelIconCount:Int = 20;
	var _reelHeight:Float;

	var _iconLayout:Dynamic;
	var _reelsLayout:Dynamic;

	var _spinBtn:Button;
	var _spinSound:Howl;

	var _reelMaps:Array<Array<Int>> = [
	[6, 1, 8, 10, 6, 4, 9, 0, 7, 3, 2, 8, 5, 6, 7, 0, 9, 4, 8, 3, 6, 5, 8, 2, 7, 11, 9, 3, 7, 4, 9, 5, 6, 1, 9, 8, 6, 2, 9, 11],
	[8, 4, 7, 1, 5, 11, 6, 1, 8, 2, 7, 11, 6, 5, 8, 3, 9, 0, 6, 5, 8, 11, 6, 4, 7, 5, 4, 9, 3, 11, 6, 2, 3, 7, 4, 5, 8, 4, 9, 10],
	[9, 1, 11, 2, 9, 11, 5, 2, 8, 10, 4, 7, 3, 9, 11, 4, 3, 6, 12, 7, 9, 2, 6, 0, 7, 1, 8, 3, 5, 6, 12, 2, 7, 0, 8, 1, 10, 3, 11, 5],
	[7, 4, 8, 10, 7, 1, 8, 0, 7, 4, 1, 9, 12, 2, 9, 12, 7, 1, 6, 0, 8, 3, 12, 5, 6, 0, 9, 3, 6, 12, 8, 2, 6, 5, 9, 6, 10, 9, 4, 2],
	[6, 12, 5, 1, 7, 0, 9, 5, 8, 10, 9, 3, 5, 6, 0, 8, 2, 5, 8, 3, 6, 5, 8, 1, 6, 10, 7, 3, 8, 4, 12, 2, 8, 4, 9, 1, 8, 12, 9, 4]
	];

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_reelsContainer = new DisplayObjectContainer();
		gameContainer.addChild(_reelsContainer);

		_iconLayout = _layout.getLayout("ICON");
		_reelsLayout = _layout.getLayout("REELS");

		_reelHeight = _reelIconCount * _iconLayout.height;

		_reels = [];
		_icons = [];
		_blurIcons = [];

		_createMask();
		_createReels();

		_addButton("SPIN ", 0, 0, 100, 30, spinReels);

		_reelsContainer.x = _mask.x = (StageProperties.screenWidth - (_iconLayout.width + _reelsLayout.spacing) * _reelCount) / 2;
		_reelsContainer.y = _mask.y = (StageProperties.screenHeight - _iconLayout.height * 3) / 2;

		_spinSound = _sounds.getSound("spin");
	}

	function _createMask() {
		_mask = new Graphics();
		gameContainer.addChild(_mask);
		_mask.lineStyle(0);
		_mask.beginFill(0x000000);
		_mask.drawRect(0, 0, (_iconLayout.width + _reelsLayout.spacing) * _reelCount, _iconLayout.height * 3);
		_mask.endFill();
		_reelsContainer.mask = _mask;
	}

	function _createReels() {
		var reel:SpriteBatch;
		for (i in 0 ... _reelCount) {
			reel = new SpriteBatch();
			_reels.push(reel);
			_reelsContainer.addChild(reel);
			reel.x = i * (_iconLayout.width + _reelsLayout.spacing);
			reel.y = -_reelHeight + _iconLayout.height * 3;
			_createIcons(reel, i);
		}
	}

	function _createIcons(reel:SpriteBatch, reelNo:Int) {
		var icon:Sprite;
		var blurIcon:Sprite;
		_icons[reelNo] = [];
		_blurIcons[reelNo] = [];
		for (i in 0 ... _reelIconCount) {
			icon = Sprite.fromFrame("icon" + (_reelMaps[reelNo][i] + 1));
			icon.y = i * _iconLayout.height;
			_icons[reelNo][i] = icon;

			blurIcon = Sprite.fromFrame("icon-blur" + (_reelMaps[reelNo][i] + 1));
			blurIcon.y = i * _iconLayout.height;
			blurIcon.visible = false;
			_blurIcons[reelNo][i] = blurIcon;

			reel.addChild(blurIcon);
			reel.addChild(icon);
			_applyScale(icon);
			_applyScale(blurIcon);
		}
	}

	public function spinReels() {
		var reel:SpriteBatch;
		var tdelay:Float = 0;
		for (i in 0 ... _reelCount) {
			reel = cast(_reels[i], SpriteBatch);
			reel.y = -_reelHeight + _iconLayout.height * 3;

			Actuate.tween(reel, 0.3, { y: reel.y - 40 }).onComplete(_startSpinning, [reel, i]).delay(tdelay).ease(Linear.easeNone);
			tdelay += 0.07;
		}
		_spinSound.play();
	}

	function _startSpinning(reel:SpriteBatch, reelNo:Int) {
		Actuate.tween(reel, 2, { y: 0 }).onComplete(_reelSpinComplete, [reel, reelNo]).ease(Linear.easeNone);
		//_showBlur(reelNo);
	}

	function _reelSpinComplete(reel:SpriteBatch, reelNo:Int) {
		Actuate.tween(reel, 0.5, { y: -_iconLayout.height }).onComplete(_resetReels, [reelNo]);
		//_removeBlur(reelNo);
	}

	function _resetReels(reelNo:Int) {
		_reelMaps[reelNo][_reelIconCount - 1] = _reelMaps[reelNo][3];
		_reelMaps[reelNo][_reelIconCount - 2] = _reelMaps[reelNo][2];
		_reelMaps[reelNo][_reelIconCount - 3] = _reelMaps[reelNo][1];

		if (reelNo == _reelCount - 1) {
			for (reel in _reels) {
				_reelsContainer.removeChild(reel);
			}
			_reels = [];
			_icons = [];
			_blurIcons = [];
			_createReels();
		}
	}

	function _showBlur(reelNo:Int) {
		for (i in 0 ... _reelIconCount) {
			_icons[reelNo][i].visible = false;
			_blurIcons[reelNo][i].visible = true;
		}
	}

	function _removeBlur(reelNo:Int) {
		for (i in 0 ... _reelIconCount) {
			_icons[reelNo][i].visible = true;
			_blurIcons[reelNo][i].visible = false;
		}
	}

	function _addButton(label:String, x:Float, y:Float, width:Float, height:Float, callback:Dynamic, ?data:Dynamic) {
		_spinBtn = new Button(label, width, height, data);
		_spinBtn.action.add(callback);
		_spinBtn.enable();
		_spinBtn.x = (StageProperties.screenWidth - 100) / 2;
		_spinBtn.y = StageProperties.screenY + 60;
		gameContainer.addChild(_spinBtn);
	}

	public function hide() {
		gameContainer.removeChild(_spinBtn);
		gameContainer.removeChild(_reelsContainer);
		_reelsContainer = null;
		_spinBtn = null;
		_mask = null;
		_reels = null;
	}

	public function resize() {
		_reelsContainer.x = _mask.x = (StageProperties.screenWidth - (_iconLayout.width + _reelsLayout.spacing) * _reelCount) / 2;
		_reelsContainer.y = _mask.y = (StageProperties.screenHeight - _iconLayout.height * 3) / 2;

		_spinBtn.x = (StageProperties.screenWidth - 100) / 2;
		_spinBtn.y = StageProperties.screenY + 60;
	}
}