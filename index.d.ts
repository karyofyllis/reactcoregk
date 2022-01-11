import {  AxiosRequestConfig, AxiosResponse,AxiosRequestHeaders } from "axios";
//utils.js
type parseJwtTypes = (token: string) => any;
type postDataTypes = <T = never, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig<T>) => Promise<R>;
type updateDataTypes = <T = never, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig<T>) => Promise<R>;
type deleteDataTypes = <T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>) => Promise<R>;
type fetchDataTypes = <T = never, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<T>) => Promise<R>;
type formatBytesTypes = (bytes: number, decimals?: number) => number;
type getArrayFromTypes = (enumeration: any[]) => {label: string, value: any}[];
type createOptionsTypes = (array: any[], labelProp: string, valueProp?: string) => {label: string, value: any}[];
type createMapTypes = (array: any, prop?: string) => Map<any, any>;
type makeidTypes = (length: number) => string;
type sortByPositionTypes = (array:any[]) => any[];
type sortByTypes = (array:any[], prop:string) => any[];
type comparePropTypes = (a:any[], b:any[],prop?: string) => -1 | 0 | 1;
type downloadFileTypes = (exportURL: string, fileName: string, fileExtension: any, showTime: any) => Promise<void>
type kFormatterTypes = (num: number) => number;
type pollTypes = (callBack: any, seconds: number) => number;
type validateStrTypes = (str: string) => 1 | 2 | 3 | 4;
type BooleanToTextTypes = (val: boolean, response?: string[])=> string;
type hasLowerCaseTypes = (str: string) => string;
type hasUpperCaseTypes = (str: string) => string;
type hasCaseSensitiveTypes = (str: string) => string;


