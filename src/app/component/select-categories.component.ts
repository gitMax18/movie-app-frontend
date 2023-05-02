import { Component, Input } from '@angular/core';
import { Category } from '../types';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-select-categories',
  template: `
    <div class="categories" *ngIf="categories">
      <div
        class="categories__item"
        [class.selected]="isSelected(category.id)"
        (click)="handleCategory(category.id)"
        *ngFor="let category of categories"
      >
        {{ category.name }}
      </div>
    </div>
  `,
  styles: [
    `
      .categories {
        display: flex;
        justify-content: flex-start;
        align-item: center;
        gap: 1rem;

        &__item {
          padding: 0.5rem 1rem;
          background-color: var(--color-grey);
          cursor: pointer;
          color: var(--color-light);
          border-radius: var(--main-radius);
        }
      }
      .selected {
        background-color: var(--color-primary);
      }
    `,
  ],
})
export class SelectCategoriesComponent implements ControlValueAccessor {
  @Input() categories: Category[] = [];
  selectedCategories: number[] = [];

  onchange: (_: any) => void = (_: any) => {};
  onTouch: () => void = () => {};

  writeValue(categories: number[]): void {
    this.selectedCategories = categories;
  }
  registerOnChange(fn: any): void {
    this.onchange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  handleCategory(categoryId: number) {
    const index = this.selectedCategories.indexOf(categoryId);
    if (index === -1) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.onchange(categoryId);
    this.onTouch();
  }

  isSelected(categoryId: number): boolean {
    return this.selectedCategories.includes(categoryId);
  }
}
