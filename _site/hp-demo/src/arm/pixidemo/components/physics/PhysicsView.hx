package arm.pixidemo.components.physics;

import p2.shapes.Circle;
import pixi.primitives.Graphics;
import p2.shapes.Plane;
import p2.objects.Body;
import p2.shapes.Rectangle;
import p2.world.World;
import pixi.display.DisplayObjectContainer;
import arm.pixidemo.view.StageProperties;

class PhysicsView extends GameComponentView {

	var _p2World:World;
	var _p2container:DisplayObjectContainer;
	var _p2graphics:Graphics;
	var _boxBody:Body;

	var _p2Circle:Graphics;
	var _circleShape:Circle;
	var _p2Sensor:Graphics;
	var _sensorShape:Circle;
	var _circleBody:Body;
	var _sensorBody:Body;

	public function new(stage, ?container) {
		super(stage, container);
	}

	public function show() {
		_p2World = new World({ gravity:[0, 0] });

		var boxShape:Rectangle = new Rectangle(2, 1);
		_boxBody = new Body({
			mass: 1,
			position:[0, 2],
			angularVelocity: 1
		});

		_boxBody.addShape(boxShape);
		_p2World.addBody(_boxBody);

		var planeShape:Plane = new Plane();
		var planeBody:Body = new Body({ position:[0, -1] });
		planeBody.addShape(planeShape);
		_p2World.addBody(planeBody);

		var zoom:Int = 100;

		_p2container = new DisplayObjectContainer();
		gameStage.addChild(_p2container);

		_p2container.position.x = StageProperties.screenWidth / 2;
		_p2container.position.y = StageProperties.screenHeight / 2;
		_p2container.scale.x = zoom;
		_p2container.scale.y = -zoom;

		_p2graphics = new Graphics();
		_p2graphics.beginFill(0xFF0000);
		_p2graphics.drawRect(-boxShape.width / 2, -boxShape.height / 2, boxShape.width, boxShape.height);
		_p2container.addChild(_p2graphics);

		_circleShape = new Circle(1);
		_circleBody = new Body({ mass: 1 });
		_circleBody.damping = 0;
		_circleBody.addShape(_circleShape);
		_p2World.addBody(_circleBody);

		_p2Circle = new Graphics();
		_p2Circle.beginFill(0x003366);
		_p2Circle.drawCircle(0, 0, _circleShape.radius);
		_p2container.addChild(_p2Circle);
	}

	public function update(elapsedTime:Float) {
		_p2World.step(1 / 60);

		_p2graphics.position.x = _boxBody.position[0];
		_p2graphics.position.y = _boxBody.position[1];
		_p2graphics.rotation = _boxBody.angle;
	}

	public function hide() {
		gameStage.removeChild(_p2container);
		_p2container = null;
	}
}