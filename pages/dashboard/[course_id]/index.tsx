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

const StyledMyCourse = styled.div`
  padding: 2rem 0;
`;

type MyCourseProps = {
    course_id: string;
}

const MyCourse = (props: MyCourseProps) => {
    const {data, isLoading, isSuccess} = useGetCourseQuery({course_id: props.course_id});

    if(isLoading || !isSuccess) return <></>;

    return (
        <HomeLayout>
            <StyledCourseBanner>
                <Responsive>
                    <StyledBannerContent>
                        <Image src={CourseImage} alt={''}></Image>
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
                                <b>(4.6)</b>
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
                    <LectureList isInstructor lectures={data.result.lectures} course={data.result}></LectureList>
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
