package arm.pixidemo.components.skeleton;

import arm.pixidemo.notifications.internal.MenuNotification;

class SkeletonController extends GameComponentController {

	var _id:Int = 14;
	var _showing:Bool = false;
	var _view:SkeletonView;

	public function new(m, v, c, mainModel) {
		super(m, v, c, mainModel);
		_view = cast(v, SkeletonView);
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
	}
}