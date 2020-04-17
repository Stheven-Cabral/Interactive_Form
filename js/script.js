/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/


/***
 * 'nameInput' global variable captures the '#name' input element.
 * 'otherJobRole' global variable captures the '#title' select element.
 * 'colors' global variable captures the colors select element.
 ***/
const nameInput = document.getElementById('name');
const otherJobRole = document.getElementById('other-title');
const colors = document.getElementById('colors-js-puns');


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
        };
    });
}

displayOtherRoleInput();


function hideShirtColors() {
    const selectShirtTheme = document.getElementById('design');
    if (selectShirtTheme.value === 'Select Theme') {
        colors.style.display = 'none';
    }
}

hideShirtColors();  