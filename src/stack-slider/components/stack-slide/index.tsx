import * as React from "react";
import styled from "styled-components";

export interface ISlideProps {
    isSlide: boolean;
    translateX: number | null;
    translateY: number | null;
    translateZ: number | null;
}

const StyledSlide: any = styled.div`
    user-select: none;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: #fcfcfc;
    transform-style: preserve-3d;
    text-align: center;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 3px;
    transform: translateZ(${(props: ISlideProps) => props.translateZ}px)
        translateY(${(props: ISlideProps) => props.translateY}px)
        translateX(${(props: ISlideProps) => props.translateX}px);
`;

export class StackSlide extends React.Component<ISlideProps, {}> {
    public static defaultProps: Partial<ISlideProps> = {
        isSlide: true,
    };

    public render() {
        return <StyledSlide {...this.props} />;
    }
}
