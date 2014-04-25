define(['backbone',
        'templates/tvshow'], 
    function(Backbone){

        var tvShowView = Backbone.View.extend({

            template: 'tvshow',

            initialize: function(){
                this.render();
            },

            render: function(){
                dust.render(this.template, this.model.toJSON(), _.bind(function(err, out) {
                    $(out).appendTo($("#tv_shows"));
                }, this));
                    
                return this;
            }
        });

        return tvShowView;
});