/**
 * @method 校验邮箱格式
 * @param {string}   value        要校验的值
 * @return {boolean}
 * */
const isEmail = (value) => {
    const regex = /^\s*(([^<>()\[\]\.,;:\s@""]+(\.[^<>()\[\]\.,;:\s@""]+)*)|("".+""))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
    const emojiRegex = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
    return regex.test(value) && !emojiRegex.test(value);
}
/**
 * @method 校验是否为空
 * @param {string}   value        要校验的值
 * @return {boolean}
 * */
const isRequired = (value) => {
    if (value === undefined || value === null) {
        return false;
    }
    if (Array.isArray(value) && value.length === 0) {
        return false;
    }
    if (typeof value === 'string' && !value) {
        return false;
    }
    return true;
}
/**
 * @method 校验支持中文|英文
 * @param {string}   value        要校验的值
 * @return {boolean}
 * */
const isChAndEn = (value) => {
    const regexCh = /(?!^\'+$)^[\u4e00-\u9fa5\.\-\s\']+$/;
    const regexEn = /(?!^\'+$)^[A-Za-z\s\-\.\']+$/;
    return regexCh.test(value) || regexEn.test(value);
}
/**
 * @method 校验仅支持中文
 * @param {string}   value        要校验的值
 * @param {boolean}   isCheckEmptyValue        当为空时是否也要检测
 * @return {boolean}
 * */
const isEnglish = (value, isCheckEmptyValue=true) => {
    if(!isCheckEmptyValue && !value) return true
    const regex = /(?!^\'+$)^[A-Za-z\s\-\.\']+$/;
    return regex.test(value);
}
/**
 * @method 校验中国电话号码
 * @param {string}   value        要校验的值
 * @return {boolean}
 * */
const isCNPhoneNum = (value) => {
    const regex = /^((\d{3})|(\d{3}-))?1(3|4|5|8|7)\d{9}$/;
    return regex.test(value);
}
/**
 * @method 校验香港电话号码
 * @param {string}   value        要校验的值
 * @return {boolean}
 * */
const isHKPhoneNum = (value) => {
    const regex = /^\d{8}$/;
    return regex.test(value);
}
/**
 * @method 校验其他国家电话号码
 * @param {string}   value        要校验的值
 * @return {boolean}
 * */
const isOtherPhoneNum = (value) => {
    const regex = /^([0-9]{2,22})$/;
    return regex.test(value);
}
/**
 * @method 校验长度
 * @param {number}   min        最小长度，如果没有最小长度限制则传入0
 * @param {number}   max        最大长度，如果没有最大长度限制则不传入
 * @return {boolean}
 * */
const isValidLength = (min = 0, max) => (value) => {
    if (!max) {
        return min < value.length;
    } else {
        return min < value.length && max > value.length;
    }
};


export {
    isRequired,
    isChAndEn,
    isEnglish,
    isEmail,
    isCNPhoneNum,
    isHKPhoneNum,
    isOtherPhoneNum,
    isValidLength
};
