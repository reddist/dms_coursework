const combineChanges = (changes) => (currentState, action) =>
  changes.reduce((state, reducer) => reducer(state, action), currentState);
export default combineChanges;
