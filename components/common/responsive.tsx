import styled from 'styled-components';
import React from "react";

const ResponsiveBlock = styled.div`
    padding-left : 1rem;
    padding-right : 1rem;
    width: 1024px;
    margin : 0 auto;
    height: 100%;
    @media(max-width: 1024px){
        width : 768px;
    }
    @media(max-width: 768px){
        width: 100%;
    }
`;

type ResponsiveProps = {
    children: React.ReactNode;
    className?: string;
};


const Responsive = ({children, ...rest}: ResponsiveProps) => {
    return (
        <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
    )
}

export default Responsive;