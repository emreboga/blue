define([], function(){
    var applicationHelper = (function(){
        function calculateLastEpisode(episodes) {
            var now = new Date();
            var nowUTC = new Date(now.toUTCString());
            var lastEpisode = null;
            for (var i = episodes.length - 1; i >= 0; i--) {
                var episodeDateUTC = new Date(new Date(episodes[i].date).toUTCString());
                if(episodeDateUTC.getTime() < nowUTC.getTime()) {
                    lastEpisode = i+1;
                    break;
                }
            }
            return lastEpisode;
        }

        return {
            calculateLastEpisode : calculateLastEpisode
        };
    }())

    return applicationHelper;
});