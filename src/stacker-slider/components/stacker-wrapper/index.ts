import styled from "styled-components";

interface IStackerWrapperProps {
    slideWidth?: string;
    slideHeight?: string;
}

export const StackerWrapper = styled.div`
    height: ${(props: IStackerWrapperProps) => props.slideHeight};
    width: ${(props: IStackerWrapperProps) => props.slideWidth};
    padding: 40px;
    perspective: 1000px;
    transition: ease-in-out 0.2s;
    box-sizing: border-box;
    position: relative;
`;
