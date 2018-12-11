import * as React from "react";
import * as ReactDOM from "react-dom";
import { StackSlide, StackSlider } from "../src";

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="outer">
                <div className="wrapper">
                    <StackSlider>
                        <StackSlide>Slide 1</StackSlide>
                        <StackSlide>Slide 2</StackSlide>
                        <StackSlide>Slide 3</StackSlide>
                        <StackSlide>Slide 4</StackSlide>
                    </StackSlider>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
