/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
By Stheven Cabral
******************************************/
/*jshint esversion: 6 */

/***
 * 'form' global variable captures the form element.
 * 'nameInput' global variable captures the '#name' input element.
 * 'otherJobRole' global variable captures the '#title' select element.
 * 'colors' global variable captures the '#colors-js-puns' div for t-shirt colors.
 * 'selectShirtTheme' global variable captures the '#design' select element.
 * 'shirtThemeOptions' global variable captures '#design' theme options in an array.
 * 'activities' global variable captures the '.activities' fieldset.
 * 'activityLabel' global variable captures all activities in an array.
 * 'activityCheckboxes' global variable captures checkbox input for all activities.
 * 'totalActivityCost' set to 0 and used to display total cost of chosen activities.
 * 'payment' global variable captures the '#payment' select element.
 ***/

const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const otherJobRole = document.getElementById('other-title');
const colors = document.getElementById('colors-js-puns');
const selectShirtTheme = document.getElementById('design');
const shirtThemeOptions = document.querySelectorAll('#design option');
const activities = document.querySelector('.activities');
const activityLabel = document.querySelectorAll('.activities label');
const activityCheckboxes = document.querySelectorAll('.activities input');
let totalActivityCost = 0;
const payment = document.getElementById('payment');


/***
 * 'createFocus' function - adds focus to an element.
 * @param {input} nameInput - accepts the input element to focus on.
 * Called 'createFocus' function on 'nameInput' global variable.
 ***/

function createFocus(inputElement) {
    inputElement.focus();
}

createFocus(nameInput);


/***
 * 'hideOtherRoleInput' function - hides the '#other=title' text input.
 * Called the 'hideOtherRoleInput' function.
 ***/

function hideOtherRoleInput() {
    otherJobRole.style.display = 'none';
}

hideOtherRoleInput();


/***
 * 'displayOtherRoleInput' function - displays the '#other=title' text input if a user selects the value 'other'.
 * Called the 'displayOtherRoleInput' function.
 ***/

function displayOtherRoleInput() {
    const jobInput = document.getElementById('title');
    jobInput.addEventListener('change', () => {
        if (jobInput.value === 'other') {
            otherJobRole.style.display = 'inherit';
        } else {
            otherJobRole.style.display = 'none';
        }
    });
}

displayOtherRoleInput();


/***
 * 'hideShirtColors' function - hides the T-shirt color label and select menu.
 * The function also disables the 'Select Theme" option so it isn't clickable.
 * Called the 'hideShirtColors' function.
 ***/

function hideShirtColors() {
    if (selectShirtTheme.value === 'Select Theme') {
        colors.style.display = 'none';
    }
    shirtThemeOptions[0].disabled = true;
}

hideShirtColors();


/***
 * 'shirtColors' function - displays the T-shirt color label and select menu when the design option chosen 
    is anything other than 'Select Theme'. After a user selects a theme, only color options that match the design selected are displayed.
 * Called the 'shirtColors' function.
 ***/

function shirtColors() {
    const selectColor = document.getElementById('color');
    const colorOptions = document.querySelectorAll('#color option');

    selectShirtTheme.addEventListener('change', () => {
        if (selectShirtTheme.value === 'js puns') {
            selectColor.value = colorOptions[0].value;
            for (let p = 0; p < colorOptions.length; p += 1) {
                if (p > 2) {
                    colorOptions[p].style.display = 'none';
                } else {
                    colorOptions[p].style.display = 'inherit';
                }
            }
        } else if (selectShirtTheme.value === 'heart js') {
            selectColor.value = colorOptions[3].value;
            for (let h = 0; h < colorOptions.length; h += 1) {
                if (h <= 2) {
                    colorOptions[h].style.display = 'none';
                } else {
                    colorOptions[h].style.display = 'inherit';
                }
            }
        }
        if (selectShirtTheme.value === 'js puns' || selectShirtTheme.value === 'heart js') {
            shirtThemeOptions[0].style.display = 'none';
            colors.style.display = 'inherit';
        } 
    });
}

shirtColors();


/***
 * The following code adds a div element that will contain the total cost of the checked activities.
 ***/

const totalDisplay = document.createElement('div');
activities.appendChild(totalDisplay);
totalDisplay.style.visibility = 'visible';
totalDisplay.style.color = '#395341';
totalDisplay.style.fontWeight = 'bold';


/***
 * Added an an event listener to the '.activities' fieldset that disables events that have conflicting dates and times with
   user checked events.
 * In addition the event listener contains if else statements that displays the total cost of checked activities.
 ***/

