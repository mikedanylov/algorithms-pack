/*

Convert the characters "&", "<", ">", '"' (double quote),
and "'" (apostrophe), in a string to their corresponding HTML entities.

 */

function convert(str) {

  return str.replace(/[&<>"']/g, function(match) {
    switch (match) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case '\'': return '&apos;';
    }
  });
}

console.log(
  convert("Dolce & Gabbana & qwe \" qwe ' qwe <>")
);