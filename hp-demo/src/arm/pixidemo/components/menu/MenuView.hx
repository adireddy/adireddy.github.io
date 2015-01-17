package arm.pixidemo.components.menu;

import js.Browser;
import arm.pixidemo.view.StageProperties;
import arm.pixidemo.notifications.internal.MenuNotification;
import pixi.widgets.menu.MenuItem;
import pixi.widgets.menu.PopoutMenu;

class MenuView extends GameComponentView {

	var _menu:PopoutMenu;
	var _menuItems:Array<String>;

	public function new(stage, ?container) {
		super(stage, container);
		_menuItems = ["Reset", "Screen Test", "Screen Guide", "Localisation", "Sprites", "Bunnys", "Sprite Sheets",
		"Coin Shower", "Typekit", "Audio", "Currency Format", "Server Request", "Console Bridge", "Reels",
		"Skeleton Animation", "Video", "Live Video", "Physics"]; //"Particles"
	}

	public function create() {
		_menu = new PopoutMenu(180, 40);
		var _menuItem:MenuItem;
		for (i in 0 ... _menuItems.length) {
			_menuItem = _menu.addItem(_menuItems[i], i);
			_menuItem.action.add(_menuClick);
		}
		gameStage.addChild(_menu);

		var menuID = Browser.getLocalStorage().getItem("menuID");
		if (menuID != null) _menuClick(Std.parseInt(menuID));
	}

	public function hide() {
		_menu.hide();
	}

	function _menuClick(id:Int) {
		if (id > 0) {
			Browser.getLocalStorage().setItem("menuID", "" + id);
			MenuNotification.click.dispatch(id);
		}
		else {
			MenuNotification.reset.dispatch();
		}
		if (id > 0) hide();
	}
}