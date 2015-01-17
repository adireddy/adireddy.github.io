package arm.pixidemo.components;

import arm.pixidemo.model.DemoModel;
import arm.mvc.components.ComponentModel;

class GameComponentModel extends ComponentModel {

	public var gameMainModel(default, default):DemoModel;

	public function new(mm) {
		super(mm);
		gameMainModel = cast(mainModel, DemoModel);
	}
}