import Component from './component';
import moment from 'moment';

export default class Task extends Component {

  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._onEdit = null;
    this.deleted = data.deleted;
    this.isDate = data.isDate;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  update(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this.deleted = data.deleted;
    this.isDate = data.isDate;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _dateFormat() {
    const taskDate = moment(this._dueDate).format(`D MMMM`);
    const taskTime = moment(this._dueDate).format(`hh:mm A`);
    return {taskDate, taskTime};
  }
  get template() {
    return `
    <article class="card card--${this._color}${this._isRepeated() ? ` card--repeat` : ``}">
              
              <form class="card__form" method="get">
                <div class="card__inner">
                  <div class="card__control">
                    <button type="button" class="card__btn card__btn--edit">
                      edit
                    </button>
  
                    <button type="button" 
                    class="card__btn card__btn--archive">
                     archive
                    </button>
                    
                    <button
                      type="button"
                      class="card__btn card__btn--favorites">
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
                      placeholder="Start typing your text here..."
                      name="text"
                    >${this._title}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                  ${this.isDate ? `
                   <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">no</span>
                      </button>
  
                      <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
                      <label class="card__input-deadline-wrap">
                        <input
                          class="card__date"
                          type="text"
                          placeholder="23 September"
                          name="date"
                          value="${this._dueDate ? this._dateFormat().taskDate : ``}"
                          />
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__time"
                            type="text"
                            placeholder="11:15 PM"
                            name="time"
                            value="${this._dueDate ? this._dateFormat().taskTime : ``}"
                        />
                      </label>
                    </fieldset>

                    <button class="card__repeat-toggle" type="button">
                      repeat:<span class="card__repeat-status">no</span>
                    </button>
</div>
                  ` : ``}
                     
                    <div class="card__hashtag">
                      <div class="card__hashtag-list">${Array.from(this._tags).map((tag)=>{
    return `<span class="card__hashtag-inner">
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
  }).join(``)}</div>
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
                      src="${this._picture}"
                      alt="task picture"
                      class="card__img"
                    />
                  </label>
                </div>

               
              </div>
            </form>
          </article>
    `.trim();
  }

  createListeners() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  removeListeners() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }
}
