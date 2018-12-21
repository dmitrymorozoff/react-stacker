import * as React from "react";
import styled from "styled-components";

interface IStackerPaginationProps {
    activeSlide: number;
    countSlides: number;
    className?: string;
    dotsColor?: string;
    dotsActiveColor?: string;
    dotsSize?: string;
    dotsPadding?: string;
}

interface IStackerBulletProps {
    isActive: boolean;
    dotsColor?: string;
    dotsActiveColor?: string;
    dotsSize?: string;
    dotsPadding?: string;
}

const StackerBullet = styled.div`
    width: ${(props: IStackerBulletProps) => props.dotsSize};
    height: ${(props: IStackerBulletProps) => props.dotsSize};
    border-radius: 50%;
    background-color: ${(props: IStackerBulletProps) =>
        props.isActive ? props.dotsActiveColor : props.dotsColor};
    margin: 0 ${(props: IStackerBulletProps) => props.dotsPadding};
    transition: 0.4s;
`;

const StackerPaginationWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 250;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%) rotate(180deg);
`;

export class StackerPagination extends React.Component<IStackerPaginationProps, {}> {
    public getBullets = () => {
        const {
            countSlides,
            activeSlide,
            dotsColor,
            dotsActiveColor,
            dotsSize,
            dotsPadding,
        } = this.props;
        const bullets = [];
        for (let i = 0; i < countSlides; i++) {
            const isActiveSlide = i === activeSlide;
            bullets.push(
                <StackerBullet
                    isActive={isActiveSlide}
                    key={i.toString()}
                    dotsColor={dotsColor}
                    dotsActiveColor={dotsActiveColor}
                    dotsSize={dotsSize}
                    dotsPadding={dotsPadding}
                />,
            );
        }
        return bullets;
    };

    public render() {
        return (
            <StackerPaginationWrapper {...this.props}>{this.getBullets()}</StackerPaginationWrapper>
        );
    }
}
