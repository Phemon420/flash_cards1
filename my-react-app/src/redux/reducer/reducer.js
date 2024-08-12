import * as actionType from '../constants/constants';

const initialState = {
    loading: false,
    product: {},
    error: null
};

const getCardDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true };
        case actionType.GET_PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload, error: null };
        case actionType.GET_PRODUCT_DETAILS_FAIL:
            return { loading: false, product: {}, error: action.payload };
        case actionType.GET_PRODUCT_DETAILS_RESET:
            return initialState;
        default:
            return state;
    }
};

export default getCardDetailsReducer;
