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
import {useCreateLectureMutation} from "@/services/lecture";

const StyledLectureEditor = styled.div`
  padding: 2rem 0;
  .button{
    margin-top: 1rem;
  }
`

const LectureEditor = () => {
    const [createLecture, createLectureResponse] = useCreateLectureMutation();
    const [value, setValue] = useState("**Hello world!!!**");
    const [title, setTitle] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [group, setGroup] = useState<string>('');
    const [order, setOrder] = useState<number>(0);
    const router = useRouter();

    const handleChange = useCallback((value: any)=>{
        setValue(value)
    },[])

    const onClickSubmit = async () => {
        await createLecture({
            course_id: router.query.course_id as string,
            title,
            url,
            order,
            group,
            data: value,
        });
    }

    useEffect(() => {
        if(createLectureResponse.isSuccess){
            toast.success('코스 등록이 완료되었습니다')
            router.push('/dashboard');
        }else if(createLectureResponse.isSuccess){
            toast.warn('error');
        }
    }, [createLectureResponse])

    return (
        <HomeLayout>
            <Responsive>
                <StyledLectureEditor>
                    <h2>
                        강의 추가하기
                    </h2>
                    <Form>
                        <Form.Field>
                            <label>강의 이름</label>
                            <Form.Input onChange={(e) => setTitle(e.target.value)}></Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <label>그룹</label>
                            <Form.Input  onChange={(e) => setGroup(e.target.value)}></Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <label>순서</label>
                            <Form.Input  onChange={(e) => setOrder(+e.target.value)}></Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <label>강의 링크</label>
                            <Form.Input  onChange={(e) => setUrl(e.target.value)}></Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <label>
                                강의내용
                            </label>
                            <EditorComponent
                                value={value}
                                onChange={handleChange}
                            />
                        </Form.Field>
                    </Form>
                    <Button primary onClick={() => onClickSubmit()}>등록하기</Button>
                </StyledLectureEditor>
            </Responsive>
        </HomeLayout>
    );
}



export default LectureEditor;