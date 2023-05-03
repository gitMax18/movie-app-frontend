import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiContent, ApiResponse, ContentData } from '../types';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly contentUrl = 'http://localhost:8080/api/contents';

  constructor(private http: HttpClient) {}

  getAllContent() {
    return this.http
      .get<ApiResponse<ApiContent[]>>(this.contentUrl)
      .pipe(map((response) => response.data));
  }

  getContentById(id: number) {
    return this.http
      .get<ApiResponse<ApiContent>>(this.contentUrl + `/${id}`)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  createContent(newContent: ContentData) {
    return this.http.post<ContentData>(this.contentUrl, newContent);
  }

  private handleError(error: HttpErrorResponse) {
    let message: string;
    if (error.status === 0) {
      message = 'A client or network error occurred';
    } else {
      message = error.error.message;
    }
    return throwError(() => new Error(message));
  }
}
