import {createSlice, createEntityAdapter, createSelector} from "@reduxjs/toolkit";

const labelAdapter = createEntityAdapter();
const initialState = labelAdapter.getInitialState();

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
)



