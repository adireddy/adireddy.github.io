package pixi.widgets.menu;

import motion.easing.Cubic;
import motion.Actuate;
import pixi.primitives.Graphics;
import pixi.geom.Rectangle;
import arm.pixidemo.view.StageProperties;
import pixi.display.DisplayObjectContainer;

class PopoutMenu extends DisplayObjectContainer {

	public static inline var STATE_SHOW:String = "STATE_SHOW";
	public static inline var STATE_HIDE:String = "STATE_HIDE";

	var _container:DisplayObjectContainer;
	var _itemWidth:Float;
	var _itemHeight:Float;
	var _state:String;
	var _menu:Menu;
	var _openButton:Graphics;

	public function new(itemWidth:Float, itemHeight:Float) {
		super();

		_container = new DisplayObjectContainer();
		_itemWidth = itemWidth;
		_itemHeight = itemHeight;
		_state = PopoutMenu.STATE_HIDE;

		_setupOpenButton();
		_setupMenu(itemWidth, itemHeight);

		addChild(_container);
	}

	function _setupOpenButton() {
		var buttonRect = new Rectangle(0, 0, 15, 60);
		var hitRect = new Rectangle(0, 0, 15, 60);

		_openButton = new Graphics();
		_openButton.beginFill(0x21610B);
		_openButton.drawRect(buttonRect.x, buttonRect.y, buttonRect.width, buttonRect.height);
		_openButton.endFill();
		_openButton.hitArea = hitRect;
		_openButton.interactive = true;
		_openButton.touchstart = function(data:InteractionData) {};
		_openButton.touchend = _toggleShow;
		_openButton.mouseup = _toggleShow;
		_container.addChild(_openButton);
	}

	function _setupMenu(itemWidth:Float, itemHeight:Float) {
		_menu = new Menu(itemWidth, itemHeight);
		_menu.x = -itemWidth;
		_container.addChild(_menu);
	}

	function _toggleShow(data:InteractionData) {
		if (_state == PopoutMenu.STATE_SHOW) hide();
		else show();
	}

	public function show() {
		_state = PopoutMenu.STATE_SHOW;
		Actuate.tween(_container, 0.3, { x: _itemWidth }).ease(Cubic.easeInOut).onComplete(_enableMenuItems);
	}

	public function hide() {
		_state = PopoutMenu.STATE_HIDE;
		Actuate.tween(_container, 0.3, { x: 0 }).ease(Cubic.easeInOut).onComplete(_disableMenuItems);
	}

	public function addItem(label:String, ?data:Dynamic):MenuItem {
		var menuItem:MenuItem = _menu.addItem(label, data);
		_updateOpenButtonPosition();
		return menuItem;
	}

	function _enableMenuItems() {
		_menu.enableMenuItems();
	}

	function _disableMenuItems() {
		_menu.disableMenuItems();
	}

	function _updateOpenButtonPosition() {
		var openButtonPosition = Math.floor((_menu.getItems().length - 1) / 2) * _itemHeight;

		if (openButtonPosition > StageProperties.screenHeight / 2) {
			openButtonPosition = StageProperties.screenHeight / 2;
		}
		_openButton.y = openButtonPosition;
	}

	public function resize() {
		x = (StageProperties.bucketWidth - StageProperties.screenWidth) / 2;
		y = (StageProperties.bucketHeight - StageProperties.screenHeight) / 2;
		_updateOpenButtonPosition();
	}
}