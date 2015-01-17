package test;

import buddy.*;
using buddy.Should;

class DemoTest extends BuddySuite implements Buddy {
    public function new() {
        
        describe("Sample Test Suite", {

            var test1 = 0;
            var test2 = false;

            before({
                test1 = 100;
            });

            it("should be 100", {
                test1.should.be(100);
            });

            it("should be true", {
                test2.should.be(true);
            });

            //after each it
            after({
                test2 = true;
            });
        });
    }
}