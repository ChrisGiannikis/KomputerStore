**Komputer Store**

This is the first assignment of the FrontEnd section of Noroff FullStack course. It is a dynamic web page using “vanila” Javascript, Html and Css.

The main structure of the project consists of two branches. The secondary branch, is used for merging the commits, working basically as a collective back-up branch and the other is the main branch which is the final product of the assignment.

The project below consists of one html file that represent the structure of the web page, one css file to design and make the webpage responsive and four javascript files that makes dynamic and interactive the webpage content. All the javascript files contains comments that explaining every line of code. The mentioned above javascript files are described below:

1.  **Index.js**: it is the main javascript file that being called from the html to add functionality. This file contains the basic logic and implements processes through functions where they exist in the other files by calling them. This is how modularity is achieved.
2.  **Bank.js**: this javascript file contains the takeLoan() functions with which achieved all the business logic to take a loan.
3.  **Work.js**: contains the functions saveMyMoney() to save the money from work to the bank deposit, payMyWork() to get paid every time the button work is pressed and repayTheLoan() to repay the active loan if exists, with the money from work.
4.  **Laptops.js**: that file contains all the functions needed to manipulate data from the API, to display them at the right fields of the form and to purchase a laptop if a customer can have it, according to his bank balance.
5.  **convertTextIntoNumber.js**: this file provides a function that converts the text contents of html elements into numbers. The function made to help manage the conversion of the text contents because at big numbers (for example above 1,000) the parseFloat() and parseInteger() didn’t formatting right the numbers.
