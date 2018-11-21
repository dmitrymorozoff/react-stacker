import * as React from "react";
import { StackWrapper } from "./components/stack-wrapper";

interface IProps {
    size?: number;
}

export class StackCarousel extends React.PureComponent<IProps, {}> {
    public static defaultProps: Partial<IProps> = {
        size: 200,
    };
    public render() {
        return <StackWrapper>Stack Carousel</StackWrapper>;
    }
}
