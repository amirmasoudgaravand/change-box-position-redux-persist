import { BoxActions } from "./actionModel";
import { REDUX_ACTIONS } from "../reduxAction.enum";

export function addBox(box:any){
    return {
        type : REDUX_ACTIONS.ADD_BOX,
        payload : box,
    }
}
export function deleteBox(box:any){
    return {
        type : REDUX_ACTIONS.DELETE_BOX,
        payload : box,
    }
}
export function moveBox(box:any){
    return {
        type : REDUX_ACTIONS.MOVE_BOX,
        payload : box,
    }
}