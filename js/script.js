const form = document.querySelector(".add-task__form");
const task = document.getElementById("add-task");
const btnAddTask = document.querySelector(".add-task__button");

console.log(form);

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

btnAddTask.addEventListener("click", function () {
  const taskValue = task.value;
  console.log(taskValue);
});
