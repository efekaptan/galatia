import React from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment'
import 'rc-calendar/assets/index.css';
import './CalendarPicker.css';
import enUS from 'rc-calendar/lib/locale/en_US';

const CalendarPicker = ({ field, onChange, value, startDate }) => {
    if (value) {
        value = moment(value);
    }

    return (
        <Picker
            onChange={(value) => onChange(field, value)}
            value={value}
            startDate={startDate}
        />
    )
}

class Picker extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.disabledDate = this.disabledDate.bind(this);
    }

    disabledDate(value) {
        if (!value) {
            return false;
        }

        let startDate = new moment();

        if (this.props.startDate) {
            startDate = new moment(this.props.startDate);
        }

        return startDate.diff(value, 'hours') >= 1;
    }

    render() {
        const calendar = (
            <Calendar locale={enUS} disabledDate={this.disabledDate} />
        );

        return (
            <DatePicker animation="slide-up" calendar={calendar} onChange={this.props.onChange} value={this.props.value}>
                {
                    ({ value }) => {
                        return (
                            <input className="form-control" readOnly value={(value && value.format('DD-MMM-YYYY')) || ''} />
                        );
                    }
                }
            </DatePicker>
        );
    }
}

export default CalendarPicker;