activities.addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedDayTime = clicked.getAttribute('data-day-and-time');
    const clickedCost = clicked.getAttribute('data-cost');

    for (let a = 0; a < activityCheckboxes.length; a += 1) {
        const checkboxDayTime = activityCheckboxes[a].getAttribute('data-day-and-time');
        if (clickedDayTime === checkboxDayTime && clicked !== activityCheckboxes[a]) {
            if (clicked.checked) {
                activityCheckboxes[a].disabled = true;
                activityLabel[a].style.opacity = "0.4";
            } else {
                activityCheckboxes[a].disabled = false;
                activityLabel[a].style.opacity = "1.0";
            }
        }
    }
    if (clicked.checked) {
        totalActivityCost += parseInt(clickedCost);
        totalDisplay.textContent = `Total Price: $${totalActivityCost}.00`;
    } else {
        totalActivityCost -= parseInt(clickedCost);
        totalDisplay.textContent = `Total Price: $${totalActivityCost}.00`;
    }
});


/***
 * The following code hides the 'Select Payment Method' option so the user can't select it.
 ***/

const selectMethodOption = document.querySelector('option[value="select method"]');
selectMethodOption.style.display = 'none';


/***
 * The following code makes credit card the default payment option.
 ***/

payment.value = document.querySelector('option[value="credit card"]').value;


/***
 * 'adjustPaymentMethod' function - hides the '#paypal' and '#bitcoin' payment options initially. It displays
   the appropriate option based on what the user selects as their preferred payment option in the '#payment' select input. 
 * Called the 'adjustPaymentMethod' function.
 ***/

function adjustPaymentMethod() {
    const creditCard = document.getElementById('credit-card');
    const paypal = document.getElementById('paypal');
    const bitcoin = document.getElementById('bitcoin');
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';

    payment.addEventListener('change', ()=> {
        if (payment.value === 'paypal') {
            creditCard.style.display = 'none';
            paypal.style.display = 'inherit';
            bitcoin.style.display = 'none';
        } else if (payment.value === 'bitcoin') {
            creditCard.style.display = 'none';
            paypal.style.display = 'none';
            bitcoin.style.display = 'inherit';
        } else {
            creditCard.style.display = 'inherit';
            paypal.style.display = 'none';
            bitcoin.style.display = 'none';
        }
    });
    
}

adjustPaymentMethod();


/***
 * The following code appends a span element to the name input label. The  span contains any name input errors.
 ***/


const nameLabel = document.getElementById('name-label');
const nameErrorSpan = document.createElement('span');
nameErrorSpan.style.color = 'red';
nameErrorSpan.style.fontStyle = 'italic';
nameLabel.appendChild(nameErrorSpan);


/***
 * 'nameValidator' function - validates if the user entered a name. In addition, adds red border indicators and a message during a validation error.
 * @param {object} event - accepts an event object.
 ***/

function nameValidator() {
    const nameInputValue = nameInput.value;
    if (nameInputValue.length > 0) {
        nameInput.style.borderColor = '#395341';
        nameErrorSpan.textContent = ''; 
        return true;
    } else {
        nameLabel.scrollIntoView();
        nameInput.style.borderColor = 'red';
        nameErrorSpan.innerHTML = '<br>Enter your full name.';
    }
}


/***
 * The following code appends a span element to the email input label. The  span contains any email input errors.
 ***/

const emailLabel = document.getElementById('email-label');
const emailInput = document.getElementById('mail');
const emailErrorSpan = document.createElement('span');
emailErrorSpan.style.color = 'red';
emailErrorSpan.style.fontStyle = 'italic';
emailLabel.appendChild(emailErrorSpan);


/***
 * 'emailValidator' function - validates if the user entered a valid email. In addition, adds red border indicators and a message during a validation error.
 * @param {object} event - accepts an event object.
 ***/

function emailValidator() {
    const emailInputValue = emailInput.value;
    // Email regular expression from emailregex.com
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(emailInputValue)) {
        emailInput.style.borderColor = '#395341';
        emailErrorSpan.innerHTML = '';
        return true;
    } else {
        emailLabel.scrollIntoView();
        emailInput.style.borderColor = 'red';
        emailErrorSpan.innerHTML = '<br>Enter a valid email format: name@website.com';
    }
}


/***
 * The following code appends a span element to the activities fieldset legend. The span contains any activity input errors.
 ***/

const activitiesLegend = document.querySelector('.activities legend');
const activitiesErrorSpan = document.createElement('span');
activitiesErrorSpan.style.color = 'red';
activitiesErrorSpan.style.fontStyle = 'italic';
activitiesErrorSpan.style.fontSize = '.75em';
activitiesErrorSpan.style.fontWeight = 'normal';
activitiesLegend.appendChild(activitiesErrorSpan);


/***
 * 'activitiesValidator' function - validates if the user checked any activities. In addition, adds a message during a validation error.
 * @param {object} event - accepts an event object.
 ***/

function activitiesValidator() {
    let numActivities = 0;
    for (let i = 0; i < activityCheckboxes.length; i += 1) {
        if (activityCheckboxes[i].checked) {
            numActivities += 1;
        }
    }
    if (numActivities === 0) {
        activitiesLegend.scrollIntoView();
        activitiesErrorSpan.innerHTML = '<br>Choose at least 1 activity.';
    } else {
        activitiesErrorSpan.innerHTML = '';
        return true;
    }
}


