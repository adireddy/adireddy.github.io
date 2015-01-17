package arm.pixidemo.components.video;

import arm.pixidemo.notifications.internal.MenuNotification;

class VideoController extends GameComponentController {

	var _id:Int = 15;
	var _showing:Bool = false;
	var _view:VideoView;

	public function new(m, v, c, mainModel) {
		super(m, v, c, mainModel);
		_view = cast(v, VideoView);
	}

	override function _addNotificationListeners() {
		super._addNotificationListeners();
		MenuNotification.click.add(_onMenuClick);
		MenuNotification.reset.add(_reset);
	}

	function _reset() {
		if (_showing) {
			_view.hide();
			_showing = false;
		}
	}

	function _onMenuClick(id:Int) {
		if (id == _id) {
			if (!_showing) _view.show();
			_showing = true;
		}
		else _reset();
	}

	override function _resize() {
		if (_showing) _view.resize();
	}
}