package arm.pixidemo.components.localisation;

import pixi.text.Text;
import pixi.display.Sprite;
import pixi.resources.Loader;
import pixi.textures.Texture;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class LocalisationView extends GameComponentView {

	var _flag:Sprite;
	var _sharedTextField:Text;
	var _bucketTextField:Text;
	var _dynamicTextField:Text;
	var _container:DisplayObjectContainer;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_container = new DisplayObjectContainer();

		var sharedMessage:String = _messages.getMessage("SHARED_MESSAGE");
		var bucketMessage:String = _messages.getMessage("BUCKET_MESSAGE");
		var dynamicMessage:String = _messages.getMessage("DYNAMIC_MESSAGE", ["SUBSTITUTION"]);

		var sharedTextLayout = _layout.getLayout("SHARED_MESSAGE_TEXT");
		var sharedTextStyle:TextStyle = {};
		sharedTextStyle.font = sharedTextLayout.size + "px " + sharedTextLayout.font;
		sharedTextStyle.fill = sharedTextLayout.color;
		_sharedTextField = new Text(sharedMessage, sharedTextStyle);

		var bucketTextLayout = _layout.getLayout("BUCKET_MESSAGE_TEXT");
		var bucketTextStyle:TextStyle = {};
		bucketTextStyle.font = bucketTextLayout.size + "px " + bucketTextLayout.font;
		bucketTextStyle.fill = bucketTextLayout.color;
		_bucketTextField = new Text(bucketMessage, bucketTextStyle);

		var dynamicTextLayout = _layout.getLayout("DYNAMIC_MESSAGE_TEXT");
		var dynamicTextStyle:TextStyle = {};
		dynamicTextStyle.font = dynamicTextLayout.size + "px " + dynamicTextLayout.font;
		dynamicTextStyle.fill = dynamicTextLayout.color;
		_dynamicTextField = new Text(dynamicMessage, dynamicTextStyle);

		_sharedTextField.anchor.set(0.5, 0.5);
		_bucketTextField.anchor.set(0.5, 0.5);
		_dynamicTextField.anchor.set(0.5, 0.5);
		_bucketTextField.y = 40;
		_dynamicTextField.y = 80;

		var texture:Texture = Texture.fromImage(Loader.SCALE_URL + "localisation/images/flag.png");
		_flag = new Sprite(texture);
		_flag.anchor.x = 0.5;
		_flag.y = _dynamicTextField.y + 30;
		_applyScale(_flag);

		_container.addChild(_sharedTextField);
		_container.addChild(_bucketTextField);
		_container.addChild(_dynamicTextField);
		_container.addChild(_flag);

		gameContainer.addChild(_container);
		resize();
	}

	public function hide() {
		gameContainer.removeChild(_container);
		_container.removeChild(_flag);
		_container.removeChild(_sharedTextField);
		_container.removeChild(_bucketTextField);
		_container.removeChild(_dynamicTextField);
		_container = null;
		_flag = null;
		_sharedTextField = null;
		_bucketTextField = null;
		_dynamicTextField = null;
	}

	public function resize() {
		_container.x = StageProperties.screenWidth / 2;
		_container.y = (StageProperties.screenHeight - _container.height) / 2;
	}
}