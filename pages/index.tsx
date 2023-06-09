import styled from "styled-components";
import HomeLayout from "@/components/layout/home-layout";
import PageBanner from "@/components/home/banner";
import {Dimmer, Header, Loader, Segment} from "semantic-ui-react";
import Responsive from "@/components/common/responsive";
import PageCard from "@/components/common/card";
import Link from "next/link";
import {useGetCoursesQuery} from "@/services/course";
import {NextPageContext} from "next";
import AppRouter from "next/dist/client/components/app-router";
import {NextRouter} from "next/router";
import cookies from 'next-cookies'
import {wrapper} from "@/features";
import {isAuthenticationServerSide} from "@/utils/authentication";
import {useEffect} from "react";


const StyledHome = styled.div`
  h1{
    margin-top: 2rem;
    margin-left: .5rem;
  }
  .main-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    a{
      color: black;
      max-width: calc(25% - 1em);
      min-width: calc(25% - 1rem);
      flex: 1;
      margin: .5rem;
    }
    
  }
`
type HomePageProps = {
    Authentication: any;
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
        props: {},
    }
});

const HomePage = (props: HomePageProps) => {
    const {data, isLoading} = useGetCoursesQuery();

    useEffect(() => {
        // @ts-ignore
        window.addEventListener('message', (m) => {
            console.log("실행!", m);
        })

    }, [])

    const loading = () => {
        return (
            <Segment style={{height: 204, border: 'none'}}>
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
                {/*<Image src='/images/wireframe/short-paragraph.png' />*/}
            </Segment>
        )
    }

    const courseList = data?.result.map(course => {
        const {course_id, title, amount, instructor: {name}} = course
        return (
            <Link href={`/course/${course_id}`} key={course_id}>
                <PageCard
                    title={title}
                    amount={amount}
                    instructor={name}
                ></PageCard>
            </Link>
        )
    })
    return (
        <HomeLayout>
            <PageBanner></PageBanner>
            <Responsive>
                <StyledHome>
                    <h1>강의 목록</h1>
                    <div className='main-list'>
                        {isLoading ? loading() : courseList}
                    </div>
                </StyledHome>
            </Responsive>
        </HomeLayout>
    )
}


export default HomePage;