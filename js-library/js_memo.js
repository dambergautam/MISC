/**
 * Working with JavaScript Array/ Object
 */

//Initialize Array
var fooArr = new Array();
var fooArr1 = [];

//Initialize object
var fooObj = new Object();
var fooObj1 = {};


 //Example 1
 //Add an object in an array
 var table =[];
 var row = {data: "sn", type: "int", size: "11"};
 table.push(row);

//Example 2
//Push multiple elements at the end
var alphabets = ['a', 'b']
alphabets.push('c','d','e');
// alphabets: ['a', 'b', 'c', 'd', 'e']

//Example 3
//Add elements at the beginning
var alpha1 = ['c', 'd'];
alpha1.unshift('a', 'b');
// alpha1: ['a', 'b', 'c', 'd']


//Example 4
//Add the contents of one array to another
var x = ['a', 'b', 'c'];
var y = ['d', 'e', 'f'];
x.push.apply(x, y);
// x = ['a', 'b', 'c', 'd', 'e', 'f']

//Example 5
//Create a new array from the contents of two arrays
var x = ['a', 'b', 'c'];
var y = ['d', 'e', 'f'];
var z = x.concat(y);
// z = ['a', 'b', 'c', 'd', 'e', 'f']


//Count Array Lenght
//Example 1
var foo = ['a', 'b', 'c', 'd', 'e', 'f'];
foo.length;
//Output: 6

//Example 2
var foo1 = [];
foo1.push(
        {'name':'Damber','addr':'BNE'},
        {'name':'Jivan','addr':'Ktm'},
        {'name':'Ranjit','addr':'Dubai'},
        {'name':'Mahesh','addr':'BNE'},
    );
foo1.length;    
//Output: 4
