import { GET_BOARDS } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getBoards = boards => dispatch => {   
    dispatch({
        type: GET_BOARDS,
        payload: boards
    });
};

// export const addPhoto = (id, photo) => (dispatch, getState) => {
//     axios.post(`/api/photos/${id}`, photo).then(res => 
//         dispatch({
//             type: ADD_PHOTO,
//             payload: res.data
//         }))
//         .catch(err =>
//             dispatch(returnErrors(err.response.data, err.response.status))
//         );
// };

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

