import { actionTypes } from './action';

export const initialState = {
    editdatahistory: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_EDITDATAHISTORY_SUCCESS:
            return {
                ...state,
                editdatahistory: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;