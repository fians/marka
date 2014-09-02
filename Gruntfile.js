module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Clean all compiled files
        clean: [

            // Clean compiled css in source
            'src/css/**/*.css',

            // Clean docs static css
            'docs/static/marka/css/**/*.css'
        ],

        // Compile all LESS files individually
        less: {
            compile: {
                options: {
                },
                files: [{
                    expand: true,
                    cwd: 'src/less',
                    src: ['**/*.less', '!{boot,var,mix}*.less'],
                    dest: 'src/css/',
                    ext: '.css'
                }]
            }
        },

        // Add license
        concat: {
            options: {
              banner: '\n/*! \n' +
                ' * Marka - v<%= pkg.version %> \n' + 
                ' * http://fian.my.id/marka \n' + 
                ' * \n' + 
                ' * Copyright 2014 Alfiana E. Sibuea and other contributors \n' + 
                ' * Released under the MIT license \n' + 
                ' * https://github.com/fians/marka/blob/master/LICENSE \n' + 
                ' */ \n',
            },
            css: {
                src: ['src/css/marka-core.css', 'src/css/icons/*.css'],
                dest: 'dist/css/marka.css'
            },
            js: {
                src: ['src/js/marka.js'],
                dest: 'dist/js/marka.js'
            }
        },

        cssmin: {
            minify: {
                files: {
                    'dist/css/marka.min.css': ['dist/css/marka.css']
                }
            }
        },
        
        jshint: {
            
            files: [
                'gruntfile.js', 
                'src/**/*.js',
            ],
            
            options: {
                globals: {
                    console: true
                }
            }
        },
   
        uglify: {
            options: {
                mangle: true,
                sourceMap: true,
                sourceMapName: 'dist/js/marka.min.js.map',
                preserveComments: 'some'
            },
            my_target: {
                files: {
                    'dist/js/marka.min.js': ['dist/js/marka.js']
                }
            }
        },

        // Copy compiled file to docs
        copy: {
			distJSToDocs: {
                expand : true,
                cwd: 'dist/js/',
				src: 'marka.js',
				dest: 'docs/static/marka/js'
			},
            distCSStoDocs: {
                expand : true,
                cwd: 'dist/css/',
                src: '**',
                dest: 'docs/static/marka/css/'
            },
            srcCSStoDocs: {
                expand: true,
                cwd: 'src/css/',
                src: '**/*.css',
                dest: 'docs/static/marka/css/src'
            }
		},
        
        watch: {
            script: {
               options: {
                    spawn: false,
                    event: ['added', 'deleted', 'changed']
                },
                files: ['src/**/*.js', 'src/**/*.less'],
                tasks: ['less', 'concat', 'cssmin', 'jshint', 'uglify', 'copy']
            },
            grunt: {
                files: ['Gruntfile.js']
            }
        }
    });
    
    // Load module
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Create grunt task
    grunt.registerTask('build', ['less', 'concat', 'cssmin', 'jshint', 'uglify', 'copy']);
};