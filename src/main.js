import templateFilter from './make-filter.js';
import makeTask, {cloneTasks} from './make-task.js';

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

makeTask();

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const filterLabels = doc.querySelectorAll(`.filter__label`);

for (let filterlabel of filterLabels) {
  filterlabel.addEventListener(`click`, () => {
    const randomNumber = getRandomInRange(1, 10);
    tasks.innerHTML = ``;
    for (let i = 0; i <= randomNumber; i++) {
      const randomAnother = getRandomInRange(1, cloneTasks.length - 1);
      tasks.append(cloneTasks[randomAnother]);
    }
  });
}

