import { Action } from "redux";
import { BoxEntityModel } from "../../models/entities/box.model";
import { REDUX_ACTIONS } from '../reduxAction.enum';

export interface BoxActions extends Action<REDUX_ACTIONS> {
    payload: any;
}