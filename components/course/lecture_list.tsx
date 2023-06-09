import styled from "styled-components";
import Image from "next/image";
import TimeIcon from "@/public/icons/time.svg";
import {Lecture} from "@/types/lecture/lecture";
import {Button} from "semantic-ui-react";
import Link from "next/link";
import {Course, CourseDetail} from "@/types/course/course";

const StyledLectureList = styled.div`
    .course-header{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        & > div{
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
    .course-list{
        margin-top: 1rem;
        margin-bottom: 1rem;
        .section{
          font-weight: bold;
          background-color: #F6F8FB;
          border: 1px solid #E4E8EF;
          padding: 15px 20px;
        }
        .lecture{
          display: flex;
          align-items: center;
          padding: 15px 18px;
          border: 1px solid ${({theme}) => theme.color.grey3};
          border-top: none;
          img{
            margin-right: 5px;
          }
    }
    
`
type LectureListProps = {
    lectures: Lecture[],
    isInstructor?: boolean,
    course: CourseDetail,
}
const LectureList = (props: LectureListProps) => {
    const groups = Array.from(new Set(props.lectures.map(l => l.group))).map(group => {
        return {
            name: group,
            lectures: props.lectures?.filter(lecture => lecture.group === group)
        }
    })

    const groupList = groups.map((group, idx ) => {
        return (
            <div key={`group_${idx}`}>
                <div className="section">
                    {group.name}
                </div>
                {
                    group.lectures.map(lecture => {
                        const {title, lecture_id, course_id} = lecture
                        return (
                            <Link href={`/course/${course_id}/lecture/${lecture_id}`} key={lecture_id}>
                                <div className="lecture" >
                                    <Image src={TimeIcon} alt={'time-icon'}></Image>
                                    <div>
                                        {title}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        )
    })
    return (
        <StyledLectureList>
            <div className="course-header">
                <div>
                    <div className="title">
                        커리큘럼
                    </div>
                    <div className="description">
                        총 {props.lectures.length}개 4시 10분의 수업
                    </div>
                </div>
                {props.isInstructor && <Link href={`/editor/${props.course.course_id}/`}>
                    <Button secondary>강의 추가</Button>
                </Link>}
            </div>
            <div className="course-list">
                {groupList}
            </div>
        </StyledLectureList>
    )
}

export default LectureList;