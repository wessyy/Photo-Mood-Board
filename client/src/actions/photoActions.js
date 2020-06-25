import { GET_PHOTOS, ADD_PHOTO, DELETE_PHOTO } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getPhotos = id => dispatch => {
    axios.get(`/api/photos/${id}`).then(res => 
        dispatch({
            type: GET_PHOTOS,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// Add tokenConfig(getState)
export const addPhoto = (boardID, userID, photo) => (dispatch, getState) => {
    console.log(photo);
    axios.post(`/api/photos/uploadPhoto/${boardID}`, {photo,  userID}).then(res =>
        dispatch({
            type: ADD_PHOTO,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// export const deleteItem = id => (dispatch, getState) => {
//     axios.delete(`/api/items/${id}`, tokenConfig(getState)).then(res => 
//         dispatch({
//             type: DELETE_ITEM,
//             payload: id
//         }))
//         .catch(err =>
//             dispatch(returnErrors(err.response.data, err.response.status))
//         );
// };

