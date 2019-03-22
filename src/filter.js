import Component from './component';

export default class Filter extends Component {

  constructor(data) {
    super();
    this.title = data.title;
    this._onFilter = null;
    this._clickOnFilter = this._clickOnFilter.bind(this);
  }

  _clickOnFilter(evt) {
    const filterName = evt.target.id;
    return typeof this._onFilter === `function` && this._onFilter(filterName);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
        <div>
        <input
          type="radio"
          id="filter__${this.title}"
          class="filter__input visually-hidden"
          name="filter"/>
        <label for="filter__${this.title}" class="filter__label"
          >${this.title} <span class="filter__${this.title}-count"></span></label>
        </div>
    `.trim();
  }

  createListeners() {
    this._element.querySelector(`.filter__input`).addEventListener(`change`, this._clickOnFilter);
  }

  removeListeners() {
    this._element.querySelector(`.filter__input`).removeEventListener(`change`, this._clickOnFilter);
  }
}
