import React from 'react'

import { isValidLength } from './form/tools/method'

import { InputField, Form, createForm } from './form'

class Example extends React.Component {

    submit =  (e) => {
        e.preventDefault()
        const { validateFields } = this.props.form
        if (!validateFields()) return
        const value = this.props.form.getFieldsValue();
        alert('恭喜你，成功啦')
        console.log(value)
    }
    render() {
        const { form } = this.props
        console.log(form)
        return (
            <div>
                <Form onSubmit={this.submit} >
                    <InputField
                        name={'test1'}
                        validator={{
                            trigger: 'blur',
                            rules: 
                            [
                                {
                                    required: true,
                                    message: '不能为空',
                                },
                                {
                                    method: isValidLength(2, 30),
                                    message: '长度在2-30个字符之间',
                                },
                            ]
                        }}
                        allowClear
                    />
                    <InputField
                        name={'test2'}
                        validator={{
                            trigger: 'blur',
                            rules: 
                            [
                                {
                                    required: true,
                                    message: '不能为空',
                                },
                                {
                                    method: isValidLength(5, 30),
                                    message: '长度在5-30个字符之间',
                                },
                            ]
                        }}
                        allowClear
                    />
                    <button type={'submit'}>click</button>
                </Form>
            </div>
        )
    }
}

export default createForm(Example)