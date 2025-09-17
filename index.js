// Book storage and functionality
// const library = [];

class Book {
    title;
    author;
    pageNum;
    hasBeenRead;
    id;
    constructor(title, author, pageNum, hasBeenRead) {
        this.title = title;
        this.author = author;
        this.pageNum = pageNum;
        this.hasBeenRead = hasBeenRead ? "Has been read" : "Hasn't been read";
        this.id = crypto.randomUUID();
    }

    get title() {
        return this.title;
    }

    get author() {
        return this.author;
    }

    get pageNum() {
        return this.pageNum;
    }

    get hasBeenRead() {
        return this.hasBeenRead;
    }

    get id() {
        return this.id;
    }

    updateReadStatus() {
        if (this.hasBeenRead.at(3)=== " ") { // Has been read
        this.hasBeenRead = "Hasn't been read";
        } else { // Hasn't been read
            this.hasBeenRead = "Has been read";
        }
    }
}

class Library {
    static #library = [];
    
    static addBookToLibrary(book) {
        Library.#library.push(book);
    }

    static createAndAddBookToLibrary(title, author, pageNum, hasBeenRead) {
        let id = crypto.randomUUID();
        const newBook = new Book(title, author, pageNum, hasBeenRead, id);
        Library.#library.push(newBook);
        return newBook;
    }

    static getLibrary() {
        return Library.#library;
    }
}

// Initial books for display/testing purposes
const book1 = Library.createAndAddBookToLibrary("Book 1", "Mary Sue", 100, true);
const book2 = Library.createAndAddBookToLibrary("Book 2", "John Doe", 111, false);
const book3 = Library.createAndAddBookToLibrary("Book 3", "Tony ony",   1, true);

// DOM manipulation
const libraryEle = document.querySelector(".library");
for (let book of Library.getLibrary()) { // Array uses for/of (This is part of initial, I need the library element however)
    addBookToLibraryElement(book);
}

function addBookToLibraryElement(book) {
    // Book itself
    const bookEle = document.createElement("div");
    bookEle.classList.add("book");
    const entries = Object.keys(book); // keys is used so prototype functions aren't included when adding elements to bookEle
    for (let k of entries) { // Array uses for/of
        const ele = document.createElement("p");
        ele.innerText += [k] + ": " + book[[k]];
        bookEle.appendChild(ele);
    }
    bookEle.id = book.id;
    
    // Buttons for deleting the book and changing the read status
    const btnGrid = document.createElement("div");
    btnGrid.classList.add("button-grid");

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-button");
    delBtn.innerText = "Delete Book";

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-button");
    readBtn.innerText = "Change Read Status";

    btnGrid.append(delBtn, readBtn);
    bookEle.appendChild(btnGrid);

    libraryEle.appendChild(bookEle);
}

libraryEle.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
        const bookEle = e.target.parentNode.parentNode;
        const id = bookEle.id;
        let index;
        
        let book;
        for (let i = 0; i < Library.library.length; i++) {
            if (Library.library[i].id === id) {
                book = Library.library[i];
                index = i;
                break;
            }
        }
        
        if (e.target.classList.contains("delete-button")) {
            Library.library.splice(index, 1);
            libraryEle.removeChild(bookEle);
        } else { // read-button
            book.updateReadStatus();
            const children = bookEle.children;
            let hasBeenRead;
            for (let p of children) {
                let t = p.innerText;
                if (t.match(/^has/)) { // Searching for "hasBeenRead" via has
                    hasBeenRead = p;
                    break;
                }
            }
            
            hasBeenRead.innerText = "hasBeenRead: " + book.hasBeenRead;
        }
    };
});

const newBookButton = document.querySelector("#show-new-book-dialog");
const newBookDialog = document.querySelector("#new-book-dialog");
newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

const addBookButton = document.querySelector("#add-book-button");
const cancelAddBookButton = document.querySelector("#cancel-add-book-button");

const newBookAuthor = document.querySelector("input[id='author']");
const newBookTitle = document.querySelector("input[id='title']");
const newBookPageNum = document.querySelector("input[id='number-of-pages']");
const newBookHasBeenRead = document.querySelector("input[id='has-been-read']");

addBookButton.addEventListener("click", (e) => {
    let author = newBookAuthor.value;
    let title = newBookTitle.value;
    let pageNum = newBookPageNum.value;
    let hasBeenRead = newBookHasBeenRead.checked;

    if (author != "" && title != "" && pageNum > 0) { // If all required fields are filled
        e.preventDefault();
        const newBook = Library.createAndAddBookToLibrary(title, author, pageNum, hasBeenRead);
        addBookToLibraryElement(newBook);
        // Clear info for next book
        clearDialogForm();
        newBookDialog.close();
    }
});

cancelAddBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    // Clear info for next book
    clearDialogForm();
    newBookDialog.close();
});

clearDialogForm = function() {
    newBookAuthor.value = "";
    newBookTitle.value = "";
    newBookPageNum.value = 0;
    newBookHasBeenRead.checked = false;
}

// function removeBookFromLibraryElement(id) {
//     let idString = "#" + [id];
//     const bookEle = libraryEle.querySelector(idString);
//     libraryEle.removeChild(bookEle);
// }