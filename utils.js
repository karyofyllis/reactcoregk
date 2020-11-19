import axios from "axios";


export function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


function handleError(err) {
    if (err.response) {
        const errorMsg = err.response.data.message;
        if (errorMsg) throw new Error(err.response.data.message);
        throw new Error(`Something went wrong. Error code: ${err.request.status}.`);
    }
    throw new Error("Something went wrong.");
}


export const postData = (url, data = {}, headers) => {
    const config = { headers};
    return axios
        .post(url, data, config)
        .then(response => {
            return response.data;
        })
        .catch(handleError);
};

export const updateData = (url, data = {}, headers) => {
    const config = { headers };
    return axios
        .put(url, data, config)
        .then(response => {
            return response.data;
        })
        .catch(handleError);
};

export const deleteData = (url, headers) => {
    const config = { headers };
    return axios
        .delete(url, config)
        .then(response => {
            return response && response.data;
        })
        .catch(handleError);
};

export const fetchData = (url, headers) => {
    const config = { headers };
    return axios
        .get(url, config)
        .then(response => {
            return response.data;
        })
        .catch(handleError);
};


export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const getArrayFrom = (enumeration) => {
    const array = [];
    for (let prop in enumeration) {
        array.push({
            label: enumeration[prop],
            value: prop,
        });
    }
    return array;
};

export const createOptions = (array, labelProp, valueProp = "id") => {
    return array.map((x) => ({
        label: x[labelProp],
        value: x[valueProp],
    }));
};

export const createMap = (array, prop = "id") =>
    new Map(array.map((item) => [item[prop], item]));

export function makeid(length = 10) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function sortByPosition(array) {
    return [...array].sort((a, b) => a.position - b.position);
}
export function sortBy(array, prop) {
    return [...array].sort((a, b) => a[prop] - b[prop]);
}

export function compareProp(a, b, prop = "position") {
    if (a[prop] < b[prop]) {
        return -1;
    }
    if (a[prop] > b[prop]) {
        return 1;
    }
    return 0;
}

export const downloadFile = (exportURL, fileName, fileExtension, showTime) => {
    const currentdate = new Date();
    const datetime =
        "Last Sync: " +
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

    return fetch(exportURL, {
        method: "GET",
        mode: "cors",
        headers: getAxiosConfig().headers
    })
        .then(function (resp) {
            return resp.blob();
        })
        .then(function (blob) {
            var exportURL = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = exportURL;
            a.download = fileName + (showTime ? `_${datetime}` : "") + "." + fileExtension;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();
        });
};

export function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

export function poll(callBack, seconds) {
    callBack();
    return window.setInterval(callBack, seconds * 1000);
}

export function validateStr(str) {
    var regex = new RegExp("[A-Z]+"); // Check for uppercase first
    if (regex.test(str) === true) {
        regex = new RegExp("[0-9]+"); // Now we check for numbers
        if (regex.test(str) === true) {
            regex = new RegExp("[a-z]+"); // checking now for lowercase
            if (regex.test(str) === true) {
                return 1;
            } else return 2;
        } else return 3;
    } else return 4;
}

export function BooleanToText(val, response = ['Yes', 'No']) {
    return val ? response[0] : response[1]
}

export function hasLowerCase(str) {
    return str.toUpperCase() !== str;
}

export function hasUpperCase(str) {
    return str.toLowerCase() !== str;
}

export function hasCaseSensitive(str) {
    return hasLowerCase(str) && hasUpperCase(str);
}
