import {
    CUSTOM,
    DELETE,
    DELETE_FAILURE,
    DELETE_SUCCESS,
    GET,
    GET_ALL,
    GET_ALL_FAILURE,
    GET_ALL_PAGEABLE,
    GET_ALL_PAGEABLE_FAILURE,
    GET_ALL_PAGEABLE_SUCCESS,
    GET_ALL_SUCCESS,
    GET_FAILURE,
    GET_SUCCESS,
    POST,
    POST_FAILURE,
    POST_SUCCESS,
    UPDATE,
    UPDATE_FAILURE,
    UPDATE_SUCCESS,
} from "./actionTypes";

export const ActionStates = {
    request: "REQUEST",
    success: "SUCCESS",
    failure: "FAILURE"
}

export const buildActionType = (entity, type) => entity + "." + type;

export const buildAsyncActionType = (entity, type, asyncState) => [entity, type, asyncState].join(".")

export const createAction = (type, payload) => {
    return {
        type: type,
        payload: payload,
    };
};

export const createAsyncAction = (entityType, type) => {
    const request = (payload) => ({
        type: buildAsyncActionType(entityType, type, ActionStates.request),
        payload: payload,
    });
    const success = (payload) => ({
        type: buildAsyncActionType(entityType, type, ActionStates.success),
        payload: payload,
    });
    const failure = (payload) => ({
        type: buildAsyncActionType(entityType, type, ActionStates.failure),
        payload: payload,
    });
    return {request, success, failure}
};

export const createGetMethod = (entityType, params, apiHandler) => {
    return {
        type: buildActionType(entityType, GET),
        params: params,
        apiHandler
    };
};

export const createGetSuccessMethod = (entityType, result) => {
    return {
        type: buildActionType(entityType, GET_SUCCESS),
        result: result,
    };
};

export const createGetFailureMethod = (entityType, error) => {
    return {
        type: buildActionType(entityType, GET_FAILURE),
        result: error,
    };
};

export const createPostMethod = (entityType, payload, apiHandler) => {
    return {
        type: buildActionType(entityType, POST),
        payload: payload,
        apiHandler
    };
};

export const createPostSuccessMethod = (entityType, result) => {
    return {
        type: buildActionType(entityType, POST_SUCCESS),
        result: result,
    };
};

export const createPostFailureMethod = (entityType, error) => {
    return {
        type: buildActionType(entityType, POST_FAILURE),
        result: error,
    };
};
export const createPutMethod = (entityType, payload, apiHandler) => {
    return {
        type: buildActionType(entityType, UPDATE),
        payload: payload,
        apiHandler
    };
};

export const createPutSuccessMethod = (entityType, result) => {
    return {
        type: buildActionType(entityType, UPDATE_SUCCESS),
        result: result,
    };
};

export const createPutFailureMethod = (entityType, error) => {
    return {
        type: buildActionType(entityType, UPDATE_FAILURE),
        result: error,
    };
};
export const createDeleteMethod = (entityType, payload, apiHandler) => {
    return {
        type: buildActionType(entityType, DELETE),
        payload: payload,
        apiHandler
    };
};

export const createDeleteSuccessMethod = (entityType, result) => {
    return {
        type: buildActionType(entityType, DELETE_SUCCESS),
        result: result,
    };
};

export const createDeleteFailureMethod = (entityType, error) => {
    return {
        type: buildActionType(entityType, DELETE_FAILURE),
        result: error,
    };
};

export const createGetAllMethod = (entityType, params, apiHandler) => {
    return {
        type: buildActionType(entityType, GET_ALL),
        params: params,
        apiHandler
    };
};

export const createGetAllSuccessMethod = (entityType, result) => {
    return {
        type: buildActionType(entityType, GET_ALL_SUCCESS),
        result: result,
    };
};

export const createGetAllFailureMethod = (entityType, error) => {
    return {
        type: buildActionType(entityType, GET_ALL_FAILURE),
        result: error,
    };
};
export const createGetAllPageableMethod = (entityType, params, apiHandler) => {
    return {
        type: buildActionType(entityType, GET_ALL_PAGEABLE),
        params: params,
        apiHandler
    };
};

export const createGetAllPageableSuccessMethod = (entityType, result) => {
    return {
        type: buildActionType(entityType, GET_ALL_PAGEABLE_SUCCESS),
        result: result,
    };
};

export const createGetAllPageableFailureMethod = (entityType, error) => {
    return {
        type: buildActionType(entityType, GET_ALL_PAGEABLE_FAILURE),
        result: error,
    };
};

export const createCustomAction = (entityType, payload) => {
    return {
        type: buildActionType(entityType, CUSTOM),
        customType: payload.actionType,
        payload: payload,
    };
};
