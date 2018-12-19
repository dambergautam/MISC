## Topic: Import/Bundle Styles

Let's create necessary files with the following content-

webpack.config.js
```js
const path = require('path');
const config = {
    entry: './public/assets/index.js',
    output: {
        path: path.resolve('./public/assets', 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }
            },
        ]
    }
};

module.exports = config;
```
index.js
```js
// Require jquery plugin
const $ = require('jquery');
window.jQuery = $;
window.$ = $;

// Require bootstrap 
require('bootstrap');

// Require select2 dropdown plugin
require('select2');
```

### For Embedded Stylesheets
- Install `css-loader` and `style-loader` loaders to embed stylesheets into a Webpack Javascript bundle. (`npm install css-loader style-loader --save-dev`)
- Update webpack config file to add these modules
```js
module: {
	rules: [
		...

		{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
	]
}
```
- Add CSS files in entry file `index.js` 
```js
...

const styleCss = require('./css/style.css');
const appCss = require('./css/app.css');
```
- Run `npm run build` 
- Add you output file `app.js` in the footer of your webpage and you will notice `<style></style>` tag added inside the head tag.

### How to fix module parse failed issue 
You may encounter with an error like this `Module parse failed: You may need an appropriate loader to handle this file type.` while requiring/importing CSS files. 

- Install url loader plugin `npm install url-loader --save-dev`
- Update webpack.config.js file to add url-loader 
```js
	module: {
        rules: [
            ...
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000' 
            }
        ]
    },
```

### For Separate Stylesheet Bundle
- In addition to above installation, install extract-text-webpack-plugin to generate css file (`npm install extract-text-webpack-plugin --save-dev`).
- Usage of this plugin in `webpack.config.js` page
```js
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

...

	module: {
        rules: [
            ...
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
    ...
    
```
- Run `npm run build`
- Now you have two output files `app.css` and `app.js`.

### Import plugins/library stylesheet from `node_modules`
- To directly access stylesheet from node_modueles update entry file `index.js`
```js
...

// Import stylesheet from node modules
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'select2/dist/css/select2.min.css';

// Import custom css 
const styleCss = require('./css/style.css');
const appCss = require('./css/app.css');
```

- Run `npm run build`


**View [webpack.config.js](webpack.config.js) and [index.js](index.js)**
