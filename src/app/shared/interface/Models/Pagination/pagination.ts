export interface Pagination {
  PageSize: number;
  PageNumber: number;
}

export interface ITPagination<T> {
  totalCount: number;
  items: T[];
}
