import api from "../httpCommon";

export async function deletePhrase(id: String){
    return await api.delete(`/phrase/${id}`);
}
