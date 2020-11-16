import {call, put} from "redux-saga/effects";
import {deleteEntity, fetchAll, fetchEntity, postEntity, putEntity,} from "./api";


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

export function* postEntityGen(url, data, successCallback, errorCallback) {
    try {
        const response = yield call(postEntity, url, data);
        const entityUrl = url + "/" + response.id;
        const entity = yield call(fetchEntity, entityUrl);
        yield put(successCallback(entity));

    } catch (error) {
        yield put(errorCallback(error.message));
    }
}

export function* putEntityGen(url, data, successCallback, errorCallback) {
    try {
        yield call(putEntity, url, data);
        const entityUrl = url + "/" + data.id;
        const entity = yield call(fetchEntity, entityUrl);
        yield put(successCallback(entity));

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
