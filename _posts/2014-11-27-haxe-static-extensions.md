---
layout: post
title: Haxe Static Extensions
---

Station extensions in Haxe can be used to mimic multiple inheritance similar to mixins in Javascript. It's a powerful feature and should be used carefully.

[StringTools](http://api.haxe.org/StringTools.html) class is a good example of station extension. Refer to my [earlier post](http://adireddy.github.io/2014/11/17/haxe-string-interpolation-stringutils/) for more info on that.

**Quick Example:**

```haxe
package ;

class ArrayUtils {
	public static inline function last<T>(a:Array<T>):T {
		return a[a.length - 1];
	}
}
```
`using` keyword brings the defined class into the context.

```haxe
package ;

using ArrayUtils;

class Example {

	public function new() {
		var arr:Array<Int> = [100, 200, 500];
		trace(arr.last()); //500
	}
}
```

**Another example with multiple static extensions:**

```haxe
package ;

class ArrayUtils2 {
	public static inline function first<T>(a:Array<T>):T {
		return a[0];
	}
}
```

```haxe
package ;

using ArrayUtils;
using ArrayUtils2;

class Example {

	public function new() {
		var arr:Array<Int> = [100, 200, 500];
		trace(arr.last());  //500
		trace(arr.first()); //100
	}
}
```

A few things to note:

- If the same method is defined in multiple static extension classes, `using` expressions are checked from bottom to top. For example if the method `last` is also defined in `ArrayUtils2` then it will take precedence as `ArrayUtils2` is the bottom class in the above example.
- Built in class fields would take priority over the static extension fields. For example if you define `toString` method in `ArrayUtils` class above it wouldn't work as `toString` is a built in array method and it takes precedence.
- Compiler metadata `@:noUsing` can be used in static extension class if you want to omit any field being included in the context. Check the example below.

```haxe
package ;

class ArrayUtils {
	public static inline function last<T>(a:Array<T>):T {
		return a[a.length - 1];
	}

	@:noUsing
	public static inline function second<T>(a:Array<T>):T {
		return a[1];
	}
}
```

You can't use the method `second` as the compiler will not include it in the context when used.