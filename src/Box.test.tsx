import React from 'react';
import * as ReactDOM from "react-dom";
import Box from './component/Box';
import { store } from "./state-management/store";
import { Provider } from 'react-redux';
import { REDUX_ACTIONS } from './state-management/reduxAction.enum';

describe("box component test", () => {
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(<Provider store={store}><Box /></Provider>, container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    });

    it("Renders correctly initial document", () => {
        const haeder = container.querySelector('header');
        expect(haeder).toHaveTextContent("UniClient");
        expect(container.querySelector("[data-test='grid-container']")).toBeInTheDocument();
        expect(container.querySelector("[data-test='grid-container']")).toHaveClass("grid-container");
        const btn = container.querySelectorAll('button');
        expect(btn).toHaveLength(1);
        expect(btn[0].className).toBe("btn-add-box");
    });

    it("Add box", () => {
        store.dispatch({ type: REDUX_ACTIONS.ADD_BOX, payload: [1] });
        expect(container.querySelector("[data-test='box']")).toBeInTheDocument();
        expect(container.querySelector("[data-test='box']")).toHaveTextContent("user 1");
        expect(container.querySelector("[data-test='areas']")).toBeInTheDocument();
        expect(container.querySelector("[data-test='grid-container']")).toHaveStyle("gridTemplateColumns:auto");
        expect(container.querySelector("[data-test='area']")).toHaveStyle("height:150px");
        let state = store.getState().box;
        const addBox = state.find((box: number) => box == 1);
        expect(addBox).toEqual(1);
        expect(state.length).toEqual(1);
    });
    it("12 box", () => {
        store.dispatch({ type: REDUX_ACTIONS.ADD_BOX, payload: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] });
        expect(container.querySelector("[data-test='area']")).toHaveStyle("height:75px");
        expect(container.querySelector("[data-test='grid-container']")).toHaveStyle("gridTemplateColumns:auto auto auto");
        const btn = container.querySelectorAll('button');
        expect(btn).toHaveLength(1);
        expect(btn[0].className).toBe("btn-add-box cursor-not-allowed");
    });
})
