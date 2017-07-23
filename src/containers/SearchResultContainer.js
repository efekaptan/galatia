import React from 'react';
import moment from 'moment'
import { connect } from 'react-redux';
import SearchResult from '../components/FlightSearch/SearchResult';

class SearchResultContainer extends React.Component {
    getDetails = () => {
        const flightDetails = [];
        for (let tripOptionId of this.props.tripOptionIds) {
            var tripOption = this.props.tripOptions[tripOptionId];
            const flightDetail = {
                id: tripOptionId,
                saleTotal: tripOption.saleTotal,
                segments: []
            };

            for (let slice of tripOption.slice) {
                flightDetail.duration = slice.duration;

                for (let segment of slice.segment) {
                    const leg = segment.leg[0];
                    flightDetail.segments.push({
                        id: segment.id,
                        duration: segment.duration,
                        flightNumber: segment.flight.carrier + "-" + segment.flight.number,
                        carrier: this.props.carriers[segment.flight.carrier].name,
                        arrivalTime: moment(leg.arrivalTime).format('LT'),
                        arrivalDate: moment(leg.arrivalTime).format('ll'),
                        departureTime: moment(leg.departureTime).format('LT'),
                        departureDate: moment(leg.departureTime).format('ll'),
                        originAirport: this.props.airports[leg.origin].name,
                        originalCity: this.props.cities[this.props.airports[leg.origin].city].name,
                        destinationAirport: this.props.airports[leg.destination].name,
                        destinationCity: this.props.cities[this.props.airports[leg.destination].city].name,
                        cabin: segment.cabin
                    })
                }
            }
            flightDetails.push(flightDetail);
        }
        return flightDetails;
    }

    render() {
        const flightDetails = this.getDetails();

        return (
            <SearchResult
                flightDetails={flightDetails}
            />
        )
    }
}

const mapStateToProps = state => {
    const entities = state.search.response.entities;
    const tripResponse = entities.responses['qpxExpress#tripsSearch'];
    const tripOptionIds = (tripResponse && entities.trips[tripResponse.trips].tripOption) || [];
    return {
        tripOptionIds: tripOptionIds,
        tripOptions: entities.tripOptions,
        carriers: entities.carriers,
        airports: entities.airports,
        cities: entities.cities
    }
};

export default connect(mapStateToProps)(SearchResultContainer);