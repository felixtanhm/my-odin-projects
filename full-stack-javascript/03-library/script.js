const bookContainer = document.getElementById("card-container");
const addBookForm = document.getElementById("new-book-form");
addBookForm.addEventListener("submit", handleSubmit);

toggleModal.modalElements = document.querySelectorAll(".hidden");
toggleModal.modalControllers = document.querySelectorAll(".modal-toggle");
toggleModal.display = false;
toggleModal.modalControllers.forEach((element) => {
  element.addEventListener("click", toggleModal);
});

class Book {
  constructor(title, authors) {
    (this.title = title), (this.authors = authors), (this.isRead = false);
  }
}

function renderCard(cardObj) {
  const markRead = () => {
    status.classList.add(readBtn.value == "read" ? "read" : "unread");
    status.classList.remove(readBtn.value == "read" ? "unread" : "read");
    status.innerText = `${readBtn.value == "read" ? "Read" : "Unread"}`;
    readBtn.innerText = `${
      readBtn.value == "read" ? "Mark Unread" : "Mark Read"
    }`;
    readBtn.setAttribute("value", readBtn.value == "read" ? " unread" : "read");
  };

  const delCard = () => {
    newCard.remove();
  };

  // Construct Elements
  const newCard = document.createElement("div");
  const title = document.createElement("h3");
  const authors = document.createElement("p");
  const status = document.createElement("div");
  const contentDiv = document.createElement("div");
  const buttonDiv = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const readBtn = document.createElement("button");

  // Update element contents
  title.innerText = cardObj.title;
  authors.innerText = cardObj.authors;
  status.innerText = `${cardObj.isRead ? "Read" : "Unread"}`;
  deleteBtn.innerText = "Delete";
  readBtn.innerText = cardObj.isRead ? "Mark Unread" : "Mark Read";

  // Update element classes
  status.classList.add("status", cardObj.isRead ? "read" : "unread");
  buttonDiv.classList.add("card-btns");
  contentDiv.classList.add("card-content");
  deleteBtn.classList.add("btn", "btn-delete");
  readBtn.classList.add("btn", "btn-read");
  readBtn.setAttribute("value", "read");

  // Add event listeners
  deleteBtn.addEventListener("click", delCard);
  readBtn.addEventListener("click", markRead);

  // Piece elements together
  buttonDiv.appendChild(deleteBtn);
  buttonDiv.appendChild(readBtn);

  contentDiv.appendChild(title);
  contentDiv.appendChild(status);
  contentDiv.appendChild(authors);

  newCard.appendChild(contentDiv);
  newCard.appendChild(buttonDiv);

  bookContainer.appendChild(newCard);
}

function createNewBook(title, authors) {
  const newBook = new Book(title, authors);
  renderCard(newBook);
}

function handleSubmit(event) {
  event.preventDefault();
  const title = document.getElementById("book-title").value;
  const authors = document.getElementById("book-desc").value;
  createNewBook(title, authors);
  toggleModal();
  addBookForm.reset();
}

function toggleModal() {
  if (toggleModal.display) {
    toggleModal.display = !toggleModal.display;
    toggleModal.modalElements.forEach((element) => {
      element.classList.add("hidden");
    });
  } else {
    toggleModal.display = !toggleModal.display;
    toggleModal.modalElements.forEach((element) => {
      element.classList.remove("hidden");
    });
  }
}

// Hardcode initial books
createNewBook("The C Programming Language", "Brian Kernighan, Dennis Ritchie");
createNewBook("Understanding and using C Pointers", "Richard Reese");
createNewBook("The Javascript Language", "Ilya Kantor");
createNewBook("Eloquent Javascript", "Marijn Haverbeke");
