(function (console) { "use strict";
var arm_cohere_workers_BunnymarkWorker = function() { };
arm_cohere_workers_BunnymarkWorker.prototype = {
	_messageHandler: function(event) {
		var _g = event.data.name;
		switch(_g) {
		case "INIT":
			var data;
			var bunnyData = [];
			var _g1 = 0;
			while(_g1 < 100) {
				var i = _g1++;
				data = { };
				data.speedX = Math.random() * 5;
				data.speedY = Math.random() * 5 - 3;
				data.anchor = { x : 0, y : 1};
				data.alpha = 0.3 + Math.random() * 0.7;
				data.scale = { x : 0.5 + Math.random() * 0.5, y : 0.5 + Math.random() * 0.5};
				data.rotation = Math.random() - 0.5;
				bunnyData.push(data);
			}
			self.postMessage({ name : "INIT", value : bunnyData});
			break;
		case "MOVE":
			var data1 = event.data.value;
			if(data1.position.x > data1.maxX) {
				data1.speedX *= -1;
				data1.position.x = data1.maxX;
			} else if(data1.position.x < 0) {
				data1.speedX *= -1;
				data1.position.x = 0;
			}
			if(data1.position.y > data1.maxY) {
				data1.speedY *= -0.85;
				data1.position.y = data1.maxY;
				if(Math.random() > 0.5) data1.speedY -= Math.random() * 6;
			} else if(data1.position.y < 0) {
				data1.speedY = 0;
				data1.position.y = 0;
			}
			self.postMessage({ name : "MOVE", value : data1});
			break;
		}
	}
};
self.onmessage = arm_cohere_workers_BunnymarkWorker.prototype._messageHandler;
arm_cohere_workers_BunnymarkWorker.BLOCK_AMOUNT = 100;
})(typeof console != "undefined" ? console : {log:function(){}});
