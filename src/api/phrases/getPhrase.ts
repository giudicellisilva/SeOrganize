import api from "../httpCommon";

export async function getPhrase(){
    return await api.get("/phrase");
}