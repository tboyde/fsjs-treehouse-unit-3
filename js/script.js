
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
        } else if (selectedDes !== colorValue){
            color[i].hidden = true; 
            color[i].removeAttribute('selected'); 
        } else {
            colorOptions.disabled = true; 
        }; 
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
    activityCost = +e.target.getAttribute('data-cost'); //---> plus element added to change value into integer

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
*/

/*
Section 
*/

