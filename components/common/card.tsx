import styled from "styled-components";
import React from "react";
import MockUpImage from '@/public/images/mock_image.png'
import Image from "next/image";
import {Course} from "@/types/course/course";

const StyledPageCard = styled.div`
   box-shadow: 0 10px 40px #c3d0e2b3;
   border-radius: 8px;
   cursor: pointer;
   width: 100%;
   img{
    width: 100%;
    height: 180px;
    object-fit: cover;
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
    course: Course,
};


const PageCard = (props: CardProps) => {
    return (
        <StyledPageCard className="course">
            <img src={props.course.image} alt={'mock-up-image'}></img>
            <div className='contents'>
                <div className='title'>
                    {props.course.title}
                </div>
                <div className='instructor'>
                    {props.course.instructor.name}
                </div>
                <div className='price'>
                    <b>PCT {props.course.amount}</b>
                </div>
            </div>
        </StyledPageCard>
    )
}

export default PageCard;
