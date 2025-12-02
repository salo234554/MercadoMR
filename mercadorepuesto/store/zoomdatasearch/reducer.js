import { actionTypes } from './action';

export const initialState = {
    zoomdatasearch: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ZOOMDATASEARCH_SUCCESS:
            return {
                ...state,
                zoomdatasearch: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;