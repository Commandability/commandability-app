export const loadPersistedState = () => {
  try {
    const serializedState = getPersistedState(); // get persisted state here
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    // save serialized state here
  } catch (err) {
    console.log(err);
  }
};

export const loadDefaultState = () => {
  try {
    const serializedState = getDefaultState(); // get default state here
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    return undefined;
  }
};
