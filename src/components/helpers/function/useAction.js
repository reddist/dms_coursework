import { useDispatch } from "react-redux";
export const useAction = (action, options = {}) => {
  const dispatch = useDispatch();
  return (value, attrs) => {
    dispatch(
      Object.assign(
        Object.assign({ type: action, payload: value }, options),
        attrs
      )
    );
  };
};
export const useBlankAction = (action, options = {}) => {
  const dispatch = useDispatch();
  return () => {
    dispatch({
      ...options,
      type: action
    });
  };
};
