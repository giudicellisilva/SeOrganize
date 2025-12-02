import api from "../httpCommon";

export async function getPhrases(userId: String){
    return await api.get(`phrases/${userId}`);
}