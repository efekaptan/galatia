import React from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment'
import 'rc-calendar/assets/index.css';
import './CalendarPicker.css';
import enUS from 'rc-calendar/lib/locale/en_US';

const CalendarPicker = ({ field, onChange, value }) => {
    if (value && typeof value === "string") {
        value = moment(value);
    }

    return (
        <Picker
            onChange={(value) => onChange(field, value)}
            value={value}
        />
    )
}

class Picker extends React.Component {
    render() {

        const calendar = (
            <Calendar locale={enUS} />
        );

        return (
            <DatePicker animation="slide-up" calendar={calendar} onChange={this.props.onChange} value={this.props.value}>
                {
                    ({ value }) => {
                        return (
                            <input className="form-control" onChange={() => void (0)} value={(value && value.format('DD-MMM-YYYY')) || ''} />
                        );
                    }
                }
            </DatePicker>
        );
    }
}

export default CalendarPicker;