---
layout: post
title: Haxe "never" and "inline" keywords
description: ""
modified: 2014-11-08
category: [haxe, keywords]
tags: [haxe, never, inline, keywords]
imagefeature: 
comments: true
share: true
featured: true
---

There is no `const` keyword in Haxe to define constants like in ActionScript.

So `never` keyword can be used to define constants/read-only variables as shown below.

{% highlight haxe %}
public var MAX_COUNT(default, never):Int = 100;
{% endhighlight %}
If you try to set the value of MAX_COUNT, compiler will throw an error saying “_Cannot access field or identifier MAX_COUNT for writing_”.

For static variables and functions `inline` keyword can be used as a powerful optimization tool.
	
The following is a way to define static constant/read-only variables using “inline”.

{% highlight haxe %}
public static inline var MAX_COUNT:Int = 100;
{% endhighlight %}

`inline` should be carefully used with functions as not all functions will be ideal candidates for optimization.

{% highlight haxe %}
public static inline function stageCenter(sw:Float, iw:Float):Float {
    return (sw - iw) / 2;
}
{% endhighlight %}

At run-time the function call

{% highlight haxe %}
var pos = stageCenter(800, 100);
{% endhighlight %}

will be translated to the following by eliminating the function call.

{% highlight haxe %}
var pos = (800 - 100) / 2;
{% endhighlight %}

As per the official documentation,

  > It is not always easy to judge if a function is ideal for inline. Short functions that have no writing expressions (such as `a = value`) are usually a good choice, but even more complex functions can be candidates. However, in some cases inlining can actually be detrimental to performance, e.g. because the compiler has to create temporary variables for complex expressions.

Note that `inline` can be totally disabled by passing compiler argument _`--no-inline`_.