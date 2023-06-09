import styled from "styled-components";
import React from "react";
import MockUpImage from '@/public/images/mock_image.png'
import Image from "next/image";

const StyledPageCard = styled.div`
   box-shadow: 0 10px 40px #c3d0e2b3;
   border-radius: 8px;
   cursor: pointer;
   width: 100%;
   img{
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0px 0;
   }
   & + &{
    margin-left: 2rem;
   }
   .contents{
       padding: 1rem;
       padding-top: .5rem;
       .title{
        font-size: 1.25rem;
        font-weight: bold;
       }
       .instructor{
        color: ${({theme}) => theme.color.grey2};
       }
       .price{
        margin-top: .5rem;
       }
   }
`

type CardProps = {
    children?: React.ReactNode;
    title: string,
    amount: number,
    instructor: string,
};


const PageCard = (props: CardProps) => {
    return (
        <StyledPageCard className="course">
            <Image src={MockUpImage} alt={'mock-up-image'}></Image>
            <div className='contents'>
                <div className='title'>
                    {props.title}
                </div>
                <div className='instructor'>
                    {props.instructor}
                </div>
                <div className='price'>
                    <b>PCT {props.amount}</b>
                </div>
            </div>
        </StyledPageCard>
    )
}

export default PageCard;
