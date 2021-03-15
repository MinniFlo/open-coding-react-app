import {createSlice, createEntityAdapter, createSelector} from "@reduxjs/toolkit";

const labelAdapter = createEntityAdapter();
// const initialState = labelAdapter.getInitialState();
const initialState = {
  ids: ["a", "b", "c", "d", "e"],
  entities: {
    a: {
      id: "a",
      name: "Getränk",
      color: "#a55",
    },
    b: {
      id: "b",
      name: "Essen",
      color: "#aa5",
    },
    c: {
      id: "c",
      name: "Müsli",
      color: "#a5a",
    },
    d: {
      id: "d",
      name: "Tee",
      color: "#5a5",
    },
    e: {
      id: "e",
      name: "Kaffee",
      color: "#55a",
    },
  }
}

export const labelsSlice = createSlice({
  name: 'labels',
  initialState: initialState,
  reducers: {
    labelAdded: labelAdapter.addOne,
    labelChanged: labelAdapter.upsertOne,
    labelDeleted: labelAdapter.removeOne,
  }
});

export const {
  labelAdded,
  labelChanged,
  labelDeleted,
} = labelsSlice.actions;

export default labelsSlice.reducer;

// ------------Selectors------------

export const {
  selectAll: selectLabels,
  selectById: selectLabelById,
} = labelAdapter.getSelectors(state => state.labels)

export const selectLabelIds = createSelector(
  selectLabels,
  labels => labels.map(labels => labels.id)
);



