package arm.pixidemo.components.livevideo;

//import js.Lib;
//import kalturhaxe.KalturaHaxe;
import js.html.Element;
import js.html.VideoElement;
import js.Browser;
import arm.pixidemo.view.StageProperties;

class LiveVideoView extends GameComponentView {

	var _videoContainer:Element;
	var _videoElement:VideoElement;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_videoContainer = Browser.document.createElement("div");
		Browser.document.body.appendChild(_videoContainer);
		_videoElement = Browser.document.createVideoElement();
		_videoElement.src = "http://10.194.193.247:1935/live/myStream/playlist.m3u8";
		_videoElement.style.position = "absolute";
		_videoElement.style.top = "100px";
		_videoElement.style.right = "220px";
		_videoElement.width = 640;
		_videoElement.height = 480;
		_videoElement.autoplay = true;

		_videoContainer.appendChild(_videoElement);

		//var app = new KalturaHaxe(1839131, "http://cdnapi.kaltura.com/p/1839131/sp/183913100/embedIframeJs/uiconf_id/26907121/partner_id/1839131");
		//app.createConnection("3c428cc2e8b0c5c26f7ad435ec78e8b8", test);
	}

	/*function test(succcess:Bool, response:String) {
		trace(succcess, response);
		js.Lib.eval(response);
	}*/

	public function hide() {
		_videoContainer.remove();
	}

	public function resize() {

	}
}