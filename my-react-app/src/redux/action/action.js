import axios from "axios";
import * as actionTypes from "../constants/constants";

const URL = 'http://localhost:8000';


const getCardDetails=(id)=> async (dispatch)=>{
    try{
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        let responses = await axios.get(`${URL}/product/${id}`);
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: responses.data });
    }
    catch(error){
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.message });
    }
};


export default getCardDetails;