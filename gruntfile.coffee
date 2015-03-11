path = require "path"
fs = require "fs"
util = require "util"

# src = "playground/hangman/assets/jsx/app.jsx"
# jsdir = path.dirname(src)

# console.log jsdir

# if ( fs.exists jsdir )
#   console.log "exists"
# else
#   console.log "no"

# console.log "\n-------------------------------\n"

folders = "{app,playground}/";

module.exports = (grunt) ->
  require("load-grunt-tasks")(grunt)

  grunt.initConfig {
    watch:
      options:
        spawn: false
        interrupt: true
        livereload: 35729

      jsx:
        files: [folders + '**/*.jsx']
        tasks: ['jsx']

      reload:
        options:
          reload: true

        files: [
          folders + '**/*.{css,html,js}',
          'gruntfile.coffee'
        ]

    react:
      main:
        files: [
          rename: (dest, src) ->
            p = path.parse src

            return path.join(p.dir, p.name) + ".gen.js"

          expand: true
            
          src: [folders + '**/*.jsx']
          ext: ".js"
        ]

    uglify:
      options:
        banner: '/*! These files are pre-generated from .jsx. Do not edit. | Generated at <%= grunt.template.today("hh:mm:ss") %> on <%= grunt.template.today("dd-mm-yyyy") %> %> */'
      genjs:
        files: [
          expand: true
          src: [ folders + '**/*.gen.js']
          ext: ".gen.js"
        ]
  }

  grunt.registerTask "default", [
    "main", "watch"
  ]

  grunt.registerTask "main", [
    "jsx"
  ]

  grunt.registerTask "jsx", [
    "react", "uglify"
  ]