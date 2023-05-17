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
  imagePath: string;
  userId: number;
};

export type ContentData = {
  title: string;
  categories: number[];
  releaseYear: number;
  resume: string;
  shortResume: string;
  type: ContentType;
  file: File;
  userId: number;
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

export type Env = {
  base_url: string;
};

export type AuthData = {
  email: string;
  password: string;
};

export type ApiUser = {
  id: number;
  email: string;
  role: string;
};

export type ApiToken = {
  exp: number;
  iat: number;
  sub: string;
  user: ApiUser;
};
