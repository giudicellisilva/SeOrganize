import api from "../httpCommon";

export async function patchTaskComplete(id: string){
    return await api.patch(`/task/${id}/complete`);
}