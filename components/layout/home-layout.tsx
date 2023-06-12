import styled from "styled-components";
import React from "react";
import PageHeader from "@/components/common/page-header";
import PageFooter from "@/components/common/page-footer";

const StyledHomeLayout = styled.div`
  display: flex;
  //height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`

type HomeLayoutProps = {
    children: React.ReactNode;
};

const HomeLayout = (props: HomeLayoutProps) => {
    return (
        <StyledHomeLayout>
            <PageHeader/>
            {props.children}
            <PageFooter></PageFooter>
        </StyledHomeLayout>
    )
}

export default HomeLayout;
