
//format a number into euro currency
let euro = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
});


//1. The Bank 
const balanceAmountElement = document.getElementById("balance-amount"); //making a DOM for balance amount
const loanTitleElement = document.getElementById("loan"); //making a DOM for loan title
const loanAmountElement = document.getElementById("loan-amount"); //making a DOM for loan amount
const getLoanButton = document.getElementById("get-loan-btn"); //making a DOM for the loan button
const repayButton = document.getElementById("repay-btn"); //making a DOM for the repay button

loanTitleElement.style.visibility = "hidden"; //hides the loan title
loanAmountElement.style.visibility = "hidden"; //hides the loan amount
repayButton.style.visibility = "hidden"; //hides the repay button

let currentBankDeposit = balanceAmountElement.textContent; //taking the text content of the balance amount
let requestedLoanAmount = 0;
let currentLoanMount = loanAmountElement.textContent; //taking the text content of the loan amount
let currentLoan = false;  //this is a value that holds if the customer has a loan or not

balanceAmountElement.innerText = euro.format(currentBankDeposit); //converting the current bank deposit into an amount in euro currency
getLoanButton.addEventListener('click', function(){ //when the get a loan button clicked

    currentLoanMount = parseFloat(loanAmountElement.textContent.slice(1)); //taking the text value, removes the first character (euro currency) and then formmats the text into float number
    currentBankDeposit = parseFloat(balanceAmountElement.textContent.slice(1)); //taking the current bank deposit
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
        repayButton.style.visibility = "visible"; //makes the repay button visible again
        currentLoan = true;  //setting the flag for the loan true
    } 
})

//2. The Work
const salaryAmountElement = document.getElementById("salary-amount");  //making a DOM for salary amount
const bankButton = document.getElementById("bank-btn");  //making a DOM for the bank button
const workButton = document.getElementById("work-btn");  //making a DOM for the work button
let currentSalary = salaryAmountElement.textContent;  //taking the current salary amount

salaryAmountElement.innerText = euro.format(currentSalary); //converting the salary amount into an amount with euro currency

bankButton.addEventListener('click', function(){  //when the bank button clicked
    currentSalary = parseFloat(salaryAmountElement.textContent.slice(1)); //taking the text value, removes the first character (euro currency) and then formmats the text into float number
    currentBankDeposit = parseFloat(balanceAmountElement.textContent.slice(1)); //taking the current bank deposit
    currentLoanMount = parseFloat(loanAmountElement.textContent.slice(1)); //taking the current loan amount;

    if (currentSalary != 0){
        if (currentLoan){ //if a loan is active
            let loanPercentage = currentSalary * 0.1;  //taking a 10 % of salary amount
            let restSalary = currentSalary - loanPercentage; //subtract the loan percentage from the salary to hold the rest amount
            let remainingLoan = currentLoanMount - loanPercentage; //substract from loan amount the loanPercentage of the salary
            loanAmountElement.innerText = euro.format(remainingLoan);  //formating the remaining loan amount into euro currency
            let sumOfBalance = currentBankDeposit + restSalary; //adds to current bank deposit the remain salary
            balanceAmountElement.innerText = euro.format(sumOfBalance); //formating the total balance into euro currency 
            salaryAmountElement.innerText = euro.format(0);  //resets the salary
        }else{  //there is no loan  
            let sumOfBalance = currentBankDeposit + currentSalary; //adds to current bank deposit the salary
            balanceAmountElement.innerText = euro.format(sumOfBalance); //formating the total balance into euro currency
            salaryAmountElement.innerText = euro.format(0);  //resets the salary
        }
    }
})

workButton.addEventListener('click', function(){  //when the work button clicked
    currentSalary = parseFloat(salaryAmountElement.textContent.slice(1)); //taking the text value, removes the first character (euro currency) and then formmats the text into float number
    let sumOfSalary = currentSalary + 100;  //adding 100 to the current salary
    salaryAmountElement.innerText = euro.format(sumOfSalary);  //formating the total amount into euro currency
})

repayButton.addEventListener('click', function(){  //when the repay button clicked
    currentLoanMount = parseFloat(loanAmountElement.textContent.slice(1)); //taking the current loan amount;
    currentSalary = parseFloat(salaryAmountElement.textContent.slice(1)); //taking the text value, removes the first character (euro currency) and then formmats the text into float number
    currentBankDeposit = parseFloat(balanceAmountElement.textContent.slice(1)); //taking the current bank deposit

    if (currentSalary != 0){
        if (currentLoan){ //if a loan is active
            let remainingLoan = currentLoanMount - currentSalary;  //substracting from the current loan, the current salary
            if (remainingLoan > 0){  // if there is a remaing loan
                loanAmountElement.innerText = euro.format(remainingLoan);  // setting back the remaining loan
                salaryAmountElement.innerText = euro.format(0);  //resets the salary
            }else if (remainingLoan < 0){ // if there is ramaining salary
                loanAmountElement.innerText = euro.format(0);  // resets the loan amount because the loan payed off
                salaryAmountElement.innerText = euro.format(0);  //resets the salary
                loanAmountElement.style.visibility = "hidden"; //hides the loan amount
                loanTitleElement.style.visibility = "hidden"; //hides the loan title
                repayButton.style.visibility = "hidden"; //hides the repay button
                let sumOfBalance = currentBankDeposit + Math.abs(remainingLoan); //adds the absolute value of negative remaining loan ( remaining salary ) to bank
                balanceAmountElement.innerText = euro.format(sumOfBalance); // sets the total balance with euro currency into html element
            }
        }else{
            window.alert("There is no loan to pay off !")
        }
    }
})