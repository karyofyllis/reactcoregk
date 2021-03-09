export default class ApiHandler {
    constructor(appendId = true, refreshId = true, headers = {}, method = "default", params = "", endpoint = null) {
        this.appendId = appendId
        this.refreshId = refreshId
        this.method = method
        this.headers = headers
        this.params = params
        this.endpoint = endpoint
    }
}
