// Make a function that looks through an array of objects (first argument)
// and returns an array of all objects that have matching property
// and value pairs (second argument). Each property and value pair of
// the source object has to be present in the object from the collection
// if it is to be included in the returned array.

// For example, if the first argument is
// [{ first: "Romeo", last: "Montague" },
//  { first: "Mercutio", last: null },
//  { first: "Tybalt", last: "Capulet" }]
//  and the second argument is { last: "Capulet" },
//  then you must return the third object from the array (the first argument),
//  because it contains the property and it's value,
//  that was passed on as the second argument.

function where(collection, source) {
  
  var arr = [];
  var should_add = true;
  var source_keys = Object.keys(source);

  collection.forEach(function(elem) {
    for (var i = 0; i < source_keys.length; i++) {
      if (elem.hasOwnProperty(source_keys[i]) &&
          elem[source_keys[i]] == source[source_keys[i]]) {
        should_add = true;
      } else {
        should_add = false;
        break;
      }
    }
    if (should_add) {
      arr = arr.concat(elem);
    }
  });
  return arr;
}

var result = where([
                    { first: "Romeo", last: "Montague" },
                    { first: "Mercutio", last: null },
                    { first: "Tybalt", last: "Capulet" }
                  ],
                  { last: "Capulet" });
console.log(result);
