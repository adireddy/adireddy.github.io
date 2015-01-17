package arm.pixidemo.components.screenguide;

import pixi.widgets.Label;
import pixi.display.DisplayObjectContainer;
import pixi.primitives.Graphics;
import arm.pixidemo.view.StageProperties;

class ScreenGuideView extends GameComponentView {

	var _labels:Array<Label>;
	var _crosses:Array<DisplayObjectContainer>;
	var _labelContainer:DisplayObjectContainer;
	var _screenSizeLabel:Label;

	var _screenCrossTopLeft:DisplayObjectContainer;
	var _screenCrossTopRight:DisplayObjectContainer;
	var _screenCrossBottomRight:DisplayObjectContainer;
	var _screenCrossBottomLeft:DisplayObjectContainer;

	var _bucketCrossTopLeft:DisplayObjectContainer;
	var _bucketCrossTopRight:DisplayObjectContainer;
	var _bucketCrossBottomRight:DisplayObjectContainer;
	var _bucketCrossBottomLeft:DisplayObjectContainer;

	var PADDING(default, never):Int = 2;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_labels = [];
		_crosses = [];

		var screenSizeMessage:String = "Screen size - width:" + StageProperties.screenWidth + " height:" + StageProperties.screenHeight;
		var bucketSizeMessage:String = "Bucket size - width:" + StageProperties.bucketWidth + " height:" + StageProperties.bucketHeight;
		var pixelRatioMessage:String = "Pixel Ratio - used:" + StageProperties.pixelRatio + " actual:" + StageProperties.actualPixelRatio;

		_labelContainer = new DisplayObjectContainer();
		_screenSizeLabel = _addLabel(screenSizeMessage, 0, 0, 300, 30);
		_addLabel(bucketSizeMessage, 0, 30, 300, 30);
		_addLabel(pixelRatioMessage, 0, 60, 300, 30);
		gameContainer.addChild(_labelContainer);

		_labelContainer.x = (StageProperties.screenWidth - 300) / 2;
		_labelContainer.y = (StageProperties.screenHeight - 300) / 2;

		_screenCrossTopLeft = _addCross(0xFF00FF, PADDING, PADDING);
		_screenCrossTopRight = _addCross(0xFF00FF, StageProperties.screenWidth - PADDING, PADDING);
		_screenCrossBottomLeft = _addCross(0xFF00FF, 2, StageProperties.screenHeight - PADDING);
		_screenCrossBottomRight = _addCross(0xFF00FF, StageProperties.screenWidth - PADDING, StageProperties.screenHeight - PADDING);

		_bucketCrossTopLeft = _addCross(0x2E64FE, StageProperties.screenX, StageProperties.screenY);
		_bucketCrossTopRight = _addCross(0x2E64FE, StageProperties.screenX + StageProperties.bucketWidth, StageProperties.screenY);
		_bucketCrossBottomRight = _addCross(0x2E64FE, StageProperties.screenX + StageProperties.bucketWidth, StageProperties.screenY + StageProperties.bucketHeight);
		_bucketCrossBottomLeft = _addCross(0x2E64FE, StageProperties.screenX, StageProperties.screenY + StageProperties.bucketHeight);
	}

	function _addCross(colour:Int, x:Float, y:Float):DisplayObjectContainer {
		var thickness = 6;
		var size = 50;
		var graphics = new Graphics();
		graphics.beginFill(colour);
		graphics.drawRect(-(thickness / 2), -(size / 2), thickness, size);
		graphics.drawRect(-(size / 2), -(thickness / 2), size, thickness);
		graphics.endFill();

		var container:DisplayObjectContainer = new DisplayObjectContainer();
		container.addChild(graphics);
		container.x = x;
		container.y = y;

		_crosses.push(container);
		gameContainer.addChild(container);
		return container;
	}

	function _addLabel(message:String, x:Float, y:Float, width:Float, height:Float):Label {
		var label = new Label(message, width, height);
		label.x = x;
		label.y = y;

		_labels.push(label);
		_labelContainer.addChild(label);

		return label;
	}

	public function resize() {
		var screenX:Float = StageProperties.screenX;
		var screenY:Float = StageProperties.screenY;
		var screenWidth:Float = StageProperties.screenWidth;
		var screenHeight:Float = StageProperties.screenHeight;

		_bucketCrossTopLeft.x = screenX;
		_bucketCrossTopLeft.y = screenY;
		_bucketCrossTopRight.x = StageProperties.screenX + StageProperties.bucketWidth;
		_bucketCrossTopRight.y = screenY;
		_bucketCrossBottomRight.x = StageProperties.screenX + StageProperties.bucketWidth;
		_bucketCrossBottomRight.y = StageProperties.screenY + StageProperties.bucketHeight;
		_bucketCrossBottomLeft.x = screenX;
		_bucketCrossBottomLeft.y = StageProperties.screenY + StageProperties.bucketHeight;

		_screenCrossTopRight.x = screenWidth;
		_screenCrossBottomLeft.y = screenHeight;
		_screenCrossBottomRight.x = screenWidth;
		_screenCrossBottomRight.y = screenHeight;

		_labelContainer.x = (StageProperties.screenWidth - 300) / 2;
		_labelContainer.y = (StageProperties.screenHeight - 300) / 2;

		var screenSizeMessage:String = "Screen size - width:" + StageProperties.screenWidth + " height:" + StageProperties.screenHeight;
		_screenSizeLabel.setText(screenSizeMessage);
	}

	public function hide() {
		for (i in 0 ... _labels.length) {
			var label = _labels[i];
			_labelContainer.removeChild(label);
			label = null;
		}

		for (i in 0 ... _crosses.length) {
			var cross = _crosses[i];
			gameContainer.removeChild(cross);
			cross = null;
		}

		_screenSizeLabel = null;
		_crosses = null;
		_labels = null;
	}
}