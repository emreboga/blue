
module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> v<%= pkg.version %>  (build <%= grunt.template.today("yyyy-mm-dd") %>)\n' +
            ' * <%= pkg.description %>\n *\n' +
            ' * <%= pkg.logo %>\n *\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * <%= pkg.copyright %>\n' +
            ' * <%= pkg.license %>\n' +
            ' */\n',
        consoleNoop: 'if(typeof console === "undefined"){zz=function(){};console={log:zz,debug:zz,info:zz,warn:zz,error:zz,assert:zz,clear:zz,trace:zz};}',
        buildDevPath: "build-dev",
        buildProdPath: "build-prod",
        resourcesPath: "/resources",
        jsonFolder: "/json",
        scriptsFolder: "/scripts",
        stylesFolder: "/styles",
        imagesFolder: "/images",
        templatesFolder: "/templates",
        featureJsonPath: '<%= resourcesPath %><%= jsonFolder %>',
        featureScriptsPath: '<%= resourcesPath %><%= scriptsFolder %>',
        featureStylesPath: '<%= resourcesPath %><%= stylesFolder %>',
        featureImagesPath: '<%= resourcesPath %><%= imagesFolder %>',
        featureTemplatesPath: '<%= resourcesPath %><%= templatesFolder %>',
        templateExtension: "dust",
        localhostPortDev: 7777,
        localhostPortProd: 8888,

        // Task for running a background shell command
        bgShell: {
            runNode: {
                cmd: 'node ./node_modules/nodemon/nodemon.js index.js',
                bg: true
            }
        },

        //Task for deleting files/folders for build directories
        clean: {
            dev: ['<%= buildDevPath %>/*'],
            prod: ['<%= buildProdPath %>/*']
        },

        // Simple Connect server for unit test results page,
        // and to serve the html skeleton of app pages.
        connect: {
            dev: {
                options: {
                    hostname: '0.0.0.0',
                    port: 7777,
                    base: './<%= buildDevPath %>',
                    middleware: function(connect, options) {
                        return [
                            connect.static(options.base),
                            connect.directory(options.base)
                        ];
                    }
                }
            },
            prod: {
                options: {
                    port: 8888,
                    base: './<%= buildProdPath %>',
                    keepalive: true,
                    middleware: function(connect, options) {
                        return [
                            connect.static(options.base),
                            connect.directory(options.base)
                        ];
                    }
                }
            }
        },

        //Task to copy files from one dir to another
        copy: {
            dev: {
                files: [
                    { src: ['**/*.js'], dest: '<%= buildDevPath %><%= featureScriptsPath %>/', expand: true, cwd: 'app/scripts'},
                    { src: ['**/*.css'], dest: '<%= buildDevPath %><%= featureStylesPath %>/', expand: true, cwd: 'app/styles'},
                    { src: ['**/*.map'], dest: '<%= buildDevPath %><%= featureStylesPath %>/', expand: true, cwd: 'app/styles'},
                    { src: ['**/*.json'], dest: '<%= buildDevPath %><%= featureJsonPath %>/', expand: true, cwd: 'app/json'},
                    { src: ['**/*.html'], dest: '<%= buildDevPath %>/', expand: true, cwd: 'app'},
                    { src: ['*.js'], dest: '<%= buildDevPath %>/', expand: true, cwd: 'app'},
                    { src: ['*.ico'], dest: '<%= buildDevPath %>/', expand: true, cwd: 'app'},
                    { src: ['*.txt'], dest: '<%= buildDevPath %>/', expand: true, cwd: 'app'}
                ]
            },
            prod: {
                files: [
                    { src: ['*.js'], dest: '<%= buildDevPath %>/', expand: true, cwd: 'app'},
                    { src: ['*.ico'], dest: '<%= buildProdPath %>/', expand: true, cwd: 'app'},
                    { src: ['*.txt'], dest: '<%= buildProdPath %>/', expand: true, cwd: 'app'}
                ]
            }
        },

        //Task to compile less files and copy them to dev or prod directories.
        less: {
            dev: {
                files: [
                    { src: ['**/app.less'], dest: '<%= buildDevPath %><%= featureStylesPath %>/', expand: true, cwd: 'app/styles', ext:'.css'}
                ]
            },
            prod: {
                options: {
                    yuicompress: true
                },
                files: [
                    { src: ['**/*.less'], dest: '<%= buildProdPath %><%= featureStylesPath %>/', expand: true, cwd: 'app/styles', ext:'.css'}
                ]
            }
        },

        watch: {
            dev: {
                files: ['app/**/*'],
                tasks: ['build']
            }
        },

        //Task to compile dust files.
        dustjs: {
            dev: {
                files: [
                    { src: ['**/*.dust'], dest: '<%= buildDevPath %><%= featureTemplatesPath %>/', expand: true, cwd: 'app/templates', ext: '.js'}
                ],
                options: {
                    fullname: function(filepath) {
                        return filepath.replace(/.*templates[^\w]*/i, '').replace(/\.dust/, '');
                    }
                }
            },
            prod: {
                files: [
                    { src: ['**/*.dust'], dest: '<%= buildProdPath %><%= featureTemplatesPath %>/', expand: true, cwd: 'app/templates', ext: '.js'}
                ],
                options: {
                    fullname: function(filepath) {
                        return filepath.replace(/.*templates[^\w]*/i, '').replace(/\.dust/, '');
                    }
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-bg-shell');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-dustjs');

    // build task to compile and copy source code to build-dev
    grunt.registerTask('build',
        ('DEV build').red + ('\nCompiles and copies source code to ').yellow + ('build-dev').red + (' folder').yellow,
        ['clean:dev', 'less:dev', 'dustjs:dev', 'copy:dev']);

    // build task to compile and copy source code to build-prod
    grunt.registerTask('buildProd',
        ('PROD build').red + ('\nCompiles, optimizes and copies source code to ').yellow + ('build-prod').red + (' folder').yellow,
        ['clean:prod', 'less:prod', 'dustjs:prod']);

    // server task to start DEV server
    grunt.registerTask('server',
        ('DEV server').red.bold + ('\nBuilds code and starts a web server for the DEV build at ').yellow + ('http://localhost:7777/').white + (' and watches for code changes').yellow,
        ['build', 'connect:dev', 'watch:dev']);

    // server task to start PROD server
    grunt.registerTask('serverProd',
        ('PROD server').red + ('\nBuilds code and starts a web server for the PROD build at ').yellow + ('http://localhost:8888/').white,
        ['buildProd', 'connect:prod']);

};