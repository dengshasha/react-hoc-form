import React from 'react'


export default class Form extends React.Component {
    submit = (e) => {
        const { onSubmit } = this.props
        e.preventDefault()
        onSubmit && onSubmit(e)
    }

    render() {
        const { wrapperCls } = this.props
        return (
            <form
                className={wrapperCls}
                onSubmit={this.submit}
            >
                {this.props.children}
            </form>
        )
    }
}



