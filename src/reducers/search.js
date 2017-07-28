import { SEARCH_REQUEST, DEPARTURE_SEARCH_RESULT, RETURN_SEARCH_RESULT } from '../actions/actionTypes';

const airportRequest = {
    search: '',
    city: '',
    code: '',
    country: ''
}

const entitiesResponse = {
    responses: {},
    trips: {},
    tripOption: [],
    carriers: [],
    airports: [],
    cities: []
}

const defaultState = {
    request: {
        isRoundTrip: true,
        departureAirport: airportRequest,
        arrivalAirport: airportRequest,
        departureAirports: [],
        arrivalAirports: [],
        passengerCount: 1
    },
    response: {
        departure: {
            entities: entitiesResponse
        },
        return: {
            entities: entitiesResponse
        }
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                request: action.request,
                receivedAt: action.receivedAt,
                isLoading: true
            };
        case DEPARTURE_SEARCH_RESULT:
            return {
                ...state,
                response: {
                    ...state.response,
                    departure: action.response
                },
                receivedAt: action.receivedAt,
                isLoading: false
            };
        case RETURN_SEARCH_RESULT:
            return {
                ...state,
                response: {
                    ...state.response,
                    return: action.response
                },
                receivedAt: action.receivedAt,
                isLoading: false
            };
        default:
            return state;
    }
}