# Setup front-end build tools
Setup gulp and configure plugins for web application.

**Gulp**
- Create `gulpfile.js` file in the root directory to bundle all library in one file or more.
  ```js
  // Require plugins
  const gulp = require('gulp');
  const concat = require('gulp-concat');

  // Run following tasks
  gulp.task('default',
      [
          'bundle-js'
      ]);

  // Task 1: concat source JavaScript files into one and output in specified dir
  gulp.task('bundle-js', () => {
      const modulesJS = [
          'node_modules/jquery/dist/jquery.min.js',
          'resources/assets/library/chart_bundle.js', //non node-package
      ];
      return gulp.src(modulesJS)
          .pipe(concat('bundled.js'))
          .pipe(gulp.dest('public/js'));
  });
  ```
  This will merge main js files in one and write in public/js dir. We will use this
  in our view files.

- Replace Webpack scripts with gulp
  ```
  {
    "private": true,
    "scripts": {
      "build": "gulp"
  },
  ```
- Install all necessary gulp plugins via npm (gulp-concat, gulp-eslint, gulp-babel)
- You can uninstall webpack and remove default app.js (public/js, resource/assets/js)
- Add Babel config `.babelrc` file
```
{
	"presets": ["es2015"]
}
```
- Add ES lint config `.eslintrc` file
```
{
	"extends": "airbnb",
	"rules": {
		"indent": ["error", 4]
	},
	"globals": {
		"document": false,
		"Event": false,
		"window": false,
		"jQuery": false,
	},
}
```
- Add editor Config `.editorConfig` file
```
# EditorConfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 4
insert_final_newline = true
trim_trailing_whitespace = true
```
