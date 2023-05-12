import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Category } from '../types';
import { map } from 'rxjs';
import { env } from 'src/environment/env';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categoryUrl = env.base_url + '/categories';

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http
      .get<ApiResponse<Category[]>>(this.categoryUrl)
      .pipe(map((response) => response.data));
  }
}
