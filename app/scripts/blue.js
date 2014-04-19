define([], function() {
    'use strict';

    // Require config allows us to configure shortcut alias
    require.config({
        // The shim config allows us to configure dependencies for
        // scripts that do not call define() to register a module
        shim: {
            'dust': {
                exports: 'dust'
            },
            'dust-helpers': {
                deps: ['dust'],
                exports: 'dust.helpers'
            },
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        },
        paths: {
            'backbone': 'lib/backbone',
            'bootstrap': 'lib/bootstrap',
            'dust': 'lib/dust-core',
            'dust-helpers': 'lib/dust-helpers',
            'jquery': 'lib/jquery',
            'underscore': 'lib/underscore'
        }
    });

    require([
        'backbone',
        'bootstrap',
        'dust-helpers',
    ], function (Backbone, Bootstrap, DustHelpers) {
        // Initialize routing
        alert('Hello Gurkan!');

        // Start Backbone.history()
        Backbone.history.start();

        // Initialize the application view

    });
});