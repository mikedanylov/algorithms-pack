// Check if a string (first argument) ends with
// the given target string (second argument).

function end(str, target) {
  return (target === str.substr(-target.length)) ? true : false;
}

end("Bastian", "n");
