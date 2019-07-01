/**
 * Sample reducer to deliver group data to redux store
 * This will later be connected to firebase
 */

import personnel from "./Personnel.json";

let initialState = {
  pages:{
    byId:{
      "default-page-0":{
        id: "default-page-0",
        groups: ["default-staging-1", "default-group-2", "default-group-3", "default-group-4", "default-group-5", "default-group-6", "default-rehab-7"]
      }
    },
    allIds: ["default-page-0"]
  },
  groups: {
    byId:{
      "default-staging-1":{
        id: "default-staging-1",
        name: "Staging",
        firefighters: []
      },
      "default-group-2":{
        id: "default-group-2",
        name: "Group One",
        visible: true,
        firefighters: []
      },
      "default-group-3":{
        id: "default-group-3",
        name: "Group Two",
        visible: false,
        firefighters: []
      },
      "default-group-4":{
        id: "default-group-4",
        name: "Group Three",
        visible: false,
        firefighters: []
      },
      "default-group-5":{
        id: "default-group-5",
        name: "Group Four",
        visible: false,
        firefighters: []
      },
      "default-group-6":{
        id: "default-group-6",
        name: "Group Five",
        visible: false,
        firefighters: []
      },
      "default-rehab-7":{
        id: "default-rehab-7",
        name: "Rehab",
        visible: true,
        firefighters: []
      },
    },
    allIds: ["default-staging-1", "default-group-2", "default-group-3", "default-group-4", "default-group-5", "default-group-6", "default-rehab-7"]
  },
  roster: {
    byId: {

    },
    selectedIds: {

    },
    allIds: {

    }
  }
};

export default (state = initialState, action) => {
  switch (action.type){
    case 'MOVE_FIREFIGHTER':
      return state;
    default:
      return personnel.berea;
  }
};
