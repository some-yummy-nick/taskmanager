import Filter from './filter';
import Task from './task';
import TaskEdit from './task-edit';
import statistics from './statistics';
import moment from 'moment';
import API from './api';

const AUTHORIZATION = `Basic A8XoP3pLaHAAw1Gk=`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;
const doc = document;
const filtersContainer = doc.querySelector(`.main__filter`);
const tasksContainer = doc.querySelector(`.board__tasks`);
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const filtersArray = [`all`, `overdue`, `today`, `repeating`];
let taskFromServer;
tasksContainer.textContent = `Loading tasks...`;
api.getTasks()
  .then((tasks) => {
    taskFromServer = tasks;
    renderTasks(taskFromServer);
  })
  .catch(() => {
    tasksContainer.textContent = `Something went wrong while loading your tasks. Check your connection or try again later`;
  });
for (let name of filtersArray) {
  const filter = new Filter({title: `${name}`});
  filtersContainer.appendChild(filter.render());

  filter.onFilter = (filterName) => {
    switch (filterName) {
      case `filter__all`:
        return renderTasks(taskFromServer);

      case `filter__overdue`: {
        const newArr = taskFromServer.filter((it) => {
          return it.dueDate < Date.now();
        });
        return renderTasks(newArr);
      }

      case `filter__today`: {
        let newArr = taskFromServer.filter((it) => {
          return moment(it.dueDate).day() === moment(Date.now()).day();
        })
        ;
        return renderTasks(newArr);
      }

      case `filter__repeating`: {
        let newArr = taskFromServer.filter((it) => [...Object.entries(it.repeatingDays)]
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

    const block = (param) => {
      editTaskComponent.element.querySelector(`.card__form`).classList.remove(`shake`, `error`);
      editTaskComponent.element.querySelector(`.card__save`).textContent = param === `saving` ? `Saving...` : `Deleting...`;
      editTaskComponent.element.querySelectorAll(`form input, form select, form textarea, form button`)
        .forEach((elem) => elem.setAttribute(`disabled`, `disabled`));
    };

    const unblock = () => {
      editTaskComponent.element.querySelector(`.card__save`).textContent = `Save`;
      editTaskComponent.element.querySelectorAll(`form input, form select, form textarea, form button`)
        .forEach((elem) => elem.removeAttribute(`disabled`));
      editTaskComponent.element.querySelector(`.card__form`).classList.add(`shake`, `error`);
    };

    editTaskComponent.onSubmit = (newObject) => {
      task.title = newObject.title;
      task.tags = newObject.tags;
      task.color = newObject.color;
      task.repeatingDays = newObject.repeatingDays;
      task.dueDate = newObject.dueDate;
      block(`saving`);
      api.updateTask({id: task.id, data: task.toRAW()})
        .then((newTask) => {
          taskComponent.update(newTask);
          taskComponent.render();
          tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
          editTaskComponent.unrender();
        })
        .catch(() => {
          unblock();
        });
    };

    editTaskComponent.onDate = () => {
      task.isDate = !task.isDate;

      api.updateTask({id: task.id, data: task.toRAW()})
        .then((newTask) => {
          taskComponent.update(newTask);
          taskComponent.render();
        })
        .catch(() => {
          unblock();
        });
    };

    editTaskComponent.onDelete = ({id}) => {
      block();
      api.deleteTask({id})
        .then(() => api.getTasks())
        .then((tasksNew) => {
          renderTasks(tasksNew);
        })
        .catch(() => {
          unblock();
        });
    };
  }
};

document.querySelector(`.statistic__tags-wrap`).classList.remove(`visually-hidden`);
document.querySelector(`.statistic__colors-wrap`).classList.remove(`visually-hidden`);
statistics();
