const deepMerge = (state, newState) => {
  let result = { ...state };
  Object.keys(newState).forEach((key) => {
    if (
      typeof newState[key] === "object" &&
      !Array.isArray(newState[key]) &&
      newState[key] !== null
    ) {
      result = {
        ...result,
        [key]: deepMerge(result[key], newState[key]),
      };
    } else {
      result = {
        ...result,
        [key]: newState[key],
      };
    }
  });
  return result;
};

export default deepMerge;
