import { actionTypes } from './action';

export const initialState = {
    editengine: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_EDITENGINE_SUCCESS:
            return {
                ...state,
                editengine: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;