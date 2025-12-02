import { actionTypes } from './action';

export const initialState = {
    pageselectpublication: 1,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_PAGESELECTPUBLICATION_SUCCESS:
            return {
                ...state,
                pageselectpublication: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;