import styled from "styled-components";
import HomeLayout from "@/components/layout/home-layout";
import Responsive from "@/components/common/responsive";
import {Button, Form} from "semantic-ui-react";
import {useCallback, useEffect, useState} from "react";
import {EditorComponent} from "@/components/common/editor";
import {useCreateCourseMutation} from "@/services/course";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {wrapper} from "@/features";
import {isAuthenticationServerSide} from "@/utils/authentication";
import {useSelector} from "react-redux";
import {selectGlobalData} from "@/features/global";
import moment from "moment";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { storage } from "@/utils/firebase";

const StyledEditor = styled.div`
  padding: 2rem 0;
`

const Editor = () => {
    const [createCourse, createCourseResponse] = useCreateCourseMutation();
    const [value, setValue] = useState("**Hello world!!!**");
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [tags, setTags] = useState<string>('');
    const [image, setImage] = useState<any>();
    const router = useRouter();
    const {userInfo} = useSelector(selectGlobalData);
    const [loading, setLoading] = useState(false);

    const handleChange = useCallback((value: any)=>{
        setValue(value)
    },[])

    const onClickSubmit = async () => {
        console.log(value);
        if(title === ''){
            toast.warn('코스 제목을 입력해주세요!');
            return;
        }
        if(description === ''){
            toast.warn('코스 설명을 입력해주세요!');
            return;
        }
        if(amount === 0){
            toast.warn('코스 가격을 입력해주세요!');
            return;
        }
        if(!image){
            toast.warn('코스 대표 이미지를 넣어주세요!');
        }

        const img = image[0];

        const fileNm = moment().format("YYYYhmmss") + "_" + img.name;
        const storageRef = ref(storage, "images/" + fileNm);
        const snapshot = await uploadBytes(storageRef, img);
        const url = await getDownloadURL(snapshot.ref);

        await createCourse({
            title,
            description,
            amount,
            data: value,
            instructor_id: userInfo.user_id,
            image: url,
            tags,
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
                            <label>태그</label>
                            <Form.Input placeholder={"쉽표로 구분 (ex 블록체인, 웹 )"} onChange={(e) => setTags(e.target.value)}></Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <label>코스 이미지</label>
                            <Form.Input type='file' onChange={(e) => setImage(e.target.files)}></Form.Input>
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