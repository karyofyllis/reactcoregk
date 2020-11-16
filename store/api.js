import axios from "axios";

const fetchAll = async (url) => {
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch(handleError);
};

const fetchEntity = async (url) => {
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch(handleError);
};

const postEntity = async (url, data) => {
    return axios
        .post(url, data)
        .then((response) => {
            return response.data;
        })
        .catch(handleError);
};

const putEntity = async (url, data) => {
    // const finalUrl = url + '/' + data.id
    return axios
        .post(url, data)
        .then((response) => {
            return response.data;
        })
        .catch(handleError);
};

const deleteEntity = async (url, data) => {
    const finalUrl = url + '/' + data.id
    return axios
        .delete(finalUrl)
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
