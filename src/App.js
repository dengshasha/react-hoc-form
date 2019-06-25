import React from 'react'

import { InputField, Form, createForm } from './form'

class Example extends React.Component {

    submit =  (e) => {
        e.preventDefault()
        const value = this.props.form.getFormValue();
    }
    render() {
        const { form } = this.props
        console.log(form)
        return (
            <div>
                <Form onSubmit={this.submit} >
                    <InputField
                        name={'ffff'}
                        allowClear
                    />
                    <button type={'submit'}>click</button>
                </Form>
            </div>
        )
    }
}

export default createForm(Example)