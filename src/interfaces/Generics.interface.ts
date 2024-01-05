export type UseApiRequestStatus = "NONE" | "LOADING" | "ERROR" | "SUCCESS";

export interface PaginationInfo {
  page: number;
  perPage: number;
  totalPages: number;
  totalProducts: number;
  nextPage: string | null;
  prevPage: string | null;
}

export type PaginatedData<Data> = {
  data: Data;
  pagination: PaginationInfo;
};

export type Option = {
  value: string;
  label: string;
};
