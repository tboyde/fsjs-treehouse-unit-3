
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


Requirements: 
- Name field can’t be blank
- email address field must contain properly formatted email address (followed by @ + .com domain name)
- The register for activities section must have one activity selected  

IF and only IF, credit card is the selected payment method, then: 
- card number field must contain 13 - 16 digits with no dashes
- zip code must be a 5 digit number 
- cvv field must contain a 3 digit number 
*/
const form = document.querySelector('form'); 

//event listener for detecting changes once 'submit' button is pressed on the form
form.addEventListener('submit', (e) => {
    // variables that will be referenced within this listener
    const nameEntered = nameField.value; 
    const nameRegex = /^[A-Za-z]+/; 

    const emailAddress = document.querySelector('#email').value;
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/; 

    const ccNumber = document.querySelector('.cc-num').value;
    const ccRegex = /(^\d{13,16}$)/; 

    const zipCode = document.querySelector('#zip').value;
    const zipRegex = /(^\d{5}$)/; 
    console.log(zipCode); 


    const cvvCode = document.querySelector('#cvv').value;
    const cvvRegex = /(^\d{3}$)/;

    // function for testing validation with regex

    if (nameRegex.test(nameEntered)){
        e.preventDefault(); 
    }
}); 



/*
Accessbility: 
*/

/*
References: 
    1. Woods, Andrew. “Name Validation Regex for People's Names: NYC Php Developer: Andrew Woods.” NYC PHP Developer | 
    Andrew Woods, 19 Sept. 2018, https://andrewwoods.net/blog/2018/name-validation-regex/. 

    2. Landup, David. “Validate Email Addresses with Regular Expressions in JavaScript.” Stack Abuse, Stack Abuse, 17 Oct. 2021,
     https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/. 
 
    3. 

    */