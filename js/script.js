/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/


/***
 * 'nameInput' global variable captures the '#name' input element.
 * 'otherJobRole' global variable captures the '#title' select element.
 * 'colors' global variable captures the '#colors-js-puns' div for t-shirt colors.
 * 'selectShirtTheme' global variable captures the '#design' select element.
 ***/
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
    const jobSelect = document.getElementById('title');
    jobSelect.addEventListener('change', () => {
        if (jobSelect.value === 'other') {
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


const totalDiv = document.createElement('div');
activities.appendChild(totalDiv);
totalDiv.style.visibility = 'visible';
console.log(totalDiv);


document.querySelector('.activities').addEventListener('change', (e) => {
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
        totalDiv.textContent = `Total Price: $${totalActivityCost}.00`;
    } else {
        totalActivityCost -= parseInt(clickedCost);
        totalDiv.textContent = `Total Price: $${totalActivityCost}.00`;
    }

    console.log(totalActivityCost);
});




// if (total !== 0) {

// }

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
