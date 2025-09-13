const list = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

newBtn.addEventListener("click", addTodo);

window.onload = () => {
  let todos = getTodos();
  todos.forEach((todo) => createTodoElement(todo));
};

function addTodo() {
  let data = prompt("Enter your todo here:");
  if (data && data.trim() !== "") {
    createTodoElement(data);
    saveTodos();
  }
}

function createTodoElement(text) {
  let div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;

  div.addEventListener("click", () => {
    if (confirm("Do you want to remove this todo?")) {
      div.remove();
      saveTodos();
    }
  });

  list.appendChild(div);
}

function saveTodos() {
  let todos = [];
  document.querySelectorAll(".todo").forEach((todo) => {
    todos.push(todo.textContent);
  });
  setCookie("todos", JSON.stringify(todos), 365);
}

function getTodos() {
  let c = getCookie("todos");
  if (c) return JSON.parse(c);
  return [];
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}
