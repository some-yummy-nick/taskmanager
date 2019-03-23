import getTasks from "./get-task";

const taskCommon = [];

for (let i = 0; i < 7; i++) {
  taskCommon.push(getTasks());
}

export default taskCommon;
