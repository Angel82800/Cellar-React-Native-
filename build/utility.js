export function isEmpty(str) {
    if (str == null)
        return true;
    if (typeof str == 'undefined')
        return true;
    if (str == null)
        return true;
    if (typeof str === 'string') {
        if (str.trim().length < 1)
            return true;
    }
    return str.length === 0;
}
export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
//# sourceMappingURL=utility.js.map