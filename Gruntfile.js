module.exports = function(grunt) {
    grunt.initConfig({

        concat_css: {
            all: {
                src: ['src/css/marka-core.css', 'src/css/icons/*.css'],
                dest: 'dist/css/marka-all.css'
            },
        },

        cssmin: {
            minify: {
                files: {
                    'dist/css/marka-all.min.css': ['dist/css/marka-all.css']
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
                    'dist/js/marka.min.js': ['src/js/marka.js']
                }
            }
        },

        copy: {
            dist: {
                expand : true,
                cwd: 'src/',
                src: '**',
                dest: 'dist/',
            },
			docjs: {
                expand : true,
                cwd: 'dist/js/',
				src: 'marka.js',
				dest: 'docs/static/js',
			},
            doccss: {
                expand : true,
                cwd: 'dist/css/',
                src: '**',
                dest: 'docs/static/css/marka',
            }
		},
        
        watch: {
            
            script: {
               options: {
                    spawn: false,
                    event: ['added', 'deleted', 'changed']
                },
                files: ['src/**/*'],
                tasks: ['concat_css', 'cssmin', 'jshint', 'uglify', 'copy']
            },
            grunt: {
                files: ['Gruntfile.js']
            }
        }
    });
    
    // Load module
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Create grunt task
    grunt.registerTask('default', ['watch']);
}