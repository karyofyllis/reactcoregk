export default class ApiHandler {
    constructor(appendId = true, refreshId = true, method = "default") {
        this.appendId = appendId
        this.refreshId = refreshId
        this.method = method
    }
}
