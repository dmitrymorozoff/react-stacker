import styled from "styled-components";

interface IProps {
    src: string;
}

export const SlideEntry = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props: IProps) => props.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 50px 30px;
    box-sizing: border-box;
    color: #fff;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 300;
    letter-spacing: 3px;
`;
