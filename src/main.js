import templateFilter from './make-filter.js';
import makeTask, {getTask} from './make-task.js';

const doc = document;
const filters = doc.querySelector(`.main__filter`);
const tasks = doc.querySelector(`.board__tasks`);

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

const renderTasks = (dist, amount) => {
  dist.insertAdjacentHTML(`beforeend`, new Array(amount)
    .fill(``)
    .map(() => makeTask(getTask()))
    .join(``));
};

renderTasks(tasks, 7);

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const filterLabels = doc.querySelectorAll(`.filter__label`);

for (let filterlabel of filterLabels) {
  filterlabel.addEventListener(`click`, () => {
    const randomNumber = getRandomInRange(1, 10);
    tasks.innerHTML = ``;
    renderTasks(tasks, randomNumber);
  });
}

