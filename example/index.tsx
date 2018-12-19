import * as React from "react";
import * as ReactDOM from "react-dom";
import { StackSlide, StackSlider } from "../src";

export class App extends React.Component<{}, {}> {
    public onChangeHandler = () => {
        // tslint:disable-next-line:no-console
        console.log("on change slide");
    };

    public onPrevChangeHandler = () => {
        // tslint:disable-next-line:no-console
        console.log("on prev change slide");
    };

    public onNextChangeHandler = () => {
        // tslint:disable-next-line:no-console
        console.log("on next change slide");
    };

    public render() {
        return (
            <div className="outer">
                <div className="wrapper">
                    <StackSlider
                        className={"custom-slider"}
                        dots={true}
                        infiniteLoop={true}
                        onChange={this.onChangeHandler}
                        onPrevChange={this.onPrevChangeHandler}
                        onNextChange={this.onNextChangeHandler}
                    >
                        <StackSlide className="custom-slide">
                            <span style={{ fontSize: "38px", color: "rgb(85, 85, 85)" }}>
                                Slide 6
                            </span>
                        </StackSlide>
                        <StackSlide className="custom-slide">
                            <span style={{ fontSize: "38px", color: "rgb(85, 85, 85)" }}>
                                Slide 5
                            </span>
                        </StackSlide>
                        <StackSlide>
                            <span style={{ fontSize: "38px", color: "rgb(85, 85, 85)" }}>
                                Slide 4
                            </span>
                        </StackSlide>
                        <StackSlide>
                            <span style={{ fontSize: "38px", color: "rgb(85, 85, 85)" }}>
                                Slide 3
                            </span>
                        </StackSlide>
                        <StackSlide>
                            <span style={{ fontSize: "38px", color: "rgb(85, 85, 85)" }}>
                                Slide 2
                            </span>
                        </StackSlide>
                        <StackSlide>
                            <span style={{ fontSize: "38px", color: "rgb(85, 85, 85)" }}>
                                Slide 1
                            </span>
                        </StackSlide>
                    </StackSlider>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
