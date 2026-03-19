'use client';
import { useState } from "react";
import styles from "./register.module.scss"; 
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "@/api/user/postUserRegister";
import { postLogin } from "@/api/login/postLogin";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/appRoutes";
import { setTokenHeader } from "@/functions/authHeader";
import { setStorageItem } from "@/functions/localStore";
import { useDispatch } from "react-redux";
import { setStateUser } from "@/redux/user/userSlice";
import User from "@/interfaces/User";

const Register = () => {
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        surname: "",
        email: "",
        birth: new Date(),
        roles: [{ id: "", name: "" }],
    });
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const { push } = useRouter();

    // Mutação de Login (disparada após o registro com sucesso)
    const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
        mutationFn: async () => {
            return await postLogin(user.email, password);
        },
        onSuccess: (res) => {
            setTokenHeader(res.data.accessToken);
            setStorageItem("token", res.data.accessToken);
            setStorageItem("refreshToken", res.data.refreshToken);
            
            // Seguindo o padrão do seu login para salvar o usuário
            dispatch(setStateUser(res.data.user)); 
            setStorageItem("user", res.data.user);
            
            push(APP_ROUTES.private.dashboard);
        },
        onError: (err: any) => {
            setErrorMessage("Erro ao realizar login automático.");
            console.error(err);
        }
    });

    // Mutação de Registro
    const { mutate, isPending: isRegisterPending } = useMutation({
        mutationFn: async () => {
            setErrorMessage("");
            if (password !== confirmPassword) {
                throw new Error("As senhas não coincidem.");
            }
            return await postRegister(user, password);
        },
        onSuccess: () => {
            mutateLogin();
        },
        onError: (err: any) => {
            const message = err.response?.data?.message || err.message || "Erro ao criar conta.";
            setErrorMessage(message);
            console.error(err);
        }
    });

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !isRegisterPending) {
            mutate();
        }
    };

    const isPending = isRegisterPending || isLoginPending;

    return (
        <div className={styles.register}>
            <div className={styles.register__content}>
                <h1 className={styles.register__content__title}>Cadastro</h1>

                <div className={styles.register__content__labels}>
                    <div className={styles.contentLabel}>
                        <label className={styles.contentLabel__label}>Nome</label>
                        <input
                            className={styles.contentLabel__input}
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            type="text"
                            placeholder="Seu nome"
                        />
                    </div>

                    <div className={styles.contentLabel}>
                        <label className={styles.contentLabel__label}>Sobrenome</label>
                        <input
                            className={styles.contentLabel__input}
                            value={user.surname}
                            onChange={(e) => setUser({ ...user, surname: e.target.value })}
                            type="text"
                            placeholder="Seu sobrenome"
                        />
                    </div>

                    <div className={styles.contentLabel}>
                        <label className={styles.contentLabel__label}>Email</label>
                        <input
                            className={styles.contentLabel__input}
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            type="email"
                            placeholder="exemplo@email.com"
                        />
                    </div>

                    <div className={styles.contentLabel}>
                        <label className={styles.contentLabel__label}>Senha</label>
                        <input
                            className={styles.contentLabel__input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>

                    <div className={styles.contentLabel}>
                        <label className={styles.contentLabel__label}>Confirmar Senha</label>
                        <input
                            className={styles.contentLabel__input}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            onKeyUp={handleKeyDown}
                        />
                    </div>
                </div>

                {errorMessage && <span className={styles.error_message}>{errorMessage}</span>}

                <button
                    className={styles.register__content__button}
                    onClick={() => mutate()}
                    disabled={isPending}
                >
                    {isPending ? "Processando..." : "Criar Conta"}
                </button>

                <div className={styles.footer_actions}>
                    <span>Já tem uma conta?</span>
                    <button 
                        className={styles.login_button} 
                        onClick={() => push(APP_ROUTES.public.login)}
                    >
                        Fazer Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;