package arm.pixidemo.components.spritesheets;

import arm.pixidemo.notifications.internal.MenuNotification;
import arm.mvc.components.ComponentController;

class SpritessheetsController extends ComponentController {

	var _id:Int = 6;
	var _view:SpritessheetsView;
	var _showing:Bool = false;

	public function new(m, v, c, mainModel) {
		super(m, v, c, mainModel);
		_view = cast(v, SpritessheetsView);
	}

	override function _update(elapsedTime:Float) {
		if (_showing) _view.update(elapsedTime);
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
}