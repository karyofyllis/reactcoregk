import {call, put} from "redux-saga/effects";
import {deleteEntity, fetchAll, fetchEntity, postEntity, putEntity,} from "./api";
import ApiHandler from "../models/apiHandler";


export function* fetchAllGen(url, options, successCallback, errorCallback) {
    const params = options.params
    const apiHandler = options.apiHandler || new ApiHandler()
    const baseUrl = getBaseUrl(url, apiHandler)
    try {
        const finalUrl = baseUrl + (params || "");
        const response = yield call(fetchAll, finalUrl, apiHandler.headers);
        yield put(successCallback(response));
    } catch (error) {
        yield put(errorCallback(error.message));
    }
}

export function* fetchEntityGen(url, options, successCallback, errorCallback) {
    const params = options.params
    const apiHandler = options.apiHandler || new ApiHandler()
    const baseUrl = getBaseUrl(url, apiHandler)
    try {
        const finalUrl = baseUrl + "/" + params;
        const response = yield call(fetchEntity, finalUrl, apiHandler.headers);
        yield put(successCallback(response));
    } catch (error) {
        yield put(errorCallback(error.message));
    }
}

export function* postEntityGen(url, options, successCallback, errorCallback) {
    const data = options.payload
    const apiHandler = options.apiHandler || new ApiHandler()
    const baseUrl = getBaseUrl(url, apiHandler)
    try {
        const response = yield call(postEntity, baseUrl + apiHandler.params, data, apiHandler.headers);
        if (apiHandler.refreshId) {
            const entityUrl = baseUrl + "/" + response.id + apiHandler.params;
            const entity = yield call(fetchEntity, entityUrl, apiHandler.headers);
            yield put(successCallback(entity));
        } else {
            yield put(successCallback(response));
        }

    } catch (error) {
        yield put(errorCallback(error.message));
    }
}

export function* putEntityGen(url, options, successCallback, errorCallback) {
    const data = options.payload
    const apiHandler = options.apiHandler || new ApiHandler()
    const baseUrl = getBaseUrl(url, apiHandler)
    let finalUrl = baseUrl;
    if (apiHandler.appendId) {
        finalUrl += "/" + data.id;
    }
    finalUrl += apiHandler.params
    const requestEntity = apiHandler.method === "POST" ? postEntity : putEntity
    try {
        const result = yield call(requestEntity, finalUrl, data, apiHandler.headers);
        if (apiHandler.refreshId) {
            const entityUrl = baseUrl + "/" + data.id + apiHandler.params;
            const entity = yield call(fetchEntity, entityUrl, apiHandler.headers);
            yield put(successCallback(entity));
        } else {
            yield put(successCallback(result));
        }
    } catch (error) {
        yield put(errorCallback(error.message));
    }
}
export function* delEntityGen(url, options, successCallback, errorCallback) {
    const payload = options.payload
    const apiHandler = options.apiHandler || new ApiHandler()
    const baseUrl = getBaseUrl(url, apiHandler)
    try {
        yield call(deleteEntity, baseUrl + apiHandler.params, payload, apiHandler.headers);
        yield put(successCallback(payload.id));
    } catch (error) {
        yield put(errorCallback(error.message));
    }
}

export function* customEntityGen(payload, callback) {
    yield put(callback(payload));
}

function getBaseUrl(url, apiHandler) {
    return apiHandler.endpoint || url
}
