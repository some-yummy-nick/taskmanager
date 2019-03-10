import {tags} from './utils';
import Component from './component';

export default class Task extends Component {

  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._isDone = data.isDone;
    this._isFavorite = data.isFavorite;
    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
    <article class="card card--${this._color}">
            
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  ${this._isDone ? `
  
                    <button type="button" 
                    class="card__btn card__btn--archive">
                     archive
                    </button>` : ``}
                    
                    <button
                      type="button"
                      class="card__btn card__btn--favorites${this._isFavorite ? ` card__btn--disabled` : ``}">
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
                      placeholder="${this._title}"
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
 placeholder="${new Date(this._dueDate).toLocaleString(`en-US`, {day: `numeric`})} ${new Date(this._dueDate).toLocaleString(`en-US`, {month: `long`})}" name="date"
                            value="${new Date(this._dueDate).toLocaleString(`en-US`, {day: `numeric`})} ${new Date(this._dueDate).toLocaleString(`en-US`, {month: `long`})}"/>
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__time"
                            type="text"
placeholder="${new Date(this._dueDate).toLocaleString(`en-US`, {hour: `2-digit`, minute: `2-digit`})}"  name="time"
value="${new Date(this._dueDate).toLocaleString(`en-US`, {hour: `2-digit`, minute: `2-digit`})}"
                          />
                        </label>
                      </fieldset>

                  
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">${tags(this._tags)}</div>
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
