import styled from "styled-components";
import HomeLayout from "@/components/layout/home-layout";
import Responsive from "@/components/common/responsive";
import {Button, Form} from "semantic-ui-react";
import {useCallback, useEffect, useState} from "react";
import {EditorComponent} from "@/components/common/editor";
import {useGetProfileQuery} from "@/services/auth";
import {useCreateCourseMutation} from "@/services/course";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {wrapper} from "@/features";
import {isAuthenticationServerSide} from "@/utils/authentication";
import {useSelector} from "react-redux";
import {selectGlobalData} from "@/features/global";

const StyledEditor = styled.div`
  padding: 2rem 0;
`

const Editor = () => {
    const [createCourse, createCourseResponse] = useCreateCourseMutation();
    const [value, setValue] = useState("**Hello world!!!**");
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const router = useRouter();
    const {userInfo} = useSelector(selectGlobalData);

    const handleChange = useCallback((value: any)=>{
        setValue(value)
    },[])

    const onClickSubmit = async () => {
        await createCourse({
            title,
            description,
            amount,
            data: value,
            instructor_id: userInfo.user_id,
            image: 'https://user-images.githubusercontent.com/22852287/147376720-415b987b-285d-4927-b75d-85e7bb26aaff.png'
        });
    }

    useEffect(() => {
        if(createCourseResponse.isSuccess){
            toast.success('코스 등록이 완료되었습니다')
            router.push('/dashboard');
        }else if(createCourseResponse.isSuccess){
            toast.warn('error');
        }
    }, [createCourseResponse])

    return (
        <HomeLayout>
            <Responsive>
                <StyledEditor>
                    <h2>
                        코스 추가하기
                    </h2>
                    <Form>
                        <Form.Field>
                            <label>코스 이름</label>
                            <Form.Input onChange={(e) => setTitle(e.target.value)}></Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <label>코스 설명</label>
                            <Form.Input  onChange={(e) => setDescription(e.target.value)}></Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <label>가격</label>
                            <Form.Input  onChange={(e) => setAmount(+e.target.value)}></Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <label>
                                코스설명
                            </label>
                            <EditorComponent
                                value={value}
                                onChange={handleChange}
                            />
                        </Form.Field>
                    </Form>
                    <Button primary onClick={() => onClickSubmit()}>등록하기</Button>
                </StyledEditor>
            </Responsive>
        </HomeLayout>
    );
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

export default Editor;