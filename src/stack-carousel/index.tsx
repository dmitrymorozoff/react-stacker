import * as React from "react";
import { StackWrapper } from "./components/stack-wrapper";

interface IProps {
    zDistance: number;
    yDistance: number;
}

export class StackCarousel extends React.PureComponent<IProps, {}> {
    public static defaultProps: Partial<IProps> = {
        zDistance: 50,
        yDistance: 10,
    };

    public getEnhanceChildrens = () => {
        const { children, zDistance, yDistance } = this.props;
        let currentYDistance = 0;
        let currentZDistance = 0;
        const childrenArray: any = React.Children.toArray(children);
        const childrenWithProps: any = [];
        for (let i = childrenArray.length - 1; i >= 0; i--) {
            const slide = React.cloneElement(childrenArray[i], {
                zDistance: currentZDistance,
                yDistance: currentYDistance,
            });
            childrenWithProps[i] = slide;
            currentYDistance += yDistance;
            currentZDistance -= zDistance;
        }
        return childrenWithProps;
    };

    public render() {
        return <StackWrapper>{this.getEnhanceChildrens()}</StackWrapper>;
    }
}
