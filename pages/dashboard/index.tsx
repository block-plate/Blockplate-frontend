import styled from "styled-components";
import HomeLayout from "@/components/layout/home-layout";
import Responsive from "@/components/common/responsive";
import {useGetCoursesByInstructorQuery, useGetCoursesByUserQuery} from "@/services/course";
import {useGetProfileQuery} from "@/services/auth";
import PageCard from "@/components/common/card";
import {Button, Table, Label} from "semantic-ui-react";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectGlobalData} from "@/features/global";
import {wrapper} from "@/features";
import {isAuthenticationServerSide} from "@/utils/authentication";
import {useGetPaymentsByUserQuery} from "@/services/payment";
import moment from "moment";
import {useEffect} from "react";

const StyledDashboard = styled.div`
  .ui.table{
    margin-top: 1rem;
  }
  .sub-header{
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
  }
  .course-list{
    display: flex;
    flex-direction: row;
    
    .empty{
      display: flex;
      justify-content: center;
      font-size: 1.2rem;
      width: 100%;
      align-items: center;
      color: ${({theme}) => theme.color.grey2};
      min-height: 100px;
    }
    & > a{
      color: black;
      max-width: 25%;
      min-width: 25%;
      flex: 1;
      margin: .5rem;
    }
  }
  
  .payment-list{
    
  }
 
`


const Dashboard = () => {
    const {userInfo} = useSelector(selectGlobalData);
    const {data: courses, isLoading, isSuccess} = useGetCoursesByInstructorQuery({instructor_id: userInfo.user_id});
    const {data: coursesByUser, isLoading:isUserLoading, isSuccess:isUserSuccess } = useGetCoursesByUserQuery({user_id: userInfo.user_id});
    const {data: payments, isLoading:paymentLoading, isSuccess:paymentSuccess } = useGetPaymentsByUserQuery({user_id: userInfo.user_id});




    if(isLoading || isUserLoading) {
        return <div>
            로딩중
        </div>
    }

    if(!isSuccess || !isUserSuccess || !paymentSuccess) {
        return <div>
            로딩 실패
        </div>
    }


    const courseInstructorList = courses.result.map(course => {
        const {title, amount, course_id} = course;
        return (
            <Link key={`course_list_${course_id}`} href={`/dashboard/${course_id}/`}>
                <PageCard
                    key={`dashboard_${course_id}`}
                    title={title}
                    amount={amount}
                    instructor={userInfo.name ?? ''}>
                </PageCard>
            </Link>
        )
    });

    const courseUserList = coursesByUser.result.map(course => {
        const {title, amount, course_id, instructor: {name}} = course;
        return (
            <Link key={`course_list_${course_id}`} href={`/course/${course_id}/`}>
                <PageCard
                    key={`dashboard_${course_id}`}
                    title={title}
                    amount={amount}
                    instructor={name}>
                </PageCard>
            </Link>
        )
    });

    const statusLabel = (isSpend: boolean, amountError: boolean ) => {
        console.log(isSpend);
        if(isSpend){
            return (
                <Label color='blue' horizontal>
                    결제성공
                </Label>
            )
        }else if(amountError){
            return (
                <Label color='red' horizontal>
                    결제실패
                </Label>
            )
        }else{
            return(
                <Label color='grey' horizontal>
                    결제 대기중
                </Label>
            )
        }
    }

    const paymentList = payments.result.map(payment => {
        const {course_id, amount, created_at, amountError, isSpend } = payment;
        return (
            <Table.Row key={`course_id_${course_id}`} negative={amountError}>
                <Table.Cell>{course_id}</Table.Cell>
                <Table.Cell>{amount} PTC</Table.Cell>
                <Table.Cell>{moment(created_at).format('YYYY-MM-DD HH:mm:ss')}</Table.Cell>
                <Table.Cell>
                    {statusLabel(isSpend, amountError)}
                </Table.Cell>
            </Table.Row>
        )
    })


    return (
        <StyledDashboard>
            <div className="sub-header">
                <h1>내가 생성한 코스</h1>
                <Link href={'/editor/'}><Button secondary>코스 추가</Button></Link>
            </div>
            <div className="course-list">
                {courseInstructorList.length === 0 ? <div className='empty'>신청한 코스가 없습니다</div> : courseInstructorList}
            </div>
            <div className="sub-header">
                <h1>내가 신청한 코스</h1>
            </div>
            <div className="course-list">
                {courseUserList.length === 0 ? <div className='empty'>신청한 코스가 없습니다</div> : courseUserList}
            </div>
            <div className="sub-header">
                <h1>결제 내역</h1>
            </div>
            <div className="course-list">
                {paymentList.length === 0 ? <div className='empty'>결제내역이 없습니다</div>  : <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                코스 아이디
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                가격
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                결제일시
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                상태
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {paymentList}
                    </Table.Body>
                </Table>}
            </div>
        </StyledDashboard>
    )
}

Dashboard.getLayout = (page: any) => {
    return (
        <HomeLayout>
            <Responsive>
                {page}
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

        }
    }
});



export default Dashboard;