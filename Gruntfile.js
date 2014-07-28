module.exports = function(grunt) {
    grunt.initConfig({
        
        jshint: {
            
            files: [
                'gruntfile.js', 
                'marka.js',
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
                sourceMapName: 'marka.min.js.map',
                preserveComments: 'some'
            },
            my_target: {
                files: {
                    'marka.min.js': ['marka.js']
                }
            }
        },

        copy: {
			main: {
				src: 'marka.js',
				dest: 'docs/',
			},
		},
        
        watch: {
            
            script: {
               options: {
                    spawn: false,
                    event: ['added', 'deleted', 'changed']
                },
                files: ['marka.js'],
                tasks: ['jshint', 'uglify', 'copy']
            },
            grunt: {
                files: ['Gruntfile.js']
            }
        }
    });
    
    // Load module
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Create grunt task
    grunt.registerTask('default', ['watch']);
}