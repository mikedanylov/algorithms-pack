/*

Design a cash register drawer function that accepts purchase price as the first argument, payment as the second argument, and cash-in-drawer (cid) as the third argument.

cid is a 2d array listing available currency.

Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. Return the string "Closed" if cash-in-drawer is equal to the change due.

Otherwise, return change in coin and bills, sorted in highest to lowest order.

 */

function drawer(price, cash, cid) {
  
  var change = cash - price, result = [],
  		i, multiplier, subt,
  		cash_in_drawer = 0;

  for (i = 0; i < cid.length; i++) {
  	cash_in_drawer += cid[i][1];
  }
  cash_in_drawer = parseFloat(cash_in_drawer.toFixed(2));

  if (cash_in_drawer < change) {
  	return 'Insufficient Funds';
  } else if (cash_in_drawer === change) {
  	return 'Closed';
  }

  for (i = cid.length - 1; i > 0; i--) {
  	switch (cid[i][0]) {
  		case 'ONE HUNDRED':
  			subt = Math.floor(change / 100) * 100;
  			break;
  		case 'TWENTY':
  			subt = Math.floor(change / 20) * 20;
  			break;
  		case 'TEN':
  			subt = Math.floor(change / 10) * 10;
  			break;
  		case 'FIVE':
  			subt = Math.floor(change / 5) * 5;
  			break;
  		case 'ONE':
  			subt = Math.floor(change / 1) * 1;
  			break;
  		case 'QUARTER':
  			subt = Math.floor(change / 0.25) * 0.25;
  			break;
  		case 'DIME':
  			subt = Math.floor(change / 0.1) * 0.1;
  			break;
  		case 'NICKEL':
  			subt = Math.floor(change / 0.05) * 0.05;
  			break;
  		case 'PENNY':
  			subt = Math.floor(change / 0.01) * 0.01;
  			break;
  	}

  	console.log(change);

  	subt = parseFloat(subt.toFixed(2));
  	if (subt > 0) {
  		if (subt > cid[i][1]) {
  			change -= cid[i][1];	
  			result.push([ cid[i][0], cid[i][1] ]);
  		} else {
  			change -= subt;
  			result.push([ cid[i][0], subt ]);
  		}
  	}
  }

  if (change > 0) {
  	return 'Insufficient Funds';
  }

  return result;
}

// console.log(
// 	drawer(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// );

// console.log(
// 	drawer(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]])
// );

// console.log(
// 	drawer(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// );

// console.log(
// 	drawer(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]])
// );

console.log(
	drawer(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]])
);

// console.log(
// 	drawer(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// );

// console.log(
// 	drawer(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// );

// console.log(
// 	drawer(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// );

