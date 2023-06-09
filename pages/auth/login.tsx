import styled from "styled-components";
import SigninLayout from "@/components/layout/login-layout";
import LoginLayout from "@/components/layout/login-layout";
import AuthLayout from "@/components/layout/auth-layout";
import {Button, Form, Input} from "semantic-ui-react";
import NextLink from "next/link";
import React, {useEffect, useState} from "react";
import {useSignInMutation} from "@/services/auth";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const StyledLogin = styled.div`
    display: flex;
    flex-direction: column;
    .input-container{
      width: 328px;
    }
    .form{
        button + button{
          margin-top: 1rem;
        }
    }
    .link{
      text-align: center;
      margin-top: 1rem;
      text-decoration : underline;
    }
`;

const LoginPage = () => {
    const [email, setEmail] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [signIn, signInResponse] = useSignInMutation();
    const router = useRouter();

    useEffect(() => {
        if(signInResponse.isSuccess){
            toast.success("로그인에 성공했습니다.")
            router.push('/');
        }
    }, [signInResponse]);

    const onClickLogin = async () => {
        await signIn({
            email,
            pwd
        })
    };

    return (
        <LoginLayout>
            <AuthLayout>
                <StyledLogin>
                    <Form className='form'>
                        <Form.Field>
                            <label>아이디</label>
                            <Input
                                placeholder='아이디를 입력해주세요'
                                onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Field>
                        <Form.Field className="input-container">
                            <label>비밀번호</label>
                            <Input
                                type="password"
                                placeholder='비밀번호를 입력해주세요'
                                onChange={(e) => setPwd(e.target.value)}
                            />
                        </Form.Field>
                        <Button fluid type='submit' primary onClick={() => onClickLogin()}>로그인</Button>
                        <Button fluid type='submit' secondary>카카오로 로그인</Button>
                    </Form>
                    <NextLink href='/auth/register' className="link" >신규 유저 회원가입</NextLink>
                </StyledLogin>
            </AuthLayout>
        </LoginLayout>
    )
}

export default LoginPage;