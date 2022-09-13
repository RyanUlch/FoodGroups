const webpack = require('webpack'); 
module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {}; 
		Object.assign(fallback, { 
      "stream": require.resolve("stream-browserify"), 
      "assert": require.resolve("assert"), 
      "http": require.resolve("stream-http"), 
      "https": require.resolve("https-browserify"), 
      "os": require.resolve("os-browserify"), 
      "url": require.resolve("url/"),
	  "util": require.resolve("util/"),
	  "buffer": require.resolve("buffer/"),
	  "path": require.resolve("path-browserify"),
	  "timers": require.resolve("timers-browserify"),
	  "crypto": require.resolve("crypto-browserify"),
	  "zlib": require.resolve("browserify-zlib"),
      }) 
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
   	new webpack.ProvidePlugin({ 
    	process: 'process/browser', 
      Buffer: ['buffer', 'Buffer'] 
    }) 
   ]) 
   return config; }