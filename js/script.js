/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/


/***
 * 'nameInput' global variable captures the '#name' input element.
 * 'otherJobRole' global variable captures the '#title' select element.
 * 'colors' global variable captures the '#colors-js-puns' div for t-shirt colors.
 * 'selectShirtTheme' global variable captures the '#design' select element.
 * 'activities' global variable captures the '.activities' fieldset.
 * 'activityLabel' global variable captures all activities in an array.
 * 'activityCheckboxes' global variable captures checkbox input for all activities.
 * 'totalActivityCost' set to 0 and used to display total cost of chosen activities.
 ***/

const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const otherJobRole = document.getElementById('other-title');
const colors = document.getElementById('colors-js-puns');
const selectShirtTheme = document.getElementById('design');
const activities = document.querySelector('.activities');
const activityLabel = document.querySelectorAll('.activities label');
const activityCheckboxes = document.querySelectorAll('.activities input');
let totalActivityCost = 0;


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
 * Called the 'hideShirtColors' function.
 ***/

function hideShirtColors() {
    if (selectShirtTheme.value === 'Select Theme') {
        colors.style.display = 'none';
    }
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
            colors.style.display = 'inherit';
        } else {
            hideShirtColors();
        }
    });
}

shirtColors();


/***
 * The following code adds a div element that will contain the total cost of chosen activities.
 ***/

const totalDisplay = document.createElement('div');
activities.appendChild(totalDisplay);
totalDisplay.style.visibility = 'visible';
totalDisplay.style.color = 'rgba(6, 49, 68, 0.9)';
totalDisplay.style.fontWeight = 'bold';


/***
 * Added an an event listener to the '.activties' fieldset that disables events that conflict with
   user chosen events.
 * Added if else statements that displays the total cost of chosen activities.
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
 * 'adjustPaymentMethod' function - hides the '#paypal' and '#bitcoin' payment options initially. It displays
   the appropriate option based on what the user selects as their preferred payment option in the '#payment' select input. 
 * Called the 'adjustPaymentMethod' function.
 ***/

function adjustPaymentMethod() {
    const payment = document.getElementById('payment');
    const paymentOptions = document.querySelectorAll('#payment option');
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


const nameLabel = document.getElementById('name-label');
const nameErrorSpan = document.createElement('span');
nameErrorSpan.style.color = 'red';
nameErrorSpan.style.fontStyle = 'italic';
nameLabel.appendChild(nameErrorSpan);

function nameValidator(event) {
    const nameInputValue = nameInput.value;
    if (nameInputValue.length > 0) {
        nameInput.style.borderColor = 'rgb(111, 157, 220)';
        nameErrorSpan.textContent = ''; 
    } else {
        event.preventDefault();
        nameInput.scrollIntoView();
        nameInput.style.borderColor = 'red';
        nameErrorSpan.innerHTML = '<br>Enter your full name.';
    }
}


const emailLabel = document.getElementById('email-label');
const emailInput = document.getElementById('mail');
const emailErrorSpan = document.createElement('span');
emailErrorSpan.style.color = 'red';
emailErrorSpan.style.fontStyle = 'italic';
emailLabel.appendChild(emailErrorSpan);

function emailValidator(event) {
    const emailInputValue = emailInput.value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(emailInputValue)) {
        emailInput.style.borderColor = 'rgb(111, 157, 220)';
        emailErrorSpan.innerHTML = '';
    } else {
        event.preventDefault();
        emailInput.scrollIntoView();
        emailInput.style.borderColor = 'red';
        emailErrorSpan.innerHTML = '<br>Enter a valid email format: name@gmail.com';
    }
}

const activitiesLegend = document.querySelector('.activities legend');
const activitiesErrorSpan = document.createElement('span');
activitiesErrorSpan.style.color = 'red';
activitiesErrorSpan.style.fontStyle = 'italic';
activitiesErrorSpan.style.fontSize = '.75em';
activitiesErrorSpan.style.fontWeight = 'normal';
activitiesLegend.appendChild(activitiesErrorSpan);

function activitiesValidator(event) {
    let numActivities = 0;
    for (let i = 0; i < activityCheckboxes.length; i += 1) {
        if (activityCheckboxes[i].checked) {
            numActivities += 1;
        }
    }
    if (numActivities === 0) {
        event.preventDefault();
        activitiesErrorSpan.innerHTML = '<br>Choose atleast 1 activity.';
    } else {
        activitiesErrorSpan.innerHTML = '';
    }
}


const ccNumLabel = document.getElementById('cc-num-label');
const ccNumInput = document.getElementById('cc-num');
const zipLabel = document.getElementById('zip-label');
const zipInput = document.getElementById('zip');
const cvvLabel = document.getElementById('cvv-label');
const cvvInput = document.getElementById('cvv');
const ccNumErrorSpan = document.createElement('span');
const zipErrorSpan = document.createElement('span');
const cvvErrorSpan = document.createElement('span');
ccNumErrorSpan.style.color = 'red';
ccNumErrorSpan.style.fontStyle = 'italic';
zipErrorSpan.style.color = 'red';
zipErrorSpan.style.fontStyle = 'italic';
cvvErrorSpan.style.color = 'red';
cvvErrorSpan.style.fontStyle = 'italic';
ccNumLabel.appendChild(ccNumErrorSpan);
zipLabel.appendChild(zipErrorSpan);
cvvLabel.appendChild(cvvErrorSpan);

function ccPaymentValidator(event) {
    const ccNumInputValue = ccNumInput.value;
    const zipInputValue = zipInput.value;
    const cvvInputValue = cvvInput.value;

    if (/^\d{13,16}$/.test(ccNumInputValue)) {
        ccNumInput.style.borderColor = 'rgb(111, 157, 220)';
        ccNumErrorSpan.innerHTML = '';
    } else {
        event.preventDefault();
        ccNumInput.scrollIntoView();
        ccNumInput.style.borderColor = 'red';
        ccNumErrorSpan.innerHTML = '<br>Enter credit card number.';
    }

    if (/^\d{5,}/.test(zipInputValue)) {
        zipInput.style.borderColor = 'rgb(111, 157, 220)';
        zipErrorSpan.innerHTML = '';
    } else {
        event.preventDefault();
        ccNumInput.scrollIntoView();
        zipInput.style.borderColor = 'red';
        zipErrorSpan.innerHTML = '<br>Enter zip code.';
    }

    if (/^\d{3}$/.test(cvvInputValue)) {
        cvvInput.style.borderColor = 'rgb(111, 157, 220)';
        cvvErrorSpan.innerHTML = '';
    } else {
        event.preventDefault();
        ccNumInput.scrollIntoView();
        cvvInput.style.borderColor = 'red';
        cvvErrorSpan.innerHTML = '<br>Enter card cvv.';
    }
}

form.addEventListener('submit', (e) => {
    ccPaymentValidator(e);
    activitiesValidator(e);
    emailValidator(e);
    nameValidator(e);
});