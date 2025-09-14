applyStoredTheme();
let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();


function toogleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("the", isDark ? 'dark' : 'light');
}

function applyStoredTheme() {
  if (localStorage.getItem('the') === 'dark') {
    document.body.classList.add('dark');
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelector(".int").addEventListener('click', function(e){
    if(e.target === this){
      closeModal();
    }
  });
})

function openModal(){
  const date = document.getElementById("date");
  const text = document.getElementById("text");
  const dialog = document.querySelector(".int");

  dialog.showModal();
  text.focus();
}
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(allTodos));
}


document.querySelector("form").addEventListener("submit",(e)=>{
  e.preventDefault();
  addTodo();
  closeModal();
});

function closeModal(){
  const date = document.getElementById("date");
  const text = document.getElementById("text");
  const dialog = document.querySelector(".int");
  dialog.close();
  date.value = "";
  text.value = "";
}
function addTodo(event){
  const date = document.getElementById("date").value;
  const todo = document.getElementById("text").value;
  if(todo.length > 0){
    allTodos.unshift({
      id: generateId(),
      date,
      checked: false,
      todo
    });
    
    saveTodos();
    renderTodos();
  }
}
function generateId(){
  const id = Date.now().toString();
  return id;
}
function deleteTodo(todoId) {
  allTodos = allTodos.filter(todo => todo.id != todoId);
  saveTodos();
  renderTodos();
}
function renderTodos(){
  const con = document.getElementById("list-container");
  if(allTodos.length === 0){
    con.innerHTML = `
    <div class="show">
      <h2>No Todo Yet</h2>
      <button onclick="openModal()">Add New Todo</button>
    </div>
    `
    return
  }else{
    con.innerHTML = allTodos.map((todo, i) => `
      <li><input type="checkbox" id="todo-${i}" ${todo.checked ? 'checked' : ''} onchange="toggleChecked(${i})"><label for="todo-${i}" class="check">✓</label ><label for="todo-${i}" class="main">${todo.todo}</label><span class="date">${todo.date}</span><button class="delet" onclick="deleteTodo('${todo.id}')"><svg height="15px" viewBox="0 -960 960 960" width="15px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button></li>
    `).join("");
  }
}

window.toggleChecked = function (index) {
  allTodos[index].checked = !allTodos[index].checked;
  saveTodos();
  renderTodos();
};