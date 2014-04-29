define(['backbone',
        'scripts/collections/tvshow_collection',
        'scripts/views/tvshow_view',
        'scripts/views/navbar_view',
        'scripts/helpers/dustHelpers'], 
    function(Backbone, TVShowCollection, TVShowView, navBarView){

        var appView = Backbone.View.extend({

            el: '#main',
            views: {
                navbar: new navBarView()
            },

            initialize: function(){
                _.bindAll(this, "render", "add", "remove");

                // Array of ticket views to keep track of the ticket collection
                this.tvShowViews = [];

                // Create TicketCollection
                this.collection = new TVShowCollection();

                this.collection.fetch().done(this.render);

                // Fetch TV Shows
                this.collection.fetch({
                    success:_.bind(function(model, response) {
                        if(_.isEmpty(this.collection) || this.collection.length == 0) {
                            // Show message when NO TV shows returned
                        } else {
                            // For each TVShow in the collection add a view to the list of all TVShow views
                            this.collection.each(this.add);

                            // Bind this view to the add and remove events of the collection
                            this.collection.bind('add', this.add);
                            this.collection.bind('remove', this.remove);
                        }
                    }, this),

                    error: _.bind(function(model, response) {
                        // Handle error case
                    }, this)
                }).done(this.render);
            },

            render: function(){
                // Clear existing TV Shows
                $("#tv_shows").empty();

                // Render each TVShow view
                _(this.tvShowViews).each(function(tvShowView) {
                    tvShowView.render();
                });

                // return the instance to support chaining
                return this;
            },

            add : function(tvShow) {
                // Create a view for each TVShow that is added
                var tvShowView = new TVShowView({
                    model: tvShow
                });

                // Keep all view instances to be rendered
                this.tvShowViews.push(tvShowView);
            },

            remove : function(tvShow) {
                // Find the selected TVShow model iterating thru all views' models
                var viewToRemove = _(this.tvShowViews).select(
                    function(tvShowView) {
                        return tvShowView.model === tvShow;
                    })[0];
                // Remove the found view
                this.tvShowViews = _(this.tvShowViews).without(viewToRemove);
            },
        });

        return appView;
});