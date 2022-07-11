import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStoreModel } from "../models/state-management/reduxStore.model";
import { REDUX_ACTIONS } from "../state-management/reduxAction.enum";
import "./style/box.css";
function Box() {
    const dispatch = useDispatch();
    // get data from store
    const box: any = useSelector<ReduxStoreModel, ReduxStoreModel["box"]>((store: ReduxStoreModel) => store.box);
    // delete box
    const filterBox = function filterBox(val: any) {
        let filterBox = box.filter((number: number) => number !== val);
        dispatch({ type: REDUX_ACTIONS.DELETE_BOX, payload: filterBox });
    }
    // add new box 
    const addBox = function () {
        let boxValue;
        if (box !== null && box.length === 0) {
            boxValue = 1;
        } else {
            // find max value from arry and create new box with max value
            let maxValue = Math.max(...box);
            boxValue = maxValue + 1;

        }
        dispatch({ type: REDUX_ACTIONS.ADD_BOX, payload: [...box, boxValue] });
    }

    return (
        <Fragment>
            <header>UniClient</header>
            <div data-test="grid-container" className="grid-container" style={{
                gridTemplateColumns: 'auto auto auto'}}>
                {
                    // show all boeses
                    box !== null && box.map((item: any) => {
                        return (
                            <div data-test="areas" className="areas" id={`index${item}`} key={item}>
                                <div className="area" data-test="area" draggable="true"
                                    style={{ height: '150px' }}
                                    id={`area_${item}`}>
                                    <div className="box" >
                                        <span className="delete" onClick={() => { filterBox(item) }} id={`box_${item}`}  >
                                            <img
                                                src={process.env.PUBLIC_URL + `/icons/trash.svg`}
                                                alt='trash-icon' />
                                        </span>
                                        <div className="item" data-test="box">user {item}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <footer >
                <button className={box !== null && box.length === 12 ? "btn-add-box cursor-not-allowed" : "btn-add-box"}
                    disabled={box !== null && box.length === 12 ? true : false}
                    onClick={() => { addBox() }} >
                </button>
            </footer>
        </Fragment >
    )
}
export default Box;