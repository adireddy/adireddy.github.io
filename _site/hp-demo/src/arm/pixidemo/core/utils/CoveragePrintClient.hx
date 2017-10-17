package arm.pixidemo.core.utils;

@IgnoreLogging
@IgnoreCover
class CoveragePrintClient extends mcover.coverage.client.PrintClient {

	public function new() {
		super();
	}

	override function printReport() {
		super.printReport();
		output += newline;
		var lines = output.split("\n");
		var s = "\n*************************";
		for(line in lines) {
			s += "\n>  " + line;
		}
		s += "\n*************************";
		trace(s);
	}
}