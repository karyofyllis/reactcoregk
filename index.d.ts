import {  AxiosRequestConfig, AxiosResponse,AxiosRequestHeaders } from "axios";
//utils.js
type parseJwt = (token: string) => any;
type postData = <T = never, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig<T>) => Promise<R>;
type updateData = <T = never, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig<T>) => Promise<R>;
type deleteData = <T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>) => Promise<R>;
type fetchData = <T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>) => Promise<R>;
type formatBytes = (bytes: number, decimals?: number) => number;
type getArrayFrom = (enumeration: any[]) => {label: string, value: any}[];
type createOptions = (array: any[], labelProp: string, valueProp?: string) => {label: string, value: any}[];
type createMap = (array: any, prop?: string) => Map<any, any>;
type makeid = (length: number) => string;
type sortByPosition = (array:any[]) => any[];
type sortBy = (array:any[], prop:string) => any[];
type compareProp = (a:any[], b:any[],prop?: string) => -1 | 0 | 1;
type downloadFile = (exportURL: string, fileName: string, fileExtension: any, showTime: any) => Promise<void>
type kFormatter = (num: number) => number;
type poll = (callBack: any, seconds: number) => number;
type validateStr = (str: string) => 1 | 2 | 3 | 4;
type BooleanToText = (val: boolean, response?: string[])=> string;
type hasLowerCase = (str: string) => string;
type hasUpperCase = (str: string) => string;
type hasCaseSensitive = (str: string) => string;


//hooks.js
interface Paging  {
    totalElements?: number;
    totalPages?:number;
    size?:number;
    number?:number;
    numberOfElements?:number;
    first?:boolean;
    last?:boolean ;
    empty?:boolean ;
    pageable: {
        page?:number;
        size?:number;
        sort?:string[];
    }
    sort: {
        sorted?:boolean;
        unsorted?:boolean;
        empty?:boolean;
    };
    content?: any[];
}

type useAutoUpdate = (initial:any, changed: any, update: any, timeout?: number) => void;
type useForm = (initialValues: any) => any[];
type useProgress = (startedCallback: any, successCallback: any, errorCallback: any, monitored:any,dbg:any)=> void;
type useEntityProgress = (context: any, onClose: any) => any[];
type useFetch = (url: string, headers: any, initialState: any, pollTimeout:number)=> any[];
type usePaging = (url: string, headers: any, { size, page, identifier}:{ size:number, page:number, identifier:any }, params: any) =>  (boolean | any[] | Paging)[];
type useFiltered = (array:any, query: string, filterPropsArray:any) => any;
type useToggle = (initialValue:boolean) => (boolean | (() => void))[];
type useCheckList = (itemIds: string[]) => (any[] | ((id: string) => void))[];
type useListToggle = () => (boolean | (() => void))[];
type useMasterDetailWithDialog = (initialState:any) => {entity: any; openModal: boolean; openDelete: boolean; handleCloseModal: () => void; handleCreateNew: () => void; handleEntityClick: (clickedEntity: any) => void; handleEntityDelete: (clickedEntity: any) => void; handleCloseDeleteModal: () => void;};
type useDropzone = (useDropzone:any) => { selectedFiles: any[]; handleAcceptedFiles: (files: any) => void; setSelectedFiles: React.Dispatch<React.SetStateAction<any[]>>;};
type useSortHandler = (by?: string, direction?: string ) => { sort: {by: string; direction: string;}; setSort: React.Dispatch<React.SetStateAction<{ by: string; direction: string;}>>; handleSort: (by: any) => void;};
type useDependency = (context: any, fetchData:any, fetchDependency:any) =>  boolean;

