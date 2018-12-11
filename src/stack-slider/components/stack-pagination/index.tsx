import * as React from "react";
import styled from "styled-components";

interface IStackPaginationProps {
    activeSlide: number;
    countSlides: number;
}

interface IStackBulletProps {
    isActive: boolean;
}

const StackBullet = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props: IStackBulletProps) => (props.isActive ? "#2175fa" : "#ccc")};
    margin: 0 4px;
`;

const StackPaginationWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    width: 100%;
    left: 0;
    bottom: 20px;
    transform: rotate(180deg);
`;

export class StackPagination extends React.Component<IStackPaginationProps, {}> {
    public getBullets = () => {
        const { countSlides, activeSlide } = this.props;
        const bullets = [];
        for (let i = 0; i < countSlides; i++) {
            const isActiveSlide = i === activeSlide;
            bullets.push(<StackBullet isActive={isActiveSlide} key={i.toString()} />);
        }
        return bullets;
    };

    public render() {
        return <StackPaginationWrapper>{this.getBullets()}</StackPaginationWrapper>;
    }
}
