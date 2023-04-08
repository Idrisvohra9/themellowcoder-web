const webpack = require('webpack');

module.exports = {
    webpack:{
        configure: {
            resolve: {
                fallback:{
                    stream: require.resolve("stream-browserify"),
                }
            }
        }
    }
}