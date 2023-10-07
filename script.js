const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  library.push(book);
  updateLibrary();
}

function updateLibrary() {
  const bookshelf = document.querySelector('#bookshelf');

  bookshelf.replaceChildren('');

  library.forEach(book => {
    // Card
    const card = document.createElement('div');
    card.classList.add('book-card');
    bookshelf.appendChild(card);

    // Text elements
    let e = document.createElement('h2');
    e.classList.add('title');
    e.textContent = book.title;
    card.appendChild(e);

    e = document.createElement('p');
    e.classList.add('author');
    e.textContent = book.author;
    card.appendChild(e);

    e = document.createElement('p');
    e.classList.add('pages');
    e.textContent = book.pages;
    card.appendChild(e);

    const read = document.createElement('p');
    read.classList.add('read');
    read.textContent = book.read ? 'already read' : 'not yet read';
    card.appendChild(read);

    // Action buttons
    const actions = document.createElement('div');
    actions.classList.add('actions');
    card.appendChild(actions);

    e = document.createElement('button');
    e.classList.add('read');
    e.textContent = 'Mark Read';
    e.addEventListener('click', () => {
      book.read = !book.read;
      read.textContent = book.read ? 'already read' : 'not yet read';
    });
    actions.appendChild(e);

    e = document.createElement('button');
    e.classList.add('remove');
    e.textContent = 'Remove';
    e.addEventListener('click', () => {
      library.splice(library.indexOf(book), 1);
      card.remove();
    });
    actions.appendChild(e);
  });
}

// Control Functions

const modal = document.querySelector('#add-modal');
const form = document.querySelector('#add-form');
const inputs = form.elements;

const addButton = document.querySelector('#btn-add');
addButton.addEventListener('click', () => {
  modal.showModal();
});

form.addEventListener('submit', () => {
  addBookToLibrary(inputs.title.value, inputs.author.value, inputs.pages.value, inputs.read.checked);
  modal.close();
  form.reset();
});

const modalCancelButton = document.querySelector('#cancel-add-book');
modalCancelButton.addEventListener('click', () => {
  modal.close();
  form.reset();
});

// Sample data

// addBookToLibrary('test', 'asdf', 10, false);
// addBookToLibrary('test', 'asdf', 11, false);
// addBookToLibrary('test', 'asdf', 12, false);
