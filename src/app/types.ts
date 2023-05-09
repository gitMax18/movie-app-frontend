export type ApiResponse<T> = {
  data: T;
  message: string;
  statusCode: number;
  timestamp: number;
};

export type ApiError = {
  statusCode: number;
  message: string;
  timestamp: number;
  details?: [
    {
      [key: string]: string;
    }
  ];
};

export type ApiContent = {
  id: number;
  title: string;
  categories: Category[];
  releaseYear: number;
  resume: string;
  shortResume: string;
  type: ContentType;
};

export type ContentData = {
  title: string;
  categories: number[];
  releaseYear: number;
  resume: string;
  shortResume: string;
  type: ContentType;
};

export enum ContentType {
  MOVIE = 'MOVIE',
  ANIME = 'ANIME',
  SERIE = 'SERIE',
}

export type Category = {
  id: number;
  name: string;
};
