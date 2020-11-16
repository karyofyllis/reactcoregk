import Entity from "./Entity";

class Paging extends Entity{
    constructor() {
        super()
        this.totalElements = 0;
        this.totalPages = 0;
        this.size = 0;
        this.number = 0;
        this.numberOfElements = 0;
        this.first = true;
        this.last = true;
        this.empty = true;
        this.pageable = {
            page: 0,
            size: 0,
            sort: ["string"],
        };
        this.sort = {
            sorted: true,
            unsorted: true,
            empty: true,
        };
        this.content = [];
    }
}
export default Paging
