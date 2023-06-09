import React from 'react';
import Image from "next/image";
import serviceLogo from "../../public/images/logo.svg";
import styled from "styled-components";
import Link from "next/link";

type AuthLayoutProps = {
    children: React.ReactNode;
};

const StyledAppLayout = styled.div`
  height: 100vh;
  width: 100%;
  margin-top: -40px;
  ${({theme}) => theme.flex.center};

  .box {
    border-radius: 30px;
    margin-top: 22px;
    box-shadow: 0 10px 40px #c3d0e2b3;
    padding: 42px;
    background-color: white;
    overflow-y: scroll;
    max-height: 80%;
  }
  .footer{
    z-index: -10;
    position:  absolute;
    width: 100%;
    background-color: #191080;
    height: 350px;
    left: 0;
    bottom: 0;
  }
`

function AuthLayout({children}: AuthLayoutProps) {
    return (
        <StyledAppLayout>
            <Link href="/auth/login">
                <Image src={serviceLogo} className='logo' alt='' width='268'/>
            </Link>
            <div className='box'>
                {children}
            </div>
            <div className="footer"></div>
        </StyledAppLayout>
    );
}

export default AuthLayout;
