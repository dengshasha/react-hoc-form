
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
import { isTSAnyKeyword } from '@babel/types';

describe('校验方法测试', ()=> {
    describe('是否为空方法校验', () => {
        it('当输入为null, undefined, [], 空字符串或者只含空格的字符串，应该返回false', () => {
            [null, undefined, '', '   ', []].forEach(value => {
                expect(isEmpty(value)).toBe(false)
            })
        })
    })
})