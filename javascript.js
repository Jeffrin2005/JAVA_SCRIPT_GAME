// 1. Deposite some money 
// 2 . Determine number of lines to bet on 
// 3. collect a bet amount 
// 4. spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again 
const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8
}
const SYMBOL_VALUE = {
  "A": 5,
  "B": 4,
  "C": 3,
  "D": 2
}
const deposit = () => {
  while (true) {// use to give input infinite types(if user type invalid number then it will take one more time and so on )
    const depositAmount = prompt("Enter the amount to deposit: ");
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log(" invalid deposite amount , try again ");
    } else {
      return numberDepositAmount;// return and come out of the loop 
    }
  }
};
// 2 . Determine number of lines to bet on 
const getNumberOfLines = () => {
  while (true) {// use to give input infinite types(if user type invalid number then it will take one more time and so on )
    const lines = prompt("Enter the number of lines to bet (1-3): ");
    const numberOfLines = parseFloat(lines);
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log(" invalid number of lines, try again  ");
    } else {
      return numberOfLines;// return and come out of the loop 
    }
  }
};
// // 3. collect a bet amount 
const getBet = (balance, lines) => {
  while (true) {// use to give input infinite types(if user type invalid number then it will take one more time and so on )
    const bet = prompt("Enter the bet per line : ");
    const numberBet = parseFloat(bet);
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / lines) {
      console.log(" invalid bet, try again  ");
    } else {
      return numberBet;// return and come out of the loop 
    }
  }
}
// 4. spin the slot machine
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {// for printing the object
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelsSymbols.splice(randomIndex, 1)

    }
  }
  return reels;
};
const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
}
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of rows.entries()) {
      rowString += symbol;
      if (i != rows.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
}
// 5. check if the user won
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbol[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOL_VALUE[symbols[0]];
    }
  }
  return winnings;
}
const game = () => {
  let balance = deposit();// let used to change the value in varible
  // const variable is used to we cannot change the value in varible 
  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    // converting the given string into integer (bcoz we need to make some manipulation like subtraction, addition, etc)
    // if we input string instead of integers 
    // 'hello' => NaN (this symbol will show)
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, lines, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());
    if (balance <= 0) {
      console.log("You ran out of the money!  ");
      break;
    }
    const playAgain = prompt("Do you want to play again (y/n)? ");
    if (playAgain != "y") break;
  }



}
game();
