import styled from "styled-components";

export const StackSlide = styled.div`
    user-select: none;
    position: absolute;
    height: 280px;
    width: 240px;
    background: #fcfcfc;
    transform-style: preserve-3d;
    text-align: center;
    border: 1px solid #ddd;
    box-sizing: border-box;
    border-radius: 3px;
    transform: ${(props: any) =>
        `translateZ(${props.zDistance}px) translateY(${
            props.yDistance
        }px) translateX(0px)`};
`;
