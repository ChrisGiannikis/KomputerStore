function convertTextIntoNumber(text){
    let number = text.split(".");  //splitting with "." to get out the ".00"
    number = number[0].split(","); // splitting with "." to get out the ","
    number = parseInt( number[0] + number[1]); //finally appends the strings to create the number
    return number
}

export default convertTextIntoNumber;