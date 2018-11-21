import * as React from "react";
import * as ReactDOM from "react-dom";
import { StackCarousel } from "../src";

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="outer">
                <StackCarousel />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
