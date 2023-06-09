import styled from "styled-components";
import {useGetLectureQuery, useGetLecturesQuery} from "@/services/lecture";
import {Icon} from "semantic-ui-react";
import Link from "next/link";

const StyledLecture = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  main{
    flex:1;
    height: 100%;
      header{
        padding: 2rem;
        border: 1px solid ${({theme}) => theme.color.grey2};
        border-right: none;
        font-size: 1.5rem;
        font-weight: bold;
        i{
          margin-right: 1rem;
        }
      }
      section{
        padding: 2rem;
        box-sizing: border-box;
        height: calc(100% - 10rem);
      }
  }
  
  .lecture-list{
    width: 300px;
    border: 1px solid ${({theme}) => theme.color.grey2}; 
    display: flex;
    flex-direction: column;
    .course-title{
      padding: 2rem 2rem;
      font-size: 1.5rem;
      font-weight: bold;
    }
    
  }
`;

const StyledLectureItem = styled.div<{selected: boolean}>`
  padding: 1rem 2rem;
  cursor: pointer;
  &:hover{
    background-color: ${({theme}) => theme.color.grey4}
  }
  .lecture{
      color: black;
       cursor: pointer;
      // border-bottom: 1px solid ${({theme}) => theme.color.grey2}; ;
      i{
      margin-right: 1rem;
      }
      span + span{ 
        color: ${({theme}) => theme.color.grey2};
        margin-left: 2rem;
      }
    }
    .lecture:hover{
      
   }
`
type LectureProps = {
    course_id: string;
    lecture_id: string;
}

const Lecture = (props: LectureProps) => {
    const {data: lecture, isLoading:isLectureLoading, isSuccess} = useGetLectureQuery({lecture_id: props.lecture_id});
    const {data: lectures} = useGetLecturesQuery({course_id: props.course_id});

    if(isLectureLoading || !isSuccess){
        return <div></div>
    }

    const youtubeID = (url: string) => {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        if(url) {
            let matchs = url.match(regExp);
            return matchs ? matchs[7] : false;
        }
    }

    const lectureList = lectures?.result.map(lecture => {
        const {title, lecture_id} = lecture;
        return (
            <StyledLectureItem key={`lecture_${lecture_id}`} selected={lecture_id === props.lecture_id}>
                <Link href={`/course/${props.course_id}/lecture/${lecture_id}`} className="lecture">
                    <Icon name={"video"}></Icon>
                    <span>
                     {title}
                </span>
                    <span>
                     02:04
                </span>
                </Link>
            </StyledLectureItem>
        )
    })

    return (
        <StyledLecture>
            <main>
                <header>
                    <Link href={`/course/${props.course_id}/`}><Icon name="arrow left"></Icon></Link>
                    {lecture.result.title}
                </header>
                <section>
                    {
                        youtubeID(lecture.result.url) ? (
                            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${youtubeID(lecture.result.url) as string}`}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen></iframe>
                        ) : <div></div>
                    }

                </section>
            </main>
            <div className="lecture-list">
                <div className="course-title">
                    강의 목록
                </div>
                {lectureList}
            </div>
        </StyledLecture>
    )
}

export async function getServerSideProps(context: any) {
    return {
        props: {
            course_id: context.query.course_id,
            lecture_id: context.query.lecture_id,
        }
    }
}


export default Lecture;
