import { normalize } from 'normalizr';
import moment from 'moment';
import responseSchema from '../utils/schema';
import { SEARCH_REQUEST, DEPARTURE_SEARCH_RESULT, RETURN_SEARCH_RESULT } from './actionTypes';
import configuration from '../configuration';

const apiUrl = configuration.apiUrl;

export const searchAirports = async (searchString, isDeparture) => {
    let response = await fetch(`${apiUrl}/airports?searchString=${searchString}`);
    return await response.json();
}

export const searchDepartureFlights = (request) => async (dispatch, getState) => {
    const departureRequest = {
        ...request,
        requestType: "departure"
    }

    return dispatch(searchFlights(departureRequest));
}

export const searchReturnFlights = (request) => async (dispatch, getState) => {
    const returnRequest = {
        ...request,
        requestType: "return"
    }

    return dispatch(searchFlights(returnRequest));
}

export const searchFlights = (request) => async (dispatch, getState) => {

    dispatch({
        type: SEARCH_REQUEST,
        request: request,
        receivedAt: Date.now()
    })

    const apiRequest = generateApiRequest(request);

    const apiResponse = await fetch(`${apiUrl}/trips/search`,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(apiRequest)
        });

    const responseData = await apiResponse.json();
    const normalizedData = normalize(responseData, responseSchema);

    return dispatch({
        type: request.requestType === "departure" ? DEPARTURE_SEARCH_RESULT : RETURN_SEARCH_RESULT,
        response: normalizedData,
        receivedAt: Date.now()
    });
}

const generateApiRequest = (request) => {
    let origin = request.departureAirport.code;
    let destination = request.arrivalAirport.code;
    let date = request.departureDate;

    if (request.requestType === "return") {
        origin = request.arrivalAirport.code;
        destination = request.departureAirport.code;
        date = request.returnDate;
    }

    const apiRequest = {
        request: {
            slice: [
                {
                    origin: origin,
                    destination: destination,
                    date: moment(date).format('YYYY-MM-DD')
                }
            ],
            passengers: {
                adultCount: request.passengerCount
            },
            solutions: 20
        }
    }

    return apiRequest;
}