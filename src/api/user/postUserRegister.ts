import api from "@/api/httpCommon";
import User from "@/interfaces/User";

export async function postRegister(user: User, password: string){
    return await api.post("user",{
        name: user.name,
        surname: user.surname,
        email: user.email,
        birth: user.birth,
        password: password
    })
}