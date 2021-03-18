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
    labelAdded(state, action) {
      const {id, labels} = action.payload;
      // set parentLabelId of all subordinate Labels
      labels.map(label => state.entities[label.id].parentLabelId=id);
      // add Label
      labelAdapter.addOne(state, action.payload);
    },
    labelChanged(state, action) {
      const {id, labels} = action.payload;
      // get the old subordinate Labels and remove parentLabelId on all
      const oldLabels = state.entities[id].labels
      oldLabels.forEach(label => {
        state.entities[label.id].parentLabelId = ""
      });
      // set the parentLabelId on all new subordinate Labels
      labels.forEach(label => {
        const parentId = state.entities[label.id].parentLabelId
        if (parentId !== "") {
          state.entities[parentId].labels = state.entities[parentId].labels.filter(subLabel => subLabel.id !== label.id);
        }
        state.entities[label.id].parentLabelId=id;
      });
      // update Label
      labelAdapter.upsertOne(state, action.payload);
    },
    labelDeleted(state, action) {
      const {id} = action.payload;
      // remove parentLabelId on all subordinate Labels
      state.entities[id].labels.forEach(label => state.entities[label.id].parentLabelId = '');
      // if the Label is a subordinate Label, remove the reference of the parent Label
      const parentId = state.entities[id].parentLabelId;
      if (parentId !== "") {
        state.entities[parentId].labels = state.entities[parentId].labels.filter(subLabel => subLabel.id !== id);
      }
      // remove Label
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


