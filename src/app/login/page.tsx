'use client';
import { useState } from "react";
import styles from "./login.module.scss"; // Usei 'styles' para facilitar
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/login/postLogin";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/appRoutes";
import { setTokenHeader } from "@/functions/setTokenHeader";
import { setStorageItem } from "@/functions/localStore";
import { useDispatch } from "react-redux";
import { setStateUser } from "@/redux/user/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { push } = useRouter();
    const dispatch = useDispatch();

    const { status, mutate, isPending } = useMutation({
        mutationFn: async () => {
            setErrorMessage("");
            return await postLogin(email, password);
        },
        onSuccess: (res) => {
            setTokenHeader(res.data.accessToken);
            setStorageItem("token", res.data.accessToken);
            setStorageItem("refreshToken", res.data.refreshToken);
            dispatch(setStateUser(res.data.user)); 
            push(APP_ROUTES.private.dashboard);
        },
        onError: (err: any) => {
            const message = err.response?.data?.message || "E-mail ou senha inválidos.";
            setErrorMessage(message);
            console.error(err);
        }
    });

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !isPending) {
            mutate();
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.login__content}>
                <h1 className={styles.login__content__title}>Login</h1>
                
                <div className={styles.login__content__labels}>
                    <div className={styles.contentLabel}>
                        <label className={styles.contentLabel__label}>Email</label>
                        <input 
                            className={styles.contentLabel__input} 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            placeholder="exemplo@admin.com"
                        />
                    </div>
                    
                    <div className={styles.contentLabel}>
                        <label className={styles.contentLabel__label}>Password</label>
                        <input 
                            className={styles.contentLabel__input} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            onKeyUp={handleKeyDown}
                        />
                    </div>
                </div>

                {errorMessage && <span className={styles.error_message}>{errorMessage}</span>}
                
                <button 
                    className={styles.login__content__button} 
                    onClick={() => mutate()}
                    disabled={isPending}
                >
                    {isPending ? "Carregando..." : "Entrar"}
                </button>

                <div className={styles.footer_actions}>
                    <span>Não tem conta?</span>
                    <button 
                        className={styles.register_button} 
                        onClick={() => push(APP_ROUTES.public.register)}
                    >
                        Cadastre-se
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
