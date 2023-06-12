import styled from "styled-components";
import {Review} from "@/types/review/review";
import {Rating} from "semantic-ui-react";

const StyledReviewList = styled.div`
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
    
    .review-list{
      .review{
        border-bottom: 1px solid ${({theme}) => theme.color.grey3};
        padding: 1rem 0;
        .content{
          margin-top: 1rem;
        }
        .name{
          font-weight: bold;
          color: ${({theme}) => theme.color.grey2};
        }
      }
      
    }
    .empty{
        width: 100%;
        min-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.25rem;
        color: ${({theme}) => theme.color.grey2};
      }
    
`
type ReviewListProps = {
    reviews: Review[];
}
const ReviewList = (props: ReviewListProps) => {
    console.log(props.reviews)
    const reviewList = props.reviews?.map(review => {
        const {contents, review_id} = review;
        return (
            <div className="review" key={`review_id_${review_id}`}>
                <div className="rate">
                    <Rating icon='star' defaultRating={5} maxRating={5} disabled className="rating"/>
                    <b>(4.6)</b>
                </div>
                <div className="name">
                    이름
                </div>
                <div className="content">
                    {contents}
                </div>
            </div>
        )
    })
    return (
        <StyledReviewList>
            <div className="course-header">
                <div className="title">
                    리뷰목록
                </div>
                <div className="description">
                    {props.reviews.length} 개의 리뷰
                </div>
            </div>
            <div className="review-list">
                {reviewList.length === 0 ? <div className='empty'>아직 등록된 리뷰가 없습니다!</div> : reviewList}
            </div>
        </StyledReviewList>
    )
}

export default ReviewList;