import * as ActionTypes from "./actionTypes";
import {ActionStates} from "./actions";
import Paging from "../models/Paging"

export const createOperationState = (
    result = null,
    error = null,
    isLoading = false,
    all = []
) => ({ isLoading, error, result, all });

export const getCommonState = () => ({
    get: createOperationState({}),
    getAll: createOperationState([]),
    getAllPageable: createOperationState(new Paging()),
    update: createOperationState(),
    create: createOperationState(),
    delete: createOperationState(),
});

export const handleAsyncState = (state, action, propertyName) => {
    const asyncState = action.type.split(".")[2];

    switch (asyncState) {
        case ActionStates.request:
            return {
                ...state,
                [propertyName]: {
                    ...state[propertyName],
                    isLoading: true,
                },
            };
        case ActionStates.success:
            return {
                ...state,
                [propertyName]: {
                    ...state[propertyName],
                    isLoading: false,
                    result: action.payload,
                },
            };
        case ActionStates.failure:
            return {
                ...state,
                [propertyName]: {
                    ...state[propertyName],
                    isLoading: false,
                    error: action.payload,
                },
            };
        default:
            break;
    }
};

export const handleCommonState = (state, actionType, action, identifierProp = "id") => {
    switch (actionType) {
        case ActionTypes.GET_ALL:
            return {
                ...state,
                getAll: {
                    ...state.getAll,
                    isLoading: true,
                },
            };
        case ActionTypes.GET_ALL_SUCCESS:
            return {
                ...state,
                getAll: {
                    ...state.getAll,
                    error: null,
                    result: action.result.map((el) => ({
                        ...el,
                        id: el[identifierProp],
                    })),
                    isLoading: false,
                },
            };
        case ActionTypes.GET_ALL_FAILURE:
            return {
                ...state,
                getAll: {
                    ...state.getAll,
                    error: action.result,
                    result: [],
                    isLoading: false,
                },
            };
        case ActionTypes.GET:
            return {
                ...state,
                get: {
                    ...state.get,
                    isLoading: true,
                },
            };
        case ActionTypes.GET_SUCCESS:
            return {
                ...state,
                get: {
                    ...state.get,
                    result: {
                        ...action.result,
                        id: action.result[identifierProp],
                    },
                    error: null,
                    isLoading: false,
                },
                delete: {
                    ...state.delete,
                    error: null,
                },
                update: {
                    ...state.delete,
                    error: null,
                },
            };
        case ActionTypes.GET_FAILURE:
            return {
                ...state,
                get: {
                    ...state.get,
                    result: {},
                    error: action.result,
                    isLoading: false,
                },
            };
        case ActionTypes.UPDATE:
            return {
                ...state,
                update: {
                    ...state.update,
                    error: null,
                    isLoading: true,
                },
            };
        case ActionTypes.UPDATE_SUCCESS:
            return {
                ...state,
                get: {
                    ...state.get,
                    result: { ...action.result, id: action.result[identifierProp] },
                },
                update: {
                    ...state.update,
                    result: {
                        ...action.result,
                        id: action.result[identifierProp],
                    },
                    error: null,
                    isLoading: false,
                },
                getAll: {
                    ...state.getAll,
                    result: state.getAll.result.map((item) => {
                        if (item.id === action.result[identifierProp]) {
                            return {
                                ...action.result,
                                id: item.id,
                            };
                        }
                        return item;
                    }),
                },
                getAllPageable: {
                    ...state.getAllPageable,
                    all: state.getAllPageable.all.map((item) => {
                        if (item.id === action.result[identifierProp]) {
                            return {
                                ...action.result,
                                id: item.id,
                            };
                        }
                        return item;
                    }),
                },
            };
        case ActionTypes.UPDATE_FAILURE:
            return {
                ...state,
                update: {
                    ...state.update,
                    error: action.result,
                    isLoading: false,
                },
            };
        case ActionTypes.POST:
            return {
                ...state,
                create: {
                    ...state.create,
                    error: null,
                    isLoading: true,
                },
            };
        case ActionTypes.POST_SUCCESS:
            return {
                ...state,
                create: {
                    ...state.create,
                    result: {
                        ...action.result,
                        id: action.result[identifierProp],
                    },
                    error: null,
                    isLoading: false,
                },
                getAll: {
                    ...state.getAll,
                    result: [
                        ...state.getAll.result,
                        { ...action.result, id: action.result[identifierProp] },
                    ],
                },
                getAllPageable: {
                    ...state.getAllPageable,
                    all: [
                        ...state.getAllPageable.all,
                        { ...action.result, id: action.result[identifierProp] },
                    ],
                },
            };
        case ActionTypes.POST_FAILURE:
            return {
                ...state,
                create: {
                    ...state.create,
                    error: action.result,
                    isLoading: false,
                },
            };
        case ActionTypes.DELETE:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    error: null,
                    isLoading: true,
                },
            };
        case ActionTypes.DELETE_SUCCESS:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    error: null,
                    isLoading: false,
                },
                getAll: {
                    ...state.getAll,
                    result: state.getAll.result.filter((x) => x.id !== action.result),
                },
                getAllPageable: {
                    ...state.getAllPageable,
                    all: state.getAllPageable.all.filter((x) => x.id !== action.result),
                },
            };
        case ActionTypes.DELETE_FAILURE:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    error: action.result,
                    isLoading: false,
                },
            };
        case ActionTypes.GET_ALL_PAGEABLE: {
            const page = getParamValue(action.params, "page", "0");
            return {
                ...state,
                getAllPageable: {
                    ...state.getAllPageable,
                    isLoading: true,
                    result: page === "0" ? new Paging() : state.getAllPageable.result,
                    all: page === "0" ? [] : state.getAllPageable.all,
                },
            };
        }
        case ActionTypes.GET_ALL_PAGEABLE_SUCCESS: {
            const page = getParamValue(action.params, "page", "0");
            return {
                ...state,
                getAllPageable: {
                    ...state.getAllPageable,
                    error: null,
                    result: action.result,
                    all:
                        page === "0"
                            ? action.result.content
                            : [...state.getAllPageable.all, ...action.result.content],
                    isLoading: false,
                },
            };
        }
        case ActionTypes.GET_ALL_PAGEABLE_FAILURE:
            return {
                ...state,
                getAllPageable: {
                    ...state.getAllPageable,
                    error: action.result,
                    result: new Paging(),
                    isLoading: false,
                },
            };
        default:
            return state;
    }
};

const getParamValue = (query, param, defaultValue) => {
    try {
        const urlParams = new URLSearchParams(query);
        return urlParams.get(param);
    } catch (e) {
        return defaultValue || null;
    }
};
