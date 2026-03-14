import api from "../httpCommon";

export async function deleteTask(id : string){
    return await api.delete(`/task/${id}`);
}