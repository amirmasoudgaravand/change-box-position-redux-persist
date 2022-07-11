import { AnyAction, combineReducers, createStore, Reducer, ReducersMapObject } from "redux";
import { ReduxStoreModel } from "../models/state-management/reduxStore.model";
import {reducer as Boxreducer} from "./box/reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers : ReducersMapObject<ReduxStoreModel,AnyAction>={
    box : Boxreducer as Reducer<ReduxStoreModel['box'],AnyAction>
}

const combinedReducers = combineReducers(reducers);

const persistConfig = {
    key: 'root',
    storage
};

const persistedCombinedReducers = persistReducer(persistConfig, combinedReducers);

export const store = createStore(persistedCombinedReducers);

export const persistedStore = persistStore(store);