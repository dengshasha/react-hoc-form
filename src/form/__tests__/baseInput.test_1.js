import Input from '../oldInput/baseInput'
import { isEmail } from '../../../tools/validate/index'

const { mount, shallow, render } = Enzyme

const setup = () => {
    const props = {
        validator: {
            trigger: 'blur',
            rules: [
                {
                    required: true,
                    message: '不能为空'
                },
                {
                    method: isEmail,
                    message: '请输入合法的邮箱地址'
                }
            ]
        },
        defaultValue: 'xldeng',
        onError: jest.fn(),
    }

    const wrapper = mount(<Input {...props} />)

    return {
        props,
        wrapper
    }
}

describe('Base Input', () => {
    const { props, wrapper } = setup()
    const eventObj = { target: { value: 'test1' } }
    const inputWrapper = wrapper.find('#input')

    test(`当传入defaultValue时，input的值应该为${props.defaultValue}`, () => {
        expect(inputWrapper.props().value).toBe(props.defaultValue)
    })

    test('当触发输入事件时，input的值应该修改', () => {
        inputWrapper.simulate('change', eventObj)
        wrapper.update() //重新触发render

        //test 错误的结果
        // expect(wrapper.state('value')).toEqual('xldeng')

        //note: state方法只能用在根组件上
        expect(wrapper.state('value')).toEqual('test1')
    })

    test('当触发失焦事件，应该校验值，并且错误信息应该显示, 回调事件应该触发', () => {
        expect(wrapper.find('.m-input__error').exists()).toEqual(false)
        inputWrapper.simulate('blur', eventObj)

        expect(props.onError).toBeCalled()

        expect(props.onError).toHaveBeenCalledWith('dddd')

        wrapper.update()
        //test 错误的结果
        // expect(wrapper.state('errorText')).toBe(props.validator.rules[0].message)

        expect(wrapper.state('errorText')).toBe(props.validator.rules[1].message)

        expect(wrapper.find('.m-input__error').exists()).toEqual(true)

    })
})
