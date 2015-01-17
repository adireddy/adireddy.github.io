package arm.pixidemo;

import arm.pixidemo.core.Bucket;
import arm.pixidemo.core.utils.BrowserUtils;
import pixi.utils.Stats;
import js.html.Element;
import js.Browser;

import pixi.renderers.webgl.WebGLRenderer;
import pixi.display.DisplayObjectContainer;
import pixi.resources.Loader;
import pixi.display.Sprite;
import pixi.display.Stage;
import pixi.utils.Detector;

import arm.pixidemo.resources.Layout;
import arm.pixidemo.resources.Messages;
import arm.pixidemo.resources.Settings;
import arm.pixidemo.controller.DemoController;
import arm.pixidemo.model.DemoModel;
import arm.pixidemo.comms.DemoCommsController;
import arm.pixidemo.view.DemoView;
import arm.pixidemo.view.StageProperties;

import arm.mvc.notifications.ViewStateNotification;
import arm.mvc.Application;

@IgnoreCover
class Demo extends Application {

	var _stats:Stats;
	var _bunny:Sprite;
	var _renderer:WebGLRenderer;
	var _game:Stage;
	var _gameContainer:DisplayObjectContainer;

	var _localeFolder:String;
	var _bucketFolder:String;
	var _scaleFolder:String;
	var _baseFolder:String;

	var _canvas:Element;

	var _skipFrame:Bool;
	var _lastTime:Date;
	var _currentTime:Date;

	public inline static var buildID:String = BuildID.get();

	public function new() {
		super();
		Console.start();
		_skipFrame = false;
		_setStageProperties();
		_setAssetFolders();
		_setupApplication();
		_showStats();
		_setupMVCS();
		_loadBucketSizes();
	}

	function _setStageProperties() {
		StageProperties.actualPixelRatio = Browser.window.devicePixelRatio;
		StageProperties.pixelRatio = BrowserUtils.getPixelRatio();
		StageProperties.screenWidth = Browser.window.innerWidth;
		StageProperties.screenHeight = Browser.window.innerHeight;
		StageProperties.orientation = (StageProperties.screenWidth > StageProperties.screenHeight) ? StageProperties.LANDSCAPE : StageProperties.PORTRAIT;
	}

	function _setAssetFolders() {
		_localeFolder = "en";
		_scaleFolder = "scale-" + StageProperties.pixelRatio;
		Loader.BASE_URL = "assets/" + _localeFolder + "/";
	}

	function _setupApplication() {
		_canvas = Browser.document.getElementById("game");
		_canvas.style.width = StageProperties.screenWidth + "px";
		_canvas.style.height = StageProperties.screenHeight + "px";

		_game = new Stage(0xFFFFFF);
		_gameContainer = new DisplayObjectContainer();
		_game.addChild(_gameContainer);

		var renderingOptions:RenderingOptions = {};
		renderingOptions.view = _canvas;
		renderingOptions.resolution = StageProperties.pixelRatio;

		_renderer = Detector.autoDetectRenderer(StageProperties.screenWidth, StageProperties.screenHeight, renderingOptions);
		Browser.document.body.appendChild(_renderer.view);
		Browser.window.onresize = _onResize;
		Browser.window.requestAnimationFrame(cast _update);
		_lastTime = Date.now();
	}

	function _setupMVCS() {
		view = new DemoView(_game, _gameContainer);
		comms = new DemoCommsController();
		model = new DemoModel();
		controller = new DemoController(model, view, comms);
	}

	function _showStats() {
		var _container = Browser.document.createElement("div");
		Browser.document.body.appendChild(_container);
		_stats = new Stats();
		_stats.domElement.style.position = "absolute";
		_stats.domElement.style.top = "6px";
		_stats.domElement.style.right = "6px";
		_container.appendChild(_stats.domElement);
		_stats.begin();
	}

	function _loadBucketSizes() {
		Loader.loadJson("bucket_sizes.json");
		Loader.jsonLoadComplete.addOnce(_onBucketSizesLoaded);
	}

