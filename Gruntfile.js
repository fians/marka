module.exports = function(grunt) {
    grunt.initConfig({

        cssmin: {
            minfy: {
                files: {
                    'build/marka.min.css': ['src/css/marka.css']
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
                sourceMapName: 'build/marka.min.js.map',
                preserveComments: 'some'
            },
            my_target: {
                files: {
                    'build/marka.min.js': ['src/js/marka.js']
                }
            }
        },

        copy: {
            buildcss: {
                expand : true,
                cwd: 'src/css/',
                src: '**',
                dest: 'build/',
            },
            buildjs: {
                expand : true,
                cwd: 'src/js/',
                src: 'marka.js',
                dest: 'build/',
            },
			docjs: {
                expand : true,
                cwd: 'build/',
				src: 'marka.js',
				dest: 'docs/static/js',
			},
            doccss: {
                expand : true,
                cwd: 'build/',
                src: 'marka.css',
                dest: 'docs/static/css',
            }
		},
        
        watch: {
            
            script: {
               options: {
                    spawn: false,
                    event: ['added', 'deleted', 'changed']
                },
                files: ['src/**/*'],
                tasks: ['cssmin', 'jshint', 'uglify', 'copy']
            },
            grunt: {
                files: ['Gruntfile.js']
            }
        }
    });
    
    // Load module
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Create grunt task
    grunt.registerTask('default', ['watch']);
}