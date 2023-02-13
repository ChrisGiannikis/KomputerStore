
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

    currentLoanMount = loanAmountElement.textContent.slice(1); // //taking the text value, removes the first character (euro currency)
    currentLoanMount = convertTextIntoNumber(currentLoanMount); //converting the text value into a number 
    currentBankDeposit = balanceAmountElement.textContent.slice(1); //taking the current bank deposit
    currentBankDeposit = convertTextIntoNumber(currentBankDeposit); //converting the text value into a number
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
    currentSalary = salaryAmountElement.textContent.slice(1); //taking the text value, removes the first character (euro currency) and then formmats the text into float number
    currentSalary = convertTextIntoNumber(currentSalary); //converting the text value into a number
    currentBankDeposit = balanceAmountElement.textContent.slice(1); //taking the current bank deposit
    currentBankDeposit = convertTextIntoNumber(currentBankDeposit); //converting the text value into a number
    currentLoanMount = loanAmountElement.textContent.slice(1); //taking the current loan amount;
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
})

workButton.addEventListener('click', function(){  //when the work button clicked
    currentSalary = salaryAmountElement.textContent.slice(1); //taking the text value, removes the first character (euro currency) and then formmats the text into float number
    currentSalary = convertTextIntoNumber(currentSalary); //converting the text value into a number
    let sumOfSalary = currentSalary + 100;  //adding 100 to the current salary
    salaryAmountElement.innerText = euro.format(sumOfSalary);  //formating the total amount into euro currency
})

repayButton.addEventListener('click', function(){  //when the repay button clicked
    currentLoanMount = loanAmountElement.textContent.slice(1); //taking the current loan amount;
    currentLoanMount = convertTextIntoNumber(currentLoanMount); //converting the text value into a number
    currentSalary = salaryAmountElement.textContent.slice(1); //taking the text value, removes the first character (euro currency) and then formmats the text into float number
    currentSalary = convertTextIntoNumber(currentSalary); //converting the text value into a number
    currentBankDeposit = balanceAmountElement.textContent.slice(1); //taking the current bank deposit
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
            window.alert("There is no loan to pay off !")
        }
    }
})

//3. Laptops
const API_URL = "https://hickory-quilled-actress.glitch.me/computers";
fetch(API_URL)
    .then(response => {
        console.log(response);
       return response.json(); 
    })
    .then(json => {
        renderData(json);
    })

function renderData(data){
    let titlesArray = [data.length]; //making an array to keep the titles of the laptops
    let descriptionsArray = [data.length]; //making an array to keep the descriptions of the laptops
    let featuresArray = [data.length];  //making an array to keep a list of features for each laptop
    let imagesArray = [data.length];  //making an array to keep the image sources
    let pricesArray = [data.length];  //making an array to keep the prices of the lapotps

    for (let i=0; i < data.length; i++){ // for loop in datas size
        titlesArray[i] = data[i].title;  //put at current place of the array the title of the laptop with current id 
        descriptionsArray[i] = data[i].description; //put at current place of the array the description of the laptop with current id
        featuresArray[i] = data[i].specs;  //put at current place of the array a list with the specs of of the laptop with current id
        imagesArray[i] = data[i].image;  //put at current place of the array an image source of the laptop with current id
        pricesArray[i] = data[i].price; //put at current place of the array the price of the laptop with current id
    }

    const selectLaptopsElement = document.getElementById("laptops"); //making a DOM for select element
    const buyButtonElement = document.getElementById("buy-btn"); //making a DOM for buy now button;

    for (let i=0; i < titlesArray.length; i++){
    const option = document.createElement('option');  //creating new option element
    const optionText = document.createTextNode(titlesArray[i]); //creating new text node for option element
    option.appendChild(optionText);  //adding option text
    option.setAttribute('value', i);  //setting value attribute
    selectLaptopsElement.appendChild(option); //adding the element into the select list
    }

    populateTheList(featuresArray[0]);  //populating the list with the specs of the first laptop
    putImage(imagesArray[0]); //putting the image of the first laptop
    putDetails(descriptionsArray[0]);  //put the details of the first laptop
    putTittle(titlesArray[0]); //put the tittle of the first laptop
    putPrice(euro.format(pricesArray[0]));  //put the price of the first laptop

    selectLaptopsElement.addEventListener('change', (event) =>{  //on click of the select
        clearUpTheList();  //clear up the list
        populateTheList(featuresArray[event.target.value]);  //populate the list with the selected laptop features
        putImage(imagesArray[event.target.value]);  //put the image of the selected laptop
        putDetails(descriptionsArray[event.target.value]);  //put the details of the selected laptop
        putTittle(titlesArray[event.target.value]); //put the tittle of the selected laptop
        putPrice(euro.format(pricesArray[event.target.value])); //put the price of the selected laptop
    })

    buyButtonElement.addEventListener('click', function(){  //when the buy now button clicked
        const laptopPriceElement = document.getElementById("price");  //making a DOM for laptop price element
        let price = laptopPriceElement.textContent.slice(1); //taking the price of the current laptop
        console.log(price);
        checkToBuy(price);  //calling the function to check if i can buy the laptop
    })
  
}

function populateTheList(array){
    const listElement = document.getElementById("laptop-features-list");  //making a DOM for features list

    for (let feature of array){  //for each element in list of features of the given laptop
        const listItem = document.createElement('li');  //creating a list element
        listItem.innerText = feature;  //for each list item put the  element 
        listElement.appendChild(listItem);  //adding the item at the list
    }
}

function clearUpTheList(){
    const listElement = document.getElementById("laptop-features-list");  //making a DOM for features list
    
    for(let i=0; i < listElement.childElementCount; i++){  //for loop in the size of the list 
        
        let child = listElement.lastElementChild;  //gets the last schild element of the list

        while(child){
            listElement.removeChild(child);  //removing the last child of the list
            child = listElement.lastElementChild; //getting the last schild element of the list
        }
    }
}

function putImage(imageUrl){
    const imageElement = document.getElementById("image");  //making a DOM for the image element
    imageElement.src = "https://hickory-quilled-actress.glitch.me/" + imageUrl;  //changing the image source
}

function putDetails(details){
    const detailsElement = document.getElementById("laptop-details"); //making a DOM for the details section element
    detailsElement.innerText = details;
}

function putTittle(title){
    const laptopTittleElement = document.getElementById("laptop-name");  //making a DOM for laptop tittle element
    laptopTittleElement.innerText = title;
}

function putPrice(price){
    const laptopPriceElement = document.getElementById("price");  //making a DOM for laptop price element
    laptopPriceElement.innerText = price;
}

function checkToBuy(price){
    const balanceAmountElement = document.getElementById("balance-amount"); //making a DOM for balance amount
    let deposit = balanceAmountElement.textContent.slice(1); //taking the current bank deposit
    deposit = convertTextIntoNumber(deposit); //converting the text value into a number
    let priceNumber = convertTextIntoNumber(price); //converting the text value into a number

    if (deposit < priceNumber){  //if there are not enough money in the “Bank”
        window.alert("Your current bank balance is not sufficient for this purchase."); //show an alert window
    }else{ //if the money in the bank are sufficient
        balanceAmountElement.innerText = euro.format(deposit - priceNumber); //update the new balance
        window.alert("Purchase succesfull! \n You are now the owner of the new laptop!"); //shows an alert window with succes message
    }
}

function convertTextIntoNumber(text){
    let number = text.split(".");  //splitting with "." to get out the ".00"
    number = number[0].split(","); // splitting with "." to get out the ","
    number = parseInt( number[0] + number[1]); //finally appends the strings to create the number
    return number
}