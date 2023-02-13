import convertTextIntoNumber from "./convertTextIntoNumber.js";

export function populateTheList(array){
    const listElement = document.getElementById("laptop-features-list");  //making a DOM for features list

    for (let feature of array){  //for each element in list of features of the given laptop
        const listItem = document.createElement('li');  //creating a list element
        listItem.innerText = feature;  //for each list item put the  element 
        listElement.appendChild(listItem);  //adding the item at the list
    }
}

export function clearUpTheList(){
    const listElement = document.getElementById("laptop-features-list");  //making a DOM for features list
    
    for(let i=0; i < listElement.childElementCount; i++){  //for loop in the size of the list 
        
        let child = listElement.lastElementChild;  //gets the last schild element of the list

        while(child){
            listElement.removeChild(child);  //removing the last child of the list
            child = listElement.lastElementChild; //getting the last schild element of the list
        }
    }
}

export function putImage(imageUrl){
    const imageElement = document.getElementById("image");  //making a DOM for the image element
    imageElement.src = "https://hickory-quilled-actress.glitch.me/" + imageUrl;  //changing the image source
}

export function putDetails(details){
    const detailsElement = document.getElementById("laptop-details"); //making a DOM for the details section element
    detailsElement.innerText = details;
}

export function putTittle(title){
    const laptopTittleElement = document.getElementById("laptop-name");  //making a DOM for laptop tittle element
    laptopTittleElement.innerText = title;
}

export function putPrice(price){
    const laptopPriceElement = document.getElementById("price");  //making a DOM for laptop price element
    laptopPriceElement.innerText = price;
}

export function checkToBuy(price, euro){
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