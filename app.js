
const taskInput = document.getElementById('new-task')
const addButton = document.getElementsByTagName('button')[0]
const incompleteTaskHolder = document.getElementById('incompleteTasks')
const completedTasksHolder = document.getElementById('completed-tasks')

const createNewTaskElement = function (taskText) {
  const taskItem = document.createElement('li')

  const checkbox = document.createElement('input')
  const taskLabel = document.createElement('label')
  const editTaskInput = document.createElement('input')
  const editButton = document.createElement('button')
  const deleteButton = document.createElement('button')
  const deleteButtonImage = document.createElement('img')

  taskLabel.textContent = taskText
  taskLabel.className = 'task'

  checkbox.type = 'checkbox'

  editTaskInput.type = 'text'
  editTaskInput.className = 'task'

  editButton.textContent = 'Edit'
  editButton.className = 'edit'

  deleteButton.className = 'delete'
  deleteButtonImage.src = './remove.svg'
  deleteButtonImage.alt = 'Delete task'
  deleteButton.appendChild(deleteButtonImage)

  taskItem.append(
    checkbox,
    taskLabel,
    editTaskInput,
    editButton,
    deleteButton,
  )

  return taskItem
}

const addTask = function () {
  const newTaskText = taskInput.value.trim()

  if (!newTaskText) return

  const taskItem = createNewTaskElement(newTaskText)

  incompleteTaskHolder.appendChild(taskItem)
  bindTaskEvents(taskItem, moveTaskToCompleted)

  taskInput.value = ''
}

const editTask = function () {
  const taskItem = this.parentElement
  const editTaskInput = taskItem.querySelector('input[type="text"]')
  const taskLabel = taskItem.querySelector('label')
  const editButton = taskItem.querySelector('.edit')
  const isEditing = taskItem.classList.contains('editMode')

  if (!isEditing) {
    editTaskInput.value = taskLabel.textContent
    editButton.textContent = 'Save'
    taskItem.classList.add('editMode')
    return
  }

  const updatedTaskText = editTaskInput.value.trim()

  if (updatedTaskText) {
    taskLabel.textContent = updatedTaskText
  } else {
    editTaskInput.value = taskLabel.textContent
  }

  editButton.textContent = 'Edit'
  taskItem.classList.remove('editMode')
}

const deleteTask = function () {
  const taskItem = this.parentElement
  taskItem.remove()
}

const moveTask = function (checkbox, targetList, onCheckboxChange) {
  const taskItem = checkbox.parentElement

  targetList.appendChild(taskItem)
  bindTaskEvents(taskItem, onCheckboxChange)
}

const moveTaskToCompleted = function () {
  moveTask(this, completedTasksHolder, moveTaskToIncomplete)
}

const moveTaskToIncomplete = function () {
  moveTask(this, incompleteTaskHolder, moveTaskToCompleted)
}

const bindTaskEvents = function (taskItem, onCheckboxChange) {
  const checkbox = taskItem.querySelector('input[type="checkbox"]')
  const editButton = taskItem.querySelector('button.edit')
  const deleteButton = taskItem.querySelector('button.delete')

  editButton.onclick = editTask
  deleteButton.onclick = deleteTask
  checkbox.onchange = onCheckboxChange
}

const bindEventsToTaskList = function (taskList, onCheckboxChange) {
  Array.from(taskList.children).forEach(function (taskItem) {
    bindTaskEvents(taskItem, onCheckboxChange)
  })
}

bindEventsToTaskList(incompleteTaskHolder, moveTaskToCompleted)
bindEventsToTaskList(completedTasksHolder, moveTaskToIncomplete)

addButton.addEventListener('click', addTask)
