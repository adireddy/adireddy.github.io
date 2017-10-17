package arm.pixidemo.components.preloader;

import arm.mvc.notifications.ViewStateNotification;

class PreloaderController extends GameComponentController {

	var _view:PreloaderView;

	public function new(m, v, c, mainModel) {
		super(m, v, c, mainModel);
		_view = cast(v, PreloaderView);
	}

	override function _addNotificationListeners() {
		super._addNotificationListeners();
		ViewStateNotification.preloader.addOnce(_showPreloader);
	}

	function _showPreloader() {
		_view.showPreloader();
	}
}