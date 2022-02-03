import * as actionTypes from '../constants/userConstants'
import axios from 'axios'

export const getUser = () => async (dispatch) => {
    try {
        dispatch({type: actionTypes.GET_USER_REQUST})

        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };

        const {data} = await axios.get("/api/private", config)

        dispatch({type: actionTypes.GET_USER_SUCCESS, payload: data.data})
        
    } catch (error) {
        dispatch({
            type: actionTypes.GET_USER_FAIL, 
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        })
    }
}

export const removeUser = () => (dispatch) => {
    localStorage.removeItem("authToken")
    dispatch({type: actionTypes.GET_USER_RESET})
}