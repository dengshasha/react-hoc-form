import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import except from '../../../tools/object/except'
import './style.scss'

const BASE_CLASS = 'm-input'


export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || props.defaultValue || '',
        }
    }

    static defaultProps = {

    }

    static propTypes = {
        defaultValue: PropTypes.any,
        value: PropTypes.string,
        label: PropTypes.string,
        readOnly: PropTypes.bool,
        allowClear: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    }

    static getDerivedStateFromProps(props) {
        if (('value' in props) && ('defaultValue' in props)) {
            console.error('Warning: 请不要同时传入value和defaultValue，否则defaultValue将会被忽略')
        }
        if ('value' in props && !('onChange' in props)) {
            console.error('Warning: 如果你想自己控制value, 请在onChange事件里面修改value')
        }
        if ('value' in props) {
            return {
                value: props.value || '',
            }
        }
        return null
    }

    //设置value
    setValue = (value, e, callback) => {
        if (!('value' in this.props)) {
            this.setState({ value }, callback);
        } else {
            callback && callback()
        }

        const { onChange } = this.props;
        //只有当调用方传入了onChange事件时，才需要通过ref将input的value值置空
        if (onChange) {
            let event = e;
            //清除操作
            if (e.type === 'click') {
                event = Object.assign({}, e);
                //点击清除按钮时，target发生了变化，这里重置为Input
                event.target = this.input;
                event.currentTarget = this.input;
                this.input.value = '';
                onChange(event);

                return;
            }
            onChange(event);
        }
    }

    saveInput = (ref) => {
        this.input = ref;
    };


    onChange = (e) => {
        this.setValue(e.target.value, e);
    }

    onFocus = (e) => {
        clearTimeout(this.timer);
        this.setState({
            focus: true
        })
        this.props.onFocus && this.props.onFocus(e)
    }

    onBlur = (e) => {
        this.timer = setTimeout(() => {
            this.setState({
                focus: false
            })
        }, 200)

        this.props.onBlur && this.props.onBlur(e)
    }


    clearValue = (e) => {
        this.setValue('', e, () => {
            this.input.focus() //优化，清除之后要聚焦
        })
    }


    render() {
        const { label, allowClear, readOnly, wrapperCls } = this.props
        const { value, focus } = this.state
        //测试中发现的bug
        const inputProps = except(this.props, [
            'defaultValue',
            'allowClear',
            'wrapperCls',
            'label',
        ])

        return (
            <div className={classNames(BASE_CLASS, wrapperCls)}>
                <span className={`${BASE_CLASS}__label`}>{label}</span>
                <input
                    className={`u-input ${BASE_CLASS}__input`}
                    {...inputProps}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    value={value}
                    readOnly={readOnly}
                    ref={this.saveInput}
                />
                {
                    allowClear && value && focus &&
                    <span className={`${BASE_CLASS}__clear`} onClick={this.clearValue}>
                        <Icon type='ic_bestir_clear'/>
                    </span>
                }
            </div>
        )
    }
}
