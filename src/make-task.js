const days = (data) => {
  let allDays = ``;

  for (let day in data) {

    if (data.hasOwnProperty(day)) {

      const oneDay = `<input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-${day.toLowerCase()}-6"
                  name="repeat"
                  value="${day.toLowerCase()}"
                  ${data[day] ? `checked` : ``}
                />
                <label class="card__repeat-day" for="repeat-${day.toLowerCase()}-6"
                  >${day.toLowerCase()}</label
                >`;
      allDays += oneDay;
    }

  }

  return allDays;

};

const pickRandom = (arr, count) => {
  const out = [];
  const clone = arr.slice(0, arr.length);

  for (let i = 0; i < count; i++) {
    const pick = Math.floor(Math.random() * clone.length);

    if (clone[pick] !== undefined) {
      out.push(clone[pick]);
      clone.splice(pick, 1);
    }
  }
  return out;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const tags = (data) => {
  const tagsArray = pickRandom(Array.from(data), getRandomInt(0, 3));
  let allTags = ``;
  for (let tag of tagsArray) {
    const oneTag = `
    <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="${tag}"
                            class="card__hashtag-hidden-input"
                          />
                          <button type="button" class="card__hashtag-name">
                            #${tag}
                          </button>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>`;
    allTags += oneTag;
  }
  return allTags;
};

const makeTask = (task) => {

  return `
<article class="card card--${task.color}">
            
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  ${task.isDone ? `
                  <button type="button" 
                  class="card__btn card__btn--archive">
                   archive
                  </button>` : ``}
                  
                  <button
                    type="button"
                    class="card__btn card__btn--favorites${task.isFavorite ? ` card__btn--disabled` : ``}"
                  >
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="${task.title}"
                      name="text"
                    ></textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">no</span>
                      </button>

                      <fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
 placeholder="${new Date(task.dueDate).toLocaleString(`en-US`, {day: `numeric`})} ${new Date(task.dueDate).toLocaleString(`en-US`, {month: `long`})}"                            name="date"
                            value="${new Date(task.dueDate).toLocaleString(`en-US`, {day: `numeric`})} ${new Date(task.dueDate).toLocaleString(`en-US`, {month: `long`})}"
                          />
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__time"
                            type="text"
placeholder="${new Date(task.dueDate).toLocaleString(`en-US`, {hour: `2-digit`, minute: `2-digit`})}"                            name="time"
                            value="${new Date(task.dueDate).toLocaleString(`en-US`, {
    hour: `2-digit`,
    minute: `2-digit`
  })}"
                          />
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">no</span>
                      </button>

                      <fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                        ${days(task.repeatingDays)}
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">${tags(task.tags)}</div>
                      <label>
                        <input
                          type="text"
                          class="card__hashtag-input"
                          name="hashtag-input"
                          placeholder="Type new hashtag here"
                        />
                      </label>
                    </div>
                  </div>

                  <label class="card__img-wrap">
                    <input
                      type="file"
                      class="card__img-input visually-hidden"
                      name="img"
                    />
                    <img
                      src="${task.picture}"
                      alt="task picture"
                      class="card__img"
                    />
                  </label>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      <input
                        type="radio"
                        id="color-black-6"
                        class="card__color-input card__color-input--black visually-hidden"
                        name="color"
                        value="black"
                      />
                      <label
                        for="color-black-6"
                        class="card__color card__color--black"
                        >black</label
                      >
                      <input
                        type="radio"
                        id="color-yellow-6"
                        class="card__color-input card__color-input--yellow visually-hidden"
                        name="color"
                        value="yellow"
                      />
                      <label
                        for="color-yellow-6"
                        class="card__color card__color--yellow"
                        >yellow</label
                      >
                      <input
                        type="radio"
                        id="color-blue-6"
                        class="card__color-input card__color-input--blue visually-hidden"
                        name="color"
                        value="blue"
                      />
                      <label
                        for="color-blue-6"
                        class="card__color card__color--blue"
                        >blue</label
                      >
                      <input
                        type="radio"
                        id="color-green-6"
                        class="card__color-input card__color-input--green visually-hidden"
                        name="color"
                        value="green"
                        checked
                      />
                      <label
                        for="color-green-6"
                        class="card__color card__color--green"
                        >green</label
                      >
                      <input
                        type="radio"
                        id="color-pink-6"
                        class="card__color-input card__color-input--pink visually-hidden"
                        name="color"
                        value="pink"
                      />
                      <label
                        for="color-pink-6"
                        class="card__color card__color--pink"
                        >pink</label
                      >
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>
`;
};


export {makeTask as default};

function getTask() {
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
}

export {getTask};
