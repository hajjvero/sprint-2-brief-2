// ===========================================
//         Validation utility functions
// ===========================================

export function isEmpty(value) {
    return value === null || value === undefined || value.toString().trim() === '';
}

export function isEmail(email) {
    if (isEmpty(email)) return false;
    const emailRegex = /^[^\s@#%&?]+@[^\s@]+\.[^\s@]+$/g;
    return emailRegex.test(email);
}

export function isURL(url) {
    if (isEmpty(url)) return false;
    const urlRegex = /^(https|http):\/\/([\w-]+)\.([\w]{2,6})([\/\w\.-]*)\/?$/;
    return urlRegex.test(url);
}

export function isURLWithPrefix(url, prefix) {
    if (isEmpty(url) || isEmpty(prefix)) return false;

    const urlRegex = new RegExp(`^(https|http):\/\/(${prefix})([\\w\\.-]*)\/?$`);

    return urlRegex.test(url);
}

export function isPhone(phone) {
    if (isEmpty(phone)) return false;
    const phoneRegex = /^(\+212|0)[\s-]?(6|7)([\s-]\d{2}){4}/;
    return phoneRegex.test(phone);
}

export function isRange(value, min, max) {
    if (isEmpty(value)) return false;
    const numValue = Number(value);
    if (isNaN(numValue)) return false;
    return numValue >= min && numValue <= max;
}

export function isMin(value, min) {
    if (isEmpty(value)) return false;
    const numValue = Number(value);
    if (isNaN(numValue)) return false;
    return numValue >= min;
}

export function isMax(value, max) {
    if (isEmpty(value)) return false;
    const numValue = Number(value);
    if (isNaN(numValue)) return false;
    return numValue <= max;
}

export function isNumber(value) {
    if (isEmpty(value)) return false;
    return !isNaN(Number(value)) && !isNaN(value - 0);
}

export function isInArray(value, array) {
    if (isEmpty(value)) return false;
    return array.includes(value);
}