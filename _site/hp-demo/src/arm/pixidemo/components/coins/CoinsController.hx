package arm.pixidemo.components.coins;

import arm.pixidemo.notifications.internal.MenuNotification;

class CoinsController extends GameComponentController {

	var _id:Int = 7;
	var _showing:Bool = false;
	var _view:CoinsView;

	public function new(m, v, c, mainModel) {
		super(m, v, c, mainModel);
		_view = cast(v, CoinsView);
	}

	override function _addNotificationListeners() {
		super._addNotificationListeners();
		MenuNotification.click.add(_onMenuClick);
		MenuNotification.reset.add(_reset);
	}

	override function _resize() {
		if (_showing) _view.resize();
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
	}

	override function _update(elapsedTime:Float) {
		if (_showing) _view.update(elapsedTime);
	}
}