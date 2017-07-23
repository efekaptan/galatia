import React from 'react';
import AutoSuggest from '../AutoSuggest/';
import CalendarPicker from '../CalendarPicker/';
import NumericInput from '../NumericInput';
import { airPortSelector, autoSuggestRender } from '../../utils/';

const SidebarSearchForm = (props) =>
    <form className="booking-item-dates-change">
        <div className="form-group form-group-sm form-group-icon-left">
            <i className="fa fa-map-marker input-icon"></i>
            <label>From</label>
            <AutoSuggest
                inputValue={props.departureAirport}
                items={props.departureAirports}
                getItem={airPortSelector}
                onChange={(event, value) => props.onAirportChange(event, value, true)}
                onSelect={(event, value) => props.onAirportSelect(event, value, true)}
                renderItem={autoSuggestRender}
            />
        </div>
        <div className="form-group form-group-sm form-group-icon-left">
            <i className="fa fa-map-marker input-icon"></i>
            <label>To</label>
            <AutoSuggest
                inputValue={props.arrivalAirport}
                items={props.arrivalAirports}
                getItem={airPortSelector}
                onChange={props.onAirportChange}
                onSelect={props.onAirportSelect}
                renderItem={autoSuggestRender}
            />
        </div>
        <div className="form-group form-group-sm form-group-icon-left">
            <i className="fa fa-calendar input-icon input-icon-highlight"></i>
            <label>Departing</label>
            <CalendarPicker field="departureDate" onChange={props.onDateSelect} value={props.departureDate} />
        </div>
        <div className="form-group form-group-sm form-group-icon-left">
            <i className="fa fa-calendar input-icon input-icon-highlight"></i>
            <label>Return</label>
            <CalendarPicker field="arrivalDate" onChange={props.onDateSelect} value={props.arrivalDate} />
        </div>
        <div className="form-group">
            <label>Passengers</label>
            <NumericInput onChange={props.onSetPassengerCount} value={props.passengerCount} />
        </div>
        <button className="btn btn-primary" type="button" onClick={props.onSearchClick} disabled={props.isLoading}>Change</button>
    </form>

export default SidebarSearchForm;