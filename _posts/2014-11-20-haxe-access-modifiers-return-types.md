---
layout: post
title: Haxe default Access Modifiers and Return Value Type
---

Any developers out there coming from ActionScript or Java background like me, the default access modifiers and function return type in Haxe are a bit different. So let's have a quick look at them in classes, interfaces and externs.

**Classes:**

- Default access modifier is `private` if none specified.
- Default function return value type is `Void` if there is no return expression or if the return expression has no argument.

```haxe
package ;
class Test {

	//private variable
	var _count:Int;
	
	//constructor
	public function new() {
	
	}
	
	//private function
	//no return expression, so return value type is Void
	function _increaseCount() {
		_count++;
	}
	
	//private function
	//return expression has no argument, so return value type is Void
	function _resetCount() {
		if (_count < 10) return;
		_count = 0;
	}
}
```

**Interfaces and Externs:**

- Default access modifier is `public`.
- Specifying return value type is compulsory for functions. Failing so will result in compile time error `Type required for extern classes and interfaces`

```haxe
package ;
interface ITest {

	//public variable
	var count:Int;
	
	//public function
	function increaseCount():Void;
}
```

When implementing the above interface you need to specify `public` access modifier to variable `count` and function `increaseCount` as shown below. Failing so will result in the following compile time errors.

- `Field count should be public as requested by ITest`
- `Field increaseCount should be public as requested by ITest`.

```haxe
package ;
class Test implements ITest {

	public var count:Int = 10;
	
	public function increaseCount():Void {
		count++;
	}
}
```

Interesting fact from the official documentation about `protected`:

> Haxe has no `protected` keyword like in ActionScript, Java, etc. However, its `private` behavior is equal to those language's `protected` behavior, so in reality Haxe lacks in `private` behavior.