/***
 * The following code appends a p element as a child of the credit card #, zip code, and cvv containers.
 * The p elements will contain validation error messages for the credit card #, zip code, and cvv inputs.
 ***/

const ccNumContainer = document.querySelector('.cc');
const ccNumInput = document.getElementById('cc-num');
const zipContainer = document.querySelector('.zipcode');
const zipInput = document.getElementById('zip');
const cvvContainer = document.querySelector('.cvv-num');
const cvvInput = document.getElementById('cvv');
const ccNumError = document.createElement('p');
const zipError = document.createElement('p');
const cvvError = document.createElement('p');
ccNumError.style.color = 'red';
ccNumError.style.fontStyle = 'italic';
ccNumError.style.margin = '0px 0px 16px';
zipError.style.color = 'red';
zipError.style.fontStyle = 'italic';
zipError.style.margin = '0px 0px 16px';
cvvError.style.color = 'red';
cvvError.style.fontStyle = 'italic';
cvvError.style.margin = '0px';
ccNumContainer.appendChild(ccNumError);
zipContainer.appendChild(zipError);
cvvContainer.appendChild(cvvError);


/***
 * 'ccNumValidator' function - validates if the user entered a valid credit card number.
   In addition, the function adds red border indicators and a message during a validation error.
   The function displays an error when the input is blank during form submit and a different error when
   the required digits are not met when a user is typing.
 * @param {object} event - accepts an event object.
 ***/

function ccNumValidator() {
    const ccNumInputValue = ccNumInput.value;
    if (/^\d{13,16}$/.test(ccNumInputValue)) {
        ccNumInput.style.borderColor = '#395341';
        ccNumError.innerHTML = '';
        return true;
    } else if (ccNumInputValue.length === 0) {
        ccNumContainer.scrollIntoView();
        ccNumInput.style.borderColor = 'red';
        ccNumError.innerHTML = 'Enter credit card number.';
    } else {
        ccNumContainer.scrollIntoView();
        ccNumInput.style.borderColor = 'red';
        ccNumError.innerHTML = 'Enter a 13 to 16 digit number.';
    }
}


/***
 * 'zipValidator' function - validates if the user entered a valid zip code.
   In addition, the function adds red border indicators and a message during a validation error.
   The function displays an error when the input is blank during form submit and a different error when
   the required digits are not met when a user is typing.
 * @param {object} event - accepts an event object.
 ***/

function zipValidator() {
    const zipInputValue = zipInput.value;
    if (/^\d{5}$/.test(zipInputValue)) {
        zipInput.style.borderColor = '#395341';
        zipError.innerHTML = '';
        return true;
    } else if (zipInputValue.length === 0) {
        ccNumContainer.scrollIntoView();
        zipInput.style.borderColor = 'red';
        zipError.innerHTML = 'Enter zip code.';
    } else {
        ccNumContainer.scrollIntoView();
        zipInput.style.borderColor = 'red';
        zipError.innerHTML = 'Enter a 5 digit zipcode.';
    }
}


/***
 * 'cvvValidator' function - validates if the user entered a valid credit card cvv.
   In addition, the function adds red border indicators and a message during a validation error.
   The function displays an error when the input is blank during form submit and a different error when
   the required digits are not met when a user is typing.
 * @param {object} event - accepts an event object.
 ***/

function cvvValidator() {
    const cvvInputValue = cvvInput.value;
    if (/^\d{3}$/.test(cvvInputValue)) {
        cvvInput.style.borderColor = '#395341';
        cvvError.innerHTML = '';
        return true;
    } else if (cvvInputValue.length === 0) {
        ccNumContainer.scrollIntoView();
        cvvInput.style.borderColor = 'red';
        cvvError.innerHTML = 'Enter card cvv.';
    } else {
        ccNumContainer.scrollIntoView();
        cvvInput.style.borderColor = 'red';
        cvvError.innerHTML = 'Enter at least 3 digits.';
    }
}


/***
 * The following event listener calls the name, email, activities, and credit card payment 
   validation functions during a form submit event. If there are any errors, the user can't 
   submit the form.
 ***/

form.addEventListener('submit', (e) => {
    if (payment.value === 'credit card') {
        cvvValidator();
        zipValidator();
        ccNumValidator();
    }
    
    activitiesValidator();
    emailValidator();
    nameValidator();

    if (cvvValidator() !== true || 
        zipValidator() !== true || 
        ccNumValidator() !== true || 
        activitiesValidator() !== true || 
        emailValidator() !== true || 
        nameValidator() !== true) {
            e.preventDefault();
    }
});


/***
 * The following credit card number, zip code, and cvv input event listeners call validator functions
   when the user types in the input fields. 
 ***/

ccNumInput.addEventListener('keyup', () => {
    ccNumValidator();
});

zipInput.addEventListener('keyup', () => {
    zipValidator();
});

cvvInput.addEventListener('keyup', () => {
    cvvValidator();
});