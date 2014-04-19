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
            'dust': 'lib/dust-core-2.0.3',
            'dust-helpers': 'lib/dust-helpers-1.1.2',
            'jquery': 'lib/jquery',
            'underscore': 'lib/underscore-1.6.0'
        }
    });

    require([
        'backbone'
    ], function (Backbone) {
        // Initialize routing

        // Start Backbone.history()
        Backbone.history.start();

        // Initialize the application view

    });
});