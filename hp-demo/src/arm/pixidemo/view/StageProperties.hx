package arm.pixidemo.view;

class StageProperties {

	public static var actualPixelRatio:Float;
	public static var pixelRatio:Float;
	public static var screenWidth:Float;
	public static var screenHeight:Float;
	public static var bucketWidth:Float;
	public static var bucketHeight:Float;
	public static var bucketOverlapType:String;
	public static var screenX:Float;
	public static var screenY:Float;
	public static var orientation:String;

	public inline static var LANDSCAPE:String = "LANDSCAPE";
	public inline static var PORTRAIT:String = "PORTRAIT";

	public inline static var BUCKET_OVERLAP_FULL:String = "BUCKET_OVERLAP_FULL";
	public inline static var BUCKET_OVERLAP_HORIZONTAL:String = "BUCKET_OVERLAP_HORIZONTAL";
	public inline static var BUCKET_OVERLAP_VERTICAL:String = "BUCKET_OVERLAP_VERTICAL";
}
