import React, {useCallback, useEffect, useState, useRef} from "react";
import axios from "axios";

const useToggle = (initialValue = false) => {
    const [open, setOpen] = useState(initialValue);

    const handleToggle = useCallback(
        () => setOpen((prevState) => !prevState),
        []
    );

    return [open, handleToggle];
};
const useListToggle = () => {
    const layout = sessionStorage.getItem("default_layout");
    const [isList, toggle] = useToggle(layout === "LIST");

    useEffect(() => {
        if (isList) {
            sessionStorage.setItem("default_layout", "LIST");
        } else {
            sessionStorage.setItem("default_layout", "DEFAULT");
        }
    }, [isList]);

    return [isList, toggle];
};

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (prop) => (e) => {
        const value = e.target ? e.target.value : e.value || e;
        setValues({
            ...values,
            [prop]: value,
        });
    };

    const updateInitial = useCallback((values) => {
        setValues(values);
    }, []);

    return [values, handleChange, updateInitial];
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

    React.useEffect(() => {
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


const useFetch = (url, initialState, pollTimeout, eventTrigger) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const getData = useCallback((url, callback) => {
        axios
            .get(url)
            .then((res) => {
                setData(res.data);
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
        if (url) {
            setIsLoading(true);
            getData(url, () => setIsLoading(false));
        }
    }, [url, getData, eventTrigger]);

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

    return [isLoading, data || initialState, error];
};


const useFiltered = (array, query, filterProps) => {
    return useMemo(() => {
        try {
            return array.filter((x) => {
                const arrayOfProps = filterProps.map((prop) => x[prop]);
                return arrayOfProps.find((value) =>
                    value.toLowerCase().includes(query.toLowerCase())
                );
            });
        } catch (e) {
            return [];
        }
    }, [array, filterProps, query]);
};
export {
    useToggle,
    useListToggle,
    useForm,
    useProgress,
    useEntityProgress,
    useFiltered,
    useFetch
}
