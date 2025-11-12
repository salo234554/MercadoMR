import { actionTypes } from './action';

export const initialState = {
    ctlrlongcadena: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CTLRLONGCADENA_SUCCESS:
            return {
                ...state,
                ctlrlongcadena: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;