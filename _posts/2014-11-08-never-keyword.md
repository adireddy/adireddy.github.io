---
layout: post
title: Haxe "never" and "inline" keywords.
---

There is no “const” keyword in Haxe to define constants like in ActionScript.

So “never” keyword can be used to define constants/read-only variables as shown below.

```haxe
public var MAX_COUNT(default, never):Int = 100;
```
If you try to set the value of MAX_COUNT, compiler will throw an error saying “_Cannot access field or identifier MAX_COUNT for writing_”.

For static variables and functions “inline” keyword can be used as a powerful optimization tool.
	
The following is a way to define static constant/read-only variables using “inline”.

```haxe
public static inline var MAX_COUNT:Int = 100;
```

“inline” should be carefully used with functions as not all functions will be ideal candidates for optimization.

```haxe
public static inline function stageCenter(sw:Float, iw:Float):Float {
    return (sw - iw) / 2;
}
```

At run-time the function call

```haxe
var pos = stageCenter(800, 100);
```

will be translated to the following by eliminating the function call.

```haxe
var pos = (800 - 100) / 2;
```

As per the official documentation,

  > It is not always easy to judge if a function is ideal for inline. Short functions that have no writing expressions (such as a = value) are usually a good choice, but even more complex functions can be candidates. However, in some cases inlining can actually be detrimental to performance, e.g. because the compiler has to create temporary variables for complex expressions.

Note that “inline” can be totally disabled by passing compiler argument _--no-inline_.

<a href="https://twitter.com/share" class="twitter-share-button" data-via="adireddy">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

<div id="disqus_thread"></div>
<script type="text/javascript">
    var disqus_shortname = 'adireddy';
    var disqus_url = 'http://adireddy.github.io{{ page.url }}';

    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
<a href="http://disqus.com" class="dsq-brlink">blog comments powered by <span class="logo-disqus">Disqus</span></a>