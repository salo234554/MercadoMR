import { actionTypes } from './action';

export const initialState = {
    iracomprar: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_IRACOMPRAR_SUCCESS:
            return {
                ...state,
                iracomprar: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;