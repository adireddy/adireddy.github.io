package arm.pixidemo.controller;

import arm.mvc.controller.Controller;
import arm.pixidemo.view.DemoView;
import arm.pixidemo.model.DemoModel;

import arm.pixidemo.components.menu.MenuController;
import arm.pixidemo.components.menu.MenuView;

import arm.pixidemo.components.preloader.PreloaderController;
import arm.pixidemo.components.preloader.PreloaderView;

import arm.pixidemo.components.screenguide.ScreenGuideController;
import arm.pixidemo.components.screenguide.ScreenGuideView;

import arm.pixidemo.components.screentest.ScreenTestController;
import arm.pixidemo.components.screentest.ScreenTestView;

import arm.pixidemo.components.localisation.LocalisationController;
import arm.pixidemo.components.localisation.LocalisationView;

import arm.pixidemo.components.sprites.SpritesController;
import arm.pixidemo.components.sprites.SpritesView;

import arm.pixidemo.components.bunnymark.BunnymarkController;
import arm.pixidemo.components.bunnymark.BunnymarkView;

import arm.pixidemo.components.spritesheets.SpritessheetsController;
import arm.pixidemo.components.spritesheets.SpritessheetsView;

import arm.pixidemo.components.coins.CoinsController;
import arm.pixidemo.components.coins.CoinsView;

import arm.pixidemo.components.typekit.TypekitController;
import arm.pixidemo.components.typekit.TypekitView;

import arm.pixidemo.components.audio.AudioController;
import arm.pixidemo.components.audio.AudioView;

import arm.pixidemo.components.reels.ReelsController;
import arm.pixidemo.components.reels.ReelsView;

import arm.pixidemo.components.skeleton.SkeletonController;
import arm.pixidemo.components.skeleton.SkeletonView;

import arm.pixidemo.components.video.VideoController;
import arm.pixidemo.components.video.VideoView;

import arm.pixidemo.components.livevideo.LiveVideoController;
import arm.pixidemo.components.livevideo.LiveVideoView;

import arm.pixidemo.components.physics.PhysicsController;
import arm.pixidemo.components.physics.PhysicsView;

import arm.pixidemo.components.menu.MenuController;
import arm.pixidemo.components.menu.MenuView;

class DemoController extends Controller {

	var _view:DemoView;

	public function new(m, v, c) {
		_view = cast(v, DemoView);
		super(m, v, c);
	}

	function _getMainModel():DemoModel {
		return cast(model, DemoModel);
	}

	override function _setupComponents() {
		_setupMenuComponent();
		_setupScreenGuideComponent();
		_setupScreenTestComponent();
		_setupSpritesComponent();
		_setupLocalisationComponent();
		_setupBunnymarkComponent();
		_setupCoinsComponent();
		_setupTypekitComponent();
		_setupReelsComponent();
		_setupAudioComponent();
		_setupSpritesheetsComponent();
		_setupSkeletonComponent();
		_setupVideoComponent();
		_setupLiveVideoComponent();
		_setupPhysicsComponent();
		_setupPreloaderComponent();
	}

	function _setupLiveVideoComponent() {
		var liveVideoView:LiveVideoView = new LiveVideoView(_view.gameStage, _view.gameContainer);
		var liveVideoController:LiveVideoController = new LiveVideoController(null, liveVideoView, comms, _getMainModel());
	}

	function _setupVideoComponent() {
		var videoView:VideoView = new VideoView(_view.gameStage, _view.gameContainer);
		var videoController:VideoController = new VideoController(null, videoView, comms, _getMainModel());
	}

	function _setupPhysicsComponent() {
		var physicsView:PhysicsView = new PhysicsView(_view.gameStage, _view.gameContainer);
		var physicsController:PhysicsController = new PhysicsController(null, physicsView, comms, _getMainModel());
	}

	function _setupSkeletonComponent() {
		var skeletonView:SkeletonView = new SkeletonView(_view.gameStage, _view.gameContainer);
		var skeletonController:SkeletonController = new SkeletonController(null, skeletonView, comms, _getMainModel());
	}

	function _setupSpritesheetsComponent() {
		var spritessheetsView:SpritessheetsView = new SpritessheetsView(_view.gameStage, _view.gameContainer);
		var spritessheetsController:SpritessheetsController = new SpritessheetsController(null, spritessheetsView, comms, _getMainModel());
	}

	function _setupReelsComponent() {
		var reelsView:ReelsView = new ReelsView(_view.gameStage, _view.gameContainer);
		var reelsController:ReelsController = new ReelsController(null, reelsView, comms, _getMainModel());
	}

	function _setupAudioComponent() {
		var audioView:AudioView = new AudioView(_view.gameStage, _view.gameContainer);
		var audioController:AudioController = new AudioController(null, audioView, comms, _getMainModel());
	}

	function _setupTypekitComponent() {
		var typekitView:TypekitView = new TypekitView(_view.gameStage, _view.gameContainer);
		var typekitController:TypekitController = new TypekitController(null, typekitView, comms, _getMainModel());
	}

	function _setupCoinsComponent() {
		var coinsView:CoinsView = new CoinsView(_view.gameStage, _view.gameContainer);
		var coinsController:CoinsController = new CoinsController(null, coinsView, comms, _getMainModel());
	}

	function _setupBunnymarkComponent() {
		var bunnymarkView:BunnymarkView = new BunnymarkView(_view.gameStage, _view.gameContainer);
		var bunnymarkController:BunnymarkController = new BunnymarkController(null, bunnymarkView, comms, _getMainModel());
	}

	function _setupLocalisationComponent() {
		var localisationView:LocalisationView = new LocalisationView(_view.gameStage, _view.gameContainer);
		var localisationController:LocalisationController = new LocalisationController(null, localisationView, comms, _getMainModel());
	}

	function _setupSpritesComponent() {
		var spritesView:SpritesView = new SpritesView(_view.gameStage, _view.gameContainer);
		var spritesController:SpritesController = new SpritesController(null, spritesView, comms, _getMainModel());
	}

	function _setupScreenTestComponent() {
		var screenTestView:ScreenTestView = new ScreenTestView(_view.gameStage, _view.gameContainer);
		var screenTestController:ScreenTestController = new ScreenTestController(null, screenTestView, comms, _getMainModel());
	}

	function _setupMenuComponent() {
		var menuView:MenuView = new MenuView(_view.gameStage, _view.gameContainer);
		var menuController:MenuController = new MenuController(null, menuView, comms, _getMainModel());
	}

	function _setupScreenGuideComponent() {
		var screenGuideView:ScreenGuideView = new ScreenGuideView(_view.gameStage, _view.gameContainer);
		var screenGuideController:ScreenGuideController = new ScreenGuideController(null, screenGuideView, comms, _getMainModel());
	}

	function _setupPreloaderComponent() {
		var preloaderView:PreloaderView = new PreloaderView(_view.gameStage, _view.gameContainer);
		var preloaderController:PreloaderController = new PreloaderController(null, preloaderView, comms, _getMainModel());
	}
}