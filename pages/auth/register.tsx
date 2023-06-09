import styled from "styled-components";
import NextLink from "next/link";
import React from "react";
import {Button, Checkbox, Divider, Form, Header, Input} from "semantic-ui-react";
import AuthLayout from "@/components/layout/auth-layout";
import useSignup from "@/hooks/use-signup";

const RegisterFormStyled = styled.div`
  width: 544px;
  padding: 10px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .title {
    margin-bottom: 52px;
  }

  .validation-container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 24px;

    .checkbox + .checkbox {
      margin-top: 3.5px;
    }
  }

  .agree-container {
    margin-top: 52px;
    .checkbox-row{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .checkbox-row + .checkbox-row {
      margin-top: 12px;
    }
    
    
  }

  .button {
    margin-top: 54px;
  }

  & > .link {
    margin-top: 14px;
  }
  
  .login-link{
    margin-top: 1rem;
    text-decoration : underline;
    text-align: center;
  }
  .space{
    height: 1rem;
  }
`

function SignUpPage() {
    const {
        onClickSignup,
        onChangeInput,
        onClickTermAgreeAll,
        termAgree,
        onClickTermAgree,
        termAgreeAll,
        numberValidate,
        lengthValidate,
        lowercaseValidate,
        uppercaseValidate,
        specialValidate,
        isButtonDisabled,
        isPasswordError
    } = useSignup();

    return (
        <AuthLayout>
            <RegisterFormStyled>
                <Header as='h1' textAlign='center'>회원가입</Header>
                <Form.Field>
                    <label>블록체인 지갑</label>
                    <Form.Input  onChange={onChangeInput} fluid name="account" icon="check circle"></Form.Input>
                </Form.Field>
                <div className="space"></div>
                <Form.Field>
                    <label>이름</label>
                    <Form.Input onChange={onChangeInput} placeholder={'이름을 입력해주세요'} fluid name="name"></Form.Input>
                </Form.Field>
                <div className="space"></div>
                <Form.Field>
                    <label>이메일</label>
                    <Form.Input onChange={onChangeInput} placeholder={'이메일을 입력해주세요'} fluid name="email"></Form.Input>
                </Form.Field>
                <div className="space"></div>
                <Form.Field>
                    <label>
                        비밀번호
                    </label>
                    <Input fluid name="pwd" type='password' placeholder='비밀번호' icon='eye'
                           onChange={onChangeInput}></Input>
                </Form.Field>
                <div className='validation-container'>
                    <Checkbox checked={lengthValidate} disabled className='checkbox' shape="default" label='전체 8~32자리'>
                    </Checkbox>
                    <Checkbox checked={numberValidate} disabled className='checkbox' shape="default"
                              cid={'password-number'} label='숫자 한 개 이상'></Checkbox>
                    <Checkbox checked={lowercaseValidate} disabled className='checkbox' shape="default"
                              cid={'password-lowercase'} label='영문 소문자 한 개 이상'></Checkbox>
                    <Checkbox checked={uppercaseValidate} disabled className='checkbox' shape="default"
                              cid={'password-uppercase'} label='영문 대문자 한 개 이상'></Checkbox>
                    <Checkbox checked={specialValidate} disabled className='checkbox' shape="default"
                              cid={'password-special'} label='특수문자 한 개 이상'></Checkbox>
                </div>
                <Form.Field>
                    <label>
                        비밀번호 확인
                    </label>
                    <Input error={isPasswordError} type='password'
                           name="confirmPassword" fluid placeholder='비밀번호 재입력' icon='eye' onChange={onChangeInput}></Input>
                </Form.Field>

                <div className={'agree-container'}>
                    <Checkbox checked={termAgreeAll} onChange={onClickTermAgreeAll} shape={'rectangle'}
                              cid={'all-agree'} label='전체동의'></Checkbox>
                    <Divider></Divider>
                    <div className="checkbox-row">
                        <Checkbox onClick={() => onClickTermAgree(0)} checked={termAgree[0]} className={'checkbox'}
                                  shape={'rectangle'} cid={'agree-1'} label='[필수] 이용약관'></Checkbox>

                        <NextLink href="https://whiteblockteam.notion.site/2022-2-14-739f2c396aa74930a102cc62596d9712/" target="_blank">
                            <span>전체보기</span>
                        </NextLink>
                    </div>
                    <div className="checkbox-row">
                        <Checkbox onClick={() => onClickTermAgree(1)} checked={termAgree[1]} className={'checkbox'}
                                  shape={'rectangle'} cid={'agree-2'} label='[필수] 개인정보 처리방침'></Checkbox>
                        <NextLink href="https://whiteblockteam.notion.site/2022-2-14-fde74232b1864adf9c432e96743273fb" target="_blank">
                            <span>전체보기</span>
                        </NextLink>
                    </div>
                    <div className="checkbox-row">
                        <Checkbox onClick={() => onClickTermAgree(2)} checked={termAgree[2]} className={'checkbox'}
                                  shape={'rectangle'} cid={'agree-3'} label='[선택] 광고성정보수집 동의'></Checkbox>
                        <NextLink href="https://whiteblockteam.notion.site/2022-2-14-99fd561c87304096beecae814db48971" target="_blank">
                            <span>전체보기</span>
                        </NextLink>
                    </div>
                </div>

                <Button disabled={isButtonDisabled}  onClick={onClickSignup} className='button' primary fluid >완료</Button>
                <NextLink href='/auth/login' className='login-link'>로그인하기</NextLink>
            </RegisterFormStyled>
        </AuthLayout>
    )
}


SignUpPage.requireAuth = false;

export default SignUpPage;
