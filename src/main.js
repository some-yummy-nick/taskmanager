'use strict';
const doc = document;
const filters = doc.querySelector(`.main__filter`);

const templateFilter = (name, count = 0, active = false) => {
  return `
<input type="radio" id="filter__${name}" 
class="filter__input visually-hidden" name="filter"
 ${count ? `` : `disabled`} 
 ${active ? `checked` : ``} 
/>
<label for="filter__${name}" class="filter__label">${name.toUpperCase()}
 <span class="filter__${name}-count">${count}</span>
 </label>
`;
};
const filter = `
 ${templateFilter(`all`, 15, true)}
 ${templateFilter(`overdue`)}
 ${templateFilter(`today`)} 
 ${templateFilter(`favorites`, 7)}
 ${templateFilter(`repeating`, 2)}
 ${templateFilter(`tags`, 6)}
 ${templateFilter(`archive`, 115)}
 `;

filters.insertAdjacentHTML(`afterBegin`, filter);

const tasks = doc.querySelector(`.board__tasks`);
const array = [`.card--edit.card--black`, `.card--pink.card--repeat`, `.card--yellow.card--deadline`, `.card--edit.card--yellow.card--repeat`, `.card--blue`];

const cloneTasks = [];

for (let i = 0; i < array.length; i++) {
  const task = doc.querySelector(array[i]);
  const cloneTask = task.cloneNode(true);
  cloneTasks.push(cloneTask);
}

const filterLabels = doc.querySelectorAll(`.filter__label`);

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
