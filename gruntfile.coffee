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
              ret = dest + src
              ext = ".js"

              # Create the .js file inside a /js folder
              # if it exists in a folder above the curret
              # .jsx file.
              # Otherwise create it inside the same folder.
              if (typeof dest == "undefined") 
                assets = path.dirname path.dirname src
                jsdir = path.join assets, "/js"
                filename = path.basename src

                console.log path.join jsdir, filename

                if (fs.existsSync jsdir) 
                  ret = path.join jsdir, filename 
                

              return ret

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