
import {
    isEmpty,
    isChAndEn,
    isEnglish,
    isEmail,
    isCNPhoneNum,
    isHKPhoneNum,
    isOtherPhoneNum,
    isValidLength
} from '../tools/type'

const config = {
    ISVALIDLENGTH_INVALID_TYPE: '请传入合法的最小长度或最大长度'
}



describe('校验方法测试', ()=> {
    describe('是否为空方法校验', () => {
        it('当不传入参数时，应该返回false', () => {
            expect(isEmpty()).toBe(false)
        })
        it('当输入为null, undefined, [], 空字符串或者只含空格的字符串，应该返回false', () => {
            [null, undefined, '', '   ', []].forEach(value => {
                expect(isEmpty(value)).toBe(false)
            })
        })
        it('当输入除为空值外的值，应该返回true', () => {
            [0, 1, false, '&&', {}, [1]].forEach(value => {
                expect(isEmpty(value)).toBe(true)
            })
        })
    })

    describe('合法长度方法校验', () => {
        it('当传入最大长度和最小长度其中一个不是数字时，抛出错误', () => {
            //第一组值传错了，导致测试用例一直跑不通
            [
                [null, 0],
                ['helo', true],
                [9, {}]
            ].forEach(item => {
                expect(isValidLength(item[0], item[1])()).toThrow(config.ISVALIDLENGTH_INVALID_TYPE)
            })
        })
    })
})