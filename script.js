const addBookBtn = document.querySelector("#addBook");
addBookBtn.addEventListener("click" , addBookForm );

const yourBooksP = document.querySelector("#yourBooksText");
const addBookFormDiv = document.querySelector("#addBookForm");
const yourBooks = document.querySelector("#yourBooks");

// FORM ///////////////////////////////////////////

const fieldsetOfForm = document.createElement("fieldset");
const form = document.createElement("form");

function createLineBreak() {
    const lineBreak = document.createElement("br");
    return lineBreak;
}

function addAuthorInput(){

    const authorLabel = document.createElement("label");
    const authorInput = document.createElement("input");

    authorLabel.setAttribute("for" , "author" );
    authorLabel.textContent = "Name of the Author: "
    authorInput.setAttribute("type" , "text" );
    authorInput.setAttribute("id" , "author" );
    authorInput.setAttribute("placeholder" , "Murakami");
    authorInput.required = true;

    authorInput.style.marginLeft = "10px" ;

    form.appendChild(authorLabel);
    form.appendChild(authorInput);

    form.appendChild(createLineBreak());
    form.appendChild(createLineBreak());
    
}

function addTitleInput() {

    const titleLabel = document.createElement("label");
    const titleInput = document.createElement("input");

    titleLabel.setAttribute("for" , "title" );
    titleLabel.textContent = "Name of the Book: "
    titleInput.setAttribute("type" , "text" );
    titleInput.setAttribute("id" , "title" );
    titleInput.setAttribute("placeholder" , "Kafka");
    titleInput.required = true;

    titleInput.style.marginLeft = "19px" ;

    form.appendChild(titleLabel);
    form.appendChild(titleInput);

    form.appendChild(createLineBreak());
    form.appendChild(createLineBreak());

}

function addPagesInput() {

    const pagesLabel = document.createElement("label");
    const pagesInput = document.createElement("input");

    pagesLabel.setAttribute("for" , "pages" );
    pagesLabel.textContent = "Number of pages in the Book: "
    pagesInput.setAttribute("type" , "number" );
    pagesInput.setAttribute("id" , "pages" );
    pagesInput.setAttribute("placeholder" , "150");
    pagesInput.setAttribute("min" , "0");
    pagesInput.setAttribute("max" , "100000");
    pagesInput.setAttribute("step" , "10");

    pagesInput.style.marginLeft = "10px" ;

    form.appendChild(pagesLabel);
    form.appendChild(pagesInput);

    form.appendChild(createLineBreak());
    
}

function addReadStatusInput(){

    const readStatusQuestion = document.createElement("p");
    form.appendChild(readStatusQuestion);
    readStatusQuestion.textContent ="Have you read this Book? "

    // completed radio button
    const completedRadioInput = document.createElement("input");
    const completedRadioLabel = document.createElement("label");

    completedRadioInput.setAttribute("type" , "radio");
    completedRadioInput.setAttribute("name" , "readStatus");
    completedRadioInput.setAttribute("id" , "readStatusYes");
    completedRadioInput.setAttribute("value" , "Completed");
    completedRadioInput.setAttribute("checked" , "checked");
    completedRadioLabel.setAttribute("for" , "readStatusYes");
    completedRadioLabel.textContent = "Completed";
    completedRadioInput.classList.add("radio");
    
    form.appendChild(completedRadioInput);
    form.appendChild(completedRadioLabel);

    form.appendChild(createLineBreak());

    // No radio button
    const noRadioInput = document.createElement("input");
    const noRadioLabel = document.createElement("label");

    noRadioInput.setAttribute("type" , "radio");
    noRadioInput.setAttribute("name" , "readStatus");
    noRadioInput.setAttribute("id" , "readStatusNo");
    noRadioInput.setAttribute("value" , "No");
    noRadioLabel.setAttribute("for" , "readStatusNo");
    noRadioLabel.textContent = "No";
    noRadioInput.classList.add("radio");
    
    form.appendChild(noRadioInput);
    form.appendChild(noRadioLabel);

    form.appendChild(createLineBreak());

    // currently reading radio button
    const currentlyReadingRadioInput = document.createElement("input");
    const currentlyReadingRadioLabel = document.createElement("label");

    currentlyReadingRadioInput.setAttribute("type" , "radio");
    currentlyReadingRadioInput.setAttribute("name" , "readStatus");
    currentlyReadingRadioInput.setAttribute("id" , "readStatusReading");
    currentlyReadingRadioInput.setAttribute("value" , "Reading currently");
    currentlyReadingRadioLabel.setAttribute("for" , "readStatusReading");
    currentlyReadingRadioLabel.textContent = "Reading currently";
    currentlyReadingRadioInput.classList.add("radio");

    form.appendChild(currentlyReadingRadioInput);
    form.appendChild(currentlyReadingRadioLabel);
    
    form.appendChild(createLineBreak());

}

