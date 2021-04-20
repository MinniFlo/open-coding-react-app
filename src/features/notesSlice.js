import {createSlice, createEntityAdapter, createSelector} from "@reduxjs/toolkit";

const noteAdapter = createEntityAdapter();
const initialState = noteAdapter.getInitialState();


export const notesSlice = createSlice({
  name: 'notes',
  initialState: initialState,
  reducers: {
    noteAdded: noteAdapter.addOne,
    noteChanged: noteAdapter.upsertOne,
    noteDeleted: noteAdapter.removeOne,
    notePositionChanged(state, action) {
        const { noteId, position } = action.payload;
        state.entities[noteId].position = position;
    },
    noteAddMany: noteAdapter.addMany,
    noteLabelDeleted(state, action) {
      const labelId = action.payload.id;
      state.ids.forEach(id => {
        state.entities[id].labels = state.entities[id].labels.filter(id => id !== labelId)
      });
    },
  }
});

export const {
  noteAdded,
  noteChanged,
  noteDeleted,
  notePositionChanged,
  noteAddMany,
  noteAddLabels,
  noteLabelDeleted,
} = notesSlice.actions;

export default notesSlice.reducer;

// ------------Selectors------------

export const {
  selectAll: selectNotes,
  selectById: selectNoteById,
} = noteAdapter.getSelectors(state => state.notes)

export const selectNoteIds = createSelector(
  selectNotes,
  notes => notes.map(notes => notes.id)
);

