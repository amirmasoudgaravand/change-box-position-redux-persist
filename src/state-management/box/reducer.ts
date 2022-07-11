import { ReduxStoreModel } from "../../models/state-management/reduxStore.model";
import { REDUX_ACTIONS } from "../reduxAction.enum";
import { BoxActions } from "./actionModel";

export function reducer(
    prevState: ReduxStoreModel['box'],
    action: BoxActions
): ReduxStoreModel['box'] {
    switch (action.type) {
        case REDUX_ACTIONS.ADD_BOX:
            return action.payload;
        case REDUX_ACTIONS.DELETE_BOX:
            return action.payload;
        case REDUX_ACTIONS.MOVE_BOX:
            return action.payload;
        default:
            return null;
    }
}