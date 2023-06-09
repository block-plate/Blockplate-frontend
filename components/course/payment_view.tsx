import styled from "styled-components";
import {Button, Form, Input} from "semantic-ui-react";
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {CourseDetail} from "@/types/course/course";
import {useCreatePaymentMutation, useGetPaymentsByUserQuery} from "@/services/payment";
import {useSelector} from "react-redux";
import {selectGlobalData} from "@/features/global";
import {toast} from "react-toastify";

const StyledPaymentView = styled.div`
   border-radius: 4px;
   border: 1px solid ${({theme}) => theme.color.grey3};
   width: 300px;
   box-sizing: border-box;
   padding: 1.5rem;
   position: sticky;
   top: 1rem;
   .amount{
    font-size: 2rem;
    font-weight: bold;
    
   }
   .amount-kr{
    margin-bottom: 1rem;
    margin-top: .5rem;
    color: ${({theme}) => theme.color.grey2};
   }
   .info{
    padding-inline-start: 20px;
    margin-top: 1rem;
   }
`;

type PaymentViewProps = {
    course: CourseDetail
};

const PaymentView = (props: PaymentViewProps) => {
    const txRef = useRef<HTMLInputElement>(null);
    const {userInfo} = useSelector(selectGlobalData);
    const [createPayment, createPaymentResponse] = useCreatePaymentMutation();
    const {data: payments} = useGetPaymentsByUserQuery({user_id: userInfo.user_id});
    const [isPendingPayment, setIsPendingPayment] = useState(false);

    const [tx, setTx] = useState<string>('');
    const [account, setAccount] = useState<string>('');
    const onClickApply = () => {
        window.postMessage({target: 'platechain'})
        setIsPendingPayment(true);
    }
    console.log(userInfo.user_id);
    const onPaymentCourse = () => {
        if(txRef.current){
            if(txRef.current.value !== ''){
                createPayment({
                    user_id: userInfo.user_id,
                    course_id: props.course.course_id,
                    tx_id: txRef.current.value,
                })
            }else{
                toast.warn('결제를 완료하지않았습니다.')
            }
        }
        else{
            toast.warn('결제를 완료하지않았습니다!')
        }
    }

    const status = payments?.result.find(payment => payment.course_id === props.course.course_id);



    useEffect(() => {
        if( createPaymentResponse.isSuccess ){
            toast.success('결제 정보 전송이 완료되었습니다');
        }
    }, [createPaymentResponse])


    return (
        <StyledPaymentView>
            <div className="amount">
                {props.course.amount} PTC
            </div>
            <div className="amount-kr">
                25,000원
            </div>
            {
                status ? !isPendingPayment && <Button primary disabled fluid onClick={() => onClickApply()}>
                    결제 대기중
                </Button> : !isPendingPayment && <Button primary fluid onClick={() => onClickApply()}>
                    수강 신청하기
                </Button>
            }
            {
                isPendingPayment && (
                    <Form>
                        <Form.Field>

                            <label>판매자 지갑 주소</label>
                            <Input id="account" fluid disabled value={props.course.instructor.account}></Input>
                        </Form.Field>
                        <Form.Field>
                            <label>트랜잭션</label>
                            <input ref={txRef} id='transaction' onChange={(e) => setTx(e.target.value)}/>
                            {/*<Input ref={txRef} id="transaction" fluid ></Input>*/}
                        </Form.Field>
                        <Button primary fluid onClick={() => onPaymentCourse()}>
                            송금 완료
                        </Button>
                    </Form>
                )
            }
            <ul className="info">
                <li>채굴 환급금액: <b>15000PTC</b></li>
                <li>총 학습시간: 4시간 10분</li>
            </ul>
        </StyledPaymentView>
    );
}

export default PaymentView;