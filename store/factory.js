import {call, put} from "redux-saga/effects";
import {deleteEntity, fetchAll, fetchEntity, postEntity, putEntity,} from "./api";
import ApiHandler from "../models/apiHandler";


export function* fetchAllGen(url, params, successCallback, errorCallback) {
    try {
        const finalUrl = url + (params || "");
        const response = yield call(fetchAll, finalUrl);
        yield put(successCallback(response));
    } catch (error) {
        yield put(errorCallback(error.message));
    }
}

export function* fetchEntityGen(url, params, successCallback, errorCallback) {
    try {
        const finalUrl = url + "/" + params;
        const response = yield call(fetchEntity, finalUrl);
        yield put(successCallback(response));
    } catch (error) {
        yield put(errorCallback(error.message));
    }
}

export function* postEntityGen(url, options, successCallback, errorCallback) {
    const data = options.payload
    const apiHandler = options.apiHandler || new ApiHandler()
    try {
        const response = yield call(postEntity, url, data);
        if (apiHandler.refreshId) {
            const entityUrl = url + "/" + response.id;
            const entity = yield call(fetchEntity, entityUrl);
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
    let finalUrl = url;
    if (apiHandler.appendId) {
        finalUrl += "/" + data.id;
    }
    const requestEntity = apiHandler.method = "POST" ? postEntity : putEntity
    try {
        const result = yield call(requestEntity, finalUrl, data);
        if (apiHandler.refreshId) {
            const entityUrl = url + "/" + data.id;
            const entity = yield call(fetchEntity, entityUrl);
            yield put(successCallback(entity));
        } else {
            yield put(successCallback(result));
        }
    } catch (error) {
        yield put(errorCallback(error.message));
    }
}
export function* delEntityGen(url, payload, successCallback, errorCallback) {
    try {
        yield call(deleteEntity, url, payload);
        yield put(successCallback(payload.id));
    } catch (error) {
        yield put(errorCallback(error.message));
    }
}

export function* customEntityGen(payload, callback) {
    yield put(callback(payload));
}
