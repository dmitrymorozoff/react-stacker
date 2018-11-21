import * as React from "react";
import * as ReactDOM from "react-dom";
import { StackSlide, StackSlider } from "../src";

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="outer">
                <div className="wrapper">
                    <StackSlider>
                        <StackSlide>1</StackSlide>
                        <StackSlide>2</StackSlide>
                        <StackSlide>3</StackSlide>
                        <StackSlide>4</StackSlide>
                    </StackSlider>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
