export const days = (data) => {
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

export const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const pickRandom = (arr, count) => {
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

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const tags = (data) => {
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
