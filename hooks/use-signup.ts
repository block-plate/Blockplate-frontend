import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import {useSignUpMutation} from "services/auth";
import {toast} from "react-toastify";

export default function useSignup() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [signUp, signUpResponse] = useSignUpMutation();
    const [termAgree, setTermAgree] = useState([false, false, false]);
    const [termAgreeAll, setTermAgreeAll] = useState(false);

    const [numberValidate, setNumberValidate] = useState(false);
    const [lengthValidate, seLengthValidate] = useState(false);
    const [lowercaseValidate, setLowercaseValidate] = useState(false);
    const [uppercaseValidate, setUppercaseValidate] = useState(false);
    const [specialValidate, setSpecialValidate] = useState(false);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isPasswordError, setIsPasswordError] = useState(false);

    const accountRef = useRef(null);

    const [input, setInput] = useState({
        pwd: "",
        confirmPassword: "",
        termsAgreed: false,
        email: "",
        name: "",
    });

    useEffect(() => {
        if( 8 <= input.pwd.length && input.pwd.length <= 32 ){
            seLengthValidate(true);
        }else{
            seLengthValidate(false);
        }

        if( /[0-9]/.test(input.pwd)){
            setNumberValidate(true);
        }else{
            setNumberValidate(false);
        }

        if( /[a-z]/.test(input.pwd)){
            setLowercaseValidate(true);
        }else{
            setLowercaseValidate(false);
        }

        if( /[A-Z]/.test(input.pwd)){
            setUppercaseValidate(true);
        }else{
            setUppercaseValidate(false);
        }

        if( /[~!@#$%^&*()_+|<>?:{}]/.test(input.pwd)){
            setSpecialValidate(true);
        }else{
            setSpecialValidate(false);
        }
    }, [input.pwd]);

    useEffect(() => {
        if(numberValidate &&
            lengthValidate &&
            lowercaseValidate &&
            uppercaseValidate &&
            specialValidate &&
            (termAgree[0] && termAgree[1])
        ){
            setIsButtonDisabled(false);
        }else{
            setIsButtonDisabled(true);
        }
    }, [lengthValidate, lowercaseValidate, uppercaseValidate, specialValidate, termAgree]);

    useEffect(() => {
        if(signUpResponse.isSuccess){
            toast.success("회원가입에 성공했습니다, 가입하신 계정으로 로그인 부탁드립니다.");
            router.push('/auth/login');
        }
    }, [signUpResponse.isSuccess])

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    }

    const onClickSignup = () => {

        if(input.confirmPassword !== input.pwd){
            setIsPasswordError(true);
        } else{
            const term = {
                isPrivacyAgreed: termAgree[0],
                isServiceAgreed: termAgree[1],
                isMarketingAgreed: termAgree[2],
            }
            const {value} = accountRef.current as any;
            signUp({
                name: input.name,
                pwd: input.pwd,
                account: value,
                email: input.email
            });
            setIsPasswordError(false);
        }
    }

    useEffect(() => {
        console.log(termAgree);
        if(termAgree.every(t => t)){
            setTermAgreeAll(true);
        }else{
            setTermAgreeAll(false);
        }
    }, [termAgree])
    const onClickTermAgree = (index: number) => {
        console.log(index)
        setTermAgree([...termAgree.map((t, i) => i === index ? !t : t)]);
    }

    const onClickTermAgreeAll = () => {
        if(termAgree.every(t => t) ){
            setTermAgree(termAgree.map( t => false ));
        }else{
            setTermAgree(termAgree.map( t => true ));
        }
    }

    return {
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
        isPasswordError,
        accountRef
    };
}