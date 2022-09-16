
//When page loads, the first form input is selected and is focused on
const nameField = document.getElementById('name'); 
nameField.focus(); 

/*
Job Role: 
    By default, the input field associated with the "Other" option will be hidden when form first loads. 
    The select element for Job Role will listen for user changes. When change is detected, 
    the text field associated with the "Other" job role will either appear or be hidden. 
*/
const otherJob = document.querySelector('#other-job-role'); 
const jobOptions = document.querySelector('#title'); 
otherJob.style.visibility = 'hidden'; 

//event listener for detecting changes in Job Role Dropdown
jobOptions.addEventListener('change', (e) => {
    const jobSelect = e.target.value; 
//function that checks user selection and determines if "Other" input will be displayed
    function selectedJob(entry){ 
        if (entry === 'other'){
            otherJob.style.visibility = ''; 
        } else {
            otherJob.style.visibility = 'hidden'; 
        }
    }; 
    selectedJob(jobSelect); 
}); 

/*
T-Shirt Info: 
    By default, the "Color" dropdown will be disabled and only re-enabled when a user chooses a shirt design. 
    When user selected a t-shirt design, a limited amount of colors will appear in the color dropdown for the user to select. 
    The select element for design will listen for changes and once those changes are detected,
    the select field associated with "Color" will show a limited amount of colors avaialble for each design. 
*/
const designOptions = document.querySelector('#design'); 

const colorOptions = document.querySelector('#color'); 
colorOptions.disabled = true;

//event listener for detecting changes in Design dropdown
designOptions.addEventListener('change', (e)=>{
    const color = colorOptions.children; 

    for (let i = 0; i < color.length; i++){
        const colorValue = color[i].getAttribute('data-theme'); 
        const selectedDes = e.target.value; 

        if (selectedDes === colorValue){
            colorOptions.disabled = false; 
            color[i].hidden = false; 
            color[i].setAttribute('selected', true); 
        } else {
            color[i].hidden = true; 
            color[i].removeAttribute('selected'); 
        } 
    }
}); 

/*
Registration For Activities: 
    For each activity that the user selects in the "Register For Activities", the total cost at the bottom of the section update itself. 
    If a user checks an activity, the total cost will increase by the value associated with the activity. If a user unchecks an activitiy, the total
    cost will decrease by the value associated with the unchecked activity.     
*/
const activityRegister = document.querySelector('.activities'); 
const updateCost = document.querySelector('.activities-cost'); 
let totalCost = 0; 

//event listener for detecting changes in Register For Activities section
activityRegister.addEventListener('change', (e) => {
    activityCost = +e.target.getAttribute('data-cost'); //---> plus added to change value into integer

        if(e.target.checked){ 
            totalCost += activityCost; 
        } else {
            totalCost -= activityCost; 
        }
        updateCost.innerHTML = 
        `<span>Total: $${totalCost}</span>
        `; 
}); 

/*
Payment Info: 
    When the user goes to enter their payment information, the credit card option will be selected by default. 
    If the user choose another payment methods, the form will then change and hide all the payment sections that
    are not associated with the selected method of payment. 
*/
const paymentMethod = document.querySelector('#payment');
paymentMethod[1].setAttribute('selected', true); 

const payPal = document.querySelector('.paypal'); 
payPal.style.visibility = 'hidden'; 

const bitCoin = document.querySelector('.bitcoin');
bitCoin.style.visibility = 'hidden'; 

//selecting elements related to the credit card payment field
const creditCard = document.querySelector('#credit-card');
const yearBox = document.querySelector('.year-box'); 
const creditCardBox = document.querySelector('.credit-card-box');
const zipBox = document.querySelector('.zip-box');
const cvv = document.querySelector('.cvv-box');    

//event listener for detecting changes in Payment Method 
paymentMethod.addEventListener('change', (e) => {
    preferredMethod = paymentMethod.children; 

    for (let i = 0; i < preferredMethod.length; i++){
        const selectedMethod = e.target.value; 

        if (selectedMethod === preferredMethod[1].value){
            creditCard.style.visibility = ''; 
            yearBox.style.visibility = ''; 
            creditCardBox.style.visibility = ''; 
            zipBox.style.visibility = ''; 
            cvv.style.visibility = '';
            //shows all the credit card related elements and hides the other field related to other payment methods. 
            payPal.style.visibility = 'hidden'; 
            bitCoin.style.visibility = 'hidden'; 
        } else if (selectedMethod === preferredMethod[2].value){
            payPal.style.visibility = ''; 
            // shows paypal related payment info, hides other payment options
            bitCoin.style.visibility = 'hidden'; 
            creditCard.style.visibility = 'hidden'; 
            yearBox.style.visibility = 'hidden'; 
            creditCardBox.style.visibility = 'hidden'; 
            zipBox.style.visibility = 'hidden'; 
            cvv.style.visibility = 'hidden';
        } else {
            bitCoin.style.visibility = ''; 
            // shows bitcoin related payment info, hides other payment options
            payPal.style.visibility = 'hidden';
            creditCard.style.visibility = 'hidden'; 
            yearBox.style.visibility = 'hidden'; 
            creditCardBox.style.visibility = 'hidden'; 
            zipBox.style.visibility = 'hidden'; 
            cvv.style.visibility = 'hidden';
        }
    }
}); 

/*
Form Validation: 
    This section validates several fields in order for the form to be successfully processed. 
    An event listener looks to detect any errors with the name, email address, credit card info, and checks to 
    see if an event has been selected to properly submit the form. 
*/

