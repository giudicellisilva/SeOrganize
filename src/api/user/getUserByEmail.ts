import api from "../httpCommon";

export async function getUserByEmail(email: String){
    return await api.get(`user/${email}`);
}