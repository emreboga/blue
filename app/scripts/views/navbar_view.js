define(['backbone',
        'templates/navbar'], 
    function(Backbone){

        var navBarView = Backbone.View.extend({

            el: '.navbar',
            template: 'navbar',

            initialize: function(){
                this.render();
            },

            render: function(){
                dust.render(this.template, null, _.bind(function(err, out) {
                    this.$el.html(out);
                }, this));
                    
                return this;
            }
        });

        return navBarView;
});