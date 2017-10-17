package arm.pixidemo.components.video;

//import js.Lib;
//import kalturhaxe.KalturaHaxe;
import pixi.display.Sprite;
import pixi.textures.VideoTexture;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class VideoView extends GameComponentView {

	var _vidTexture:VideoTexture;
	var _vidSprite:Sprite;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_vidTexture = VideoTexture.fromUrl("assets/testVideo.mp4");
		_vidSprite = new Sprite(_vidTexture);
		_vidSprite.anchor.set(0.5, 0.5);
		gameContainer.addChild(_vidSprite);
		resize();

		//var app = new KalturaHaxe(1839131, "http://cdnapi.kaltura.com/p/1839131/sp/183913100/embedIframeJs/uiconf_id/26907121/partner_id/1839131");
		//app.createConnection("3c428cc2e8b0c5c26f7ad435ec78e8b8", test);
	}

	/*function test(succcess:Bool, response:String) {
		trace(succcess, response);
		js.Lib.eval(response);
	}*/

	public function hide() {
		_vidTexture.destroy();
		gameContainer.removeChild(_vidSprite);
	}

	public function resize() {
		_vidSprite.x = StageProperties.screenWidth / 2;
		_vidSprite.y = StageProperties.screenHeight / 2;
	}
}