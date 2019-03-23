import flatpickr from "flatpickr";
import moment from 'moment';
import getChart from './myChart';
import taskCommon from './taskCommon';

export default function statistics() {
  document.querySelector(`#control__statistic`)
    .addEventListener(`click`, ()=>{
      document.querySelector(`.board.container`).classList.add(`visually-hidden`);
      document.querySelector(`.statistic`).classList.remove(`visually-hidden`);

    });

  document.querySelector(`#control__task`)
    .addEventListener(`click`, ()=>{
      document.querySelector(`.board.container`).classList.remove(`visually-hidden`);
      document.querySelector(`.statistic`).classList.add(`visually-hidden`);
    });
  flatpickr(document.querySelector(`.statistic__period-input`), {
    mode: `range`,
    dateFormat: `Y-m-d`,
    defaultDate: [moment().subtract(7, `days`).format(`YYYY-MM-DD`), moment().add(7, `days`).format(`YYYY-MM-DD`)],
    onClose(selectedDates) {
      const firstDay = moment(selectedDates[0]).valueOf();
      const secondDay = moment(selectedDates[1]).valueOf();
      const newTasks = taskCommon.filter((task)=>{
        return task.dueDate > firstDay && task.dueDate < secondDay;
      });
      getChart(newTasks);
    }
  });
  document.querySelector(`#control__statistic`).click();

  getChart(taskCommon);
}
