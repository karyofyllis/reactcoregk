import {useCallback, useEffect, useMemo, useRef, useState,} from "react";
import {fetchData, formatBytes, getToken,} from "./utils";
import * as SockJS from "sockjs-client";
import * as StompJs from "stompjs";
import Paging from "./models/Paging";

const useAutoUpdate = (initial, changed, update, timeout = 1000) => {
    const ref = useRef();
    useEffect(() => {
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {
            if (initial.id && changed.id) {
                const str1 = JSON.stringify(initial);
                const str2 = JSON.stringify(changed);
                if (str1 !== str2) {
                    update();
                }
            }
        }, timeout);
    }, [changed, initial, timeout, update]);
};

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (prop) => (e) => {
        const value = e && e.target ? e.target.value : e ? e.value || e : null;
        const safeValue =
            e && e.target && e.target.type === "checkbox" ? e.target.checked : value;
        setValues({
            ...values,
            [prop]: safeValue,
        });
    };
    const handleChangeArray = (prop, array) => {
        setValues({
            ...values,
            [prop]: array,
        });
    };
    const updateInitial = useCallback((values) => {
        setValues(values);
    }, []);

    return [values, handleChange, updateInitial, handleChangeArray];
};

function useProgress(
    startedCallback,
    successCallback,
    errorCallback,
    monitored,
    dbg
) {
    const inProgress = useRef(monitored.isLoading);

    useEffect(() => {
        const { isLoading, error, result } = monitored;
        dbg &&
        console.log(
            `Effect executing for ${dbg} { isLoading: ${isLoading}, inProgress.current: ${inProgress.current}, error: ${error} }`
        );

        // If loading just started
        if (isLoading && !inProgress.current) {
            inProgress.current = true;
        }

        if (inProgress.current) {
            if (isLoading) {
                startedCallback && startedCallback();
            } else {
                inProgress.current = false;
                if (error) {
                    // Loading has finished and an error was dispatched
                    errorCallback && errorCallback(error);
                } else {
                    // Loading has finished successfully
                    successCallback && successCallback(result);
                }
            }
        }
    }, [monitored, startedCallback, successCallback, errorCallback, dbg]);
}

// Creates the entity progress hooks
const useEntityProgress = (context, onClose) => {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (busy) setError(null);
    }, [busy]);

    // Methods for tracking progress
    const showLoader = useCallback((_) => setBusy(true), []);
    const hideLoaderAndClose = useCallback(
        (_) => {
            setBusy(false);
            onClose(true);
        },
        [onClose]
    );
    const hideLoaderAndError = useCallback((e) => {
        setBusy(false);
        setError(e);
        console.log("Operation failed ", e);
    }, []);

    // Hooks for showing the busy indicator
    useProgress(
        showLoader,
        hideLoaderAndClose,
        hideLoaderAndError,
        context.update
    );
    useProgress(
        showLoader,
        hideLoaderAndClose,
        hideLoaderAndError,
        context.create
    );
    useProgress(
        showLoader,
        hideLoaderAndClose,
        hideLoaderAndError,
        context.delete
    );

    return [busy, error];
};

const useFetch = (url, initialState, pollTimeout) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const getData = useCallback((url, callback) => {
        fetchData(url)
            .then((data) => {
                setData(data);
                setError(null);
                callback && callback();
            })
            .catch((ex) => {
                setError(ex);
                setData(null);
                callback && callback();
            });
    }, []);

    useEffect(() => {
        getData(url, () => setIsLoading(false));
    }, [url, getData]);

    const pollRef = useRef();

    useEffect(() => {
        clearInterval(pollRef.current);

        if (pollTimeout) {
            pollRef.current = setInterval(() => {
                getData(url);
            }, pollTimeout * 1000);
        }

        return () => {
            clearInterval(pollRef.current);
        };
    }, [pollTimeout, url, getData]);

    return [isLoading, data, error, setData];
};

const usePaging = (url, { size, page, identifier }, params) => {
    const [isLoading, setIsLoading] = useState(false);
    const [allContents, setAllContents] = useState([]);
    const [data, setData] = useState(new Paging());

    const getData = useCallback((url, { size, page, params }, callback) => {
        let finalUrl = url + "?size=" + size + "&page=" + page;
        if (params) {
            finalUrl += params;
        }
        fetchData(finalUrl)
            .then((data) => {
                setData(data);
                callback && callback();
            })
            .catch(() => {
                callback && callback();
            });
    }, []);

    useEffect(() => {
        setAllContents((prevAllData) => {
            const newContent = data.content.filter(
                (x) =>
                    prevAllData.findIndex((z) => z[identifier] === x[identifier]) === -1
            );
            return [...prevAllData, ...newContent];
        });
    }, [data.content, identifier]);

    useEffect(() => {
        setAllContents([]);
    }, [url]);

    useEffect(() => {
        setIsLoading(true);
        if (url) getData(url, { size, page, params }, () => setIsLoading(false));
    }, [url, size, page, getData, params]);

    if (!url) {
        return [false, new Paging(), []];
    }
    return [isLoading, data, allContents];
};

