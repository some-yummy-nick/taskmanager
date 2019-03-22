import templateFilter from './make-filter';
import {getRandomInRange} from './utils';
import getTasks from './get-task';
import Task from './task';
import TaskEdit from './task-edit';

const doc = document;
const filters = doc.querySelector(`.main__filter`);
const tasksContainer = doc.querySelector(`.board__tasks`);

const filter = `
 ${templateFilter(`all`, 15, true)}
 ${templateFilter(`overdue`)}
 ${templateFilter(`today`)} 
 ${templateFilter(`favorites`, 7)}
 ${templateFilter(`repeating`, 2)}
 ${templateFilter(`tags`, 6)}
 ${templateFilter(`archive`, 112)}
 `;

filters.insertAdjacentHTML(`afterBegin`, filter);

const renderTasks = (number) => {
  tasksContainer.innerHTML = ``;

  for (let i = 0; i < number; i++) {
    const task = getTasks();
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);

    if (!task.deleted) {
      tasksContainer.appendChild(taskComponent.render());
    }

    taskComponent.onEdit = () => {
      editTaskComponent.update(task);
      editTaskComponent.render();
      tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      task.title = newObject.title;
      task.tags = newObject.tags;
      task.color = newObject.color;
      task.repeatingDays = newObject.repeatingDays;
      task.dueDate = newObject.dueDate;

      taskComponent.update(task);
      taskComponent.render();
      tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onDelete = () => {
      task.deleted = true;
      taskComponent.update(task);
      editTaskComponent.unrender();
    };
  }
};

renderTasks(7);

const filterLabels = doc.querySelectorAll(`.filter__label`);

for (let filterlabel of filterLabels) {
  filterlabel.addEventListener(`click`, () => {
    const randomNumber = getRandomInRange(1, 10);
    tasksContainer.innerHTML = ``;
    renderTasks(randomNumber);
  });
}

