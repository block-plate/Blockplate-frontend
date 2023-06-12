import styled from "styled-components";
import {useRouter} from "next/router";
import {useGetCourseQuery} from "@/services/course";
import HomeLayout from "@/components/layout/home-layout";
import Responsive from "@/components/common/responsive";
import Image from "next/image";
import CourseImage from "@/public/images/mock_image.png";
import {Rating} from "semantic-ui-react";
import LectureList from "@/components/course/lecture_list";
import ReviewList from "@/components/course/review_list";
import PaymentView from "@/components/course/payment_view";
import {StyledBannerContent, StyledCourseBanner} from "@/pages/course/[course_id]";
import {wrapper} from "@/features";
import {isAuthenticationServerSide} from "@/utils/authentication";
import {marked} from 'marked'

const StyledMyCourse = styled.div`
  padding: 2rem 0;
  .course-info{
    .title{
      font-size: 2rem;
      font-weight: bold;
      line-height: 39px;
      margin-bottom: 1rem;
    }
    margin-bottom: 1rem;
  }
`;

type MyCourseProps = {
    course_id: string;
}

const MyCourse = (props: MyCourseProps) => {
    const {data, isLoading, isSuccess} = useGetCourseQuery({course_id: props.course_id});

    if(isLoading || !isSuccess) return <></>;


    const result = marked(data.result.data);
    return (
        <HomeLayout>
            <StyledCourseBanner>
                <Responsive>
                    <StyledBannerContent>
                        <img src={data.result.image} alt={''}></img>
                        <div className='content'>
                            <div className='title'>
                                {data.result.title}
                            </div>
                            <div className='description'>
                                {data.result.description}
                            </div>
                            <div className='author'>
                                {data.result.instructor?.name}
                            </div>
                            <div className="rating-container">
                                <Rating icon='star' defaultRating={5} maxRating={5} disabled className="rating"/>
                                <b>(0.0)</b>
                            </div>
                            <div className="tag-list">
                                <div className="tag">
                                    웹앱
                                </div>
                                <div className="tag">
                                    블록체인
                                </div>
                                <div className="tag">
                                    NFT
                                </div>
                            </div>
                        </div>
                    </StyledBannerContent>
                </Responsive>
            </StyledCourseBanner>
            <Responsive>
                <StyledMyCourse>
                    <div className='course-info'>
                        <div className="title">
                            강의 소개
                        </div>
                        <div dangerouslySetInnerHTML={{__html: result}}>

                        </div>
                    </div>
                    <LectureList isSpend={true} isInstructor lectures={data.result.lectures} course={data.result}></LectureList>
                </StyledMyCourse>
            </Responsive>
        </HomeLayout>
    )
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
    try{
        await isAuthenticationServerSide(store, ctx);
    } catch (e){
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            }
        }
    }

    return {
        props: {
            course_id: ctx.query.course_id,
        }
    }
});

export default MyCourse;
