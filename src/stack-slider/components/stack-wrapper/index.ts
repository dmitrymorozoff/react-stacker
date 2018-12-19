import styled from "styled-components";

interface IStackWrapperProps {
    slideWidth?: string;
    slideHeight?: string;
}

export const StackWrapper = styled.div`
    height: ${(props: IStackWrapperProps) => props.slideHeight};
    width: ${(props: IStackWrapperProps) => props.slideWidth};
    padding: 40px;
    perspective: 1000px;
    transition: ease-in-out 0.2s;
    box-sizing: border-box;
    position: relative;
`;
