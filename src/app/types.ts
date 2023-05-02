export type ApiResponse<T> = {
  data: T,
  message: string,
  statusCode: number,
  timestamp: number
}

export type ApiContent = {
  id: number,
  title: string,
  categories: Category[],
  releaseYear: number,
  resume: string,
  shortResume: string,
  type: ContentType
}

export type ContentType = "MOVIE" | "ANIME" | "SERIE";

export type Category = {
  id: number,
  name: string
}
