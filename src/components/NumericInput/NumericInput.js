import React from 'react';
import './NumericInput.css';

class NumericInput extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentValue: 1
        }
    }

    increment = () => {
        const newValue = this.state.currentValue + 1;
        this.onChange(newValue);
    }

    decrement = () => {
        if (this.state.currentValue === 1) {
            return;
        }

        const newValue = this.state.currentValue - 1;
        this.onChange(newValue);
    }

    onChange = (newValue) => {
        newValue = parseInt(newValue, 0);
        if (isNaN(newValue)) {
            return;
        }
        this.setState({
            currentValue: newValue
        })

        this.props.onChange(newValue);
    }

    componentWillUpdate = (nextProps, nextState) => {
        if (this.state.currentValue !== nextProps.value) {
            this.setState({
                currentValue: nextProps.value
            });
        }
    }

    componentWillMount = () => {
        if (this.props.value) {
            this.setState({
                currentValue: this.props.value
            });
        }
    }

    render() {
        return (
            <div className="input-group numeric-input">
                <span className="input-group-addon" onClick={this.decrement}>
                    <i className="fa fa-minus" />
                </span>
                <input className="form-control" type="text" value={this.state.currentValue} onChange={(event) => this.onChange(event.target.value)} />
                <span className="input-group-addon" onClick={this.increment}>
                    <i className="fa fa-plus" />
                </span>
            </div >
        )
    }
}

export default NumericInput;