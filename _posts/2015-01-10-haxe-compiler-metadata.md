---
layout: post
title: Haxe Compiler Metadata
description: ""
modified: 2015-01-10
category: [haxe, compiler, metadata]
tags: [haxe, compiler, metadata]
imagefeature: 
comments: true
share: true
featured: true
---

Haxe compiler metadata can be really handy to get specific behavior or to tweak the language based on your needs.

You can get the full list of supported compiler flags by running `haxe --help-metas`.

It's a big list and the following are some of my favourites.

___

`@:overload` - I use this a lot when writing externs where you can overload fucntion paramater declarations and return type. The first one that is matched will be used.

{% highlight haxe %}
@:overload(function(shape:Rectangle):GraphicsData {})
@:overload(function(shape:Ellipse):GraphicsData {})
@:overload(function(shape:Polygon):GraphicsData {})
function drawShape(shape:Circle):GraphicsData;
{% endhighlight %}
___

`@:final` - When you want to mark the class as final.

{% highlight haxe %}
@:final
class MyClass {}
{% endhighlight %}

If you try to extend `MyClass` you will get compile time error `Cannot extend a final class`.

___

`@:optional` - When you want to declare optional fields in `typedef`.

{% highlight haxe %}
typedef TextField = {
	var text:String;
	@:optional var font:String;
}
{% endhighlight %}
___

`@:publicFields` - When you want to change the default visibility of the whole class and it's sub classes from `private` to `public`. I find this useful for static classes.

{% highlight haxe %}
@:publicFields
class MyClass {
	static inline var width:Float = 1024;
	static inline var height:Float = 768;
	static inline var ratio:Float = 1;
}
{% endhighlight %}
___

All of the above are generic metadata and can be used across platforms and there are many more generic and platform specific metadata you may find useful for your specific needs so explore and please post in the comments section if you find anything interesting.

**Update (14 Jan 2015)**: Another JavaScript specific metadatata which I find useful is `@:expose`. It can be used on any class to make it available/accessible from the window object. This is useful when you want to expose any of your haxe classes to another library via window object.
