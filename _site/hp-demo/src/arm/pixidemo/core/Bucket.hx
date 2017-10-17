package arm.pixidemo.core;

typedef Buckets = {
	var landscape:Array<BucketSize>;
	var portrait:Array<BucketSize>;
}

typedef BucketSize = {
	var width:Int;
	var height:Int;
}

class Bucket {}