// Input fields
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');

// Form
const form = document.getElementById('myForm');
// Validation colors
const green = "#4CAF50";
const red = "#F44336";

//Validators
function validateFirstName(){
    // check if empty
    if(checkIfEmpty(firstName)) return;

    // check if it has only letters
    if(!checkIfOnlyLetters(firstName)) return;
    return false;
}
function validateLastName(){
    // check if empty
    if(checkIfEmpty(lastName)) return;

    // check if it has only letters
    if(!checkIfOnlyLetters(lastName)) return;
    return false;
}

function validatePassword(){
    // VERIFY IF IT IS EMPTY
    if(checkIfEmpty(password)) return;
    // must be in somethig length
    if(!meetLength(password, 4, 100)) return;
    // check password against our character set
    // 1- a      verifica daca pass contine: litere mici
    // 2- a 1    verifica daca pass contine: litere mici, numere,
    // 3- A a 1  verifica daca pass contine: litere mari, mici, numere,
    // 4- A a 1 @  verifica daca pass contine: litere mari, mici, numere, caractere speciale
    if(!containsCharacters(password, 1)) return;  // if we want that password has any characters we can delete this line !!!!!!!!!!!!!!!!!!!!!!!!

    return true;
}

function validateConfirmPassword(){
    if(password.className !== 'valid'){
        setInvalid(confirmPassword, "Password must be valid");
        return;
    }
    //if they match 
    if(password.value !== confirmPassword.value){
        setInvalid(confirmPassword, "Password must match")
    } else {
        setValid(confirmPassword);
    }
    return true;
}

function validateEmail(){
    if(!containsCharacters(email, 5)) return;
    return true;
}


// Utility functions
function checkIfEmpty(field){
    if(isEmpty(field.value.trim())){
        // set field invalid
        setInvalid(field, `${field.name} must not be empty`);
        return true;
    } else {
        // set field valid
        return false;
    }
}

function isEmpty(value){
    if(value === ''){
        return true;
    } else {
        return false;
    }
}

function setInvalid(field, message){
    field.className = "invalid";
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
}
function setValid(field, message){
    field.className = "valid";
    field.nextElementSibling.innerHTML = '';
    //field.nextElementSibling.style.color = green;
}

function checkIfOnlyLetters(field){
    if(/^[a-zA-Z ]+$/.test(field.value)){  // /^[a-zA-Z ]+$/   este un regular expresion care verifica dacasunt doar litere de la a-z sau A-Z
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters`);
        return false;
    }
}

function meetLength(field, minLength, maxLength){
    if(field.value.length >= minLength && field.value.length < maxLength){
        setValid(field);
        return true;
    } else if(field.value.length < minLength){
        setInvalid(field, `${field.name} must be at least ${minLength} characters long`);
        return false;
    } else { // ne ramane o singura optiune *{field.value.length > maxLength} si nu mai trebuie else if
        setInvalid(field, `${field.name} must be shorter than ${maxLength} characters`)
        return false;
    }
}

function containsCharacters(field, code){
    let regEx;
    switch(code){
        case 1: 
        // letters
        regEx = /(?=.*[a-zA-Z])/;
        return matchWithRregEx(regEx, field, `Must contain at least one letter`);

        case 2:
        // letters and numbers
        regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
        return matchWithRregEx(regEx, field, `Must contain at least one letter and one number `);

        case 3:
        // uppercase, lowercase, numbers
        regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
        return matchWithRregEx(regEx, field, `Must contain at least one uppercase, one lowercase, one number `);

        case 4:
        // uppercase, lowercase, numbers, special character
        regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
        return matchWithRregEx(regEx, field, `Must contain at least one uppercase, one lowercase, one number, one special character `);

        case 5:
        // validate email
        regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return matchWithRregEx(regEx, field, `Must be email format `);
        
        default:
            return false;
    }
}
// function to test against regEx
function matchWithRregEx(regEx, field, errMessage){
    if(field.value.match(regEx)){
        setValid(field);
        return true;
    } else {
        setInvalid(field, errMessage);
        return false;
    }
}






// *************************REGULAR EXPRESSIONS*******************************************
// let regEx
 
// // At least one letter (any case)
// regEx = /(?=.*[a-zA-Z])/
 
// // At least one letter and one number
// regEx = /(?=.*\d)(?=.*[a-zA-Z])/
 
// // At least one uppercase letter, one lowercase letter and one number
// regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
 
// // At least one uppercase letter, one lowercase letter, one number and one special character (symbol)
// regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
 
// // Email regular expression pattern
// regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


// ************site pt a verifica REGULAR EXPRESSION - daca le-am scris bine*******************
// https://regex101.com/