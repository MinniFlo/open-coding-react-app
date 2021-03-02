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
  }
});

export const {
  noteAdded,
  noteChanged,
  noteDeleted,
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
)

