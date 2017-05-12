// Generated by Haxe 3.4.2
(function () { "use strict";
var Main = function() {
	var stage = window.document.getElementById("stage");
	var mc = new Hammer.Manager(stage);
	var rotate = new Hammer.Rotate();
	mc.add(rotate);
	mc.on("rotate",function(e) {
		var rotation = Math.round(e.rotation);
		stage.style.transform = "rotate(" + rotation + "deg)";
	});
};
Main.main = function() {
	new Main();
};
Main.main();
})();

//# sourceMappingURL=hammer-demo.js.map