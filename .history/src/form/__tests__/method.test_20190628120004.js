
import {
    isEmpty,
    isChAndEn,
    isEnglish,
    isEmail,
    isCNPhoneNum,
    isHKPhoneNum,
    isOtherPhoneNum,
    isValidLength
} from '../tools/method'

describe('校验方法测试', ()=> {
    describe('空值校验', () => {
        [null, undefined, '', '   ', []].forEach(value => {
            expect(isEmpty(value)).toBe(false)
        })
    })
})