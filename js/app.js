
// If user adds a note add it to the localStorage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){

    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    let obj = {
        Text: addTxt.value,
        Title: addTitle.value
    }
    notesObj.push(obj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    //console.log(notesObj);
    showNotes();
});

//Functions to show notes from local storage

function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index){
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${element.Title}</h5>
      <p class="card-text">${element.Text}</p>
      <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
    </div>
  </div>`;
});
let notesElm = document.getElementById("notes");
if(notesObj.length != 0){
    notesElm.innerHTML = html;
    }
else{
    notesElm.innerHTML = `Nothing to show! Use 'Add Note' button to add notes!`;
}
}

//Function to delete notes 
function deleteNote(index){
    //console.log('I am deleting', index);

    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//Search function

let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){
   
    let inputValue = search.value.toLowerCase();
    //console.log('Input Event Fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
       // console.log(cardTxt);
    })
})