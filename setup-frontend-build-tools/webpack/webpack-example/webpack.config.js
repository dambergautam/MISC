const path = require('path');

const config  = {
    // Directory currently we are in 
    context: __dirname,

    // The point(s) to enter the application -string | array
    entry: './js/home.js',

    // The name of our bundle and path to store the output file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    // Loaders transform all types of files into modules that can be included
    // in your application's dependency graph. 
    module:{
        rules: [{ 
            test: /\.js$/,  // Run the loader on all .js files
            exclude: /node_modules/, // ignore all files in node_modules dir
            use: 'jshint-loader' // loader name 
        }]
    }
}

module.exports = config;
