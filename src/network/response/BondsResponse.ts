import Bond from "../../models/Bond.ts";

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

type  BondsResponse =  {
    pagination: Pagination;
    bonds: Array<Bond>;
}

export default BondsResponse;