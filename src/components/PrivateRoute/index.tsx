"use client";
import { checkUserAuthenticated } from "@/functions/checkIsUserAuthenticated";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react"
import api from "@/api/httpCommon";
import { getStorageItem, setStorageItem } from "@/functions/localStore";
import { useMutation } from "@tanstack/react-query";
import { postValidateToken } from "@/api/login/postValidateToken";
import { APP_ROUTES } from "@/constants/appRoutes";
import { setTokenHeader } from "@/functions/setTokenHeader";
import { postRefreshToken } from "@/api/login/postRefreshToken";


interface PrivateRouteProps{
    children: ReactNode;
}
const PrivateRoute = (pros: PrivateRouteProps) =>{
    const {push} = useRouter();
    const [authorized, setAuthorized] =  useState(false);
    const [token, setToken] = useState(getStorageItem("token"));

    const [refreshToken] = useState(getStorageItem("refreshToken"));
    
    useEffect(()=> {
        if(token){
            mutate();
        }else{
            push(APP_ROUTES.public.home);
        }
    }, []);

    const {status, mutate} = useMutation({
        mutationFn: async () =>{
            return await postValidateToken(token);
        },
        onSuccess: () => {
          setTokenHeader(token);
          setAuthorized(true);
        },
        onError: () =>{
            mutateRefreshToken();
        }
    });

    const {status: statusRefreshToken, mutate :mutateRefreshToken} = useMutation({
        mutationFn: async () =>{
            return await postRefreshToken(refreshToken);
        },
        onSuccess: (res) => {
          setAuthorized(true);
          setTokenHeader(res.data.accessToken);
          setToken(res.data.token);
          setStorageItem("token", res.data.accessToken);
        },
        onError: () =>{
            push(APP_ROUTES.public.home);
        }
    })

    return(
        <>
            {authorized &&  pros.children}
        </>
    )
}

export default PrivateRoute;