import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiContent, ApiResponse, ContentData } from '../types';
import { Subject, catchError, map, throwError } from 'rxjs';
import { env } from 'src/environment/env';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly contentUrl = env.base_url + '/contents';
  private errorObject$ = new Subject<{ [key: string]: string }>();
  httpError$ = this.errorObject$.asObservable();

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

  createContent(newContent: FormData) {
    return this.http
      .post<ContentData>(this.contentUrl, newContent)
      .pipe(catchError(this.handleError.bind(this)));
  }

  deleteContentById(contentId: number) {
    return this.http.delete(this.contentUrl + `/${contentId}`);
  }

  updateContent(id: number, content: FormData) {
    return this.http
      .put(this.contentUrl + `/${id}`, content)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse) {
    let err: { [key: string]: string } = {};
    if (error.status === 0) {
      err['global'] = 'Error occured';
    } else {
      err = error.error.details;
    }
    this.errorObject$.next(err);
    return throwError(() => error.message);
  }
}
