// seclect global element=======================================

const addBtn = document.querySelector('.add-notes');
const formContainer = document.querySelector('.form-container');
const formSubmitBtn = document.getElementById('submit-btn');
const mainContainerHeader =document.querySelector('.main-container h1');

// for notes card btns animation 

const notesArea = document.querySelector('.notes-area');



// user inputed value 
const userInputForm = document.querySelector('#user-input-form');
const inputedTittle = userInputForm[name="input-tittle"];
const inputedText= userInputForm[name="input-text"];

// notes container for append all notes 
const notesContainer = document.querySelector('.notes-container');


// all notes from localStorage 
const allNotes = JSON.parse(localStorage.getItem("allNotes")) || [];


// event =======================================

window.addEventListener('DOMContentLoaded',()=>{
    showNotes();

    
})

// add notes by click header 
mainContainerHeader.addEventListener('click', ()=>{
    userInputFormShow();
    submitNotes();
})
// add notes btn evetn 
addBtn.addEventListener('click', (e)=>{
    userInputFormShow();
    submitNotes();
})














// function =======================================

// submit/backward btn event
function submitNotes(){
    
    formSubmitBtn.addEventListener('click', ()=>{
        userInputFormHide();
        showNotes();
        addNotes();
        window.location.reload();
        
        
    })
}





// open user input form function
function userInputFormShow(){
    formContainer.style.top = 0;
    formContainer.style.left = 0;
    formContainer.style.borderRadius = 0;
    inputedTittle.value = "";
    inputedText.value = "";

}
// close user input form function
function userInputFormHide(){
    formContainer.style.top = "-100%";
    formContainer.style.left = "-100%";
    formContainer.style.borderRadius = "100rem";

}



// notes entry object make for easy 
const notesCreate = function (notesTittle, notesText){
    this.notesTittle = notesTittle;
    this.notesText = notesText;
    
    if(notesTittle == ""){
        notesTittle = "Untittled...";
    }
    return( entry = {tittle:notesTittle, notesText: notesText})
}

// submit notes 
function addNotes(){
    // get previous data from localStorage if no data take an empty arry
    const previousNotes = allNotes || [];

    // make notes by entry object 

    let notes = new notesCreate(inputedTittle.value, inputedText.value);
    previousNotes.push(notes);

    // set data in localStorage 
    localStorage.setItem("allNotes", JSON.stringify(previousNotes));
}


// show notes card on home
function showNotes(){
                let counter = 0;
                const notesElement = allNotes.map(item=>{
                    return `<div class="notes-card" data-id="${counter++}">
                    <div class="notes-btns">
                        <span class="material-icons-round" data-id="edit">edit_note</span>
                        <span class="material-icons-outlined" data-id="delete">delete</span>
                    </div>
                    <article class="notes-area">
                        <h2 class="notes-tittle">${item.tittle}</h2>
                        <p class="notes-text">${item.notesText}</span></p>
                    </article>
                </div>`
                }).join("")
            
                notesContainer.innerHTML = notesElement;

                // card btns system apear here because of the card will apear in dom after this showNotes function run 
                cardsSystem();
}


// card btn functions 
function cardsSystem(){
    // card btns dunctions
    const notesCard = document.querySelectorAll('.notes-card');

    // notes card edit and delete btn 
    const notesCardBtns = document.querySelectorAll('.notes-btns span');

    // card btns edit and delete function 

    notesCardBtns.forEach(btn => {
        btn.addEventListener('click',(e)=>{
            e.stopPropagation();
            const  currentBtn = e.currentTarget.dataset.id;
            const currentNotes = e.currentTarget.parentElement.parentElement.dataset.id;
            if(currentBtn == "delete"){
                allNotes.splice(currentNotes,1)
                const leftNotes = allNotes;
                localStorage.setItem("allNotes",JSON.stringify(leftNotes));
                window.location.reload(); //reload for showing update instantly
                
            }
        })
        
    });



    // notes card mouseOver Out action ------------
    notesCard.forEach(card => {


        // each card mouseover and mouseout event
        card.addEventListener('mouseover', e=>{
            const notesCardBtns = e.currentTarget.childNodes[1];
            const notesAreaMove = e.currentTarget.childNodes[3];

            notesCardBtns.style.top = ".5rem";
            notesAreaMove.style.top = "1rem";

        })
        card.addEventListener('mouseout', e=>{
            const notesCardBtns = e.currentTarget.childNodes[1];
            const notesAreaMove = e.currentTarget.childNodes[3];

            notesCardBtns.style.top = "-2rem";
            notesAreaMove.style.top = "0";

        })

        card.addEventListener('click',(e)=>{
            const tittle = e.currentTarget.childNodes[3].childNodes[1].innerHTML;
            const notesText = e.currentTarget.childNodes[3].childNodes[3].innerHTML;

            notesView();
            
            inputedTittle.value = tittle;
            inputedText.value = notesText;

            formSubmitBtn.addEventListener('click', ()=>{
                userInputFormHide();
                showNotes();
            })

        })

        
    });

}


function notesView(){
    
    formContainer.style.top = 0;
    formContainer.style.left = 0;
    formContainer.style.borderRadius = 0;
}

function notesModify(){

}