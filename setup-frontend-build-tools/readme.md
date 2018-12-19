# Front-end build tools
1. **Installing tools**- NPM, and Bower can be used to install front end packages/library like jquery, react.js etc.
2. **Performing/Doing tools**- NodeJS, Gulp, Grunt, Webpack can be used to perform front-end tasks like file optimization, compilation, and testing. They are much complicated than "Installing tools".

## Combination of Tools
There is no one right combination of tools and it's up to a developer.

Beginner: Combination of NodeJS and NPM would be the best idea

Advance: You can add few other tools on top of NodeJS and NPM like 
- Grunt + Bower or
- Webpack or Gulp + Bower

## N
Manage your Node.js Version. Useful when your project uses differents version of nodejs than the current one. 

Install `npm  install -g n`

Switch to lastest Node Version `sudo n latest`

Switch to LTS version of Node `sudo n lts`

Switch to specific version of Node `sudo n <version>`

## Webpack
Webpack is module bundler build tool that 
- puts all of your assets (js, images, fonts, css etc) in a dependency graph.
- takes modules with dependencies and generates static assets representing those modules.

### Basic Example:
Let's NPM manage our project `$ npm init` -create `package.json` file with default options

Install webpack `$ npm install webpack --save-dev` (to indicate that this is a only development dependency)

Install other js libraries 
  - **jQuery** `$ npm install jquery --save` 
  - **Add a linter -checks JS code errors** `$ npm install jshint jshint-loader --save-dev`
 
Add `webpack.config.js` file 
```js
const path = require('path');

const config  = {
    // The point(s) to enter the application -string | array
    entry: './js/home.js',

    // The name of our bundle and path to store the output file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },

    // Loaders transform all types of files into modules that can be included
    // in your application's dependency graph. 
    module:{
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    }
}

module.exports = config;
```

Run `$ webpack webpack.config.js`

**To run webpack via a Node.js script** -add following lines to your `package.json`
```json
  "script" : {
    "build": "webpack -p",
    "watch": "webpack --watch" 
  }
```
Now run `npm run build` to make webpack bundle our files (`-p` stands for production and minifies the bundled code). And `npm run watch` to automatically bundles our files when any of them change.

After running webpack we will have our bundle file `./dist/app.js` that can be linked in our project.
`<script src="./dist/app.js"></script>`

**Loader:** Add a linter to our project
```js
...
    module:{
      rules: [{
        test: /\.js$/,  // Run the loader on all .js files
        exclude: /node_modules/, // ignore all files in node_modules dir
        use: 'jshint-loader' // loader name
      }]
    }
...
```

Since, webpack can only handle javascript natively, to Process css we need to install 
`npm install css-loader style-loader` (install locally as it will create a 'node_modules' folder)

**[Click here for detail](webpack/webpack.md)**

## Gulp
Gulp is build tool that let you automate the several tasks for web development.
It helps you to optimize all assets (css, js, images, and fonts) for production,
compile sass files, refresh your browser when you save your file, and unit test.

It usages plugins to automate the tasks which can be installed and manage by NPM.

Gulp's API consists of 4 functions:
 - gulp.src   // desire files source
 - gulp.dest  // will write output files
 - gulp.task  // define task
 - gulp.watch // watch files to perform defined tasks for any changes

**Gulp workflow**
 - require gulp plugins
 - define task
 - within the task give desired source files to be processed
 - can be piped one or more modification (babel, lint format)
 - specified destination folder for output

**Example**
```js
// Require plugins
const gulp = require('gulp');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');

// Run following tasks
gulp.task('default',
    [
        'bundle-js',
        'eslint',
    ]);

// Task 1: concat source JavaScript files into one and output in specified dir
gulp.task('bundle-js', () => {
    const modulesJS = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'resources/assets/library/chart_bundle.js',
    ];
    return gulp.src(modulesJS)
        .pipe(concat('bundled.js'))
        .pipe(gulp.dest('public/js'));
});

// Task 2: Strict coding standard making code more consistent and compile
// browser compatible JavaScript and output in specified dir
gulp.task('eslint', () => {
    gulp.src('resources/assets/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(babel())
        .pipe(gulp.dest('./public/js'));
});
```

## NPM
NPM is the package manager for JavaScript that helps to share, reuse and update
code easily.

**Some command line examples**
```cmd
// Run build
$ npm run build

// Install all json packages
$ npm install

// Install devDependencies
$ npm install jquery --save-dev

// Install plugins globally
$ npm install -g eslint

// Uninstall dependencies
$ npm uninstall jquery
```
