const createFetchActions = (key) => ({
  fetch: `LOAD_${key}_FETCH`,
  start: `LOAD_${key}_START`,
  error: `LOAD_${key}_ERROR`,
  success: `LOAD_${key}_SUCCESS`,
});
export default createFetchActions;
