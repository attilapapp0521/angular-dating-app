export interface Pagination{
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    tottalPages: number;
}

export class PaginatedResult<T>{
    result: T;
    pagination: Pagination;
}