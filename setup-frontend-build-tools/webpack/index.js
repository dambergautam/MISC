/**
 * Bundle all javascript files
 * @type Module jquery|Module jquery
 */

// Require jquery plugin
const $ = require('jquery');
window.jQuery = $;
window.$ = $;

// Require bootstrap 
require('bootstrap');

// Require select2 dropdown plugin
require('select2');

// Require external plugins
require('./js/module_plugins.js');

// Require application functions
require('./js/app.js');


/**
 * Bundle all css files
 * @type Module style|Module style
 */ 

// Import stylesheet from node modules
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'select2/dist/css/select2.min.css';

// Add custom css
const customCss = require('./css/style.css');
const accordionmenuCss = require('./plugin/accordion_menu/css/style.css');

//const bootstrapCss = require('./bootstrap/dist/css/bootstrap.min.css');
//const fontawesomeCss = require('./css/font-awesome.min.css');
//const select2Css = require('./css/select2.min.css');
