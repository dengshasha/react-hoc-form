import Input from '../oldInput/baseInput'
import { isEmail } from '../../../tools/validate/index'


const { mount, shallow, render } = Enzyme

//
// const setup = () => {
//     const props = {
//         validator: {
//             trigger: 'blur',
//             rules: [
//                 {
//                     required: true,
//                     message: '不能为空'
//                 },
//                 {
//                     method: isEmail,
//                     message: '请输入合法的邮箱地址'
//                 }
//             ]
//         },
//         defaultValue: 'xldeng',
//         onError: jest.fn(),
//     }
//
//     const wrapper = mount(<BaseInput {...props} />)
//
//     return {
//         props,
//         wrapper
//     }
// }

describe('test event', () => {
    let container
    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
    })

    it('focus', () => {
        const handleFocus = jest.fn()
        const wrapper = mount(<Input onFocus={handleFocus} />, {attachTo: container})
        console.log(3333, wrapper.instance())
        // wrapper.instance().focus()
        // expect(handleFocus).toHaveBeenCalled()
    })

    // it('blur', () => {
    //     const handleBlur = jest.fn()
    //     const wrapper = mount(<BaseInput onBlur={handleBlur} />, {attachTo: container})
    //     wrapper.instance().focus()
    //     wrapper.instance().blur()
    //     expect(handleBlur).toHaveBeenCalled()
    // })

    // it('change', () => {
    //     const wrapper = mount(<BaseInput value={'aaa'}/>, {attachTo: container})
    //     wrapper.find('input').simulate('change', { target: '111' })
    //     expect(wrapper.find('input').prop('value')).toBe('111')
    // })
})