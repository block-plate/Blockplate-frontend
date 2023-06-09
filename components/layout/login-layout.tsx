import styled from "styled-components";
import Image from "next/image";
import loginIllust from "../../public/images/illust.svg"
import React from "react";

const StyledLoginLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .image-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    #login-illust {
        width: 489px;
        height: 320px;
        margin-bottom: 50px;
    }
  }
`

type LoginLayoutProps = {
    children: React.ReactNode;
};

export default function LoginLayout({children}: LoginLayoutProps) {
    return (
        <StyledLoginLayout>
            <div className="image-container">
                <Image id="login-illust" src={loginIllust} alt=''/>
            </div>
            {children}
        </StyledLoginLayout>
    )
}
