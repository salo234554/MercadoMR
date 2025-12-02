import { actionTypes } from './action';

export const initialState = {
    deleteitemfind: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DELETEITEMFIND_SUCCESS:
            return {
                ...state,
                deleteitemfind: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;