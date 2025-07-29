const newBookBtn = document.querySelector('.new-book');
const dialog = document.querySelector('#dialog');
const getTitle = dialog.querySelector('.book-title');
const getAuthor = dialog.querySelector('.book-author');
const getYear = dialog.querySelector('.book-year');
const getReadStatus = dialog.querySelector('.book-readstatus');
const confirmBtn = dialog.querySelector('#book-submit');
const cancelBtn = dialog.querySelector('#book-cancel');

const container = document.querySelector('.container');
const myLibrary = [];

class Book {
    constructor(id, title, author, year, readStatus){
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.readStatus = readStatus;
    }
    getInfo() {
        return `
        <ul>
            <li>${this.title}&nbsp</li>
            <li>${this.author}&nbsp</li>
            <li>${this.year}&nbsp</li>
        </ul>
        `;
    }
    getReadStatus() {
        return this.readStatus ? `Read` : `Not Read`;
    }
}

Book.prototype.toggleReadStatus = function () {
    this.readStatus = !this.readStatus;
    return this.readStatus ? `Read` : `Not Read`;
};


function addBookToLibrary() {
    let bookid = crypto.randomUUID();
    let title = getTitle.value;
    let author = getAuthor.value;
    let year = getYear.value;
    let readStatus = getReadStatus.checked;
    let book = new Book(bookid, title, author, year, readStatus);
    myLibrary.push(book);
} 

function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = book.getInfo();

    const bookCardFooter = document.createElement('div');
    bookCardFooter.classList.add('book-card-footer');
    const removeBtn = createRemoveButton(book.id);
    const toggleBtn = createToggleButton(book.id);
    
    bookCardFooter.appendChild(toggleBtn);
    bookCardFooter.appendChild(removeBtn);
    bookCard.appendChild(bookCardFooter);

    return bookCard;
}

function createRemoveButton(bookId){
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('book-remove');
    removeBtn.innerHTML = `Remove`;
    removeBtn.dataset.bookid = bookId;
    removeBtn.addEventListener("click", (event) => {
            const bookId = event.target.dataset.bookid;
            const index = myLibrary.findIndex(book => book.id === bookId);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                displayBookCards();
            }
        });
    return removeBtn;
}

function createToggleButton(bookId){

    const toggleBtn = document.createElement('button');
    toggleBtn.dataset.bookid = bookId;
    const index = myLibrary.findIndex(book => book.id === bookId);
    const readStatus = myLibrary[index].getReadStatus();
    if (readStatus == `Read`) {
        toggleBtn.classList.add('book-toggle-read');
        toggleBtn.innerHTML = readStatus;
    } else {
        toggleBtn.classList.add('book-toggle-notread');
        toggleBtn.innerHTML = readStatus;
    }

    toggleBtn.addEventListener("click", (event) => {
        const bookId = event.target.dataset.bookid;
        const index = myLibrary.findIndex(book => book.id === bookId);
        if(index != -1){
            const btnReadStatus = myLibrary[index].toggleReadStatus();
            displayBookCards();
        }
    });
    return toggleBtn;
}



function displayBookCards(){
    container.innerHTML = '';
    myLibrary.forEach( book =>{
        const bookCard = createBookCard(book);
        container.appendChild(bookCard);
    });

}

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});


confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    displayBookCards();
    dialog.close();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});

