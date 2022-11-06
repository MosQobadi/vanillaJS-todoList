const todoForm = document.querySelector(".form");
const todoInput = document.getElementById("todo-input");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", addFromJSON);

function addFromJSON() {
  fetch("todoslist.json")
    .then((res) => res.json())
    .then((data) => addToDomJSon(data));
}

function addToDomJSon(todos) {
  todos.forEach((todo) => {
    const li = document.createElement("li");

    li.className = "todo-list-item";

    const link = document.createElement("a");

    link.appendChild(document.createTextNode("X"));

    link.className = "remove";

    li.appendChild(link);

    li.appendChild(
      document
        .createElement("div")
        .appendChild(document.createTextNode(todo.todo))
    );
    todoList.appendChild(li);
  });
}

// LOCAL STORAGE
// function addFromlocalStorage() {
//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }

//   todos.forEach((todo) => {
//     const li = document.createElement("li");

//     li.className = "todo-list-item";

//     const link = document.createElement("a");

//     link.appendChild(document.createTextNode("X"));

//     link.className = "remove";

//     li.appendChild(link);

//     li.appendChild(
//       document.createElement("div").appendChild(document.createTextNode(todo))
//     );
//     todoList.appendChild(li);
//   });
// }

todoForm.addEventListener("submit", addDomElement);

function addDomElement(e) {
  if (todoInput.value !== "") {
    const todo = todoInput.value;

    const li = document.createElement("li");

    li.className = "todo-list-item";

    const link = document.createElement("a");

    link.appendChild(document.createTextNode("X"));

    link.className = "remove";

    li.appendChild(link);

    li.appendChild(
      document.createElement("div").appendChild(document.createTextNode(todo))
    );
    todoList.appendChild(li);

    todoInput.value = "";

    addToLocalStorage(todo);
  } else {
    showAlert("Please fill the form", "error");

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1500);
  }

  e.preventDefault();
}

document
  .querySelector(".todo-list")
  .addEventListener("click", removeDomElement);

function removeDomElement(e) {
  if (e.target.className === "remove") {
    e.target.parentElement.remove();
  }

  //   removeFromLocalStorage(e.target.parentElement);
  deleteFromJSON();

  e.preventDefault();
}

function deleteFromJSON() {
  fetch("todoslist.json")
    .then((res) => res.json())
    .then((data) => removeTodo(data));
}

function deleteTodo(todos) {}

// ADD TO LOCAL STORAGE
// function addToLocalStorage(todo) {
//   let todos;

//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }

//   todos.push(todo);

//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// REMOVE FROM LOCAL STORAGE
// function removeFromLocalStorage(todoItem) {
//   let todos;

//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }

//   todos.forEach((todo, index) => {
//     if (todoItem.textContent === `X${todo}`) {
//       todos.splice(index, 1);
//     }
//   });

//   localStorage.setItem("todos", JSON.stringify(todos));

//   setTimeout(() => {
//     document.querySelector(".alert").remove();
//   }, 1500);

//   showAlert("Task Removed", "success");
// }

function showAlert(message, className) {
  const container = document.querySelector(".container");
  const errDiv = document.createElement("div");

  errDiv.appendChild(document.createTextNode(message));

  errDiv.className = `alert ${className}`;

  container.insertBefore(errDiv, todoForm);
}
