import axios from "axios";

const fetchAll = async (url, headers) => {
    const config = { headers };
    return axios
        .get(url, config)
        .then((response) => {
            return response.data;
        })
        .catch(handleError);
};

const fetchEntity = async (url, headers) => {
    const config = { headers };
    return axios
        .get(url, config)
        .then((response) => {
            return response.data;
        })
        .catch(handleError);
};

const postEntity = async (url, data, headers) => {
    const config = { headers };
    return axios
        .post(url, data, config)
        .then((response) => {
            return response.data;
        })
        .catch(handleError);
};

const putEntity = async (url, data, headers) => {
    // const finalUrl = url + '/' + data.id
    const config = { headers };
    return axios
        .put(url, data, config)
        .then((response) => {
            return response.data;
        })
        .catch(handleError);
};

const deleteEntity = async (url, data, headers) => {
    const finalUrl = url + '/' + data.id
    const config = { headers };
    return axios
        .delete(finalUrl, config)
        .catch(handleError);
};

function handleError(err) {
    if (err.response) {
        const errorMsg = err.response.data.message;
        if (errorMsg) throw new Error(err.response.data.message);
        throw new Error(`Something went wrong. Error code: ${err.request.status}.`)
    }
    throw new Error("Something went wrong.")
}

export { fetchAll, fetchEntity, postEntity, putEntity, handleError, deleteEntity };
