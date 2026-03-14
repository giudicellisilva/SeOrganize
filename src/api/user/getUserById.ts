import api from "../httpCommon";

export async function getUserById(id: String){
    return await api.get(`user/${id}`);
}