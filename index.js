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

function addBookToLibrary(title, author, pageNum, hasBeenRead) {
    let id = crypto.randomUUID();
    const newBook = new Book(title, author, pageNum, hasBeenRead, id);
    library.push(newBook); 
}