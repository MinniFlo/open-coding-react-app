import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  scale: 1,
  offset: {x:0, y:0},
  noteDragged: false
}


export const notesSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    offsetChanged(state, action) {
      state.offset = action.payload.offset;
    },
    scaleChanged(state, action) {
      state.scale = action.payload.scale;
    },
    noteDraggedChanged(state, action) {
      state.noteDragged = action.payload.noteDragged;
    }
  }
});

export const {
  offsetChanged,
  scaleChanged,
  noteDraggedChanged,
} = notesSlice.actions;

export default notesSlice.reducer;


