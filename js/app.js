// seclect global element=======================================

const addBtn = document.querySelector('.add-notes');
const formContainer = document.querySelector('.form-container');
const formSubmitBtn = document.getElementById('submit-btn');
const mainContainer =document.querySelector('.main-container')
const mainContainerHeader =document.querySelector('.main-container h1');

// user inputed value 
const userInputForm = document.querySelector('#user-input-form');
const inputedTittle = userInputForm[name="input-tittle"];
const inputedText= userInputForm[name="input-text"];

// notes container for append all notes 
const notesContainer = document.querySelector('.notes-container');

// all notes from localStorage 
const allNotes = JSON.parse(localStorage.getItem("allNotes")) || [];


//search user input 
const searchUserInput = document.querySelector('#search-input');


// event =======================================

window.addEventListener('DOMContentLoaded',()=>{
    showNotes(allNotes);

    
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
        showNotes(allNotes);
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
function showNotes(notes){
                let counter = 0;
                const notesElement = notes.map(item=>{
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
            // delete btn clicking
            if(currentBtn == "delete"){
                allNotes.splice(currentNotes,1)
                const leftNotes = allNotes;
                localStorage.setItem("allNotes",JSON.stringify(leftNotes));
                window.location.reload(); //reload for showing update instantly
                
            }
            if(currentBtn == "edit"){
                userInputFormShow();
                // show notes data in form input section 
                const actualNotes = allNotes[currentNotes];
                    inputedTittle.value = actualNotes.tittle;
                    inputedText.value = actualNotes.notesText;
                formSubmitBtn.addEventListener('click',()=>{
                    userInputFormHide();

                    // make a new notes by our notescreate constructor
                    const updatedNotes = new notesCreate(inputedTittle.value,inputedText.value)

                    // replace array in allNotes 
                    allNotes.splice(currentNotes,1,updatedNotes)
                    
                    // now set array in localStorage
                    localStorage.setItem("allNotes",JSON.stringify(allNotes));

                    location.reload(); //for instant updating in interface
                })
            }
        })
        
    });

 

    // notes card mouseOver Out action ------------
    notesCard.forEach(card => {
        const cardBtns = card.childNodes[1];
        const notesArea = card.childNodes[3];

        
        // each card mouseover and mouseout event
        card.addEventListener('mouseover', e=>{
            cardMouseover(cardBtns,notesArea);

            if(listViewBtn.classList.contains('active')){
                console.log('alhamdulillah')
                cardMouseoverRepair(cardBtns,notesArea);
            }
            
        })
        card.addEventListener('mouseout', e=>{
            cardMouseout(cardBtns,notesArea);
            if(listViewBtn.classList.contains('active')){
                console.log('alhamdulillah')
                cardMouseoverRepair(cardBtns,notesArea);
            }
        })
        

        card.addEventListener('click',()=>{

            notesViewAndUpdate(card);

            
        })
 
    });




    // mouseover and mouse out effect function 
    function cardMouseover(cardBtns,notesArea){

        cardBtns.style.top = ".5rem";
            notesArea.style.top = "1rem";
    }
    
    function cardMouseout(cardBtns,notesArea){

            cardBtns.style.top = "-2rem";
            notesArea.style.top = "0";
    }

    //if card view type in list view than mouseover and mouse out effect function repair
    function cardMouseoverRepair(cardBtns,notesArea){
        cardBtns.style.top = "0";
        notesArea.style.top = "0";
    }


    // notesViewAndUpdate function 
    function notesViewAndUpdate(card){
        // viewing current notes in form 

        const currentNotes = card.dataset.id;
        formView();
        
        const actualNotes = allNotes[currentNotes];

        inputedTittle.value = actualNotes.tittle;
        inputedText.value = actualNotes.notesText;


        // updating current notes after clikcing submit 
        formSubmitBtn.addEventListener('click', ()=>{
            userInputFormHide();
            
            /*
            // stored old data for undo in future
            const oldTittle=allNotes[currentNotes].inputedTitt;
            const oldNotesText = allNotes[currentNotes].notesText;
            */

            // make a new notes by our notescreate constructor
            const updatedNotes = new notesCreate(inputedTittle.value,inputedText.value)

            // replace array in allNotes 
            allNotes.splice(currentNotes,1,updatedNotes)
            
            // now set array in localStorage
            localStorage.setItem("allNotes",JSON.stringify(allNotes));

            location.reload(); //for instant updating in interface
        })
    }
    

}


function formView(){
    
    formContainer.style.top = 0;
    formContainer.style.left = 0;
    formContainer.style.borderRadius = 0;
}




// search engine functionality 

searchUserInput.addEventListener('keyup',()=>{
    const searchedText = searchUserInput.value.toUpperCase();

    filteredNotes(searchedText,allNotes);
})

// filtered Notes 
function filteredNotes(searchedText,allData){
    const filteredNotes = [];
    const searched = searchedText;
    // lets run a loop in allNotes array 
    for(let i = 0; i<allData.length; i++){
        const notesTittle = allData[i].tittle.toUpperCase();
        const notesText = allData[i].notesText.toUpperCase();

        if(notesTittle.includes(searched) || notesText.includes(searched)){
            filteredNotes.push(allData[i]);
        }
    } 

// show a message that 'threre is no notes with this text' 

    const noNotesMessage = document.querySelector('.no-note-found-message');

    if(filteredNotes.length == 0) noNotesMessage.style.visibility = "visible";

    if(filteredNotes.length > 0) noNotesMessage.style.visibility = "hidden";  

    if(allNotes.length == 0) noNotesMessage.style.visibility = "hidden";
    


    return showNotes(filteredNotes);
    

}


// if there is no notes than show a message 'add notes'

    emptyNotesMessage()

    function emptyNotesMessage(){
        const emptyNotesMessage = document.querySelector('.emty-notes-message')

        if(allNotes.length > 0)  emptyNotesMessage.style.visibility = "hidden";

        else emptyNotesMessage.style.visibility = "visible";
    }




    // if click list view btn 
    const viewBtns = document.querySelectorAll('.view-btns .view-btn');
    const gridViewBtn = document.querySelector('.grid');
    const listViewBtn = document.querySelector('.list');

// run the function of list and grid view
    ViewType()

    function ViewType(){
        
        const previousClass = JSON.parse(localStorage.getItem('classList')) || [];

        if(previousClass == "list-view"){
            mainContainer.classList.add(previousClass);

            // active class set 
            gridViewBtn.classList.remove('active');
            listViewBtn.classList.add('active')
        }

        listViewBtn.addEventListener('click',()=>{

                localStorage.setItem('classList',JSON.stringify('list-view'))
                const currentClass = JSON.parse(localStorage.getItem('classList'))
                mainContainer.classList.add(currentClass);

                // active class 
                gridViewBtn.classList.remove('active');
                listViewBtn.classList.add('active')


                // need reload for stay needed posintion cards action btn,, my previous coding fault
                window.location.reload();
                
            })

        gridViewBtn.addEventListener('click',(e)=>{
                e.stopPropagation();
                console.log('click')
                mainContainer.classList.remove('list-view');

                localStorage.setItem('classList',JSON.stringify(''))

                // active class set 
                listViewBtn.classList.remove('active');
                gridViewBtn.classList.add('active');
                

                // need reload for stay needed posintion cards action btn,, my previous coding fault
                window.location.reload();
            })

            
    }
    