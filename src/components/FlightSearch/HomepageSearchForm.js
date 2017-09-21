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
                <div className="col-md-12 trip-tabs mt-2 mb-2">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className={toggleClass(props.isRoundTrip)} data-toggle="tab" role="tab" onClick={() => props.onSetField('isRoundTrip', true)}>Round Trip</a>
                        </li>
                        <li className="nav-item">
                            <a className={toggleClass(!props.isRoundTrip)} data-toggle="tab" role="tab" onClick={() => props.onSetField('isRoundTrip', false)}>One way</a>
                        </li>
                    </ul>
                </div>
            </div>
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
                            placeHolder="Departure airport"
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
                            placeHolder="Arrival airport"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group form-group-lg form-group-icon-left">
                        <i className="fa fa-calendar input-icon input-icon-highlight"></i>
                        <label>Departure</label>
                        <CalendarPicker onChange={(field, value) => props.onSetField('departureDate', value)} value={props.departureDate} />
                    </div>
                </div>
                <div className={"col-md-3" + (props.isRoundTrip ? " show" : " hide")}>
                    <div className="form-group form-group-lg form-group-icon-left">
                        <i className="fa fa-calendar input-icon input-icon-highlight"></i>
                        <label>Return</label>
                        <CalendarPicker onChange={(field, value) => props.onSetField('returnDate', value)} value={props.returnDate} startDate={props.departureDate} />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group form-group-lg">
                        <label>Passengers</label>
                        <NumericInput onChange={(value) => props.onSetField('passengerCount', value)} value={props.passengerCount} />
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

const toggleClass = (value) => "nav-link" + (value ? " active" : "");

export default HomepageSearchForm;