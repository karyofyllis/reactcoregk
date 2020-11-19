export default class ApiHandler {
    constructor(appendId = true, refreshId = true, headers = {}, method = "default") {
        this.appendId = appendId
        this.refreshId = refreshId
        this.method = method
        this.headers = headers
    }
}
