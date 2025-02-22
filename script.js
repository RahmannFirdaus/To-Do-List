const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const editModal = document.getElementById('edit-modal');
const editInput = document.getElementById('edit-input');
const saveEditBtn = document.getElementById('save-edit');
const closeModal = document.querySelector('.close');

let currentEditIndex = null;

function saveData() {
  localStorage.setItem("data", todoList.innerHTML);
}

function showTask() {
  todoList.innerHTML = localStorage.getItem("data") || "";
  attachEventListeners();
}

function attachEventListeners() {

  todoList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('edit-btn') || target.parentElement.classList.contains('edit-btn')) {
      const li = target.closest('li');
      currentEditIndex = Array.from(todoList.children).indexOf(li);
      editInput.value = li.querySelector('span').textContent;
      editModal.style.display = 'flex';
    }

    if (target.classList.contains('delete-btn') || target.parentElement.classList.contains('delete-btn')) {
      const li = target.closest('li');
      if (confirm('Yakin ingin dihapus?')) {
        li.remove();
        saveData();
        showNotification('List telah dihapus!', 'success');
      }
    }
  });
}

showTask();

addBtn.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <div class="actions">
        <button class="edit-btn"><img src="edit.png" alt="edit"></button>
        <button class="delete-btn"><img src="delete.png" alt="delete"></button>
      </div>
    `;
    todoList.appendChild(li);
    todoInput.value = '';
    saveData();
    showNotification('List berhasil ditambahkan!', 'success');
  } else {
    showNotification('Masukkan list!', 'error');
  }
});

saveEditBtn.addEventListener('click', () => {
  const updatedTask = editInput.value.trim();
  if (updatedTask) {
    todoList.children[currentEditIndex].querySelector('span').textContent = updatedTask;
    editModal.style.display = 'none';
    saveData();
    showNotification('List berhasil diperbarui!', 'success');
  } else {
    showNotification('Masukkan list!', 'error');
  }
});

closeModal.addEventListener('click', () => {
  editModal.style.display = 'none';
});

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}