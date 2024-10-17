
export type ApiData<T> = {
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPage: number;
  totalRecords: number;
  nextPage: string;
  previousPage: string;
  data: T[];

}
