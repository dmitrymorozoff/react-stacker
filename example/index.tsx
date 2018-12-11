import * as React from "react";
import * as ReactDOM from "react-dom";
import { StackSlide, StackSlider } from "../src";

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="outer">
                <div className="wrapper">
                    <StackSlider>
                        <StackSlide>
                            <span style={{ fontSize: "26px", color: "#000" }}>Slide 1</span>
                        </StackSlide>
                        <StackSlide>
                            <span style={{ fontSize: "26px", color: "#000" }}>Slide 2</span>
                        </StackSlide>
                        <StackSlide>
                            <span style={{ fontSize: "26px", color: "#000" }}>Slide 3</span>
                        </StackSlide>
                        <StackSlide>
                            <span style={{ fontSize: "26px", color: "#000" }}>Slide 4</span>
                        </StackSlide>
                    </StackSlider>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
