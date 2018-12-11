import * as React from "react";
import styled from "styled-components";

export interface ISlideProps {
    isSlide: boolean;
    setRef: (ref: HTMLElement) => void | null;
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
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

StyledSlide.overwriteStyles = true;

export class StackSlide extends React.Component<ISlideProps, {}> {
    public static defaultProps: Partial<ISlideProps> = {
        isSlide: true,
    };

    public render() {
        const { setRef } = this.props;
        return (
            <StyledSlide
                ref={(ref: HTMLElement) => {
                    if (!setRef) {
                        return;
                    }
                    setRef(ref);
                }}
                {...this.props}
            />
        );
    }
}
