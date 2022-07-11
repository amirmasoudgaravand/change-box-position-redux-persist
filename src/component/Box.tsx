import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStoreModel } from "../models/state-management/reduxStore.model";
import { REDUX_ACTIONS } from "../state-management/reduxAction.enum";
import "./style/box.css";
function Box() {
    const dispatch = useDispatch();
    // get data from store
    const box: any = useSelector<ReduxStoreModel, ReduxStoreModel["box"]>((store: ReduxStoreModel) => store.box);
    const [itemMove, setItemMove] = useState<boolean>(false);
    const [oneItem, setOneItem] = useState<number>();
    const [twoItem, setTwoItem] = useState<number>();
    // delete box
    const filterBox = function filterBox(val: any) {
        let filterBox = box.filter((number: number) => number !== val);
        dispatch({ type: REDUX_ACTIONS.DELETE_BOX, payload: filterBox });
    }
    // add new box 
    const addBox = function () {
        let boxValue;
        if (box !==null && box.length === 0) {
            boxValue = 1;
        } else {
            // find max value from arry and create new box with max value
            let maxValue = Math.max(...box);
            boxValue = maxValue + 1;
        
        }
        dispatch({ type: REDUX_ACTIONS.ADD_BOX, payload: [...box, boxValue] });
    }

    useEffect(() => {
        // change position array and dispatch to store
        if (oneItem !== twoItem && itemMove === true) {
            const one = Number(oneItem);
            const two = Number(twoItem);
            let indexOne = box.indexOf(one);
            let indexTwo = box.indexOf(two);
            box[indexOne] = two;
            box[indexTwo] = one;
            dispatch({ type: REDUX_ACTIONS.MOVE_BOX, payload: [...box] });
            setItemMove(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oneItem, twoItem]);

    // function for drag and drop 
    const dragEnd = function (e: any) {
        var areas: any = document.querySelectorAll(".areas");
        for (var area of areas) {
            if ((e.clientX > area.getBoundingClientRect().x &&
                e.clientX < area.getBoundingClientRect().x + area.clientWidth) &&
                (e.clientY > area.getBoundingClientRect().y &&
                    e.clientY < area.getBoundingClientRect().y + area.clientHeight)) {
                if (area.childElementCount === 0) {
                    area.appendChild(document.getElementById(e.target.id));
                }
                if (area.childElementCount === 1) {
                    let aux = area.firstElementChild;
                    var start = e.target.parentElement.appendChild(document.getElementById(aux.id));
                    var end = area.appendChild(document.getElementById(e.target.id));
                    setOneItem(Number(start.getAttribute("id").slice(5)));
                    setTwoItem(Number(end.getAttribute("id").slice(5)));
                    setItemMove(true);
                }
            }
        }
    }

    document.addEventListener("dragend", dragEnd);
    return (
        <Fragment>
            <header>UniClient</header>
            <div data-test="grid-container" className="grid-container" style={{
                gridTemplateColumns: `${box !== null && box.length > 2
                    ? 'auto auto auto'
                    : box !== null && box.length === 1
                        ? 'auto'
                        : box !== null && box.length === 2
                            ? 'auto auto'
                            : ""} `
            }}>
                {
                    // show all boxes
                    box !== null && box.map((item: any) => {
                        return (
                            <div data-test="areas" className="areas" id={`index${item}`} key={item}>
                                <div className="area" data-test="area" draggable="true"
                                    style={{ height: `${box !== null && box.length > 6 ? '75px' : '150px'} ` }}
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