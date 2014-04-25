define([], function() {
    'use strict';

    // Require config allows us to configure shortcut alias
    require.config({
        baseUrl: "/resources",
        paths: {
            'backbone': 'scripts/lib/backbone',
            'bootstrap': 'scripts/lib/bootstrap',
            'jquery': 'scripts/lib/jquery',
            'underscore': 'scripts/lib/underscore'
        },
        shim: {
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        }
    });

    require([
        'backbone',
        'scripts/views/app_view'
    ], function (Backbone, App) {
        // Initialize routing
        

        // Start Backbone.history()
        Backbone.history.start();

        // Initialize the application view
        var app = new App();

    });
});