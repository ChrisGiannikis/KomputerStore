import convertTextIntoNumber from "./convertTextIntoNumber.js";

export function takeLoan( loanAmountElement, loanTitleElement, repayButton, balanceAmountElement, euro){

    let currentLoanMount = loanAmountElement.textContent.slice(1); // //taking the text value, removes the first character (euro currency)
    currentLoanMount = convertTextIntoNumber(currentLoanMount); //converting the text value into a number 
    let currentBankDeposit = balanceAmountElement.textContent.slice(1); //taking the current bank deposit
    currentBankDeposit = convertTextIntoNumber(currentBankDeposit); //converting the text value into a number
    let requestedLoanAmount = window.prompt("Please submit the loan amount!"); //makes a pop up prompt box in which user sumbimts the desired loan amount

    if(!requestedLoanAmount || isNaN(requestedLoanAmount)){ //checking for invalid input
        window.alert("Invalid input! \n Please try again and enter the desired loan amount as a number.")  //making a pop up message
    }else if ( requestedLoanAmount > currentBankDeposit * 2){ //checking if the requested loan is bigger that the double of bank deposit
        window.alert("Sorry, you cannot get a loan more than double of your bank balance."); //making a pop up message
    }else if( currentLoanMount > 0 ){ //if currentLoanAmount is bigger than zero it means that it means that you already have an unpaid loan
        window.alert("Sorry, you cannot get more than one loan before repaying the last loan."); //making a pop up message
    }else {
        loanAmountElement.innerText = euro.format(requestedLoanAmount); //setting the loan amount and converting it in euro currency
        loanTitleElement.style.visibility = "visible"; //makes the loan title visible again
        loanAmountElement.style.visibility = "visible"; //makes the loan amount visible again
        repayButton.style.visibility = "visible"; //makes the repay button visible again
    } 
}