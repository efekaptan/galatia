import React from 'react';

const ResultList = ({ result }) =>
    <ul className="booking-list">
        {result.map(detail =>
            <li key={detail.id}>
                <div className="booking-item-container">
                    <div className="booking-item">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="booking-item-airline-logo">
                                    <p>{detail.segments[0].carrier}</p>
                                </div>
                            </div>
                            <div className="col-md-5">
                                {detail.segments.map(segment =>
                                    <div className="booking-item-flight-details" key={segment.id}>
                                        <div className="booking-item-departure"><i className="fa fa-plane"></i>
                                            <h5>{segment.departureTime}</h5>
                                            <p className="booking-item-date">{segment.departureDate}</p>
                                            <p className="booking-item-destination">{segment.originAirport}</p>
                                        </div>
                                        <div className="booking-item-arrival"><i className="fa fa-plane fa-flip-vertical"></i>
                                            <h5>{segment.arrivalTime}</h5>
                                            <p className="booking-item-date">{segment.arrivalDate}</p>
                                            <p className="booking-item-destination">{segment.destinationAirport}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-2">
                                <h5>{detail.duration} min</h5>
                                <p>{detail.segments.length > 1 ? detail.segments.length + ' stops' : 'non-stop'}</p>
                            </div>
                            <div className="col-md-3">
                                <span className="booking-item-price">{detail.saleTotal}</span>
                                <p className="booking-item-flight-class">{detail.segments[0].cabin} Class</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )}
    </ul>

export default ResultList;