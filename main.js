const todoAPI = new EasyReq();

const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");

document.addEventListener("DOMContentLoaded", getTodos);

function getTodos() {
  todoAPI
    .get("todoslist.json")
    .then((data) => addTodosToDOM(data))
    .catch((err) => console.log(err));
}

function addTodosToDOM(todos) {
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.appendChild(document.createTextNode(todo.todo));

    const link = document.createElement("a");
    link.className = "remove";
    li.appendChild(link);

    todoList.appendChild(li);
  });
}

function createTodo(todoText) {
  todoAPI.get("todoslist.json").then((todos) => todos.push(todoText));
}

document.querySelector(".btn").addEventListener("click", postTodo);

const todoText = todoInput.value;

createTodo(todoText);

function postTodo(e) {
  todoAPI
    .post("todoslist.json", todoText)
    .then((todos) => addTodosToDOM(todos));

  e.preventDefault();
}

// function postTodo(e) {
//   todoAPI
//     .post("todoslist.json")
//     .then((todo) => addTodoToAPI(todo))
//     .catch((err) => console.log(err));

//   e.preventDefault();
// }

// function createTodo(todo) {
//   todoAPI.get("todoslist.json").then((todos) =>
//     forEach((todo) => {
//       todo.title = todoInput;
//     })(todos).push(todo)
//   );
// }

// function addTodoToAPI(todo) {
//   get("todolist.json")
//     .then((todos) => todos.push(todo))
//     .catch((err) => console.log(err));
// }
