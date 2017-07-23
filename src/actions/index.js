import { normalize } from 'normalizr';
import responseSchema from '../utils/schema';
import { SEARCH_REQUEST, SEARCH_RESULT } from './actionTypes';
import configuration from '../configuration';

const apiUrl = configuration.apiUrl;

export const searchAirports = async (searchString, isDeparture) => {
    let response = await fetch(`${apiUrl}/airports?searchString=${searchString}`);
    return await response.json();
}

export const searchFlights = (request) => async (dispatch) => {

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
        type: SEARCH_RESULT,
        response: normalizedData,
        receivedAt: Date.now()
    });
}

const generateApiRequest = (request) => {
    const apiRequest = {
        request: {
            slice: [
                {
                    origin: request.departureAirport.code,
                    destination: request.arrivalAirport.code,
                    date: request.departureDate.format('YYYY-MM-DD')
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