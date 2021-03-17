import { createStore,compose,applyMiddleware } from "redux";
import createSagaMiddleward from 'redux-saga'
import { createBrowserHistory } from "history";

import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory()

const segaMiddleware = createSagaMiddleward()

const initialState = {}
const middleware = [segaMiddleware,routerMiddleware(history)]
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhencer = process.env.NODE_ENV === "prodction" ? compose : devtools || compose;
const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhencer(applyMiddleware(...middleware))
)
segaMiddleware.run(rootSaga)

export default store;