//hooks.js
interface PagingInterface  {
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

type useAutoUpdateTypes = (initial:any, changed: any, update: any, timeout?: number) => void;
type useFormTypes = (initialValues: any) => any[];
type useProgressTypes = (startedCallback: any, successCallback: any, errorCallback: any, monitored:any,dbg:any)=> void;
type useEntityProgressTypes = (context: any, onClose: any) => any[];
type useFetchTypes = (url: string, headers: any, initialState: any, pollTimeout:number)=> any[];
type usePagingTypes = (url: string, headers: any, { size, page, identifier}:{ size:number, page:number, identifier:any }, params: any) =>  (boolean | any[] | Paging)[];
type useFilteredTypes = (array:any, query: string, filterPropsArray:any) => any;
type useToggleTypes = (initialValue:boolean) => (boolean | (() => void))[];
type useCheckListTypes = (itemIds: string[]) => (any[] | ((id: string) => void))[];
type useListToggleTypes = () => (boolean | (() => void))[];
type useMasterDetailWithDialogTypes = (initialState:any) => {entity: any; openModal: boolean; openDelete: boolean; handleCloseModal: () => void; handleCreateNew: () => void; handleEntityClick: (clickedEntity: any) => void; handleEntityDelete: (clickedEntity: any) => void; handleCloseDeleteModal: () => void;};
type useDropzoneTypes = (useDropzone:any) => { selectedFiles: any[]; handleAcceptedFiles: (files: any) => void; setSelectedFiles: React.Dispatch<React.SetStateAction<any[]>>;};
type useSortHandlerTypes = (by?: string, direction?: string ) => { sort: {by: string; direction: string;}; setSort: React.Dispatch<React.SetStateAction<{ by: string; direction: string;}>>; handleSort: (by: any) => void;};
type useDependencyTypes = (context: any, fetchData:any, fetchDependency:any) =>  boolean;

//actions.js
type buildActionTypes = (entity:string, type: string) => string;
type buildAsyncActionTypes = (entity:string, type: string,asyncState:any) => string;
type createActionTypes = (entity:string, payload: any) => {type: any;payload: any;};
type createAsyncActionTypes =(entity:string, type: string) => {request: (payload: any) => {type: string;payload: any;};success: (payload: any) => {type: string;payload: any;};failure: (payload: any) => {type: string;payload: any;};}
type createGetMethodTypes =(entity:string, type: string) => {type: string;params: any;apiHandler: any;};
type createGetSuccessMethodTypes =(entityType:string, result: any) => { type: string;result: any;};
type createGetFailureMethodTypes =(entityType:string, error: any) => { type: string;result: any;};
type createPostMethodTypes =(entityType:string, payload: any, apiHandler:any) => {type: string;payload: any;apiHandler: any;};
type createPostSuccessMethodTypes =(entityType:string, result: string) => { type: string;result: any;};
type createPostFailureMethodTypes =(entityType:string, result: string) => { type: string;result: any;};
type createPutMethodTypes =(entityType:string, payload: any, apiHandler:any) => {type: string;payload: any;apiHandler: any;};
type createPutSuccessMethodTypes =(entityType:string, result: string) => { type: string;result: any;};
type createPutFailureMethodTypes =(entityType:string, result: string) => { type: string;result: any;};
type createDeleteMethodTypes = (entityType:string, payload: any, apiHandler:any) => {type: string;payload: any;apiHandler: any;};
type createDeleteSuccessMethodTypes = (entityType:string, result: string) => { type: string;result: any;};
type createDeleteFailureMethodTypes = (entityType:string, error: string) => { type: string;result: any;};
type createGetAllMethodTypes = (entityType:string, payload: any, apiHandler:any) => {type: string;payload: any;apiHandler: any;};
type createGetAllSuccessMethodTypes = (entityType:string, result: string) => { type: string;result: any;};
type createGetAllFailureMethodTypes = (entityType:string, error: string) => { type: string;result: any;};
type createGetAllPageableMethodTypes = (entityType:string, payload: any, apiHandler:any) => {type: string;payload: any;apiHandler: any;};
type createGetAllPageableSuccessMethodTypes = (entityType:string, result: string) => { type: string;result: any;};
type createGetAllPageableFailureMethodTypes = (entityType:string, error: string) => { type: string;result: any;};
type createCustomActionTypes = (entityType:string, payload: any) => {type: string;customType: any;payload: any;};


//api.js
type fetchAllTypes = <T = never, R = AxiosResponse<T>>(url:string, headers: AxiosRequestHeaders) => Promise<R>;
type fetchEntityTypes = <T = never, R = AxiosResponse<T>>(url:string, headers: AxiosRequestHeaders) => Promise<R>;
type postEntityTypes = <T = never, R = AxiosResponse<T>>(url:string,headers: AxiosRequestHeaders,data?: T,) => Promise<R>;
type putEntityTypes = <T = never, R = AxiosResponse<T>>(url:string,headers: AxiosRequestHeaders, data?: T) => Promise<R>;
type deleteEntityTypes = <T = never, R = AxiosResponse<T>>(url:string, headers: AxiosRequestHeaders, data?: T) => Promise<R>;

//fetchAllGen.js
type fetchAllGenTypes = (url: string, options: any, successCallback: any, errorCallback: any) => Generator<any, void, unknown>;
type fetchEntityGenTypes = (url: string, options: any, successCallback: any, errorCallback: any) => Generator<any, void, unknown>;
type postEntityGenTypes = (url: string, options: any, successCallback: any, errorCallback: any) => Generator<any, void, unknown>;
type putEntityGenTypes = (url: string, options: any, successCallback: any, errorCallback: any) => Generator<any, void, unknown>;
type delEntityGenTypes = (url: string, options: any, successCallback: any, errorCallback: any) => Generator<any, void, unknown>;
type customEntityGenTypes = (payload: any, callback: any) => Generator<any, void, unknown>;
type getBaseUrlTypes = (url: string, apiHandler: any) => Generator<any, void, unknown>;

//reducer.js
type createOperationStateTypes = (result?: any, error?: any, isLoading?: boolean, all?: any[], fullFilled?: boolean) => {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};
type getCommonStateTypes = () => {get: {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};getAll: { isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};getAllPageable: {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};update: {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};create: {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};delete: {isLoading: boolean;error: any;result: any;all: any[];fullFilled: boolean;};};
type handleAsyncStateTypes = (state: any, action: any, propertyName: string) => any;
type handleCommonStateTypes = (state: any, actionType: any, action: any, identifierProp?: string) => any;
type getParamValueTypes = (query: string, param: string, defaultValue: any) => any;

//saga.js
type watchAllEntitiesTypes = (entity: string, ApiEndpoint: string) => Generator<any, void, unknown>;
type watchEntityByIdTypes = (entity: string, ApiEndpoint: string) => Generator<any, void, unknown>;
type watchEntityCreationTypes = (entity: string, ApiEndpoint: string) => Generator<any, void, unknown>;
type watchEntityUpdateTypes = (entity: string, ApiEndpoint: string) => Generator<any, void, unknown>;
type watchEntityDeleteTypes = (entity: string, ApiEndpoint: string) => Generator<any, void, unknown>;
type watchEntityCustomTypes = (entity: string) => Generator<any, void, unknown>;
type getCoreSagasTypes = (entityType: any, ApiEndpoint: any, entityOperations: any) => any[];
