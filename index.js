
//format a number into euro currency
let euro = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
});


//1. The Bank 
const balanceAmountDOM = document.getElementById("balance-amount"); //making a DOM for balance amount
const loanTitleDOM = document.getElementById("loan"); //making a DOM for loan title
const loanAmountDOM = document.getElementById("loan-amount"); //making a DOM for loan amount

loanTitleDOM.style.visibility = "hidden"; //hides the loan title
loanAmountDOM.style.visibility = "hidden"; //hides the loan amount

let balanceAmountValue = balanceAmountDOM.textContent; //taking the text content of the balance amount
balanceAmountDOM.innerText = euro.format(balanceAmountValue); //converting the ballance amount into an amount in euro currency