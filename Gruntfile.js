module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss',
          'css/admissions.css': 'scss/pages/admissions.scss',
          'css/alumni.css': 'scss/pages/alumni.scss',
          'css/athletics.css': 'scss/pages/athletics.scss',
          'css/faculty-directory.css': 'scss/pages/faculty-directory.scss',
          'css/home.css': 'scss/pages/home.scss', 
		  'css/error.css': 'scss/pages/error.scss',
		  'css/pretty-photo.css': 'scss/pages/prettyphoto.scss',
		  'css/intranet-home.css': 'scss/pages/intranet-home.scss',
		  'css/netNutrition.css': 'scss/pages/netNutrition.scss',
		  'css/netNutritionIE8.css': 'scss/pages/netNutritionIE8.scss'
        }        
      }
    },

    watch: {
    
      options: {
        livereload: true,
      },
      
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      
      /* watch our files for change, livereload*/
      livereload: {
        files: ['*.html', 'img/*', 'js/*'],
        options: {
          livereload: true
        }
      }
      
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
}
