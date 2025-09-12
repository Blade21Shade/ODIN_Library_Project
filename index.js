// Book storage and functionality
const library = [];

function Book(title, author, pageNum, hasBeenRead, id) {
    if (!new.target) {
        throw Error("Book can only be called as a constructor");
    }
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.hasBeenRead = hasBeenRead ? "Has been read" : "Hasn't been read";
    this.id = id;
};

// Book.prototype.updateReadStatus = function() {
//     if (hasBeenRead) {
//         this.hasBeenRead = "Has been read";
//     } else {
//         this.hasBeenRead = "Hasn't been read";
//     }
//     hasBeenRead = !hasBeenRead;
// };

function addBookToLibrary(title, author, pageNum, hasBeenRead) {
    let id = crypto.randomUUID();
    const newBook = new Book(title, author, pageNum, hasBeenRead, id);
    library.push(newBook); 
}

// Initial books for display/testing purposes
const book1 = new Book("Book 1", "Mary Sue", 100, true,  crypto.randomUUID());
const book2 = new Book("Book 2", "John Doe", 111, false, crypto.randomUUID());
const book3 = new Book("Book 3", "Anth ony",   1, true,  crypto.randomUUID());

// book1.updateReadStatus();

library.push(book1);
library.push(book2);
library.push(book3);

// DOM manipulation
const libraryEle = document.querySelector(".library");
for (let book of library) { // Array uses for/of
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
    
    // Buttons for deleting and changing read status

    libraryEle.appendChild(bookEle);
}

// function removeBookFromLibraryElement(id) {
//     let idString = "#" + [id];
//     const bookEle = libraryEle.querySelector(idString);
//     libraryEle.removeChild(bookEle);
// }