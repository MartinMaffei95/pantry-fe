export type UseApiRequestStatus = "NONE" | "LOADING" | "ERROR" | "SUCCESS";

export interface PaginationInfo {
  page: number;
  perPage: number;
  totalPages: number;
  totalProducts: number;
  nextPage: number | null;
  prevPage: number | null;
}

export type PaginatedData<Data> = {
  data: Data;
  pagination: PaginationInfo;
};

export type Option = {
  value: string;
  label: string;
};

export type StyleConfig = { classNameStyle: string };
