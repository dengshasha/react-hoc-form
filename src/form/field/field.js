import React from 'react'
import PropTypes from 'prop-types'
import FormContext from '../form/formContext'


export default class Field extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    }

    static contextType = FormContext;

    constructor(props, context={}) {
        super(props, context)
        if (!context.form) {
            console.error('请使用createForm(Component)方法使用组件，保证该组件正常运行')
        }
        this.state = {
            value: props.value || props.defaultValue || '',
            errorText: '',
            active: false,
            valid: true, //值是否合法
        }
    }
    componentDidMount() {
        this.context.form.attachToForm(this);
    }

    componentWillUnmount() {
        this.context.form.detachFromForm(this);
    }

    getName = () => {
        return this.props.name
    }

    getValue = () => {
        return this.state.value
    }

    handleFocus = (e) => {
        this.setState({
            active: true,
            errorText: ''
        })
        this.props.onFocus && this.props.onFocus(e)
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
        const { validateOnChange, onChange } = this.props
        onChange && onChange(e)
        validateOnChange && validateOnChange(e)
    }

    handleBlur = (e) => {
        this.setState({
            active: false
        })
        const { validateOnBlur, onBlur } = this.props
        onBlur && onBlur(e)
        validateOnBlur && this.context.form.validate(this)
    }

    render() {
        const { component: Children, ...rest } = this.props;
        const { errorText, active } = this.state;
        const props = {
            ...rest,
            name: this.getName(),
            errorText,
            value: this.getValue(),
            active,
            onFocus: this.handleFocus,
            onChange: this.handleChange
        }

        return <Children {...props} />

    }
}
