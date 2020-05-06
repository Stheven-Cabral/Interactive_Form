# Interactive_Form
 Third Full Stack JavaScript Techdegree Project

For this project, the goal was to add interactivity to a registration form for a fictional conference.  I used pure JavaScript to add interactivity and conditional behaviors as well as validation for various input types. 

Interactive Features Include:
- A hidden 'Job Role' text field that appears when the user chooses 'other' at the 'Job Role" select field.
- A hidden 'Color' select field that appears when the user chooses a design theme. The colors displayed only match the design theme.
- Activities disable when the date and time conflicts with checked activities.
- Total cost of activities display when a user checks an activity.
- Payment sections display based on chosen payment option. 

Form Validation errors occur when:
- Name field is blank.
- Email is blank or is not the correct format.
- An activity is not chosen.
- If credit card payment is the payment option chosen, errors occur when:
  * The credit card number is blank or not between 13 to 16 digits.
  * The zipcode is blank or is not atleast 5 digits.
  * The cvv is blank or is not 3 digits.
