/**
 * `tasks/config/sails-linker`
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags and <link> tags into the specified
 * specified HTML and/or EJS files.  The specified delimiters (`startTag`
 * and `endTag`) determine the insertion points.
 *
 * For more information, see:
 *   https://sailsjs.com/anatomy/tasks/config/sails-linker.js
 *
 */
module.exports = function (grunt) {

  grunt.config.set('sails-linker', {


    //   ╦╔═╗╦  ╦╔═╗╔═╗╔═╗╦═╗╦╔═╗╔╦╗
    //   ║╠═╣╚╗╔╝╠═╣╚═╗║  ╠╦╝║╠═╝ ║
    //  ╚╝╩ ╩ ╚╝ ╩ ╩╚═╝╚═╝╩╚═╩╩   ╩
    //  ┌─    ┌─┐┬  ┬┌─┐┌┐┌┌┬┐  ┌─┐┬┌┬┐┌─┐   ┬┌─┐┬  ┬┌─┐┌─┐┌─┐┬─┐┬┌─┐┌┬┐    ─┐
    //  │───  │  │  │├┤ │││ │───└─┐│ ││├┤    │├─┤└┐┌┘├─┤└─┐│  ├┬┘│├─┘ │   ───│
    //  └─    └─┘┴─┘┴└─┘┘└┘ ┴   └─┘┴─┴┘└─┘  └┘┴ ┴ └┘ ┴ ┴└─┘└─┘┴└─┴┴   ┴     ─┘
    devJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.ejs': require('../pipeline').jsFilesToInject
      }
    },

    devJsBuild: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.html': require('../pipeline').jsFilesToInject,
        'views/**/*.ejs': require('../pipeline').jsFilesToInject
      }
    },

    prodJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/**/*.html': ['.tmp/public/min/front/production.min.js'],
        'views/**/*.html': ['.tmp/public/min/front/production.min.js'],
        'views/**/*.ejs': ['.tmp/public/min/front/production.min.js']
      }
    },

    prodJsBuild: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/**/*.html': ['.tmp/public/dist/front/*.js'],
        'views/**/*.html': ['.tmp/public/dist/front/*.js'],
        'views/**/*.ejs': ['.tmp/public/dist/front/*.js']
      }
    },


    //  ╔═╗╔╦╗╦ ╦╦  ╔═╗╔═╗╦ ╦╔═╗╔═╗╔╦╗╔═╗
    //  ╚═╗ ║ ╚╦╝║  ║╣ ╚═╗╠═╣║╣ ║╣  ║ ╚═╗
    //  ╚═╝ ╩  ╩ ╩═╝╚═╝╚═╝╩ ╩╚═╝╚═╝ ╩ ╚═╝
    //  ┌─    ┬┌┐┌┌─┐┬  ┬ ┬┌┬┐┬┌┐┌┌─┐  ╔═╗╔═╗╔═╗   ┬   ┌─┐┌─┐┌┬┐┌─┐┬┬  ┌─┐┌┬┐  ╦  ╔═╗╔═╗╔═╗    ─┐
    //  │───  │││││  │  │ │ │││││││ ┬  ║  ╚═╗╚═╗  ┌┼─  │  │ ││││├─┘││  ├┤  ││  ║  ║╣ ╚═╗╚═╗  ───│
    //  └─    ┴┘└┘└─┘┴─┘└─┘─┴┘┴┘└┘└─┘  ╚═╝╚═╝╚═╝  └┘   └─┘└─┘┴ ┴┴  ┴┴─┘└─┘─┴┘  ╩═╝╚═╝╚═╝╚═╝    ─┘
    devStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.ejs': require('../pipeline').cssFilesToInject
      }
    },

    devStylesBuild: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.ejs': require('../pipeline').cssFilesToInject
      }
    },

    prodStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/min/front/production.min.css'],
        'views/**/*.html': ['.tmp/public/min/front/production.min.css'],
        'views/**/*.ejs': ['.tmp/public/min/front/production.min.css']
      }
    },

    prodStylesBuild: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/dist/front/*.css'],
        'views/**/*.html': ['.tmp/public/dist/front/*.css'],
        'views/**/*.ejs': ['.tmp/public/dist/front/*.css']
      }
    },


    // ----------------------------------------------------------------------- For Admin side add style ----
    devJsAdmin: {
      options: {
        startTag: '<!--Admin SCRIPTS-->',
        endTag: '<!--Admin SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/**/*.html': require('../pipeline').jsFilesToInjectAdmin,
        'views/admin/**/*.html': require('../pipeline').jsFilesToInjectAdmin,
        'views/admin/**/*.ejs': require('../pipeline').jsFilesToInjectAdmin
      }
    },

    devStylesAdmin: {
      options: {
        startTag: '<!--Admin STYLES-->',
        endTag: '<!--Admin STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').cssFilesToInjectAdmin,
        'views/admin/**/*.html': require('../pipeline').cssFilesToInjectAdmin,
        'views/admin/**/*.ejs': require('../pipeline').cssFilesToInjectAdmin
      }
    },

    devJsAdminBuild: {
      options: {
        startTag: '<!--Admin SCRIPTS-->',
        endTag: '<!--Admin SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/**/*.html': require('../pipeline').jsFilesToInjectAdmin,
        'views/**/*.html': require('../pipeline').jsFilesToInjectAdmin,
        'views/**/*.ejs': require('../pipeline').jsFilesToInjectAdmin
      }
    },

    devStylesAdminBuild: {
      options: {
        startTag: '<!--Admin STYLES-->',
        endTag: '<!--Admin STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').cssFilesToInjectAdmin,
        'views/**/*.html': require('../pipeline').cssFilesToInjectAdmin,
        'views/**/*.ejs': require('../pipeline').cssFilesToInjectAdmin
      }
    },

    prodJsAdmin: {
      options: {
        startTag: '<!--Admin SCRIPTS-->',
        endTag: '<!--Admin SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/**/*.html': ['.tmp/public/min/admin/admin-production.min.js'],
        'views/**/*.html': ['.tmp/public/min/admin/admin-production.min.js'],
        'views/**/*.ejs': ['.tmp/public/min/admin/admin-production.min.js']
      }
    },

    prodStylesAdmin: {
      options: {
        startTag: '<!--Admin STYLES-->',
        endTag: '<!--Admin STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/min/admin/admin-production.min.css'],
        'views/**/*.html': ['.tmp/public/min/admin/admin-production.min.css'],
        'views/**/*.ejs': ['.tmp/public/min/admin/admin-production.min.css']
      }
    },


    prodJsAdminBuild: {
      options: {
        startTag: '<!--Admin SCRIPTS-->',
        endTag: '<!--Admin SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/**/*.html': ['.tmp/public/dist/admin/*.js'],
        'views/**/*.html': ['.tmp/public/dist/admin/*.js'],
        'views/**/*.ejs': ['.tmp/public/dist/admin/*.js']
      }
    },

    prodStylesAdminBuild: {
      options: {
        startTag: '<!--Admin STYLES-->',
        endTag: '<!--Admin STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/dist/admin/*.css'],
        'views/**/*.html': ['.tmp/public/dist/admin/*.css'],
        'views/**/*.ejs': ['.tmp/public/dist/admin/*.css']
      }
    },

    // End admin





    //  ╔═╗╦═╗╔═╗╔═╗╔═╗╔╦╗╔═╗╦╦  ╔═╗╔╦╗  ╦ ╦╔╦╗╔╦╗╦    ╔╦╗╔═╗╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗╔═╗
    //  ╠═╝╠╦╝║╣ ║  ║ ║║║║╠═╝║║  ║╣  ║║  ╠═╣ ║ ║║║║     ║ ║╣ ║║║╠═╝║  ╠═╣ ║ ║╣ ╚═╗
    //  ╩  ╩╚═╚═╝╚═╝╚═╝╩ ╩╩  ╩╩═╝╚═╝═╩╝  ╩ ╩ ╩ ╩ ╩╩═╝   ╩ ╚═╝╩ ╩╩  ╩═╝╩ ╩ ╩ ╚═╝╚═╝
    //  ┌─    ┌─┐┬  ┬┌─┐┌┐┌┌┬┐  ┌─┐┬┌┬┐┌─┐  ┬  ┌─┐┌┬┐┌─┐┌─┐┬ ┬  ┌┬┐┌─┐┌┬┐┌─┐┬  ┌─┐┌┬┐┌─┐┌─┐    ─┐
    //  │───  │  │  │├┤ │││ │───└─┐│ ││├┤   │  │ │ ││├─┤└─┐├─┤   │ ├┤ │││├─┘│  ├─┤ │ ├┤ └─┐  ───│
    //  └─    └─┘┴─┘┴└─┘┘└┘ ┴   └─┘┴─┴┘└─┘  ┴─┘└─┘─┴┘┴ ┴└─┘┴ ┴   ┴ └─┘┴ ┴┴  ┴─┘┴ ┴ ┴ └─┘└─┘    ─┘
    clientSideTemplates: {
      options: {
        startTag: '<!--TEMPLATES-->',
        endTag: '<!--TEMPLATES END-->',
        fileTmpl: '<script type="text/javascript" src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/jst.js'],
        'views/**/*.html': ['.tmp/public/jst.js'],
        'views/**/*.ejs': ['.tmp/public/jst.js']
      }
    },
    clientSideTemplatesBuild: {
      options: {
        startTag: '<!--TEMPLATES-->',
        endTag: '<!--TEMPLATES END-->',
        fileTmpl: '<script type="text/javascript" src="%s"></script>',
        appRoot: '.tmp/public',
        // relative: true
        // ^^ Uncomment this if compiling assets for use in PhoneGap, CDN, etc.
        //    (but be note that this can break custom font URLs)
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/jst.js'],
        'views/**/*.html': ['.tmp/public/jst.js'],
        'views/**/*.ejs': ['.tmp/public/jst.js']
      }
    },

    //For Admin
    // clientSideTemplates: {
    //   options: {
    //     startTag: '<!--TEMPLATES-->',
    //     endTag: '<!--TEMPLATES END-->',
    //     fileTmpl: '<script type="text/javascript" src="%s"></script>',
    //     appRoot: '.tmp/public'
    //   },
    //   files: {
    //     '.tmp/public/index.html': ['.tmp/public/jst.js'],
    //     'views/**/*.html': ['.tmp/public/jst.js'],
    //     'views/**/*.ejs': ['.tmp/public/jst.js']
    //   }
    // },
  }); //</ grunt.config.set() >

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // This Grunt plugin is part of the default asset pipeline in Sails,
  // so it's already been automatically loaded for you at this point.
  //
  // Of course, you can always remove this Grunt plugin altogether by
  // deleting this file.  But check this out: you can also use your
  // _own_ custom version of this Grunt plugin.
  //
  // Here's how:
  //
  // 1. Install it as a local dependency of your Sails app:
  //    ```
  //    $ npm install grunt-sails-linker --save-dev --save-exact
  //    ```
  //
  //
  // 2. Then uncomment the following code:
  //
  // ```
  // // Load Grunt plugin from the node_modules/ folder.
//   grunt.loadNpmTasks('grunt-sails-linker');
  // ```
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

};
