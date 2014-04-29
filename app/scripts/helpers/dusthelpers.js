define(['scripts/helpers/applicationhelper'], function(applicationHelper) {
    dust.helpers.lastEpisode = function(chunk, context, bodies, params) {
        // get the last episode of a season
        var episodes = context.get("lastseason").episodes;
        var lastEpisode = applicationHelper.calculateLastEpisode(episodes);
        
        return chunk.write(lastEpisode);
    },

    dust.helpers.timeToCatchUp = function(chunk, context, bodies, params) {
        var runtime = context.get("runtime");
        var userEpisode = context.get("userdata").episode;
        var episodes = context.get("lastseason").episodes;
        var lastEpisode = applicationHelper.calculateLastEpisode(episodes);

        var totalMinutes = (lastEpisode - userEpisode) * runtime;
        var hours = Math.floor(totalMinutes / 60);
        var remainingMinutes = totalMinutes % 60;
        
        var str = "";
        if(hours > 0 && remainingMinutes > 0) {
            str += hours + " hour(s) and " + remainingMinutes + " minute(s) to catch up";
        } else if(hours > 0) {
            str += hours + " hour(s) to catch up";
        } else {
            str += remainingMinutes + " minute(s) to catch up";
        }

        return chunk.write(str);
    }
});