function addBookForm() {

    yourBooks.style.border = "none" ;
    
    if(addBookFormDiv.contains(fieldsetOfForm)){
        form.replaceChildren();
        fieldsetOfForm.replaceChildren();
        addBookFormDiv.replaceChildren();
    }

    form.appendChild(createLineBreak());

    addBookFormDiv.appendChild(fieldsetOfForm)
    fieldsetOfForm.appendChild(form);

    addAuthorInput();
    addTitleInput(); 
    addPagesInput();
    addReadStatusInput();
    
    form.appendChild(createLineBreak());

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type" , "submit");
    form.appendChild(submitButton);
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click" , storeFormData );
    submitButton.style.marginRight = "10px" ;

    const closeFormBtn = document.createElement("button");
    form.appendChild(closeFormBtn);
    closeFormBtn.textContent = "Close";
    closeFormBtn.addEventListener("click" , () => {
        form.replaceChildren();
        fieldsetOfForm.replaceChildren();
        addBookFormDiv.replaceChildren();
    })

    buttonStyle(submitButton);
    buttonStyle(closeFormBtn);
}

function buttonStyle(element){
    element.style.backgroundColor = "#441212" ;
    element.style.color = "#E8DADA" ;
    element.style.borderRadius = "10px" ;
    element.style.padding = "5px" ;
}

const formDataObject = {
    authorFormData: "",
    titleFormData: "",
    pagesFormData: "",
    readStatusFormData: "",
}

function storeFormData(event) {
    
    const authorInput = document.querySelector("#author").value;
    const titleInput = document.querySelector("#title").value;
    const pagesInput = document.querySelector("#pages").value;

    if(authorInput == ""){
        alert("Please Fill the author's name");
        return;
    } else if(titleInput == ""){
        alert("Please Fill the title's name");
        return;
    }
    
    event.preventDefault();

    formDataObject.authorFormData = document.querySelector("#author").value ;
    formDataObject.titleFormData = document.querySelector("#title").value ;
    formDataObject.pagesFormData = document.querySelector("#pages").value ;

    if(pagesInput == ""){
        formDataObject.pagesFormData = "Not mentioned";
    }

    const readStatusInputs = document.querySelectorAll(".radio");
    let readStatusInputsArray = Array.from(readStatusInputs);

    readStatusInputsArray.forEach( (item) => {
            if(item.checked === true){
                formDataObject.readStatusFormData = item.value;
            }
        }
    )

    addBookToLibrary();
    addBookForm();
}
// FORM \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// constructor functiuon to create books
function Book(author , title , pages , readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
}

let myLibrary = [];

function addBookToLibrary(){

    const book = new Book(
        formDataObject.authorFormData,
        formDataObject.titleFormData,
        formDataObject.pagesFormData,
        formDataObject.readStatusFormData
    )
    
    myLibrary[myLibrary.length] = book;

    createCardForBook();
}

