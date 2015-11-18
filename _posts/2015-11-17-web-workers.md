---
layout: post
title: Web Workers
description: "Multi-threading in JavaScript"
modified: 2015-11-17
category: [haxe, web, workers, multi-threading, javascript]
tags: [haxe, web, workers, multi-threading, javascript]
imagefeature: 
comments: true
share: true
featured: false
---

I recently started exploring web workers in JavaScript and found them really useful to help boost the general performance of web apps.

**The Problem**

JavaScript apps are single threaded and can be unresponsive or degrade performance if the app has code that blocks for a long duration. The consequences can be unpleasant page freezes where the user can’t interact with your application.

**Advantages of Web workers**

Web workers handle pure data, which makes them especially suitable for JavaScript code that takes a long time to execute.

*To summarize*:

- Web workers operate independently of the main browser UI thread.
- Ideal for running computationally expensive tasks in background threads without affecting the UI thread.
- Parallel processing for better application performance.
- Web workers live in a restricted and thread-safe environment.

**Browser Support**

Basic web worker support is good across all browsers but I do not recommend using shared web workers as the support is very limited.

*Basic web worker support*:

- Safari Mobile 5.1
- Android 4.4
- Chrome 4
- IE 10

You can check upto date support info [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

**Limitations**

Worker thread **DO NOT** have access to:

- DOM
- Window object
- Document object
- Parent object
- Global variables or functions in main page

**Ideal Candidates/Use cases**

The most important thing is to identify and isolate hot spots in your code so that they can me moved to web workers for parallel execution provided they do not have any limitations mentioned above.

**Example**

The following is a sample web worker which loads and parses JSON file.

{% highlight haxe %}
package webworkers;

import haxe.Json;
import js.html.XMLHttpRequest;

class LoadJson {

	var _data:Dynamic;

	public static function __init__() {
		untyped __js__("self.onmessage = webworkers_LoadJson.prototype._messageHandler");
	}

	function _messageHandler(event) {
		switch(event.data) {
			case "load":
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (request.readyState == 4) {
						if (request.status == 200) {
							_data = Json.parse(request.responseText);
							untyped __js__("self").postMessage(_data);
						}
					}
				}

				request.open("GET", "../resources/checkstyle-config.json", true);
				request.send(null);

			default:
				for (i in 0 ... _data.checks.length) {
					if (_data.checks[i].type == event.data) {
						untyped __js__("self").postMessage(_data.checks[i]);
						break;
					}
				}
		}
	}
}
{% endhighlight %}

Add the following to your **build.hxml** to generate worker script file:

{% highlight haxe %}
webworkers.LoadJson
-js js/LoadJson.js
{% endhighlight %}

The following sample shows how to load and communicate with the worker script.

{% highlight haxe %}
package webworkers;

import js.html.Worker;

class Main {

	var _worker:Worker;

	public function new() {
		_worker = new js.html.Worker("js/LoadJson.js");
		_worker.onmessage = _processWorkerJsonData;
		_worker.postMessage("load");
	}

	function _processWorkerJsonData(e) {
		trace(e.data);
	}

	static function main() {
		new Main();
	}
}
{% endhighlight %}

Note that web workers are not automatically garbage collected and will live until you manually terminate them.

`_worker.terminate();`

You can also terminate the worker by calling `close()` method on itself.

**References**

- [w3.org](http://www.w3.org/TR/workers/)
- [w3schools](http://www.w3schools.com/html/html5_webworkers.asp)
- [mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

You can check my [repo](https://github.com/adireddy/playground/tree/master/src/webworkers) for more samples.

Any questions or comments, please post them in the comments section below. Thanks for reading.