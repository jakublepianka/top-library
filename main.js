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

function Book(id, title, author, year, readStatus){
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.readStatus = readStatus;
    this.getInfo = function() {
        return `
        <ul>
            <li>Title: ${this.title},</li>
            <li>Author of the book: ${this.author},</li>
            <li>Year of publication: ${this.year}</li>
            <li>${this.readStatus ? 'Read already' : 'Not read yet'}</li>
        </ul>
        `;
    }
}

function addBookToLibrary() {
    let bookid = crypto.randomUUID();
    let title = getTitle.value;
    let author = getAuthor.value;
    let year = getYear.value;
    let readStatus = getReadStatus.checked;
    let book = new Book(bookid, title, author, year, readStatus);
    // return book.getInfo();
    myLibrary.push(book);
} 



function displayBooks() {
    container.innerHTML = '';
    myLibrary.forEach( book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = book.getInfo();
        container.appendChild(bookCard);
    })
}

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});


confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    displayBooks();
    dialog.close();
});

cancelBtn.addEventListener("click", (event) => {
    dialog.close();
});

