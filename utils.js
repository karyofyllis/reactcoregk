export function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};


export const createOptions = (array, labelProp, valueProp = "id") => {
    return array.map((x) => ({
        label: x[labelProp],
        value: x[valueProp],
    }));
};

export const createMap = (array, prop = "id") =>
    new Map(array.map((item) => [item[prop], item]));

export function makeId(length = 10) {
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
