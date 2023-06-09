import styled from "styled-components";
import Responsive from "@/components/common/responsive";

const StyledPageFooter = styled.div`
  //height: 120px;
  background: #303740;
  padding: 2rem 0;
  box-sizing: border-box;
  color: #999;
  & .footer-contents {
    margin: .25rem 0;
  }
`

const PageFooter = () => {
    return (
        <StyledPageFooter>
            <Responsive>
                <div className="footer-contents">세종대학교 소프트웨어학과</div>
                <div className="footer-contents">대표자: 강은솔 / 서울특별시 광진구 능동로 209 세종대학교 (대양 AI센터) / 사업자등록번호: 000-00-0000000</div>
                <div className="footer-contents">2023-1 창의학기제 / 학술제 출품작품</div>
                <div className="footer-contents">개인정보보호책임자: 최윤서 / 호스팅 서비스: Firebase Hosting</div>
                <div className="footer-contents">전화번호 010-0000-0000 메일 문의 eunsol2953@gmail.com</div>
            </Responsive>
        </StyledPageFooter>
    )
}

export default PageFooter;
