package arm.pixidemo.components.preloader;

import pixi.resources.Loader;
import pixi.text.Text;
import pixi.display.DisplayObjectContainer;
import pixi.primitives.Graphics;
import arm.pixidemo.view.StageProperties;
import arm.mvc.notifications.ViewStateNotification;

class PreloaderView extends GameComponentView {

	var _assetsPack:Array<String>;
	var _spriteSheetsPack:Array<String>;
	var _soundsPack:Array<Object<String>>;
	var _loadCount:Int;
	var _totalAssetCount:Int;

	var _container:DisplayObjectContainer;
	var _background:Graphics;
	var _loadingBar:Graphics;
	var _loadingBarBG:Graphics;
	var _loadingText:Text;
	var _titleText:Text;

	public function new(stage, ?container) {
		super(stage, container);
		_loadCount = 0;
		_assetsPack = [];
		_spriteSheetsPack = [];
		_soundsPack = [];
	}

	public function showPreloader() {
		_createBackground();
		_container = new DisplayObjectContainer();
		gameContainer.addChild(_container);
		_createLoadingBar();
		_prepareSoundAssets();
		_preloadAssets();
	}

	function _createBackground() {
		_background = new Graphics();
		_background.beginFill(0x21610B);
		_background.drawRect(0, 0, StageProperties.screenWidth, StageProperties.screenHeight);
		_background.endFill();
		gameContainer.addChild(_background);
	}

	function _createLoadingBar() {
		_loadingBarBG = new Graphics();
		_loadingBarBG.beginFill(0xFFFFFF);
		_loadingBarBG.drawRect(0, 0, 204, 34);
		_loadingBarBG.endFill();

		_loadingBar = new Graphics();
		_loadingBar.beginFill(0x088A29);
		_loadingBar.drawRect(0, 0, 200, 30);
		_loadingBar.endFill();

		_container.addChild(_loadingBarBG);
		_container.addChild(_loadingBar);
		_loadingBar.x = _loadingBar.y = 2;
		_container.x = (StageProperties.screenWidth - _loadingBar.width) / 2;
		_container.y = (StageProperties.screenHeight - _loadingBar.height) / 2;

		_loadingText = new Text("LOADING", {font:"24px futura-pt", fill:"#FFFFFF"});
		_loadingText.anchor.set(0.5, 0.5);
		gameContainer.addChild(_loadingText);
		_loadingText.x = StageProperties.screenWidth / 2 + 2;
		_loadingText.y = StageProperties.screenHeight / 2 - 30;
		_loadingBar.scale.x = 0.02;

		_titleText = new Text("haxe pixi demo", {font:"60px grafolita-script", fill:"#FFFFFF"});
		_titleText.anchor.set(0.5, 0.5);
		gameContainer.addChild(_titleText);
		_titleText.x = StageProperties.screenWidth / 2;
		_titleText.y = StageProperties.screenY + 50;
	}

	function _prepareSoundAssets() {
		_addSoundAsset("bg", Loader.BASE_URL + "sounds/loop.mp3");
		_addSoundAsset("sound1", Loader.BASE_URL + "sounds/sound1.wav");
		_addSoundAsset("sound2", Loader.BASE_URL + "sounds/sound2.wav");
		_addSoundAsset("sound3", Loader.BASE_URL + "sounds/sound3.wav");
		_addSoundAsset("sound4", Loader.BASE_URL + "sounds/sound4.wav");
		_addSoundAsset("spin", Loader.BASE_URL + "sounds/spin.mp3");
	}

	function _addSoundAsset(id:String, url:String) {
		var snd:Object<String> = new Object();
		snd.set("id", id);
		snd.set("url", url);
		_soundsPack.push(snd);
	}

	function _preloadAssets() {
		_assetsPack = [
			Loader.SCALE_URL + "spriteperformance/images/sprite1.png",
			Loader.SCALE_URL + "bunnys/images/bunny.png",
			Loader.SCALE_URL + "bigwin/images/BigWin.png",
			Loader.SCALE_URL + "screentest/images/ScreenTest.png",
			Loader.SCALE_URL + "particles/images/particle.png",
			Loader.SCALE_URL + "tickerbackground/images/TickerBackground.png",
			Loader.SCALE_URL + "localisation/images/flag.png",
			"assets/fonts/desyrel.xml"
		];

		_spriteSheetsPack = [
			Loader.SCALE_URL + "spritesheets/images/Phoenix1.json",
			Loader.SCALE_URL + "reels/images/icons.json",
			Loader.SCALE_URL + "reels/images/icons-blur.json",
			Loader.SCALE_URL + "coin/images/Coin.json",
			Loader.SCALE_URL + "spine/images/dragonBones.json",
			Loader.SCALE_URL + "spine/images/dragonBonesData.json"
		];

		_totalAssetCount = _assetsPack.length + _soundsPack.length + _spriteSheetsPack.length;

		Loader.loadSoundsPack(_soundsPack);
		Loader.soundLoadComplete.add(_onAssetsProgress);

		Loader.loadAssetsPack(_assetsPack);
		Loader.assetsProgress.add(_onAssetsProgress);

		Loader.loadSpriteSheetsPack(_spriteSheetsPack);
		Loader.spriteSheetLoadComplete.add(_onAssetsProgress);
	}

	function _onAssetsProgress() {
		_loadCount++;
		_loadingBar.scale.x = _loadCount / _totalAssetCount;
		if (_loadCount == _totalAssetCount) _destroy();
	}

	function _destroy() {
		ViewStateNotification.create.dispatch();
		_container.removeChild(_loadingBarBG);
		_container.removeChild(_loadingBar);
		gameContainer.removeChild(_background);
		gameContainer.removeChild(_container);
		gameContainer.removeChild(_loadingText);
		gameContainer.removeChild(_titleText);
		_background = null;
		_container = null;
		_assetsPack = null;
		_soundsPack = null;
		_loadingText = null;
		_titleText = null;
		_loadingBarBG = null;
		_loadingBar = null;
	}
}