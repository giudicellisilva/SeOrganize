import api from "@/api/httpCommon";

export async function postLogin(email: String, password: String){
    return await api.post("login",{
        email,
        password
        
    })
}  