	function _onBucketSizesLoaded(json:Dynamic) {
		var buckets:Buckets = json;
		var bucketSizes:Array<BucketSize> = (StageProperties.orientation == StageProperties.LANDSCAPE) ? buckets.landscape : buckets.portrait;
		var closestBucket = bucketSizes[0];

		for (i in 0 ... bucketSizes.length) {
			var bucket = bucketSizes[i];

			if (bucket.height <= StageProperties.screenHeight) {
				closestBucket = bucket;
			}
		}

		StageProperties.bucketWidth = closestBucket.width;
		StageProperties.bucketHeight = closestBucket.height;

		_updateScreenValues();

		_bucketFolder = Math.max(StageProperties.bucketWidth, StageProperties.bucketHeight) + "x" + Math.min(StageProperties.bucketWidth, StageProperties.bucketHeight);
		_baseFolder = "assets/" + _localeFolder + "/" + _bucketFolder + "/" + _scaleFolder + "/";

		Loader.BUCKET_URL = Loader.BASE_URL + _bucketFolder + "/";
		Loader.SCALE_URL = Loader.BUCKET_URL + _scaleFolder + "/";
		Loader.loadJson("settings.json");
		Loader.jsonLoadComplete.addOnce(_onLocaleSettingsLoaded);
	}

	function _onLocaleSettingsLoaded(json:Dynamic) {
		for (n in Reflect.fields(json)) Reflect.setField(Settings, n, Reflect.field(json, n));
		Loader.loadJson("settings.json", true);
		Loader.jsonLoadComplete.addOnce(_onBucketSettingsLoaded);
	}

	function _onBucketSettingsLoaded(json:Dynamic) {
		for (n in Reflect.fields(json)) Reflect.setField(Settings, n, Reflect.field(json, n));
		Loader.loadJson("messages.json");
		Loader.jsonLoadComplete.addOnce(_onLocaleMessagesLoaded);
	}

	function _onLocaleMessagesLoaded(json:Dynamic) {
		for (n in Reflect.fields(json)) Reflect.setField(Messages, n, Reflect.field(json, n));
		Loader.loadJson("messages.json", true);
		Loader.jsonLoadComplete.addOnce(_onBucketMessagesLoaded);
	}

	function _onBucketMessagesLoaded(json:Dynamic) {
		for (n in Reflect.fields(json)) Reflect.setField(Messages, n, Reflect.field(json, n));
		Loader.loadJson("layout.json", true);
		Loader.jsonLoadComplete.addOnce(_onBucketLayoutLoaded);
	}

	function _onBucketLayoutLoaded(json:Dynamic) {
		for (n in Reflect.fields(json)) Reflect.setField(Layout, n, Reflect.field(json, n));
		ViewStateNotification.preloader.dispatch();
	}

	function _updateScreenValues() {
		StageProperties.screenX = (StageProperties.screenWidth - StageProperties.bucketWidth) / 2;
		StageProperties.screenY = (StageProperties.screenHeight - StageProperties.bucketHeight) / 2;
		//_gameContainer.x = StageProperties.screenX;
		//_gameContainer.y = StageProperties.screenY;

		var horizontalOverlap:Bool = (StageProperties.screenWidth > StageProperties.bucketWidth);
		var verticalOverlap:Bool = (StageProperties.screenHeight > StageProperties.bucketHeight);

		if (horizontalOverlap && verticalOverlap) StageProperties.bucketOverlapType = StageProperties.BUCKET_OVERLAP_FULL;
		else if (horizontalOverlap) StageProperties.bucketOverlapType = StageProperties.BUCKET_OVERLAP_HORIZONTAL;
		else if (verticalOverlap) StageProperties.bucketOverlapType = StageProperties.BUCKET_OVERLAP_VERTICAL;
	}

	function _update() {
		if (_skipFrame) _skipFrame = false;
		else {
			_renderer.render(_game);
			_skipFrame = true;
			_currentTime = Date.now();
			ViewStateNotification.update.dispatch(_currentTime.getTime() - _lastTime.getTime());
			_lastTime = _currentTime;
		}
		Browser.window.requestAnimationFrame(cast _update);
		_stats.update();
	}

	function _onResize(event) {
		StageProperties.screenWidth = Browser.window.innerWidth;
		StageProperties.screenHeight = Browser.window.innerHeight;
		_renderer.resize(StageProperties.screenWidth, StageProperties.screenHeight);
		_canvas.style.width = StageProperties.screenWidth + "px";
		_canvas.style.height = StageProperties.screenHeight + "px";
		_updateScreenValues();
		ViewStateNotification.resize.dispatch();
	}

	static function main() {
		new Demo();
		trace("info", "Build ID: ", buildID);

        #if swf
			var logger = mcover.coverage.MCoverage.getLogger();
			var client = new gamesys.core.utils.CoveragePrintClient();
			client.includeHeader = true;
			client.includeMissingBlocks = true;
			client.includeExecutionFrequency = true;
			client.includeClassBreakdown = true;
			client.includePackageBreakdown = true;
			client.includeOverallPercentage = true;
			client.includeSummary = true;

			logger.addClient(client);
			logger.report();
		#end
	}
}