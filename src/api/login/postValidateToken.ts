import api from "@/api/httpCommon";

export async function postValidateToken(token: string){
    return await api.post("login/validateToken",{
        token: token,        
    })
}  
