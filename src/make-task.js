export const cloneTasks = [];
const array = [`.card--edit.card--black`, `.card--pink.card--repeat`, `.card--yellow.card--deadline`, `.card--edit.card--yellow.card--repeat`, `.card--blue`];

export default () => {

  for (let i = 0; i < array.length; i++) {
    const task = document.querySelector(array[i]);
    const cloneTask = task.cloneNode(true);
    cloneTasks.push(cloneTask);
  }
};
