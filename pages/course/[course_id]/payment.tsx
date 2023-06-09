import styled from "styled-components";
import HomeLayout from "@/components/layout/home-layout";
import {wrapper} from "@/features";
import {isAuthenticationServerSide} from "@/utils/authentication";
import Responsive from "@/components/common/responsive";
import {Form, Input} from "semantic-ui-react";

const StyledPayment = styled.div`
  padding: 1rem 0;

`

const Payment = () => {
    return (
        <StyledPayment>
            <h1>결제하기</h1>
            <h3>
                판매자 정보
            </h3>
            <Form>
                <Form.Field>
                    <label>지갑 주소</label>
                    <Input disabled> </Input>
                </Form.Field>
            </Form>
        </StyledPayment>
    )
}

Payment.getLayout = (page: any) => {
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

export default Payment;