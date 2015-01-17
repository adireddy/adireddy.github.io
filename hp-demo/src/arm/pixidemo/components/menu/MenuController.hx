package arm.pixidemo.components.menu;

class MenuController extends GameComponentController {

	var _view:MenuView;

	public function new(m, v, c, mainModel) {
		super(m, v, c, mainModel);
		_view = cast(v, MenuView);
	}

	override function _create() {
		_view.create();
	}

}