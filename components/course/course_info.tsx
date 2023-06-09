import styled from "styled-components";

const StyledCourseInfo = styled.div`
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
    
`

const CourseInfo = () => {
    return (
        <StyledCourseInfo>
            <div className="course-header">
                <div className="title">
                    코스 소개
                </div>
            </div>

        </StyledCourseInfo>
    )
}

export default CourseInfo;