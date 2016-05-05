var path = require('path');
var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');
    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\nAuthor: <%= pkg.author.name %> - <%= pkg.author.email %> */\n',
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'app/build/',
                    hostname: '*',
                    livereload: true,
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')(),
                            folderMount(connect, 'app/build')
                        ];
                    }
                }
            }
        },

        // process + minify LESS into CSS
        less: {
            development: {
                files: [{
                        src: "app/src/less/main.less",
                        dest: "app/src/css/styles.css"
                    } // add more files after here if needed
                ]
            }
        },
        // combine mediaqueries
        cmq: {
            multiple_files: {
                expand: true,
                src: 'app/src/css/*.css'
            }
        },
        // auto browserprefix for CSS
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            multiple_files: {
                expand: true,
                src: 'app/src/css/*.css'
            }
        },
        // minify CSS
        cssmin: {
            minify: {
                options: {
                    banner: '<%= banner %>'
                },
                files: [{
                    expand: true,
                    cwd: 'app/src/css/',
                    src: ['*.css'],
                    dest: 'app/build/css/',
                    ext: '.min.css',
                    extDot: 'first'
                }]
            }
        },
        // minify and concat JS
        uglify: {
            site: {
                options: {
                    banner: '<%= banner %>',
                    mangle: true,
                    beautify: false,
                    preserveComments: 'some',
                    sourceMap: true
                },
                files: {
                    'app/build/js/global.min.js': ['bower_components/jquery/dist/jquery.min.js', 'app/src/js/plugins.js', 'app/src/js/SVGMorph.js', 'app/src/js/main.js']
                    // You can add additional JavaScript files into the above array, if you need to
                }
            },
            modernizr: {
                options: {
                    mangle: true,
                    beautify: false
                },
                files: {
                    'app/build/js/vendor/modernizr.js': ['bower_components/modernizr/modernizr.js']
                }
            }
        },
        // process jade
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/src/jade/',
                    src: ['*.jade'],
                    dest: 'app/build/',
                    ext: '.html',
                    extDot: 'first'
                }]
            }
        },
        // copy html files if not jade from src to build, copy favicons
        copy: {
            favicon: {
                expand: true,
                cwd: 'app/src/favicon',
                src: ['**/*.{png,ico}'],
                dest: 'app/build/'
            }
        },
        // optimize svg
        svgmin: {
            options: {
                plugins: [{
                    removeUselessStrokeAndFill: true
                }, {
                    removeDoctype: true
                }, {
                    removeComments: true
                }, {
                    removeEditorsNSData: true
                }, {
                    convertColors: true
                }, {
                    convertStyleToAttrs: false
                }, {
                    convertShapeToPath: true
                }, {
                    cleanupEnableBackground: true
                }, {
                    cleanupNumericValues: true
                }, {
                    collapseGroups: true
                }, {
                    convertPathData: true
                }, {
                    removeUselessStrokeAndFill: true
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/src/img/',
                    src: ['**/*.svg'],
                    dest: 'app/build/img/'
                }]
            }
        },
        // optimize images
        imagemin: {
            dist: {
                expand: true,
                cwd: 'app/src/img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'app/build/img/'
            }
        },
        // watch for changes in files
        watch: {
            // watch for change in grunt file then reload if necessary
            configFiles: {
                files: ['Gruntfile.js'],
                tasks: [ 'less', 'cmq', 'autoprefixer', 'cssmin', 'uglify', 'newer:imagemin', 'jade' , 'alldone'],
                options: {
                    reload: true
                }
            },
            // watch for changes in CSS
            styles: {
                files: [ "app/src/less/**/*.less" ],
                tasks: [ 'less',  'cmq', 'autoprefixer', 'cssmin', 'alldone'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },
            // watch for changes in script
            scripts: {
                files: ['app/src/js/**/*.js'],
                tasks: ['uglify:site', 'alldone'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },
            // watch for change in favicon
            favicons: {
                files: ['app/src/favicon/**/*.{png,icon}'],
                tasks: ['copy:favicon', 'alldone'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },
            // watch for updates in images
            images: {
                files: ['app/src/img/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:imagemin', 'newer:svgmin', 'alldone'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },
            // watch for updates in jades
            jades: {
                files: ['app/src/jade/**/*.jade'],
                tasks: ['jade', 'alldone'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            }
        }
    });

    grunt.registerTask('alldone', function() {
      grunt.log.warn('All done. Please don\'t forget to check your favicons, social media metatags, tracking and google analytics tags.');
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', [ 'less', 'cmq', 'autoprefixer', 'copy:favicon', 'cssmin', 'uglify', 'imagemin', 'svgmin', 'jade',  'alldone', 'connect', 'watch']);

};
