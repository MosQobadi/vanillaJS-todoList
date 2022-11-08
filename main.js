const todoForm = document.querySelector(".form");
const todoInput = document.getElementById("todo-input");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", addFromServer);

function addFromServer() {
  fetch("http://localhost:8080/todos")
    .then((res) => res.json())
    .then((data) => showToDOm(data))
    .catch((err) => reject(err));
}

function showToDOm(todos) {
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
        .appendChild(document.createTextNode(todo.text))
    );
    todoList.appendChild(li);
  });
}

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

    addToServer(todo);
  } else {
    showAlert("Please fill the form", "error");

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1500);
  }

  e.preventDefault();
}

function addToServer(todoText) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // const todoText = document.getElementById("todo-input").value;

  const raw = JSON.stringify({
    id: "6",
    text: todoText,
    done: false,
  });

  const todoData = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8080/todo", todoData)
    .then((res) => res.json())
    .then((data) => postToServer(data))
    .catch((err) => console.log(err));
}

document
  .querySelector(".todo-list")
  .addEventListener("click", removeDomElement);

function removeDomElement(e) {
  if (e.target.className === "remove") {
    e.target.parentElement.remove();
  }

  removeFromServer(e.target.parentElement.textContent);

  e.preventDefault();
}

function removeFromServer() {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  fetch("http://localhost:8080/todo/4", requestOptions)
    .then((response) => response.text())
    .then((result) => removeFromDOM(result))
    .catch((error) => console.log("error", error));
}

function removeFromDOM() {}

function showAlert(message, className) {
  const container = document.querySelector(".container");
  const errDiv = document.createElement("div");

  errDiv.appendChild(document.createTextNode(message));

  errDiv.className = `alert ${className}`;

  container.insertBefore(errDiv, todoForm);
}
