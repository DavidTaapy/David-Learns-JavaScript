// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// Edit Option
let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setUpItems);

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        createListItem(id, value);
        displayAlert('Item added successfully!', 'success');
        container.classList.add('show-container');
        addToLocalStorage(id, value);
        setBackToDefault();
    } else if (value && editFlag) {
        editElement = value;
        displayAlert('Value edited!', 'success');
        editLocalStorage(editID, value);
        location.reload();
        setBackToDefault();
    } else {
        displayAlert('Please enter value!', 'danger');
    };
};

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // Removing alert
    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000);
};

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(item => {
            list.removeChild(item);
        });
    };
    container.classList.remove('show-container');
    displayAlert('List cleared!', 'danger');
    setBackToDefault();
    localStorage.removeItem('list');
};

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.length === 0) {
        container.classList.remove('show-container');
    }
    displayAlert('Item removed!', 'danger');
    setBackToDefault();
    removeFromLocalStorage(id);
};

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'Edit';
};

function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
};

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    const grocery = {id, value};                // ES6 shortcut for same variable names
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
};

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(item => {
        if (item.id !== id) {
            return item;
        }
    })
    localStorage.setItem('list', JSON.stringify(items));
};

function editLocalStorage(editID, value) {
    let items = getLocalStorage();
    items = items.map(item => {
        console.log(item.id);
        console.log(editID);
        if (item.id === editID) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));
};

function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

// ****** SETUP ITEMS **********
function setUpItems() {
    const items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(item => {
            createListItem(item.id, item.value);
        })
        container.classList.add('show-container');
    }
};

function createListItem(id, value) {
    const element = document.createElement('article');
    element.classList.add('grocery-item');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
                         <div class="btn-container">
                             <button class="edit-btn" type="button">
                                 <i class="fas fa-trash"></i>
                             </button>
                             <button class="delete-btn" type="button">
                                 <i class="fas fa-trash"></i>
                             </button>
                         </div>`;
    const editBtn = element.querySelector('.edit-btn');
    const deleteBtn = element.querySelector('.delete-btn');
    editBtn.addEventListener('click', editItem);
    deleteBtn.addEventListener('click', deleteItem);
    list.appendChild(element);
};