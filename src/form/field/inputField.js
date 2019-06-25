import React from 'react'
import classNames from 'classnames'
import Input from '../input/input'
import Field from './field'

const BASE_CLASS = 'm-input'

const controlGroup = (ControlComponent) => {
    return class extends React.Component {
        render() {
            const {
                className = '',
                errorText,
                ...props
            } = this.props;
            const groupCls = classNames({
                [`${BASE_CLASS}__control-group`]: true,
                'active': props.isActive,
                'error': !!errorText,
                [className]: true,
            });

            return (
                <div className={groupCls}>
                    <div className={`${BASE_CLASS}__controls`}>
                        <ControlComponent {...props}/>
                        {errorText && (
                            <div className={`${BASE_CLASS}__error`}>
                                <p>{errorText}</p>
                                <Icon type={'ic_txy_error'}/>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    };
};

const ControlledInput = controlGroup(Input)


export default class InputField extends React.Component {
    render() {
        return <Field {...this.props} component={ControlledInput}/>
    }
}
