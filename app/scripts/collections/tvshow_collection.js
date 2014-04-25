define([
    'backbone',
    'scripts/models/tvshow_model'
], function(Backbone, TVShowModel){
    'use strict';

    var TVShowCollection = Backbone.Collection.extend({

        model : TVShowModel,

        initialize: function () {
        },

        url: function () {
            return "/resources/json/tvshow_mock_min.json";
        },

        parse: function(response) {
            return response;
        }
    });

    return TVShowCollection;
});
