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
                getFormValue: this.getFormValue,
                validateForm: this.validateForm,
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

            }
            this.fields = [];
        }

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

        validate = (field) => {
            const value = field.getValue()
            const { name, validator } = field.props
            validateTools.validateValue(validator.rules, value, (err) => {
                this.props.onValidate && this.props.onValidate(err, value)
                if (!('errorText' in this.props)) {
                    this.setState({ errorText: err })
                }
            })
        }

        getFormValue = () => {
            let resObj = {}
            this.fields.forEach(field => {
                const name = field.getName()
                const value = field.getValue()
                resObj[name] = value
            })
            return resObj
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
