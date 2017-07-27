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

export const searchReturnFlights = (request) => async (dispatch, getState) => {
    const returnRequest = {
        ...request,
        isReturn: true
    }

    return dispatch(searchFlights(returnRequest));
}

export const searchFlights = (request) => async (dispatch, getState) => {

    //No need to make expensive api call if request parameters are same with current state
    const isRequestSameWithState = compareRequestWithState(request, getState);
    if (isRequestSameWithState) {
        //return;
    }

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
    const normalizedData = normalize(JSON.parse(responseData), responseSchema);

    return dispatch({
        type: request.isReturn ? RETURN_SEARCH_RESULT : DEPARTURE_SEARCH_RESULT,
        response: normalizedData,
        receivedAt: Date.now()
    });
}

const generateApiRequest = (request) => {
    let origin = request.departureAirport.code;
    let destination = request.arrivalAirport.code;
    let date = request.departureDate;

    if (request.isReturn) {
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

const compareRequestWithState = (request, getState) => {

    const state = getState();

    //Serilize departure request to compare with current state request
    const departureRequest = JSON.stringify(
        generateApiRequest(request)
    );

    //Serilize returning request to compare with current state request
    const returnRequest = JSON.stringify(
        generateApiRequest(request)
    );

    const oldRequest = JSON.stringify(generateApiRequest(state.search.request));

    if (departureRequest === oldRequest || returnRequest === oldRequest) {
        return true;
    }

    return false;
}