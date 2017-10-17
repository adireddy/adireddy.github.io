/**
 * Created by Adi Mora on 10/10/2014.
 */

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        exec: {
            haxelib: {
                command: "#yes '' | haxelib setup"
            },
            libs: {
                command: "haxelib install actuate || true " +
                    "&& haxelib install msignal || true" +
                    "&& haxelib install buddy || true" +
                    "&& haxelib install mconsole || true" +
                    "&& haxelib install mcover || true" +
                    "&& haxelib install haxelint || true" +
                    "&& haxelib install stats.js.hx || true" +
                    "&& haxelib remove howlerjs || true" +
                    "&& haxelib install howlerjs || true" +
                    "&& haxelib remove arm || true" +
                    "&& haxelib install arm || true" +
                    "&& haxelib remove pixijs || true" +
                    "&& haxelib install pixijs || true" +
                    "&& haxelib remove p2js || true" +
                    "&& haxelib install p2js || true"
            },
            static_analysis: {
                command: "echo '>>>>>>>>>>>>> RUNNING STATIC ANALYSIS' && haxelib run haxelint -s src"
            },
            unit_tests: {
                command: "echo '>>>>>>>>>>>>> RUNNING UNIT TESTS' && haxe -lib buddy -main test.DemoTest --interp"
            }
        },

        haxe: {
            project_debug: {
                hxml: "build.hxml -debug"
            }/*,
            project: {
                hxml: "build.hxml"
            }*/
        },

        uglify: {
            options: {
                mangle: true,
                beautify: true,
                drop_console: true,
                compress: true,
                sourceMap: true,
                report: "min",
                banner: "/*\n" +
                    " * <%= pkg.name %>\n" +
                    " * v<%= pkg.version %>\n" +
                    " * <%= grunt.template.today('yyyy-mm-dd') %>\n" +
                    " **/\n"
            },
            target: {
                files: {
                    "output/libs/hx-pixi-demo.min.js": ["libs/hx-pixi-demo.dev.js"]
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    "output/libs/hx-pixi-demo.js": ["libs/hx-pixi-demo.dev.js"]
                }
            }
        },

        copy: {
            main: {
                src: ["assets/**/*.*", "libs/**/*.*", "dev.html", "index.html", "pom.xml"],
                dest: "./output/"
            }
        }
    });

    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-haxe");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.registerTask("default", ["exec", "haxe", "browserify", "uglify", "copy"]);

};