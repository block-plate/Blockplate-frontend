import styled from "styled-components";
import HomeLayout from "@/components/layout/home-layout";
import Responsive from "@/components/common/responsive";
import Image from "next/image";
import CourseImage from '@/public/images/mock_image.png';
import PaymentView from "@/components/course/payment_view";
import ReviewList from "@/components/course/review_list";
import LectureList from "@/components/course/lecture_list";
import {Rating} from "semantic-ui-react";
import {useRouter} from "next/router";
import {useGetCourseQuery, useGetCoursesByUserQuery, useGetCoursesQuery} from "@/services/course";
import {wrapper} from "@/features";
import {isAuthenticationServerSide} from "@/utils/authentication";
import {useSelector} from "react-redux";
import {selectGlobalData} from "@/features/global";
import {marked} from "marked";

const StyledCourseDetail = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .course-side{
    flex: 1;
    margin-right: 1rem;
  }
  .course-info{
    .title{
      font-size: 2rem;
      font-weight: bold;
      line-height: 39px;
      margin-bottom: 1rem;
    }
    margin-bottom: 1rem;
  }
  .course-header{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    .title{
      font-size: 2rem;
      font-weight: bold;
      line-height: 39px;
    }
    .description{
      margin-left: .5rem;
      color: ${({theme}) => theme.color.grey2};
      font-size: 1.25rem;
      line-height: 2rem;
    }
  }
  }
`

export const StyledCourseBanner = styled.div`
  background-color: #04123A;
  min-height: 400px;
  display: flex;
  align-items: center;
`
export const StyledBannerContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  img{
    //height: 70%;
    width: auto;
    height: 300px;
    border-radius: 8px;
  }
  .content{
    //height: 100%;
    height: 50%;
    display: flex;
    color: white;
    align-items: flex-start;
    margin-left: 1rem;
    padding: 1rem;
    flex-direction: column;
    .title{
      font-size: 2rem;
      font-weight: bold;
      line-height: 32px;
    }
    .description{
      color: rgba(255, 255, 255, 0.7);
    }
    .author{
      margin-top: .75rem;
      color: rgba(255, 255, 255, 0.7);
      font-size: 1.25rem;
    }
    .rating-container{
      margin-top: .75rem;
      display: flex;
      align-items: center;
      b{
        margin-left: .25rem;
      }
    }
    .tag-list{
      display: flex;
      flex-direction: row;
      margin-top: .5rem;
      .tag + .tag{
        margin-left: .5rem;
      }
      .tag{
        padding: .5rem 1rem;
        border-radius: 16px;
        background-color: rgba(255, 255, 255, .15);
      }
    }
  }
  
`

type CourseDetailPageProps = {
    course_id: string;
}
const CourseDetailPage = (props: CourseDetailPageProps) => {
    const {userInfo} = useSelector(selectGlobalData);
    const router = useRouter();
    const {data, isLoading, isSuccess} = useGetCourseQuery({course_id: props.course_id});
    const {data: coursesByUser} = useGetCoursesByUserQuery({user_id: userInfo.user_id});

    const isSpend = coursesByUser?.result.find(course => course.course_id === props.course_id) !== undefined;
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
                                <b>(4.6)</b>
                            </div>
                            <div className="tag-list">
                                {
                                    data.result.tags.split(',').map((tag, i) => {
                                        return (
                                            <div className="tag" key={`tag_${i}`}>
                                                {tag}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </StyledBannerContent>
                </Responsive>
            </StyledCourseBanner>
            <Responsive>
                <StyledCourseDetail>
                    <div className="course-side">
                        <div className='course-info'>
                            <div className="title">
                                강의 소개
                            </div>
                            <div dangerouslySetInnerHTML={{__html: result}}>

                            </div>
                        </div>
                        <LectureList isSpend={isSpend} course={data.result} lectures={data.result.lectures}></LectureList>
                        <ReviewList reviews={data.result.reviews}></ReviewList>
                    </div>
                    {!isSpend && <PaymentView course={data.result}></PaymentView>}
                </StyledCourseDetail>
            </Responsive>
        </HomeLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
    try{
        await isAuthenticationServerSide(store, ctx);
    } catch (e){
        console.log(e);
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            }
        }
    }

    return {
        props: {course_id: ctx.query.course_id,},
    }
});

export default CourseDetailPage;