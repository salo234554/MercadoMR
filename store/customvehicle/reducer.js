import { actionTypes } from './action';

export const initialState = {
    customvehicle: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CUSTOMVEHICLE_SUCCESS:
            return {
                ...state,
                customvehicle: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;