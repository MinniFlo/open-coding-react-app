import {createSlice, createEntityAdapter, createSelector} from "@reduxjs/toolkit";


const labelAdapter = createEntityAdapter();
const initialState = labelAdapter.getInitialState();


const updateParentIds = (labelId, subLabels, entities) => {
  subLabels.forEach(label => {
    const parentId = entities[label.id].parentLabelId
    if (parentId !== "") {
      entities[parentId].labels = entities[parentId].labels.filter(subLabel => subLabel.id !== label.id);
    }
    entities[label.id].parentLabelId=labelId;
  });
}

export const labelsSlice = createSlice({
  name: 'labels',
  initialState: initialState,
  reducers: {
    labelAdded(state, action) {
      const {id, labels} = action.payload;
      // set parentLabelId of all subordinate Labels
      updateParentIds(id, labels, state.entities);
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
      updateParentIds(id, labels, state.entities);
      // update Label
      labelAdapter.upsertOne(state, action.payload);
    },
    labelDeleted(state, action) {
      console.log("in label slice")
      const {id} = action.payload;
      // remove parentLabelId on all subordinate Labels
      const label = state.entities[id];
      // if the Label is a subordinate Label, remove the reference of the parent Label
      if (label.parentLabelId !== "") {
        const parentLabel = state.entities[label.parentLabelId];
        parentLabel.labels = parentLabel.labels.filter(subLabel => subLabel.id !== id);
        label.labels.forEach(subLabel => {
          state.entities[subLabel.id].parentLabelId = label.parentLabelId;
          parentLabel.labels = [...parentLabel.labels, subLabel];
        })
      } else {
        label.labels.forEach(subLabel => state.entities[subLabel.id].parentLabelId = "")
      }
      // remove Label reference in Note objects

      // remove Label
      labelAdapter.removeOne(state, id);
    },
    labelAddMany: labelAdapter.addMany,
  }
});

export const {
  labelAdded,
  labelChanged,
  labelDeleted,
  labelAddMany,
  labelAddLabels,
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

export const selectParentLabelIds = createSelector(
  selectLabels,
  labels => labels.filter(label => label.parentLabelId === "").map(label => label.id)
);

const selectAllParents = (label, labels) => {
  const parentId = label.parentLabelId
  if (parentId !== '') {
    const parent = labels[parentId];
    return [parentId, ...selectAllParents(parent, labels)]
  }
  return []
}

export const selectPossibleSubLabels = (labelId) => createSelector(
  selectLabelIds,
  state => state.labels.entities,
  (labelIds, labels) => {
    if (labelId === "") {
      return labelIds;
    }
    const label = labels[labelId];
    const parentIds = selectAllParents(label, labels)
    if (parentIds.length !== 0) {
      const parentFiltered = labelIds.filter(id => {
        return parentIds.indexOf(id) === -1;
      })
      return parentFiltered.filter(id => id !== label.id);
    }
    return labelIds.filter(id => id !== label.id);
  }
)