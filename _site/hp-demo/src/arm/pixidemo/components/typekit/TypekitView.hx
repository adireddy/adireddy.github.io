package arm.pixidemo.components.typekit;

import pixi.text.BitmapText;
import pixi.text.Text;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class TypekitView extends GameComponentView {

	var _yPosition:Float;
	var _fonts:Array<Text>;
	var _uiContainer:DisplayObjectContainer;
	var _bitmapText:BitmapText;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_fonts = [];
		_uiContainer = new DisplayObjectContainer();
		_yPosition = 0;

		_addFont("futura-pt", "#0000FF");
		_addFont("grafolita-script", "#9A2EFE");
		_addFont("salsbury", "#FF0000");
		_addFont("bree", "#0040FF");
		_addFont("dederon-sans-web", "#0B6138");

		_bitmapText = new BitmapText("bitmap font", {font:"60px Desyrel", align:"left"});
		_bitmapText.x = - _bitmapText.width / 2;
		_bitmapText.y = 200;
		_uiContainer.addChild(_bitmapText);

		gameContainer.addChild(_uiContainer);
		resize();
	}

	function _addFont(name:String, color:String) {
		var style:TextStyle = {};
		style.font = "30px " + name;
		style.fill = color;

		var fontText = new Text(name + " - Typekit Font ", style);
		fontText.anchor.set(0.5, 0.5);
		fontText.y = _yPosition;
		_fonts.push(fontText);
		_yPosition += 45;
		_uiContainer.addChild(fontText);
	}

	public function hide() {
		for (i in 0 ... _fonts.length) _uiContainer.removeChild(_fonts[i]);
		_uiContainer.removeChild(_bitmapText);
		gameContainer.removeChild(_uiContainer);
		_fonts = [];
		_yPosition = 0;
	}

	public function resize() {
		_uiContainer.x = StageProperties.screenWidth / 2;
		_uiContainer.y = (StageProperties.screenHeight - _uiContainer.height) / 2;
	}
}