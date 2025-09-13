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

Book.prototype.updateReadStatus = function() {
    if (this.hasBeenRead.at(3)=== " ") { // Has been read
        this.hasBeenRead = "Hasn't been read";
    } else { // Hasn't been read
        this.hasBeenRead = "Has been read";
    }
};

function addBookToLibrary(title, author, pageNum, hasBeenRead) {
    let id = crypto.randomUUID();
    const newBook = new Book(title, author, pageNum, hasBeenRead, id);
    library.push(newBook); 
}

// Initial books for display/testing purposes
const book1 = new Book("Book 1", "Mary Sue", 100, true,  crypto.randomUUID());
const book2 = new Book("Book 2", "John Doe", 111, false, crypto.randomUUID());
const book3 = new Book("Book 3", "Anth ony",   1, true,  crypto.randomUUID());

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
        for (let i = 0; i < library.length; i++) {
            if (library[i].id === id) {
                book = library[i];
                index = i;
                break;
            }
        }
        
        if (e.target.classList.contains("delete-button")) {
            library.splice(index, 1);
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

// function removeBookFromLibraryElement(id) {
//     let idString = "#" + [id];
//     const bookEle = libraryEle.querySelector(idString);
//     libraryEle.removeChild(bookEle);
// }