function createCardForBook(){
    
    yourBooks.replaceChildren();
    
    yourBooksP.textContent = "Your Books" ;
    const spanInP = document.createElement("span");
    
    yourBooksP.appendChild(spanInP);
    spanInP.id = "bookNum" ;
    
    for(let i = 0; i < myLibrary.length; i++){
        const div = document.createElement("div");
        div.classList.add(`book${i}` , "book");
        yourBooks.appendChild(div);
        
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const p4 = document.createElement("p");
        const removeBookFromLibraryBtn = document.createElement("button");
        const p5 = document.createElement("p");
        const readStatusChangeBtn = document.createElement("button");
        const p6 = document.createElement("p");
        const bookNum = document.querySelector("#bookNum");
        
        p5.setAttribute("class" ,`${myLibrary[i].author}`);
        p6.setAttribute("class" ,`${myLibrary[i].author}`);
        
        removeBookFromLibraryBtn.setAttribute("data-book-Number" , `${i}`);
        
        p1.textContent = `Author : ${myLibrary[i].author}`;
        p2.textContent = `Title : ${myLibrary[i].title}`;
        p3.textContent = `Number of Pages : ${myLibrary[i].pages}`;
        p4.textContent = `Status of the Book : ${myLibrary[i].readStatus}`;
        removeBookFromLibraryBtn.textContent = "Delete Book" ;
        readStatusChangeBtn.textContent = "Change Read status" ;
        bookNum.textContent = `: ${myLibrary.length}` ;
        
        div.appendChild(p1);    
        div.appendChild(p2);    
        div.appendChild(p3);    
        div.appendChild(p4);
        div.appendChild(removeBookFromLibraryBtn);
        div.appendChild(p5);
        div.appendChild(readStatusChangeBtn);
        div.appendChild(p6);
        
        div.style.border = '5px solid #441212';
        div.style.borderRadius = "10px" ;
        div.style.padding = "10px" ;
        div.style.color = "#B48F8F" ;
        div.style.marginRight = "10px" ;
        div.style.marginBottom = "10px" ;
        div.style.width = "30%" ;
        
        buttonStyle(removeBookFromLibraryBtn);
        buttonStyle(readStatusChangeBtn);
        
        const lineBreakInYourBooks = createLineBreak();
        lineBreakInYourBooks.classList.add(`lineBreak${i}`);
        yourBooks.appendChild(lineBreakInYourBooks);
        
    }
}

Book.prototype.changeReadStatusOfObject = function(){
    if(this.readStatus === "Completed"){
        this.readStatus = "No";
        return;
    } else if(this.readStatus === "No"){
        this.readStatus = "Reading currently";
        return;
    } else if(this.readStatus === "Reading currently"){
        this.readStatus = "Completed";
        return;
    }
};


function removeBookFromLibrary(event){
    
    const removeBook = event.target.closest(".book");
    const nextPOfRemoveBook = event.target.nextElementSibling;
    const indexOfRemoveBook = getIndex(nextPOfRemoveBook);
    
    const removeLineBreak = removeBook.nextElementSibling;

    removeBook.replaceChildren();
    removeBook.remove();
    removeLineBreak.remove();
    
    myLibrary.splice(indexOfRemoveBook , 1 );
    
    const bookNum = document.querySelector("#bookNum");
    bookNum.textContent = `: ${myLibrary.length}` ;
    
    if(myLibrary.length === 0){
        yourBooks.textContent = "Your Library is empty, click the Add button to add books to your library.";
        yourBooks.style.border = "2px solid black";
        yourBooks.style.padding = "10px";
        bookNum.textContent = "" ;
        
    }
}

function changeReadStatus(event){
    const nextPOfchangeReadStatusBtn = event.target.nextElementSibling;

    const index = getIndex(nextPOfchangeReadStatusBtn);
    
    myLibrary[index].changeReadStatusOfObject();
    createCardForBook();
}

function getIndex(yourElement) {
    for(let i = 0 ; i < myLibrary.length ; i++ ){
        if(yourElement.getAttribute("class") === myLibrary[i].author){
            return i;
        }
    }
}

yourBooks.addEventListener("click" , modifyBook , false);

function modifyBook(event) {
    if(event.target.textContent === "Delete Book"){
        removeBookFromLibrary(event);        
    } else if(event.target.textContent === "Change Read status"){
        changeReadStatus(event);
    }
    
}

fieldsetOfForm.style.border = "2px solid #441212" ;
fieldsetOfForm.style.padding = "10px" ;
fieldsetOfForm.style.borderRadius = "10px" ;