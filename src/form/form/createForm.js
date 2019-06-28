/**
* 高阶组件，通过该方法包装的组件
* */

import React from 'react'
import validateTools from '../tools/validate'

import FormContext from './formContext'

const FormContextProvider = FormContext.Provider

const createForm = (WrapperForm) => {
    return class Form extends React.Component {

        //只要用户使用了createForm方法，那么该方法会为传入的子组件绑定这些方法
        getFormProp = () => {
            return {
                getFieldValue: this.getFieldValue, //获取某一个控件的值
                getFieldsValue: this.getFieldsValue, //获取所有控件的值
                validateFields: this.validateFields, //校验所有传入了validator属性的控件
                validateField: this.validateField, //校验某一个拥有validator属性的控件
                getFieldsStatus: this.getFieldsStatus, //获取控件的所有状态，包括错误状态，值等信息
            }
        }

        getFormContext = () => {
            return {
                form: {
                    attachToForm: this.attachToForm,
                    detachFromForm: this.detachFromForm,
                    validate: this.validate
                }
            }
        }


        constructor(props) {
            super(props)
            this.state = {
                isValid: true
            }
            this.fields = [];
        }

        //保存所有控件
        attachToForm = (field) => {
            if (this.fields.indexOf(field) < 0) {
                this.fields.push(field);
            }
        };

        detachFromForm = (field) => {
            const fieldPos = this.fields.indexOf(field);
            if (fieldPos >= 0) {
                this.fields.splice(fieldPos, 1);
            }
        };

        //校验所有传入了validator属性的控件
        validateFields = () => {
            let isFormValid = true
            this.fields.forEach(field => {
                const errorText = this.validate(field)
                isFormValid = this.validate(field) ? false : true
            })
            return isFormValid
        }

        //校验某一个拥有validator属性的控件
        //和传入的validator属性类似，用于自定义校验时机
        validateField = (name) => {
            
        }

        //校验
        validate = (field) => {
            const value = field.getValue()
            const { validator, onValidate } = field.props
            if (validator && validator.rules) {
                validateTools.validateValue(validator.rules, value, (err) => {
                    field.setState({
                        errorText: err
                    })
                    onValidate && onValidate(err, value)
                    return err
                })
            } else {
                return ''
            }
        }

        //获取所有控件的值
        getFieldsValue = () => {
            let resObj = {}
            this.fields.forEach(field => {
                const name = field.getName()
                const value = field.getValue()
                resObj[name] = value
            })
            return resObj
        }

        //获取某一个控件的值
        getFieldValue = (name) => {
            let resObj = {}
            const field = this.fields.find(field => field.getName() === name)
            if (field) {
                const value = field.getValue()
                resObj[name] = value
                return resObj
            }
            return null
        }

        //获取控件的所有状态
        getFieldsStatus = () => {
            const res = []
            this.fields.forEach(field => {
                const { name } = field.props
                const value = field.getValue()
                const errorText = this.validate(field)
                if (errorText) {
                    res.push({
                        error: true,
                        errorText,
                        value,
                        name
                    })
                } else {
                    res.push({
                        error: false,
                        errorText: '',
                        value,
                        name
                    })
                }
            })
            return res
        }

        render() {
            return (
                <FormContextProvider value={this.getFormContext()}>
                    <WrapperForm
                        {...this.props}
                        form={this.getFormProp()}
                    />
                </FormContextProvider>
            )
        }
    }

}

export default createForm
