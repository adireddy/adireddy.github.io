package arm.pixidemo.components;

import arm.mvc.components.ComponentController;
import arm.pixidemo.comms.DemoCommsController;
import arm.pixidemo.model.DemoModel;

class GameComponentController extends ComponentController {

	public var gameMainModel(default, default):DemoModel;
	public var gameComms(default, default):DemoCommsController;

	public function new(m, v, c, mm) {
		super(m, v, c, mm);
		if (mainModel != null) gameMainModel = cast(mainModel, DemoModel);
		if (comms != null) gameComms = cast(comms, DemoCommsController);
	}
}