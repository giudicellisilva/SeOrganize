import api from "@/api/httpCommon";

export async function postRefreshToken(refreshToken: string){
    return await api.post("/refresh",{
        token: refreshToken,     
    })
}  
