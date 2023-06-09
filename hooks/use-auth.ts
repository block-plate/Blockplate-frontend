import {useState} from "react";

export default function useAuth() {
    const [email, setEmail] = useState();
    const [pwd, setPwd] = useState();


    const onClickLogin = async () => {

    }
    return {email, pwd, onClickLogin};
}