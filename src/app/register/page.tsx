'use client';
import { useState } from "react";
import registerModule from "./register.module.scss";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "@/api/user/postUserRegister";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/appRoutes";
import { setTokenHeader } from "@/functions/setTokenHeader";
import { setStorageItem } from "@/functions/localStore";
import { useDispatch } from "react-redux";
import User from "@/interfaces/User";
import { postLogin } from "@/api/login/postLogin";
import { setStateUser } from "@/redux/user/userSlice";

const Register = () => {

    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        surname: "",
        email: "",
        birth: new Date(),
        role: [],
    });
    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] =  useState("");

    const dispatch = useDispatch();
    const { push } = useRouter();

    const { status, mutate } = useMutation({
        mutationFn: async () => {
            if (password !== confirmPassword) {
                throw new Error("The passwords don't match.");
            }
            return await postRegister(user);
        },
        onSuccess: (res) => {
            mutateUser();
        },
        onError: (e) => {
            console.error(e);
        }
    });

    const { mutate: mutateUser } = useMutation({
        mutationFn: async () => {
            return await postLogin(user.email, password);
        },
        onSuccess: (res) => {
            setTokenHeader(res.data.accessToken);
            setStorageItem("token", res.data.accessToken);
            setStorageItem("refreshToken", res.data.refreshToken);
            const userSave = { 
                ...user, 
                id: String(res.data[0]._id) 
            };

            dispatch(setStateUser(userSave));
            setStorageItem("user", userSave);
            push(APP_ROUTES.private.dashboard);
        },
        onError: (e) => console.error(e)
    });

    const getEnter = (e: any) => {
        if (e.key === "Enter") mutate();
    };

    return (
        <div className={registerModule.register}>
            <div className={registerModule.register__content}>
                <h1 className={registerModule.register__content__title}>Register</h1>

                <div className={registerModule.register__content__labels}>
                    <div className={registerModule.contentLabel}>
                        <label className={registerModule.contentLabel__label}>Name</label>
                        <input
                            className={registerModule.contentLabel__input}
                            value={user.name}
                            onChange={(e) => setUser({ 
                                ...user, 
                                name: e.target.value 
                            })}
                            type="name"
                        />
                    </div>

                    <div className={registerModule.contentLabel}>
                        <label className={registerModule.contentLabel__label}>Surname</label>
                        <input
                            className={registerModule.contentLabel__input}
                            value={user.surname}
                            onChange={(e) => setUser({ 
                                ...user, 
                                surname: e.target.value 
                            })}
                            type="surname"
                        />
                    </div>

                    <div className={registerModule.contentLabel}>
                        <label className={registerModule.contentLabel__label}>Email</label>
                        <input
                            className={registerModule.contentLabel__input}
                            value={user.email}
                            onChange={(e) => setUser({ 
                                ...user, 
                                email: e.target.value 
                            })}
                            type="email"
                        />
                    </div>

                    <div className={registerModule.contentLabel}>
                        <label className={registerModule.contentLabel__label}>Email</label>
                        <input
                            className={registerModule.contentLabel__input}
                            value={user.email}
                            onChange={(e) => setUser({ 
                                ...user, 
                                email: e.target.value 
                            })}
                            type="email"
                        />
                    </div> 

                    <div className={registerModule.contentLabel}>
                        <label className={registerModule.contentLabel__label}>Password</label>
                        <input
                            className={registerModule.contentLabel__input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>

                    <div className={registerModule.contentLabel}>
                        <label className={registerModule.contentLabel__label}>Confirm Password</label>
                        <input
                            className={registerModule.contentLabel__input}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            onKeyUp={getEnter}
                        />
                    </div>

                </div>

                <button
                    className={registerModule.register__content__button}
                    onClick={() => mutate()}
                >
                    Register
                </button>

                <span className={registerModule.register__content__status}>
                    Status: {status}
                </span>
            </div>
        </div>
    );
};

export default Register;