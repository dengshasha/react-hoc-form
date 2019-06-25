
module.exports = function(obj = {}, keys){
    if ('string' === typeof keys) keys = keys.split(/ +/);
    const allKeys = Object.keys(obj)
    return allKeys.reduce((res, key) => {
        if (!keys.includes(key)){
            res[key] = obj[key]
        }
        return res;
    }, {})

};

