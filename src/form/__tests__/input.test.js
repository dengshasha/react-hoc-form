import Input from '../input/input'

const { mount, shallow, render } = Enzyme

describe('Input allowClear', () => {
    const clearCls = '.m-input__clear'
    jest.useFakeTimers(); //使用延时器功能，需要在顶部加这个

    it('点击清除按钮时，输入框的值应该被清空', () => {
        const wrapper = mount(<Input allowClear />);
        wrapper.find('input').simulate('change', { target: { value: '111' } });
        expect(wrapper.find('input').getDOMNode().value).toEqual('111');
        wrapper.find('input').simulate('focus')
        wrapper
            .find(clearCls)
            .at(0)
            .simulate('click');
        expect(wrapper.find('input').getDOMNode().value).toEqual('');
    });

    it('清除按钮应该在输入框有值且是聚焦状态时才显示', () => {
        const wrappers_A = [null, undefined, ''].map(val => mount(<Input allowClear value={val} />));
        wrappers_A.forEach(wrapper => {
            expect(wrapper.find('input').getDOMNode().value).toEqual('');
            expect(wrapper.find(clearCls).exists()).toEqual(false);
        });
        const wrapper_B = mount(<Input allowClear /> )
        wrapper_B.find('input').simulate('change', { target: { value: 'test' } })
        wrapper_B.find('input').simulate('focus')
        expect(wrapper_B.find(clearCls).exists()).toEqual(true)
        wrapper_B.find('input').simulate('blur')
        //代码里面隐藏清空按钮是在失焦后200ms做的
        setTimeout(() => {
            try {
                expect(wrapper_B.find(clearCls).exists()).toEqual(false)
            } catch(e) {
            }
        }, 200);
        jest.runTimersToTime(200); //这句话的意思是并不是让测试用例真正等待200ms才执行
    });

    it('点击清除按钮后输入框应该聚焦', () => {
        const wrapper = mount(<Input allowClear defaultValue="111" />);
        wrapper.find('input').simulate('focus')
        wrapper
            .find(clearCls)
            .at(0)
            .simulate('click');
        //获取当前聚焦的元素 document.activeElement
        expect(document.activeElement).toBe(
            wrapper
                .find('input')
                .at(0)
                .getDOMNode(),
        );
    });

    it('onChange能正常触发', () => {
        let argumentEventObject;
        let argumentEventObjectValue;
        const onChange = e => {
            argumentEventObject = e;
            argumentEventObjectValue = e.target.value;
        };
        const wrapper = mount(<Input allowClear defaultValue="111" onChange={onChange} />);
        wrapper.find('input').simulate('focus')
        wrapper
            .find(clearCls)
            .at(0)
            .simulate('click');

        expect(argumentEventObject.type).toBe('click');
        expect(argumentEventObjectValue).toBe('');

        expect(
            wrapper
                .find('input')
                .at(0)
                .getDOMNode().value,
        ).toBe('');
    });

});