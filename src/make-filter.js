export default (caption, count = 0, checked = false) => `<input
          type="radio"
          id="filter__overdue"
          class="filter__input visually-hidden"
          name="filter"
          ${count ? `` : `disabled`}
          ${checked ? `checked` : ``}
        />
        <label for="filter__overdue" class="filter__label"
          >${caption} <span class="filter__overdue-count">${count}</span></label
        >`;
