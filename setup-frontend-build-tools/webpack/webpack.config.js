const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    // Directory currently we are in 
    context: __dirname,

    // The point(s) to enter the application -string | array
    entry: './public/assets/index.js',
   
    // The name of our bundle and path to store the output file
    output: {
        path: path.resolve('./public/assets', 'dist'),
        filename: 'app.js'
    },

    // Loaders transform all types of files into modules that can be included
    // in your application's dependency graph. 
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000' 
            }
        ]
    },
    
    plugins: [
        new ExtractTextPlugin("app.css")
    ]
};

module.exports = config;