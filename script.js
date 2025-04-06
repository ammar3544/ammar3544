const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const filterSelect = document.getElementById('filterSelect');

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

filterSelect.addEventListener('change', filterTasks);

function addTask(text) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.setAttribute('data-done', 'false');

  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'flex-grow-1';

  const btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';

  const doneBtn = document.createElement('button');
  doneBtn.innerHTML = '<i class="bi bi-check-circle"></i>';
  doneBtn.className = 'btn btn-success btn-sm';
  doneBtn.title = 'Selesai';
  doneBtn.addEventListener('click', () => {
    const isNowCompleted = li.getAttribute('data-done') === 'true';
    if (isNowCompleted) {
      span.classList.remove('completed');
      li.setAttribute('data-done', 'false');
    } else {
      span.classList.add('completed');
      li.setAttribute('data-done', 'true');
    }
    filterTasks();
  });
  

  const editBtn = document.createElement('button');
  editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
  editBtn.className = 'btn btn-warning btn-sm';
  editBtn.title = 'Edit';
  editBtn.addEventListener('click', () => {
    const newText = prompt("Edit tugas:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
  deleteBtn.className = 'btn btn-danger btn-sm';
  deleteBtn.title = 'Hapus';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  btnGroup.appendChild(doneBtn);
  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnGroup);
  li.setAttribute('data-done', 'false');
  taskList.appendChild(li);
}

function filterTasks() {
    const filterValue = filterSelect.value;
    const tasks = taskList.querySelectorAll('li');
  
    tasks.forEach(task => {
      const isCompleted = task.getAttribute('data-done') === 'true';
  
      if (
        filterValue === 'all' ||
        (filterValue === 'completed' && isCompleted) ||
        (filterValue === 'active' && !isCompleted)
      ) {
        task.style.display = 'flex';
      } else {
        task.style.display = 'none';
      }
    });
  }
  
