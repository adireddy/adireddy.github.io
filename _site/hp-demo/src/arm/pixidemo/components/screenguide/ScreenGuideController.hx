package arm.pixidemo.components.screenguide;

import arm.pixidemo.notifications.internal.MenuNotification;

class ScreenGuideController extends GameComponentController {

	var _id:Int = 2;
	var _showing:Bool = false;
	var _view:ScreenGuideView;

	public function new(m, v, c, mainModel) {
		super(m, v, c, mainModel);
		_view = cast(v, ScreenGuideView);
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

	override function _create() {
		_view.show();
		_showing = true;
	}

	override function _resize() {
		if (_showing) _view.resize();
	}
}