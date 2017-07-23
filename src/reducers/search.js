import { SEARCH_REQUEST, SEARCH_RESULT } from '../actions/actionTypes';

const defaultState = {
    request: {},
    response: {
        entities: {
            responses: {},
            trips: {},
            tripOption: [],
            carriers: [],
            airports: [],
            cities: []
        }
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                request: action.request,
                receivedAt: action.receivedAt
            };
        case SEARCH_RESULT:
            return {
                ...state,
                response: action.response,
                receivedAt: action.receivedAt
            };
        default:
            return state;
    }
}