const form = document.querySelector(".add-task__form");
const taskboardList = document.querySelector(".taskboard__list");
const taskEditBtns = document.querySelectorAll(".task__edit");
const taskInputs = document.querySelectorAll(".task__input");

function enableTasks() {
  taskEditBtns.forEach((btn) => {
    btn.classList.remove("hidden-block");
  });
}

form.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const addTask = formData.get("task-name");

  // Getting the task value
  const taskboard = {
    value: addTask,
  };

  // Template for a new task
  const taskboardItem = `
  <div class="taskboard__item task">
    <div class="task__body">
      <p class="task__view">${taskboard.value}</p>
      <input class="task__input" type="text" value="${taskboard.value}">
    </div>
    <button class="task__edit" type="button" aria-label="Изменить"></button>
  </div>
  `;

  // Adding a new task to the end of the list
  taskboardList.insertAdjacentHTML("beforeend", taskboardItem);

  // Reset the input field of form
  form.reset();
});

// Edit text on click to button and disable other buttons
taskEditBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    taskEditBtns.forEach((btn) => {
      btn.classList.add("hidden-block");
    });

    // Switch to active mode
    if (!btn.parentNode.classList.contains("task--active")) {
      btn.parentNode.classList.add("task--active");
      btn.classList.remove("hidden-block");

      // Switch to default mode
    } else {
      btn.parentNode.classList.remove("task--active");
      enableTasks();
    }
  });
});

// Save text on press Enter
taskInputs.forEach((input) => {
  input.addEventListener("keyup", function (evt) {
    if (evt.keyCode == 13) {
      const inputEl = evt.target;
      const viewEl = inputEl.previousElementSibling;
      const taskEl = inputEl.parentNode.parentNode;
      const value = inputEl.value;

      viewEl.innerHTML = value;
      inputEl.setAttribute("value", value);
      taskEl.classList.remove("task--active");
      enableTasks();
    }
  });
});
