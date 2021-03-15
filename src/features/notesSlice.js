import {createSlice, createEntityAdapter, createSelector} from "@reduxjs/toolkit";

const noteAdapter = createEntityAdapter();
// const initialState = noteAdapter.getInitialState();
const initialState = {
  ids: ["a","b","c","d","e"],
  entities: {
    a : {
      id: "a",
      content: "Müsli ist ein gutes Frühstück, aber manchmal ess ich auch Toast",
      labels: [],
      comment: "",
      position: {x: 0, y: 65},
    },
    b : {
      id: "b",
      content: "ich trinke nur ein Kaffe",
      labels: [],
      comment: "",
      position: {x: 0, y: 145},
    },
    c : {
      id: "c",
      content: "ein warmen Tee und eine Schnitte dann bin ich bereit für den Tag",
      labels: [],
      comment: "",
      position: {x: 0, y: 225},
    },
    d : {
      id: "d",
      content: "ein Müslie mit Hafermich und einen Kaffe",
      labels: [],
      comment: "",
      position: {x: 200, y: 65},
    },
    e : {
      id: "e",
      content: "ich esse kein Frühstück, ich ess erst am Mittag etwas",
      labels: [],
      comment: "",
      position: {x: 200, y: 145},
    },
  }
}

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
  }
});

export const {
  noteAdded,
  noteChanged,
  noteDeleted,
  notePositionChanged,
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