const useFiltered = (array, query, filterPropsArray) => {
    return useMemo(() => {
        try {
            return array.filter((x) => {
                const arrayOfProps = filterPropsArray.map((prop) => x[prop]);
                return arrayOfProps.find((value) =>
                    value.toLowerCase().includes(query.toLowerCase())
                );
            });
        } catch (e) {
            return [];
        }
    }, [array, filterPropsArray, query]);
};

const useToggle = (initialValue = false) => {
    const [open, setOpen] = useState(initialValue);

    const handleToggle = useCallback(
        () => setOpen((prevState) => !prevState),
        []
    );

    return [open, handleToggle];
};


const useCheckList = (itemIds) => {
    const [list, setList] = useState([]);

    const handleCheck = (id) => {
        if (id === "ALL") {
            if (list.length === itemIds.length) {
                setList([]);
            } else {
                setList(itemIds);
            }
        } else {
            setList((prevState) => {
                const exist = prevState.includes(id);
                return exist ? prevState.filter((x) => x !== id) : [...prevState, id];
            });
        }
    };

    useEffect(() => setList([]), [itemIds]);

    const isChecked = (id) =>
        id !== "ALL"
            ? list.includes(id)
            : itemIds.length === list.length && itemIds.length > 0;

    return [list, handleCheck, isChecked];
};

const useListToggle = () => {
    const layout = sessionStorage.getItem("layout");
    const [isList, toggle] = useToggle(layout === "LIST");

    useEffect(() => {
        if (isList) {
            sessionStorage.setItem("layout", "LIST");
        } else {
            sessionStorage.setItem("layout", "DEFAULT");
        }
    }, [isList]);

    return [isList, toggle];
};

const useMasterDetailWithDialog = (schema, entityType) => {
    const [entity, setEntity] = useState(Schema[entityType]);
    const [openModal, setOpenModal] = useState(false);
    const [openDelete, setOpenDelete] = useState(false)

    const handleEntityClick = (clickedEntity) => {
        setEntity(clickedEntity);
        setOpenModal(true);
    };

    const handleEntityDelete = (clickedEntity) => {
        setEntity(clickedEntity);
        setOpenDelete(true);
    };

    const handleCreateNew = useCallback(() => {
        setEntity(Schema[entityType]);
        setOpenModal(true);
    }, [entityType]);

    const handleCloseModal = () => setOpenModal(false);
    const handleCloseDeleteModal = () => setOpenDelete(false);

    return {
        entity,
        openModal,
        openDelete,
        handleCloseModal,
        handleCreateNew,
        handleEntityClick,
        handleEntityDelete,
        handleCloseDeleteModal
    };
};

const useDropzone = (onFilesDrop) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleAcceptedFiles = useCallback(
        (files) => {
            files.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    formattedSize: formatBytes(file.size),
                })
            );
            if (onFilesDrop) {
                onFilesDrop(files);
            }
            setSelectedFiles(files);
        },
        [onFilesDrop]
    );

    return {
        selectedFiles,
        handleAcceptedFiles,
        setSelectedFiles,
    };
};

const useWebSocket = (url, isReady) => {
    const clientRef = useRef();
    const retries = useRef(10);
    const isInProgress = useRef(false);

    const [connected, setConnected] = useState(false);

    const onConnect = () => {
        setConnected(true);
        retries.current = retries.current - 1;
        isInProgress.current = false;
    };

    const onDisconnect = (error) => {
        if (retries.current > 0) {
            if (!isInProgress.current) {
                console.log("STOMP: " + error);
                console.log("STOMP: Reconecting in 5 seconds");
                setConnected(false);
                isInProgress.current = true;
                setTimeout(connect, 5000);
            }
        } else {
            console.log("STOMP: Failed to connect after 10 tries. Exit.");
        }
    };

    const connect = () => {
        const headers = { Authorization: "Bearer " + getToken() };
        const socket = new SockJS(url);
        clientRef.current = StompJs.over(socket);
        clientRef.current.connect(headers, onConnect, onDisconnect);
    };

    useEffect(() => {
        if (isReady) {
            connect();
        }
        // eslint-disable-next-line
    }, [isReady]);

    return {
        clientRef,
        connected,
    };
};

const useSortHandler = (by = "", direction = "asc") => {
    const [sort, setSort] = useState({ by, direction });

    const handleSort = useCallback((by) => {
        setSort((prevState) => {
            if (prevState.by === by) {
                return {
                    ...prevState,
                    direction: prevState.direction === "desc" ? "asc" : "desc",
                };
            }
            return {
                by,
                direction: "asc",
            };
        });
    }, []);

    return {
        sort,
        setSort,
        handleSort,
    };
};


export {
    useAutoUpdate,
    useToggle,
    useListToggle,
    useFetch,
    useFiltered,
    useForm,
    useEntityProgress,
    useProgress,
    useCheckList,
    useMasterDetailWithDialog,
    useDropzone,
    usePaging,
    useWebSocket,
    useSortHandler,
};