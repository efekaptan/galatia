import React from 'react';
import AutoSuggest from '../AutoSuggest/';
import CalendarPicker from '../CalendarPicker/';
import NumericInput from '../NumericInput/';
import { airPortSelector, autoSuggestRender } from '../../utils/';

const HomepageSearchForm = (props) =>
    <div>
        <h2>Search for Cheap Flights</h2>
        <form>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group form-group-lg form-group-icon-left">
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
                </div>
                <div className="col-md-6">
                    <div className="form-group form-group-lg form-group-icon-left">
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
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group form-group-lg form-group-icon-left">
                        <i className="fa fa-calendar input-icon input-icon-highlight"></i>
                        <label>Departure</label>
                        <CalendarPicker field="departureDate" onChange={props.onDateSelect} value={props.departureDate} />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group form-group-lg form-group-icon-left">
                        <i className="fa fa-calendar input-icon input-icon-highlight"></i>
                        <label>Return</label>
                        <CalendarPicker field="arrivalDate" onChange={props.onDateSelect} value={props.arrivalDate} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group form-group-lg">
                        <label>Passengers</label>
                        <NumericInput onChange={props.onSetPassengerCount} value={props.passengerCount} />
                    </div>
                </div>
            </div>
            {props.errorMessage ?
                <div className="input-group mb-3 has-danger">
                    <div className="form-control-feedback">{props.errorMessage}</div>
                </div>
                : null}
            <button className="btn btn-primary btn-lg" type="button" onClick={props.onSearchClick} disabled={props.isLoading}>Search for Flights</button>
        </form>
    </div>
export default HomepageSearchForm;