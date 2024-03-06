import { Observable } from "rxjs";

export interface Pagination<T>{
    data: Observable<T[]>,
    collectionSize: number,
    page: number,
    pageSize: number
    list: T[]
}