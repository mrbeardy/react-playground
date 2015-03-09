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

module.exports = (grunt) ->
  require("load-grunt-tasks")(grunt)

  grunt.initConfig {
    watch:
      options:
        spawn: false
        interrupt: true
        livereload: 35729

      jsx:
        files: ['{app,playground}/**/*.jsx']
        tasks: ['jsx']

      reload:
        options:
          reload: true

        files: [
          '{app,playground}/**/*.{css,html}',
          'gruntfile.coffee'
        ]

    react:
      main:
        files: [
            rename: (dest, src) ->
              # Create the .js file inside a /js folder
              # instead of the same folder as the .jsx
              ext = ".js"

              jsdir = path.join path.dirname(src), "/gen-js"
              filename = path.basename src

              return path.join jsdir, filename

            expand: true
            src: ['app/**/*.jsx', 'playground/**/*.jsx']
            ext: ".js"
        ]
  }

  grunt.registerTask "default", [
    "main", "watch"
  ]

  grunt.registerTask "main", [
    "jsx"
  ]

  grunt.registerTask "jsx", [
    "react"
  ]