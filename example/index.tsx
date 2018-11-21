import * as React from "react";
import * as ReactDOM from "react-dom";
import { StackCarousel, StackSlide } from "../src";

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="outer">
                <div className="wrapper">
                    <StackCarousel>
                        <StackSlide>1</StackSlide>
                        <StackSlide>1</StackSlide>
                        <StackSlide>1</StackSlide>
                        <StackSlide>1</StackSlide>
                    </StackCarousel>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
