'use client';
import { useState } from "react";
import loginModule from "./login.module.scss";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/login/postLogin";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/appRoutes";
import { setTokenHeader } from "@/functions/setTokenHeader";
import { setStorageItem } from "@/utils/localStore";

const Login = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {push} = useRouter();

    const {status, mutate} = useMutation({
        mutationFn: async () =>{
            return await postLogin(email, password);
        },
        onSuccess: (res) => {
            setTokenHeader(res.data.token);
            setStorageItem("token", res.data.accessToken);
            setStorageItem("refreshToken", res.data.refreshToken);
            push(APP_ROUTES.private.dashboard);
        },
        onError: (erro) =>{
            console.error(erro);

        }
    })

    const getEnter = (e: any) =>{
        if(e.key === "Enter"){
            mutate();
        }
    }



    return(
        <div className={loginModule.login}>
            <div className={loginModule.login__content}>
                <h1 className={loginModule.login__content__title}>Login</h1>
                <div className={loginModule.login__content__labels}>
                    <div className={loginModule.contentLabel}>
                        <label className={loginModule.contentLabel__label} htmlFor="email">Email</label>
                        <input className={loginModule.contentLabel__input} value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" />
                    </div>
                    <div className={loginModule.contentLabel}>
                        <label className={loginModule.contentLabel__label} htmlFor="password">Password</label>
                        <input className={loginModule.contentLabel__input}value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" onKeyUp={getEnter}/>
                    </div>
                </div>
                <button className={loginModule.login__content__button} onClick={() => mutate()}>Login</button>
                <span className={loginModule.login__content__status} >Status: {status}</span>
                
            </div>
        </div>
    )
}

export default Login;