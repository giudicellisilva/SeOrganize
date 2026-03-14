import api from "../httpCommon";

export async function getTask(date: string){
    return await api.get(`/task/${date}`);
}