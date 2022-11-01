// seclect global element

const addBtn = document.querySelector('.add-notes');
const formContainer = document.querySelector('.form-container');
const formSubmitBtn = document.getElementById('submit-btn');


// add notes btn evetn 
addBtn.addEventListener('click', userInputFormOpen)

// submit/backward btn event
formSubmitBtn.addEventListener('click', userInputFormSubmit);

// open user input form function
function userInputFormOpen(){
    formContainer.style.top = 0;
    formContainer.style.left = 0;
    formContainer.style.borderRadius = 0;
    formContainer.style.overFlow = inherit;

}
// close user input form function
function userInputFormSubmit(){
    formContainer.style.top = "-100%";
    formContainer.style.left = "-100%";
    formContainer.style.borderRadius = "100rem";
    formContainer.style.overFlow = hidden;

}