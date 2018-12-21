import * as React from "react";
import * as ReactDOM from "react-dom";
import { StackerSlide, StackerSlider } from "../src";
import { SlideEntry } from "./components/slide-entry/index";

export class App extends React.Component<{}, {}> {
    public onChangeHandler = () => {
        // tslint:disable-next-line:no-console
        console.log("On change slide");
    };

    public onPrevChangeHandler = () => {
        // tslint:disable-next-line:no-console
        console.log("On prev change slide");
    };

    public onNextChangeHandler = () => {
        // tslint:disable-next-line:no-console
        console.log("On next change slide");
    };

    public render() {
        return (
            <div className="outer">
                <div className="header">
                    <h1 className="header-title">react-stacker</h1>
                    <div className="header-subtitle">
                        Carousel / slider component built with React.js. It’s flexible, fast and
                        touch-friendly.
                    </div>
                </div>
                <a
                    href="https://github.com/dmitrymorozoff/react-stack-slider"
                    className="button"
                    target="_blank"
                >
                    GITHUB
                </a>
                <div className="wrapper">
                    <StackerSlider
                        className={"custom-slider"}
                        dots={true}
                        infiniteLoop={true}
                        onChange={this.onChangeHandler}
                        onPrevChange={this.onPrevChangeHandler}
                        onNextChange={this.onNextChangeHandler}
                    >
                        <StackerSlide className="custom-slide">
                            <SlideEntry src="https://images.unsplash.com/photo-1528120369764-0423708119ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80">
                                Slide 6/6
                            </SlideEntry>
                        </StackerSlide>
                        <StackerSlide>
                            <SlideEntry src="https://images.unsplash.com/photo-1517374096549-0b818e3de484?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80">
                                Slide 5/6
                            </SlideEntry>
                        </StackerSlide>
                        <StackerSlide>
                            <SlideEntry src="https://images.unsplash.com/photo-1541182311535-f31f1aa15d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80">
                                Slide 4/6
                            </SlideEntry>
                        </StackerSlide>
                        <StackerSlide>
                            <SlideEntry src="https://images.unsplash.com/photo-1534541913055-d4064a68b214?ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80">
                                Slide 3/6
                            </SlideEntry>
                        </StackerSlide>

                        <StackerSlide>
                            <SlideEntry src="https://images.unsplash.com/photo-1532462485347-6cb892522cad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80">
                                Slide 2/6
                            </SlideEntry>
                        </StackerSlide>
                        <StackerSlide className="custom-slide">
                            <SlideEntry src="https://images.unsplash.com/photo-1536852900145-17fbc5115892?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80">
                                Slide 1/6
                            </SlideEntry>
                        </StackerSlide>
                    </StackerSlider>
                </div>
                <footer>
                    <span className="footer-content">
                        Released under the MIT License <br /> Copyright © 2018 Dmitry Morozoff
                    </span>
                </footer>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
