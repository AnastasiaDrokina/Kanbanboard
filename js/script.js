const form = document.querySelector(".add-task__form");
const taskboardList = document.querySelector(".taskboard__list");
const taskEditBtns = document.querySelectorAll(".task__edit");
const taskInputs = document.querySelectorAll(".task__input");
const tasksListsElement = document.querySelectorAll(".taskboard__list");
const taskElements = document.querySelectorAll(".taskboard__item");
const btnClear = document.querySelector(".taskboard__button");
const trashList = document.querySelector(".taskboard__list--trash");
const emptyTrash = document.querySelector(".task--empty-trash");

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

// Drag & Drop
// Добавляем всем атрибут
for (const task of taskElements) {
  task.draggable = true;
}

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter =
    currentElementCoord.y + currentElementCoord.height / 2;

  const nextElement =
    cursorPosition < currentElementCenter
      ? currentElement
      : currentElement.nextElementSibling;

  return nextElement;
};

//
tasksListsElement.forEach((list) => {
  list.addEventListener("dragstart", (evt) => {
    evt.target.classList.add("task--dragged");
  });

  list.addEventListener("dragend", (evt) => {
    evt.target.classList.remove("task--dragged");
  });

  // Отслеживаем местоположение перемещаемого элемента относительно других
  list.addEventListener("dragover", (evt) => {
    evt.preventDefault();

    // Находим выбранный элемент и тот элемент, на котором сработало событие dragover.
    const activeElement = list.querySelector(".task--dragged");
    const currentElement = evt.target;

    const isMoveable =
      activeElement !== currentElement &&
      currentElement.classList.contains("taskboard__item");

    if (!isMoveable) {
      return;
    }

    // Находим элемент, перед которым нужно осуществить вставку
    const nextElement = getNextElement(evt.clientY, currentElement);

    // Вставляем элемент на новое место
    if (
      (nextElement && activeElement === nextElement.previousElementSibling) ||
      activeElement === nextElement
    ) {
      return;
    }

    list.insertBefore(activeElement, nextElement);
  });
});

function handleEmptyTrashBtn() {
  const trashItems = trashList.querySelectorAll(".taskboard__item");

  // Hiding block "Basket is empty"
  if (trashItems.length) {
    emptyTrash.classList.add("hidden-block");

    // Disabled button "Clear the basket"
  } else {
    emptyTrash.classList.remove("hidden-block");
    btnClear.setAttribute("disabled", "disabled");
  }
}

// Deleting cards
function handleEmptyTrashItems() {
  const trashItems = trashList.querySelectorAll(".taskboard__item");

  trashItems.forEach((item) => {
    item.remove();
  });
}

handleEmptyTrashBtn();

btnClear.addEventListener("click", () => {
  handleEmptyTrashItems();
  handleEmptyTrashBtn();
});
