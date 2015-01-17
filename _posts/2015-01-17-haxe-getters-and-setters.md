---
layout: post
title: Haxe Getters and Setters
description: ""
modified: 2015-01-17
category: [haxe, getters, setters]
tags: [haxe, getters, setters]
imagefeature: 
comments: true
share: true
featured: false
---

Haxe has a unique way of using getter/setter functions and it can be sometimes confusing for developers coming from other languages.

I recommend to read the official [documentation](http://haxe.org/manual/class-field-property-rules.html) as well.

___

**Getter and Setter**

You can define a variable to have getter and setter functions using `get` and `set` keywords as shown below.

The functions names should be prefixed with `get_` variable name and `set_` variable name.

{% highlight haxe %}
public var amount(get, set):Float;
var _amount:Float = 100;

function get_amount():Float {
	return _amount * 10;
}

function set_amount(value:Float) {
	return _amount = value;
}
{% endhighlight %}

The most important thing to note here is you cannot access the physical variable inside your getter and setter functions. You get the error `This field cannot be accessed because it is not a real variable` if you try to access `amount` inside `get_amount` and `set_amount` functions.

To access physical variable you need to add metadata `@:isVar` in front of the variable `amount`.

{% highlight haxe %}
@:isVar public var amount(get, set):Float;

function get_amount():Float {
	return amount;
}

function set_amount(value:Float) {
	return amount = value;
}
{% endhighlight %}

___

**Getter (read-only) or Setter (write-only)**

By using `null` in place of `set` you can mark the variable read-only with getter function as shown below.

{% highlight haxe %}
public var language(get, null):String;

function get_language():String {
	return language;
}
{% endhighlight %}

Similarly by using `null` in place of `get` you can mark the variable write-only with  setter function as shown below.

{% highlight haxe %}
public var language(null, set):String;

function set_language(value:String):String {
	return language = value;
}
{% endhighlight %}

The variable can still be accessed for reading and writing within the class but not from outside.


___

**Setter with default Getter**

By using `default` in place of `get` you can mark the variable to return it's value when accessed and still have a setter function.

{% highlight haxe %}
public var language(default, set):String;

function set_language(value):String {
	return language = value;
}
{% endhighlight %}
___

**Quick Reference**

{% highlight haxe %}

//Read and write access from anywhere but only exception is the physical variable cannot be accessed within getter and setter functions without metadata @:isVar
public var x(get, set):Float;

//Can be read from anywhere, modified only within the class
public var x(default, null):Float;

//Can be set from anywhere, modified only within the class
public var x(null, default):Float;

//Read-only from anywhere even within the same class
public var x(get, never):Float;

//Read and write access from anywhere, but the setter needs a method
public var x(default, set):Float;

//not allowed - unsupported property combination
public var x(get, default):Float;

{% endhighlight %}