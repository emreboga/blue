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

        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                // the user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token 
                // and signed request each expire
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                FB.api('/me/television', function(response) {
                    
                });
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook, 
                // but has not authenticated your app
            } else {
                // the user isn't logged in to Facebook.
            }
        });

    });
});