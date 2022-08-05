import './style.css';

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

class DisplayController {
  // Functions to handle rendering and DOM manipulation
  constructor() {
    this.newTodos = document.getElementById('newTodos');
    [this.categories] = document.getElementsByClassName('categories');
    this.category = document.getElementById('category');
  }

  clearTodos() {
    this.newTodos.innerHTML = '';
  }

  populateCategories() {
    const lists = Object.keys(JSON.parse(localStorage.lists));

    for (const key of lists) {
      const btn = document.createElement('button');
      btn.classList.add('btn');
      btn.addEventListener('click', () => {
        new DisplayController().populateTodos(key);
      });
      btn.innerHTML += key.toUpperCase();
      this.categories.appendChild(btn);
    }
  }

  populateTodos(listType) {
    this.clearTodos();

    this.category.innerHTML = listType.toUpperCase();

    // add Todos from localStorage to DOM
    const todoObj = JSON.parse(localStorage.lists)[listType];

    for (const key in Object.keys(todoObj)) {
      const newTodo = document.createElement('li');
      const btn = document.createElement('button');
      btn.classList.add('done');
      newTodo.append(btn);
      newTodo.innerHTML += `<span>${todoObj[key].description}</span>`;
      this.newTodos.appendChild(newTodo);
    }
  }
}

class ListModify {
  constructor() {
    this.categories = ['todos', 'reminders', 'personal', 'school'];
  }

  // Create
  initialize() {
    let ls;
    if ('lists' in window.localStorage) {
      ls = JSON.parse(window.localStorage.lists);
    } else {
      ls = {};
    }

    for (const key of this.categories) {
      if (!(key in Object.keys(ls))) {
        ls[key] = {};
      }
    }

    localStorage.setItem('lists', JSON.stringify(ls));
  }

  examples() {
    localStorage.setItem('currentUser', 'jack');
    document.getElementById('profile').innerHTML = localStorage.getItem('currentUser');

    const ls = JSON.parse(window.localStorage.lists);

    const first = new Todo('Nicole', 'Write Love Letter to Nicole', '09/01', 1);
    const second = new Todo('bios', 'Read Sophomore bios', '09/01', 2);

    const todos = {
      first,
      second,
    };

    ls.todos = todos;

    localStorage.setItem('lists', JSON.stringify(ls));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const lm = new ListModify();
  lm.initialize();
  lm.examples();
  new DisplayController().populateCategories();
});
