import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiContent, ApiResponse, ContentData } from '../types';
import { map } from 'rxjs';

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

  createContent(newContent: ContentData) {
    return this.http.post<ContentData>(this.contentUrl, newContent);
  }
}
