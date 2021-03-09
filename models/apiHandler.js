export default class ApiHandler {
    constructor(appendId = true, refreshId = true, headers = {}, method = "default", params = "", overrideUrl = null) {
        this.appendId = appendId
        this.refreshId = refreshId
        this.method = method
        this.headers = headers
        this.params = params
        this.overrideEndpoint = overrideUrl
    }
}
