import {pickRandom} from './utils';
import {getRandomInt} from './utils';

const getTasks = () => {
  const task = {
    title: [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`,
    ][Math.floor(Math.random() * 3)],
    dueDate: [
      Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
      Date.now(),
      Date.now() + 1 - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    ][Math.floor(Math.random() * 3)],
    tags: pickRandom([
      `homework`,
      `theory`,
      `practice`,
      `intensive`,
      `keks`,
      `life`,
      `love`,
      `friend`,
    ], getRandomInt(0, 3)),
    picture: `//picsum.photos/100/100?r=${Math.random()}`,
    color: [`black`, `yellow`, `blue`, `green`, `pink`][Math.floor(Math.random() * 5)],
    repeatingDays: [{
      'Mo': false,
      'Tu': false,
      'We': false,
      'Th': false,
      'Fr': false,
      'Sa': false,
      'Su': false,
    },
    {
      'Mo': false,
      'Tu': true,
      'We': false,
      'Th': false,
      'Fr': false,
      'Sa': false,
      'Su': false,
    }
    ][Math.floor(Math.random() * 2)],
    deleted: false
  };
  return task;
};

export default getTasks;
