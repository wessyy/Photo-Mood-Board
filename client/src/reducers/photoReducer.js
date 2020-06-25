import {
    GET_PHOTOS,
    ADD_PHOTO,
    DELETE_PHOTO
  } from '../actions/types';

import {arrayBufferToBase64} from './constants'
  
const initialState = {
    photos: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_PHOTO:
            console.log(action.payload)
            var imageStr = action.payload.contentType + ',' + arrayBufferToBase64(action.payload.data.data);
            return {
                ...state,
                photos: [...state.photos, imageStr]
            };
        case GET_PHOTOS:
            var imageStr = 'data:image/jpeg;base64,' + arrayBufferToBase64(action.payload.data);
            return {
                ...state,
                photos: [...state.photos, imageStr]
            };
        default:
            return state;
    }
}
