import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
//import sagas from "./saga";
import reducer from "./reducer";

const createAppStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(sagaMiddleware))
  );

  //sagas.forEach((saga) => sagaMiddleware.run(saga));

  return store;
};

export default createAppStore;