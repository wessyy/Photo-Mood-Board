import {
    GET_BOARDS,
    ADD_BOARD,
    DELETE_BOARD
  } from '../actions/types';
  
const initialState = {
    currentBoard: null,
    boards: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_BOARDS:
            const currentBoard = (state.currentBoard == null ? action.payload[0] : state.currentBoard);
            return {
                ...state,
                currentBoard,
                boards: action.payload
            }
        default:
            return state;
    }
}
