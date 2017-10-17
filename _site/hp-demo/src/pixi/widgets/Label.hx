package pixi.widgets;

import pixi.text.Text;
import pixi.primitives.Graphics;
import pixi.geom.Rectangle;
import pixi.display.DisplayObjectContainer;

class Label extends DisplayObjectContainer {

	public static inline var BACKGROUND_COLOUR:Int = 0xFFFFFF;
	public static inline var BORDER_COLOUR:Int = 0x333333;
	public static inline var TEXT_COLOUR:String = "#333333";
	public static inline var TEXT_SIZE:Int = 16;
	public static inline var PADDING:Int = 4;

	var _label:Text;
	var _rect:Rectangle;
	var _background:Graphics;
	var _style:Dynamic;

	public function new(label:String, width:Float, height:Float, ?style:Dynamic) {
		super();
		_style = (style != null) ? style : { font: (Label.TEXT_SIZE) + "px Arial", fill: Label.TEXT_COLOUR, align:"center" };
		_setupBackground(width, height);
		_setupLabel(width, height);
		setText(label);
	}

	function _setupBackground(width:Float, height:Float) {
		_rect = new Rectangle(0, 0, width, height);
		_background = new Graphics();

		_background.beginFill(Label.BORDER_COLOUR);
		_background.drawRect(_rect.x, _rect.y, _rect.width, _rect.height);
		_background.endFill();

		_background.beginFill(Label.BACKGROUND_COLOUR);
		_background.drawRect(_rect.x + 1, _rect.y + 1, _rect.width - 2, _rect.height - 2);
		_background.endFill();

		addChild(_background);
	}

	function _setupLabel(width:Float, height:Float) {
		_label = new Text("", _style);
		_label.anchor.x = 0.5;
		_label.x = width / 2;
		_label.y = Label.PADDING;
		addChild(_label);
	}

	public function setText(label:String) {
		_label.setText(label);
	}
}