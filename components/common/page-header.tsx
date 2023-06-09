import styled from "styled-components";
import Responsive from "@/components/common/responsive";
import Image from "next/image";
import logoImage from '@/public/images/logo.svg';
import {Button} from "semantic-ui-react";
import NextLink from "next/link";
import {useGetProfileQuery} from "@/services/auth";
import {selectAuth} from "@/features/auth";
import {useSelector} from "react-redux";
import {selectGlobalData} from "@/features/global";

const StyledPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
   justify-content: space-between;
   height: 100%;
   span{
    margin-right: 1rem;
   }
`
const StyledHeaderContainer = styled.div`
  height: 80px;
  padding: .75rem 0;
  border: 1px solid ${({theme}) => theme.color.grey3};
`
const PageHeader = () => {
    const {userInfo} = useSelector(selectGlobalData);
    const isLogin = true;
    return (
        <StyledHeaderContainer>
            <Responsive>
                <StyledPageHeader>
                    <NextLink href={'/'}><Image src={logoImage} alt={'logo'} height="47"></Image></NextLink>
                    {
                        isLogin ? (
                            <div>
                                <input style={{visibility: 'hidden'}} id='myAccount' value={userInfo.account} disabled/>
                                <span>{userInfo?.name}님</span>
                                <NextLink href={'/dashboard'}><Button primary>대시보드</Button></NextLink>

                            </div>
                        ) : (
                            <div>
                                <NextLink href={'/auth/login'}><Button secondary>로그인</Button></NextLink>
                                <NextLink href={'/auth/register'}><Button primary>회원가입</Button></NextLink>
                            </div>
                        )
                    }

                </StyledPageHeader>
            </Responsive>
        </StyledHeaderContainer>
    )
}

export default PageHeader;
