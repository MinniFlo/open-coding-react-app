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
      parentLabelId: "",
      labels: [],
    },
    b: {
      id: "b",
      name: "Essen",
      color: "#aa5",
      parentLabelId: "",
      labels: [],
    },
    c: {
      id: "c",
      name: "Müsli",
      color: "#a5a",
      parentLabelId: "",
      labels: [],
    },
    d: {
      id: "d",
      name: "Tee",
      color: "#5a5",
      parentLabelId: "",
      labels: [],
    },
    e: {
      id: "e",
      name: "Kaffee",
      color: "#55a",
      parentLabelId: "",
      labels: [],
    },
  }
}

export const labelsSlice = createSlice({
  name: 'labels',
  initialState: initialState,
  reducers: {
    labelAdded: labelAdapter.addOne,
    labelChanged(state, action) {
      const {id, name, color, labels} = action.payload;
      state.entities[id].name = name;
      state.entities[id].color = color;
      const oldLabels = state.entities[id].labels
      oldLabels.map(label => state.entities[label.id].parentLabelId = '');
      labels.map(label => state.entities[label.id].parentLabelId=id);
      state.entities[id].labels = labels;
    },
    labelDeleted(state, action) {
      const {id} = action.payload;
      state.entities[id].labels.map(label => state.entities[label.id].parentLabelId = '');
      labelAdapter.removeOne(state, id);
    }
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


