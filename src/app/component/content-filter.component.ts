import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-content-filter',
  template: `
    <div class="contentFilter">
      <input
        class="contentFilter__input"
        [formControl]="searchForm"
        placeholder="find content"
        type="text"
      />
    </div>
  `,
  styles: [
    `
      .contentFilter {
        margin-bottom: 4rem;
        &__input {
          display: block;
          margin: 0 auto;
          width: 100%;
          max-width: 80rem;
          font-size: 2rem;
          padding: 1rem 2rem;
          border-radius: 999rem;
          background-color: var(--color-dark);
          color: var(--color-light);
          border: none;
          outline: none;
        }
      }
    `,
  ],
})
export class ContentFilterComponent {
  @Output('onSearch')
  search = new EventEmitter<string>();

  searchForm = new FormControl<string>('');

  ngOnInit() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((value) => value?.trim())
      )
      .subscribe((value) => this.search.emit(value));
  }
}
