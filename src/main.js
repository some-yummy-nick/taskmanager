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
  for (let i = 0; i < number; i++) {
    const taskComponent = new Task(getTasks());
    const editTaskComponent = new TaskEdit(getTasks());
    tasksContainer.appendChild(taskComponent.render());
    taskComponent.onEdit = () => {
      editTaskComponent.render();
      tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = () => {
      taskComponent.render();
      tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
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

