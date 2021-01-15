function createAction(actionName) {
  return (payload, options = {}) =>
    Object.assign({ type: actionName, payload }, options);
}
export default createAction;