// the variable for name: nameField
const emailAddress = document.querySelector('#email'); 
// the variable for registering for activities is: activityRegister
const ccNumber = document.querySelector('#cc-num'); 
const zipCode = document.querySelector('#zip'); 
const cvvCode = document.querySelector('#cvv')
const form = document.querySelector('form'); 

// Accessbility Helper Functions, Valid or not valid 
const isValid = (element) => {
    element.parentElement.classList.add('valid'); 
    element.parentElement.classList.remove('not-valid'); 
    element.parentElement.lastElementChild.hidden = false; 
}

const notValid = (element) => {
    element.parentElement.classList.add('valid'); 
    element.parentElement.classList.remove('not-valid'); 
    element.parentElement.lastElementChild.hidden = true; 
}

// Helper Functions - all fields that are required to be validated 
const nameValidation= () => {
    const nameEntered = nameField.value; 
    const nameIsValid = /^[A-Za-z]+/.test(nameEntered); 

    if (nameIsValid){
        isValid(nameEntered); 
    } else {
        notValid(nameEntered); 
    }

    return nameIsValid; 
}

const emailValidation = () => {
    const emailEntered = emailAddress.value; 
    const emailIsValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(emailEntered); 

    if (emailIsValid){
        isValid(emailEntered)
    } else {
        notValid(emailEntered); 
    }

    return emailIsValid; 
}


const cardValidation = () => {
    const cardNumber = ccNumber.value; 
    const cardNumValid = /(^\d{13,16}$)/.test(cardNumber); 

    if (cardNumValid){
        isValid(cardNumber); 
    } else {
        notValid(cardNumber); 
    }

    return cardNumValid; 
}

const zipValidation = () => {
    const zip = zipCode.value; 
    const zipIsValid = /(^\d{5}$)/.test(zip); 

    if (zipIsValid){
        isValid(zip); 
    } else {
        notValid(zip); 
    }

    return zipIsValid; 
}

const cvvValidation = () => {
    const cvv = cvvCode.value; 
    const cvvIsValid = /(^\d{3}$)/.test(cvv); 
    
    if (cvvIsValid){
        isValid(cvv); 
    } else {
        notValid(cvv); 
    }

    return cvvIsValid; 
}

//event listener for detecting changes once 'submit' button is pressed on the form
form.addEventListener('submit', (e) => {

    //function for checking validation in text-based fields
    function checkValidation(method){
        if (!method){
            e.preventDefault(); 
        }
    }

    //checking all fields supplied for form
    checkValidation(nameValidation()); 
    checkValidation(emailValidation()); 

    //function for checking if activity (checkbox) was selected for activities req for form submission
    function valEvent(){
        var checkBoxes = document.querySelectorAll('input[type="checkbox"]'); 
        var numChecked = 0; 
        for (let i = 0; i < checkBoxes.length; i++ ){
            if (checkBoxes[i].checked){
                numChecked += 1; 
            } 
        }
        if (numChecked < 1 ){
            e.preventDefault(); 
            notValid(checkBoxes); 
        } else {
            isValid(checkBoxes); 
        }
    }
    //checking to see if at least one event was selected 
    valEvent(); 

    //function used to check all the fields related to the credit card information 
    function valCard(){
        const properPayment = paymentMethod[1];  
        if (properPayment.selected){
            checkValidation(cardValidation()); 
            checkValidation(zipValidation()); 
            checkValidation(cvvValidation()); 
       } 
    }
    valCard(); 
}); 

/*
Accessbility: 
        - Make the focus states of the activities more obvious to all users. 
        - Make the form validation errors obvious to all users. 

        In this section, you must: 
        First Part: (Make focus states obvious to users)
        - make checkbox input listen for the focus and blur events
        - when focus event is detected, add .focus to checkbox input’s element from label
        - when blur is detected, remove the .focus class name from label

        Second Part: (Make the form validation errors obvious to all users)
        - add the .not-valid className to the parent element of the form field or section
        - remove the .valid className from the parent element of form or field section 
        - display the .hint element associated with the form field or section. (parentElement and lastElementChild are helpful here). 

        Second Part - A: (if a required form field/section is valid) 
        - Add the .valid className to parent element of the form field or section
*/
const checkBoxes = document.querySelectorAll('input[type="checkbox"]'); 

//Making focus states more obvious to all users 
for (let i = 0; i < checkBoxes.length; i++){
    checkBoxes[i].addEventListener('focus',(e) => {
        const elementParent = e.target.parentElement; 
        elementParent.classList.add('focus'); 
        console.log(elementParent.classList); 
    }); 
    
    checkBoxes[i].addEventListener('blur', (e) => { 
        const focusedElement = document.querySelector('.focus'); 
        if (focusedElement){
        focusedElement.classList.remove('focus');  
        }
    }); 
}




/*
References: 
    1. Woods, Andrew. “Name Validation Regex for People's Names: NYC Php Developer: Andrew Woods.” NYC PHP Developer | 
    Andrew Woods, 19 Sept. 2018, https://andrewwoods.net/blog/2018/name-validation-regex/. 

    2. Landup, David. “Validate Email Addresses with Regular Expressions in JavaScript.” Stack Abuse, Stack Abuse, 17 Oct. 2021,
    https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/.
 
    3. Stack Overflow: https://stackoverflow.com/questions/22238368/how-can-i-require-at-least-one-checkbox-be-checked-before-a-form-can-be-submitte

    */