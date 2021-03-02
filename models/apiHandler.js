export default class ApiHandler {
    constructor(appendId = true, refreshId = true, headers = {}, method = "default", params = "") {
        this.appendId = appendId
        this.refreshId = refreshId
        this.method = method
        this.headers = headers
        this.params = params
    }
}
