import convertTextIntoNumber from "./convertTextIntoNumber.js";

export function saveMyMoney(salaryAmountElement, balanceAmountElement, loanAmountElement, currentLoan, euro){
    let currentSalary = salaryAmountElement.textContent.slice(1); //taking the text value, removes the first character (euro currency) and then formmats the text into float number
    currentSalary = convertTextIntoNumber(currentSalary); //converting the text value into a number
    let currentBankDeposit = balanceAmountElement.textContent.slice(1); //taking the current bank deposit
    currentBankDeposit = convertTextIntoNumber(currentBankDeposit); //converting the text value into a number
    let currentLoanMount = loanAmountElement.textContent.slice(1); //taking the current loan amount;
    currentLoanMount = convertTextIntoNumber(currentLoanMount); //converting the text value into a number

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
}

export function payMyWork(salaryAmountElement, euro){
    let currentSalary = salaryAmountElement.textContent.slice(1); //taking the text value, removes the first character (euro currency) and then formmats the text into float number
    currentSalary = convertTextIntoNumber(currentSalary); //converting the text value into a number
    let sumOfSalary = currentSalary + 100;  //adding 100 to the current salary
    salaryAmountElement.innerText = euro.format(sumOfSalary);  //formating the total amount into euro currency
}

export function repayTheLoan(loanAmountElement, salaryAmountElement, loanTitleElement, repayButton, balanceAmountElement, currentLoan, euro){
    let currentLoanMount = loanAmountElement.textContent.slice(1); //taking the current loan amount;
    currentLoanMount = convertTextIntoNumber(currentLoanMount); //converting the text value into a number
    let currentSalary = salaryAmountElement.textContent.slice(1); //taking the text value, removes the first character (euro currency) and then formmats the text into float number
    currentSalary = convertTextIntoNumber(currentSalary); //converting the text value into a number
    let currentBankDeposit = balanceAmountElement.textContent.slice(1); //taking the current bank deposit
    currentBankDeposit = convertTextIntoNumber(currentBankDeposit); //converting the text value into a number

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
            window.alert("There is no loan to pay off !")  //making a pop up message
        }
    }
}