//actions.js
type buildActionType = (entity:string, type: string) => string;
type buildAsyncActionType = (entity:string, type: string,asyncState:any) => string;
type createAction = (entity:string, payload: any) => {type: any;payload: any;};
type createAsyncAction =(entity:string, type: string) => {request: (payload: any) => {type: string;payload: any;};success: (payload: any) => {type: string;payload: any;};failure: (payload: any) => {type: string;payload: any;};}
type createGetMethod =(entity:string, type: string) => {type: string;params: any;apiHandler: any;};
type createGetSuccessMethod =(entityType:string, result: any) => { type: string;result: any;};
type createGetFailureMethod =(entityType:string, error: any) => { type: string;result: any;};
type createPostMethod =(entityType:string, payload: any, apiHandler:any) => {type: string;payload: any;apiHandler: any;};
type createPostSuccessMethod =(entityType:string, result: string) => { type: string;result: any;};
type createPostFailureMethod =(entityType:string, result: string) => { type: string;result: any;};
type createPutMethod =(entityType:string, payload: any, apiHandler:any) => {type: string;payload: any;apiHandler: any;};
type createPutSuccessMethod =(entityType:string, result: string) => { type: string;result: any;};
type createPutFailureMethod =(entityType:string, result: string) => { type: string;result: any;};
type createDeleteMethod = (entityType:string, payload: any, apiHandler:any) => {type: string;payload: any;apiHandler: any;};
type createDeleteSuccessMethod = (entityType:string, result: string) => { type: string;result: any;};
type createDeleteFailureMethod = (entityType:string, error: string) => { type: string;result: any;};
type createGetAllMethod = (entityType:string, payload: any, apiHandler:any) => {type: string;payload: any;apiHandler: any;};
type createGetAllSuccessMethod = (entityType:string, result: string) => { type: string;result: any;};
type createGetAllFailureMethod = (entityType:string, error: string) => { type: string;result: any;};
type createGetAllPageableMethod = (entityType:string, payload: any, apiHandler:any) => {type: string;payload: any;apiHandler: any;};
type createGetAllPageableSuccessMethod = (entityType:string, result: string) => { type: string;result: any;};
type createGetAllPageableFailureMethod = (entityType:string, error: string) => { type: string;result: any;};
type createCustomAction = (entityType:string, payload: any) => {type: string;customType: any;payload: any;};


//api.js
type fetchAll = <T = never, R = AxiosResponse<T>>(url:string, headers: AxiosRequestHeaders) => Promise<R>;
type fetchEntity = <T = never, R = AxiosResponse<T>>(url:string, headers: AxiosRequestHeaders) => Promise<R>;
type postEntity = <T = never, R = AxiosResponse<T>>(url:string,headers: AxiosRequestHeaders,data?: T,) => Promise<R>;
type putEntity = <T = never, R = AxiosResponse<T>>(url:string,headers: AxiosRequestHeaders, data?: T) => Promise<R>;
type deleteEntity = <T = never, R = AxiosResponse<T>>(url:string, headers: AxiosRequestHeaders, data?: T) => Promise<R>;

//fetchAllGen.js
type fetchAllGen = (url: string, options: any, successCallback: any, errorCallback: any) => Generator<any, void, unknown>;
type fetchEntityGen = (url: string, options: any, successCallback: any, errorCallback: any) => Generator<any, void, unknown>;
type postEntityGen = (url: string, options: any, successCallback: any, errorCallback: any) => Generator<any, void, unknown>;
type putEntityGen = (url: string, options: any, successCallback: any, errorCallback: any) => Generator<any, void, unknown>;
type delEntityGen = (url: string, options: any, successCallback: any, errorCallback: any) => Generator<any, void, unknown>;
type customEntityGen = (payload: any, callback: any) => Generator<any, void, unknown>;
type getBaseUrl = (url: string, apiHandler: any) => Generator<any, void, unknown>;

//reducer.js
type createOperationState = (result?: any, error?: any, isLoading?: boolean, all?: any[], fullFilled?: boolean) => {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};
type getCommonState = () => {get: {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};getAll: { isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};getAllPageable: {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};update: {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};create: {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};delete: {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};};
type handleAsyncState = (state: any, action: any, propertyName: string) => any;
type handleCommonState = (state: any, actionType: any, action: any, identifierProp?: string) => any;
type getParamValue = (query: string, param: string, defaultValue: any) => any;

//saga.js
type watchAllEntities = (entity: string, ApiEndpoint: string) => Generator<any, void, unknown>;
type watchEntityById = (entity: string, ApiEndpoint: string) => Generator<any, void, unknown>;
type watchEntityCreation = (entity: string, ApiEndpoint: string) => Generator<any, void, unknown>;
type watchEntityUpdate = (entity: string, ApiEndpoint: string) => Generator<any, void, unknown>;
type watchEntityDelete = (entity: string, ApiEndpoint: string) => Generator<any, void, unknown>;
type watchEntityCustom = (entity: string) => Generator<any, void, unknown>;
type getCoreSagas = (entityType: any, ApiEndpoint: any, entityOperations: any) => any[];
