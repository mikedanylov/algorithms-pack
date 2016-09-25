// Convert the given number into a roman numeral.

function convert(num) {
  var str = '',
      thousands = Math.floor(num / 1000);

  for ( var i = 0; i < thousands; i++) {
    str += 'M';
    num -= 1000;
  }

  var hundreds = Math.floor(num / 100);
  num -= hundreds * 100;
  switch(hundreds){
    case 9: str += 'CM'; break;
    case 8: str += 'DCCC'; break;
    case 7: str += 'DCC'; break;
    case 6: str += 'DC'; break;
    case 5: str += 'D'; break;
    case 4: str += 'CD'; break;
    case 3: str += 'CCC'; break;
    case 2: str += 'CC'; break;
    case 1: str += 'C'; break;
  }

  var tens = Math.floor(num / 10);
  num -= tens * 10;
  switch(tens){
    case 9: str += 'XC'; break;
    case 8: str += 'LXXX'; break;
    case 7: str += 'LXX'; break;
    case 6: str += 'LX'; break;
    case 5: str += 'L'; break;
    case 4: str += 'XL'; break;
    case 3: str += 'XXX'; break;
    case 2: str += 'XX'; break;
    case 1: str += 'X'; break;
  }

  switch(num){
    case 9: str += 'IX'; break;
    case 8: str += 'VIII'; break;
    case 7: str += 'VII'; break;
    case 6: str += 'VI'; break;
    case 5: str += 'V'; break;
    case 4: str += 'IV'; break;
    case 3: str += 'III'; break;
    case 2: str += 'II'; break;
    case 1: str += 'I'; break;
  }
  return str;
}

console.log(convert(1836));
console.log(convert(3999));
