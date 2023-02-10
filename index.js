
//format a number into euro currency
let euro = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
});


//1. The Bank 
const balanceAmountElement = document.getElementById("balance-amount"); //making a DOM for balance amount
const loanTitleElement = document.getElementById("loan"); //making a DOM for loan title
const loanAmountElement = document.getElementById("loan-amount"); //making a DOM for loan amount
const getLoanButton = document.getElementById("get-loan-btn"); //making a DOM for get a loan button

loanTitleElement.style.visibility = "hidden"; //hides the loan title
loanAmountElement.style.visibility = "hidden"; //hides the loan amount

let currentBankDeposit = balanceAmountElement.textContent; //taking the text content of the balance amount
let requestedLoanAmount = 0;
let currentLoanMount = loanAmountElement.textContent; //taking the text content of the loan amount

balanceAmountElement.innerText = euro.format(currentBankDeposit); //converting the current bank deposit into an amount in euro currency
getLoanButton.addEventListener('click', function(){ //on button click

    currentLoanMount = parseFloat(loanAmountElement.textContent.slice(1)); //taking the text value, removes the first character (euro currency) and then formmats the text into float number
    requestedLoanAmount = window.prompt("Please submit the loan amount!"); //makes a pop up prompt box in which user sumbimts the desired loan amount
    
    if(!requestedLoanAmount || isNaN(requestedLoanAmount)){ //checking for invalid input
        window.alert("Invalid input! \n Please try again and enter the desired loan amount as a number.")
    }else if ( requestedLoanAmount > currentBankDeposit * 2){
        window.alert("Sorry, you cannot get a loan more than double of your bank balance.");
    }else if( currentLoanMount > 0 ){ //if currentLoanAmount is bigger than zero it means that it means that you already have an unpaid loan
        window.alert("Sorry, you cannot get more than one loan before repaying the last loan.");
    }else {
        loanAmountElement.innerText = euro.format(requestedLoanAmount); //setting the loan amount and converting it in euro currency
        loanTitleElement.style.visibility = "visible"; //makes the loan title visible again
        loanAmountElement.style.visibility = "visible"; //makes the loan amount visible again
    } 
})