// TypeScript: Using generic type parameters with document.querySelector
// The <HTMLFormElement> syntax is a TypeScript generic that tells the compiler
// the expected return type, providing type safety and autocomplete
const taskForm = document.querySelector<HTMLFormElement>('.form');
const formInput = document.querySelector<HTMLInputElement>('.form-input');

const taskListElement = document.querySelector<HTMLUListElement>('.list');

// TypeScript: Defining a custom type alias for Task objects
// This ensures type safety - all Task objects must have these exact properties
// with the specified types (description: string, isCompleted: boolean)
type Task = {
  description: string;
  isCompleted: boolean;
};

// TypeScript: Type annotation (Task[]) specifies this is an array of Task objects
// This provides type checking - TypeScript will error if we try to push non-Task objects
const tasks: Task[] = loadTasks();

// Render all existing tasks from localStorage on page load
tasks.forEach(renderTask);

// TypeScript: Function return type annotation (): Task[]
// This function must return an array of Task objects, providing type safety
function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem('tasks');
  // TypeScript: TypeScript infers the return type based on the ternary expression
  // If storedTasks exists, parse it (assumed to be Task[]), otherwise return empty array
  return storedTasks ? JSON.parse(storedTasks) : [];
}

// TypeScript: Optional chaining operator (?.) safely handles null/undefined
// If taskForm is null, the addEventListener won't be called (prevents runtime errors)
taskForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  // TypeScript: Optional chaining - formInput?.value returns undefined if formInput is null
  const taskDescription = formInput?.value;
  if (taskDescription) {
    // TypeScript: Type annotation ensures the object matches the Task type structure
    // TypeScript will error if we miss required properties or use wrong types
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };
    // add task to list
    addTask(task);
    // render tasks
    renderTask(task);
    // update local storage
    updateStorage();
    formInput.value = '';
    return;
  }
  alert('Please enter a task description');
});

// TypeScript: Function parameter type (task: Task) and return type (: void)
// The void return type indicates this function doesn't return a value
// TypeScript ensures we can only pass Task objects to this function
function addTask(task: Task): void {
  tasks.push(task);
  console.log(tasks);
}

// TypeScript: Function with typed parameter and void return type
// This function takes a Task object and renders it to the DOM
function renderTask(task: Task): void {
  const taskElement = document.createElement('li');

  // Create a span for the task description
  const taskText = document.createElement('span');
  taskText.textContent = task.description;
  taskElement.appendChild(taskText);

  // Create a container for checkbox and delete button
  const taskControls = document.createElement('div');
  taskControls.style.display = 'flex';
  taskControls.style.gap = '0.5rem';
  taskControls.style.alignItems = 'center';

  // checkbox
  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  // TypeScript: Type-safe property access - task.isCompleted is guaranteed to be boolean
  taskCheckbox.checked = task.isCompleted;

  // toggle checkbox
  // TypeScript: Arrow function with implicit typing
  // The event parameter is automatically typed as Event by TypeScript
  taskCheckbox.addEventListener('change', () => {
    // TypeScript: Type safety ensures isCompleted is always a boolean
    task.isCompleted = !task.isCompleted;
    updateStorage();
  });

  // delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'btn-delete';
  deleteButton.type = 'button';
  // TypeScript: Arrow function for delete handler
  deleteButton.addEventListener('click', () => {
    deleteTask(task);
  });

  taskControls.appendChild(taskCheckbox);
  taskControls.appendChild(deleteButton);
  taskElement.appendChild(taskControls);
  // TypeScript: Optional chaining prevents errors if taskListElement is null
  taskListElement?.appendChild(taskElement);
}

// TypeScript: Function with typed parameter and void return type
// This function deletes a task from the tasks array and re-renders the list
function deleteTask(taskToDelete: Task): void {
  // TypeScript: Find the index of the task to delete by matching description and isCompleted
  const taskIndex = tasks.findIndex(
    (task) =>
      task.description === taskToDelete.description &&
      task.isCompleted === taskToDelete.isCompleted
  );

  if (taskIndex !== -1) {
    // Remove task from array
    tasks.splice(taskIndex, 1);
    // Update localStorage
    updateStorage();
    // Re-render all tasks to update the DOM
    if (taskListElement) {
      taskListElement.innerHTML = '';
      tasks.forEach(renderTask);
    }
  }
}

// TypeScript: void return type indicates no return value
// This function serializes the tasks array to JSON and stores it in localStorage
function updateStorage(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
