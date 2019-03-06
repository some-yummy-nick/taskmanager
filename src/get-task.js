const getTasks = () => {
  const task = {
    title: [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`,
    ][Math.floor(Math.random() * 3)],
    dueDate: [
      Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
      Date.now() + 1 - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    ][Math.floor(Math.random() * 2)],
    tags: new Set([
      `homework`,
      `theory`,
      `practice`,
      `intensive`,
      `keks`,
      `life`,
      `love`,
      `friend`,
    ]),
    picture: `//picsum.photos/100/100?r=${Math.random()}`,
    color: [`black`, `yellow`, `blue`, `green`, `pink`][Math.floor(Math.random() * 5)],
    repeatingDays: {
      'Mo': true,
      'Tu': false,
      'We': true,
      'Th': false,
      'Fr': false,
      'Sa': true,
      'Su': false,
    },
    isFavorite: [true, false][Math.floor(Math.random() * 2)],
    isDone: [true, false][Math.floor(Math.random() * 2)],
  };
  return task;
};

export default getTasks;
