package pixi.resources;

import haxe.Timer;
import howler.Howl;
import arm.pixidemo.resources.Sounds;
import pixi.geom.Rectangle;
import pixi.textures.Texture;
import pixi.loaders.ImageLoader;
import pixi.loaders.SpriteSheetLoader;
import msignal.Signal;
import pixi.loaders.JsonLoader;
import pixi.loaders.AssetLoader;

class Loader {

	public static var BASE_URL:String = "";
	public static var BUCKET_URL:String = "";
	public static var SCALE_URL:String = "";

	public static var assetLoadComplete:Signal0 = new Signal0();
	public static var assetsPackLoadComplete:Signal0 = new Signal0();
	public static var assetsProgress:Signal0 = new Signal0();
	public static var soundLoadComplete:Signal0 = new Signal0();
	public static var jsonLoadComplete:Signal1<String> = new Signal1(String);
	public static var spriteSheetLoadComplete:Signal0 = new Signal0();

	static var _sounds:Array<Object<String>>;
	static var _soundCount:Int;

	public static function loadAsset(url:String) {
		var assetLoader:AssetLoader = new AssetLoader([Loader.BASE_URL + url]);
		assetLoader.onComplete = function() { assetLoadComplete.dispatch(); };
		assetLoader.load();
	}

	public static function loadAssetsPack(urls:Array<String>) {
		var assetLoader:AssetLoader = new AssetLoader(urls);
		assetLoader.onComplete = function() {
			haxe.Timer.delay(function() { assetsPackLoadComplete.dispatch(); }, 20);
		};
		assetLoader.onProgress = function(loader:AssetLoader) {
			haxe.Timer.delay(function() { assetsProgress.dispatch(); }, 20);
		};
		assetLoader.load();
	}

	public static function loadSpriteSheetsPack(urls:Array<String>) {
		for (url in urls) loadSpriteSheet(url);
	}

	public static function loadSpriteSheet(url:String) {
		var spriteSheetLoader:SpriteSheetLoader = new SpriteSheetLoader(url);
		spriteSheetLoader.on("loaded", function() {
			var json:MultipackSpriteSheet = spriteSheetLoader.json;
			if (json.multipack) {
				var textures:Array<MultipackTexture> = json.textures;
				var imgCount:Int = textures.length;
				var imgLoadedCount:Int = 0;
				for (texture in textures) {
					var textureUrl:String = spriteSheetLoader.baseUrl + texture.meta.image;
					var image:ImageLoader = new ImageLoader(textureUrl);
					var frameData:Array<FrameData> = texture.frames;

					image.addEventListener("loaded", function() {
						if (imgLoadedCount == imgCount - 1) spriteSheetLoadComplete.dispatch();
						else imgLoadedCount++;
					});
					image.load();

					for (n in Reflect.fields(frameData)) {
						var frameData:FrameData = Reflect.field(frameData, n);
						var rect = frameData.frame;
						if (rect != null) {
							var textureSize:Rectangle = new Rectangle(rect.x, rect.y, rect.w, rect.h);
							var crop:Rectangle = textureSize.clone();
							var trim:Rectangle = null;

							if (frameData.trimmed) {
								var actualSize = frameData.sourceSize;
								var realSize = frameData.spriteSourceSize;
								trim = new Rectangle(realSize.x, realSize.y, actualSize.w, actualSize.h);
							}

							var txt:Texture = new Texture(image.texture.baseTexture, textureSize, crop, trim);
							Texture.addTextureToCache(txt, n);
						}
					}
				}
			}
			else {
				spriteSheetLoadComplete.dispatch();
			}
		});
		spriteSheetLoader.load();
	}

	public static function loadJson(url:String, ?bucket:Bool = false, ?scale:Bool = false) {
		var fullURL:String = Loader.BASE_URL + url;
		if (bucket) fullURL = Loader.BUCKET_URL + url;
		if (scale) fullURL = Loader.SCALE_URL + url;
		var jsonLoader:JsonLoader = new JsonLoader(fullURL);
		jsonLoader.on("loaded", function() { jsonLoadComplete.dispatch(jsonLoader.json); });
		jsonLoader.load();
	}

	public static function loadSoundsPack(sounds:Array<Object<String>>) {
		for (soundObj in sounds) {
			var options:HowlOptions = {};
			options.urls = [soundObj.get("url")];
			options.autoplay = false;
			options.onload = function() {
				soundLoadComplete.dispatch();
			};
			Reflect.setField(Sounds, soundObj.get("id"), new Howl(options));
		}
	}
}

typedef MultipackSpriteSheet = {
	var multipack:Bool;
	var textures:Array<MultipackTexture>;
}

typedef MultipackTexture = {
	var frames:Array<FrameData>;
	var meta:MetaData;
}

typedef FrameData = {
	var frame:Frame;
	var rotated:Bool;
	var trimmed:Bool;
	var format:String;
	var spriteSourceSize:SpriteSourceSize;
	var sourceSize:SourceSize;
}

typedef Frame = {
	var x:Float;
	var y:Float;
	var w:Float;
	var h:Float;
}

typedef SpriteSourceSize = {
	var x:Float;
	var y:Float;
	var w:Float;
	var h:Float;
}

typedef SourceSize = {
	var w:Float;
	var h:Float;
}

typedef MetaData = {
	var app:String;
	var version:String;
	var image:String;
	var format:String;
	var size:String;
	var scale:String;
	var smartupdate:String;
}