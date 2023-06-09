import styled from "styled-components";
import React from "react";
import {Header} from "semantic-ui-react";
import Responsive from "@/components/common/responsive";
import Image from "next/image";
import BannerImage from '@/public/images/banner.svg'

const StyledPageBanner = styled.div`
    //background: #84ADD3;
    background: linear-gradient(to right, blue, #84ADD3);
    height: 311px;
    display: flex;
    align-items: center;
    .header{
      
      color: white;
    }
    p{
      color: white;
    }
    .responsive{
      padding-top: 4rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      img{
        height: 80%;
      }
    }
`

type BannerProps = {
    children?: React.ReactNode;
};


const PageBanner = (props: BannerProps) => {
    return (
        <StyledPageBanner>
            <Responsive className='responsive'>
                <div className='banner'>
                    <Header as='h1'>
                        Javascript 와 Socket을 활용한<br/>
                        누구나 쉽게 배우는 블록체인 첫 걸음
                    </Header>
                    <p>
                        비전공자도 이해할 수 있는 블록체인 기초 강의
                    </p>
                </div>
                <Image src={BannerImage} alt={'banner image'}></Image>
            </Responsive>
        </StyledPageBanner>
    )
}

export default PageBanner;
