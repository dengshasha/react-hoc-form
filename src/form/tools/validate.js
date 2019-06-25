import { isRequired } from './method'

const validate = {
    //校验
    validateValue: (rules, value, callback) => {
        if (rules && rules.length) {
            let error = ''
            let success = false
            for (let i = 0; i < rules.length; i++) {
                if (rules[i].required) {
                    success = isRequired(value)
                } else {
                    success = rules[i]['method'](value);
                }
                if (!success) {
                    error = rules[i]['message'];
                    callback && callback(error);
                    return; //当校验发现错误时，无需往后执行
                } else {
                    error = '';
                }
            }
            callback && callback(error); //校验全部通过，回调
        }
    }
}

export default validate
