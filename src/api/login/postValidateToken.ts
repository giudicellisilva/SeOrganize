import api from "@/api/httpCommon";

export async function postValidateToken(token: string){
    console.log("chama", token);
    return await api.post("validateToken",{
        token: token,        
    })
}  
