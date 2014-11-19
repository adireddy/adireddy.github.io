---
layout: post
title: Haxe String Interpolation and StringTools.
---

String interpolation is common in many programming languages including modern languages like [Dart](https://www.dartlang.org/articles/idiomatic-dart/#strings-and-interpolation), [Swift](https://developer.apple.com/library/ios/documentation/swift/conceptual/Swift_Programming_Language/StringsAndCharacters.html), etc and I am glad that it is also available in Haxe.

String interpolation provides an intuitive way of formatting strings in place of string concatenation. It is a compile-time feature and has no impact on the runtime in Haxe. 

`$` sign should be used for placeholders and string should be enclosed in single-quote `'` character as shown in the example below.

```haxe
var winnings:Float = 10;
var bonus:Float = 2;
trace('Player won £$winnings'); //Player won £10
trace('Player won £${winnings + bonus} including bonus');
//Player won £12 including bonus
```

Next, StringTools is another useful class for advanced string manipulation and formatting. It's kept separate to keep the core String class light and this class can be used based on the application needs.

StringTools should be used as a static extension to the String class with `using` keyword as shown below.

```haxe
using StringTools;

class Main {
    static public function main() {
        var str = "apples and bananas";
        var newStr = str.replace("bananas", "grapes");
        trace(newStr); //apples and grapes
        trace(newStr.endsWith("grapes")); //true
    }
}

```

Definition of Static Extension as per the official documentation:

> A static extension allows pseudo-extending existing types without modifying their source. In Haxe this is achieved by declaring a static method with a first argument of the extending type and then bringing the defining class into context through `using`.
