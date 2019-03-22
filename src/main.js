import Filter from './filter';
import getTasks from './get-task';
import Task from './task';
import TaskEdit from './task-edit';
import moment from 'moment';

const doc = document;
const filtersContainer = doc.querySelector(`.main__filter`);
const tasksContainer = doc.querySelector(`.board__tasks`);

const filtersArray = [`all`, `overdue`, `today`, `repeating`];

const taskCommon = [];

for (let i = 0; i < 7; i++) {
  taskCommon.push(getTasks());
}

for (let name of filtersArray) {
  const filter = new Filter({title: `${name}`});
  filtersContainer.appendChild(filter.render());

  filter.onFilter = (filterName) => {
    switch (filterName) {
      case `filter__all`:
        return renderTasks(taskCommon);

      case `filter__overdue`: {
        const newArr = taskCommon.filter((it) => it.dueDate < Date.now());
        return renderTasks(newArr);
      }

      case `filter__today`: {
        let newArr = taskCommon.filter((it) => moment(it.dueDate).day() === moment(Date.now()).day());
        return renderTasks(newArr);
      }

      case `filter__repeating`: {
        let newArr = taskCommon.filter((it) => [...Object.entries(it.repeatingDays)]
          .some((rec) => rec[1]));
        return renderTasks(newArr);
      }

      default:
        return false;
    }

  };

}

const renderTasks = (tasks) => {
  tasksContainer.innerHTML = ``;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
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

renderTasks(taskCommon);
