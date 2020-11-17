import {fork, takeEvery,} from "redux-saga/effects";
import * as ActionTypes from "../core/actionTypes";
import {
    buildActionType,
    createCustomAction,
    createDeleteFailureMethod,
    createDeleteSuccessMethod,
    createGetAllFailureMethod,
    createGetAllPageableFailureMethod,
    createGetAllPageableSuccessMethod,
    createGetAllSuccessMethod,
    createGetFailureMethod,
    createGetSuccessMethod,
    createPostFailureMethod,
    createPostSuccessMethod,
    createPutFailureMethod,
    createPutSuccessMethod,
} from "./actions";
import {customEntityGen, delEntityGen, fetchAllGen, fetchEntityGen, postEntityGen, putEntityGen,} from "./factory";
import {ApiEndpoint} from "./endpoint";
import {Operation} from "./operation";

const getEntitySuccess = (entityType, result) => createGetSuccessMethod(entityType, result);
const getEntityFailure = (entityType, result) => createGetFailureMethod(entityType, result);
const getAllEntitySuccess = (entityType, result) => createGetAllSuccessMethod(entityType, result);
const getAllEntityFailure = (entityType, result) => createGetAllFailureMethod(entityType, result);
const getAllPageableEntitySuccess = (entityType, result) => createGetAllPageableSuccessMethod(entityType, result);
const getAllPageableEntityFailure = (entityType, result) => createGetAllPageableFailureMethod(entityType, result);
const createEntitySuccess = (entityType, result) => createPostSuccessMethod(entityType, result);
const createEntityFailure = (entityType, result) => createPostFailureMethod(entityType, result);
const updateEntitySuccess = (entityType, result) => createPutSuccessMethod(entityType, result);
const updateEntityFailure = (entityType, result) => createPutFailureMethod(entityType, result);
const deleteEntitySuccess = (entityType, result) => createDeleteSuccessMethod(entityType, result);
const deleteEntityFailure = (entityType, result) => createDeleteFailureMethod(entityType, result);
const customAction = (entityType, result) => createCustomAction(entityType, result);

const getAllEntitiesGen = (entity, {params}) =>
  fetchAllGen(
    ApiEndpoint[entity],
      params,
    (result) => getAllEntitySuccess(entity, result),
    (result) => getAllEntityFailure(entity, result)
  );

const getAllPageableEntitiesGen = (entity, {params}) =>
  fetchAllGen(
    ApiEndpoint[entity],
      params,
    (result) => getAllPageableEntitySuccess(entity, result),
    (result) => getAllPageableEntityFailure(entity, result)
  );

const getEntityGen = (entity, { params }) =>
  fetchEntityGen(
    ApiEndpoint[entity],
    params,
    (result) => getEntitySuccess(entity, result),
    (result) => getEntityFailure(entity, result)
  );

const createEntityGen = (entity, { payload }) =>
  postEntityGen(
    ApiEndpoint[entity],
    payload,
    (result) => createEntitySuccess(entity, result),
    (result) => createEntityFailure(entity, result)
  );

const updateEntityGen = (entity, { payload }) =>
  putEntityGen(
    ApiEndpoint[entity],
    payload,
    (result) => updateEntitySuccess(entity, result),
    (result) => updateEntityFailure(entity, result)
  );

const deleteEntityGen = (entity, { payload }) =>
  delEntityGen(
    ApiEndpoint[entity],
    payload,
    (result) => deleteEntitySuccess(entity, result),
    (result) => deleteEntityFailure(entity, result)
  );

const customEntity = (entity, { payload }) =>
  customEntityGen(payload, (result) => customAction(entity, result));

export function* watchAllEntities(entity) {
  const actionType = buildActionType(entity, ActionTypes.GET_ALL);
  yield takeEvery(actionType, (params) => getAllEntitiesGen(entity, params));
}

export function* watchAllPageableEntities(entity) {
  const actionType = buildActionType(entity, ActionTypes.GET_ALL_PAGEABLE);
  yield takeEvery(actionType, (params) => getAllPageableEntitiesGen(entity, params));
}

export function* watchEntityById(entity) {
  const actionType = buildActionType(entity, ActionTypes.GET);
  yield takeEvery(actionType, (params) => getEntityGen(entity, params));
}

export function* watchEntityCreation(entity) {
  const actionType = buildActionType(entity, ActionTypes.POST);
  yield takeEvery(actionType, (payload) => createEntityGen(entity, payload));
}

export function* watchEntityUpdate(entity) {
  const actionType = buildActionType(entity, ActionTypes.UPDATE);
  yield takeEvery(actionType, (payload) => updateEntityGen(entity, payload));
}

export function* watchEntityDelete(entity) {
  const actionType = buildActionType(entity, ActionTypes.DELETE);
  yield takeEvery(actionType, (payload) => deleteEntityGen(entity, payload));
}

export function* watchEntityCustom(entity) {
  const actionType = buildActionType(entity, ActionTypes.CUSTOM);
  yield takeEvery(actionType, (payload) => customEntity(entity, payload));
}

function getCoreSagas(entityType, entityOperations) {
  const coreSagas = [];
  if (entityOperations.includes(Operation.get))
    coreSagas.push(fork(() => watchEntityById(entityType)));
  if (entityOperations.includes(Operation.getAll))
    coreSagas.push(fork(() => watchAllEntities(entityType)));
  if (entityOperations.includes(Operation.getAllPageable))
    coreSagas.push(fork(() => watchAllPageableEntities(entityType)));
  if (entityOperations.includes(Operation.create))
    coreSagas.push(fork(() => watchEntityCreation(entityType)));
  if (entityOperations.includes(Operation.update))
    coreSagas.push(fork(() => watchEntityUpdate(entityType)));
  if (entityOperations.includes(Operation.delete))
    coreSagas.push(fork(() => watchEntityDelete(entityType)));
  if (entityOperations.includes(Operation.custom))
    coreSagas.push(fork(() => watchEntityCustom(entityType)));
  return coreSagas;
}

export default getCoreSagas;
