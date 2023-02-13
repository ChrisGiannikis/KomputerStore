import { takeLoan } from "./bank.js"; //imports takeLoan function from bank.js
import convertTextIntoNumber from "./convertTextIntoNumber.js"; //imports function from convertTextIntoNumber.js 
import { checkToBuy, clearUpTheList, populateTheList, putDetails, putImage, putPrice, putTittle } from "./laptops.js";  //imports functions from laptops.js
import { payMyWork, repayTheLoan, saveMyMoney } from "./work.js"; ////imports functions from work.js

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
let activeLoan = false;  //this is a value that holds if the customer has a loan or not

balanceAmountElement.innerText = euro.format(currentBankDeposit); //converting the current bank deposit into an amount in euro currency
getLoanButton.addEventListener('click', function(){ //when the get a loan button clicked
    takeLoan(loanAmountElement, loanTitleElement, repayButton, balanceAmountElement, euro); //calling this function from bank.js to take a loan
})

//2. The Work
const salaryAmountElement = document.getElementById("salary-amount");  //making a DOM for salary amount
const bankButton = document.getElementById("bank-btn");  //making a DOM for the bank button
const workButton = document.getElementById("work-btn");  //making a DOM for the work button
let currentSalary = salaryAmountElement.textContent;  //taking the current salary amount

salaryAmountElement.innerText = euro.format(currentSalary); //converting the salary amount into an amount with euro currency

bankButton.addEventListener('click', function(){  //when the bank button clicked
    let currentLoanMount = loanAmountElement.textContent.slice(1); //taking the current loan amount;
    currentLoanMount = convertTextIntoNumber(currentLoanMount); //converting the text value into a number
    if(currentLoanMount > 0){  //checking if loan amount is bigger than zero
        activeLoan = true; //sets active loan flag true
    }else{
        activeLoan = false; //sets active loan flag false
    }
    saveMyMoney(salaryAmountElement, balanceAmountElement, loanAmountElement, activeLoan, euro); //calling this function from work.js to save the salary into bank deposit
})

workButton.addEventListener('click', function(){  //when the work button clicked
    payMyWork(salaryAmountElement, euro); //calling this function from work.js to receive payment from work
})

repayButton.addEventListener('click', function(){  //when the repay button clicked

    let currentLoanMount = loanAmountElement.textContent.slice(1); //taking the current loan amount;
    currentLoanMount = convertTextIntoNumber(currentLoanMount); //converting the text value into a number
    if(currentLoanMount > 0){ //checking if loan amount is bigger than zero
        activeLoan = true;  //sets active loan flag true
    }else{
        activeLoan = false; //sets active loan flag false
    }
    //calling this function from work.js to pay the loan with the current cash from work
    repayTheLoan(loanAmountElement, salaryAmountElement, loanTitleElement, repayButton, balanceAmountElement, activeLoan, euro);
})

//3. Laptops
const API_URL = "https://hickory-quilled-actress.glitch.me/computers"; //url of the API
fetch(API_URL) 
    .then(response => {
       return response.json(); //returning the response of the api in json format
    })
    .then(json => {
        renderData(json); //calling the renderData function with the json data
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
        //calling the functions from laptops.js to:
        clearUpTheList();  //clear up the list
        populateTheList(featuresArray[event.target.value]);  // populate the list with the selected laptop features
        putImage(imagesArray[event.target.value]);  //put the image of the selected laptop
        putDetails(descriptionsArray[event.target.value]);  //put the details of the selected laptop
        putTittle(titlesArray[event.target.value]); //put the tittle of the selected laptop
        putPrice(euro.format(pricesArray[event.target.value])); //put the price of the selected laptop
    })

    buyButtonElement.addEventListener('click', function(){  //when the buy now button clicked
        const laptopPriceElement = document.getElementById("price");  //making a DOM for laptop price element
        let price = laptopPriceElement.textContent.slice(1); //taking the price of the current laptop
        checkToBuy(price, euro);  //calling the function to check if i can buy the laptop
    })
  
}
