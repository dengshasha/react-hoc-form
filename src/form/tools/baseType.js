/**
 * 判断对象(基本变量和对象)类型
 * @param {*} obj 例 a,[],'aaa'
 * @param {*} type 例：object,array
 * */
const is = (obj, type) => {
    return (
        Object.prototype.toString.call(obj).toLowerCase() ===
        `[object ${type.toLowerCase()}]`
    );
};

const isType = type => {
    return obj => {
        return Object.prototype.toString.call(obj) === `[object ${type}]`;
    };
};

const isString = isType('String');

const isNumber = isType('Number');

const isBoolean = isType('Boolean');

const isObject = isType('Object');

const isArray = isType('Array');

const isFunction = isType('Function');

export { is, isString, isNumber, isObject, isFunction, isBoolean, isArray };
