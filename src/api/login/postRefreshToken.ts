import api from "@/api/httpCommon";

export async function postRefreshToken(refreshToken: string){
    console.log("chama", refreshToken);
    return await api.post("refreshToken",{
        token: refreshToken,     
    })
}  
